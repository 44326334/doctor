<template>
  <div class="upload">
    <HEADER></HEADER>
    <div class="warp">
      <div class="camera" @click="toChooseImage('camera')">
        <img src="../../assets/camera.png" alt="" width="100%">
      </div>
      <div class="album" @click="toChooseImage('album')">
        <img src="../../assets/album.png" alt="" width="100%">
      </div>
        <!-- {{result}} -->
        <!-- {{id}} -->
    </div>
    <!-- <div class="test">
      <p>{{result}}</p>
    </div> -->
  </div>
</template>

<script>
import HEADER from '@/components/header.vue'
import axios from 'axios'
import {
  getJsSignUsingGET,
  detectUploadUsingPOST
  } from '@/../client/javascript/vue-api-client.js'
const WX = require('weixin-js-sdk')
let domain = DOMAIN
const images = {
  localId: [],
  serverId: []
}
export default {
  name: 'upload',
  components: {
    HEADER
  },
  data() {
    return {
      id: '',
      result: '',
      base64: '',
      project: {
        'early_pregnancy_summary': 'gravidity',
        'ovulation_period_summary': 'ovulation',
        'pesticide_summary': 'pesticide',
        'cruorin_summary': 'cruorin'
      }
    }
  },
  methods: {
    toConfig() {
      // axios.get(domain+'/api/jssign/get?url=http://redirect.unishep.cn/')
      // // axios.get(domain+'/api/jssign/get?url='+domain)
      // .then((res)=>{
      //   if(res.data.code === 0){
      //     this.wxConfig(res.data.body)
      //   } else {
      //     this.$toast(res.data.message)
      //   }
      // })
      // .catch((err)=>{
      //   this.$toast(err)
      // })
      getJsSignUsingGET({
        // url: "http://redirect.unishep.cn/"
        url: domain + "/"
      }).then((res) => {
        if(res.data.code === 0){
          this.wxConfig(res.data.body)
        } else {
          this.$toast(res.data.message)
        }
      }).catch((err)=>{
        this.$toast(err)
      })
    },
    wxConfig(data) {
      let that = this
      WX.config ({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['chooseImage', 'getLocalImgData'],
        success: function(msg) {
          that.$toast('ok')
        },
        error: function(err) {
          that.$toast(err)
        }
      })
    },
    toChooseImage(type) {
      let that = this
      WX.chooseImage({
        count: 1,
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // that.toUploadWX(res.localIds); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          that.$indicator.open()
          that.toGetLocalImageData(res.localIds[0])
        }
      });
    },
    toGetLocalImageData(localId) {
      let that = this
      WX.getLocalImgData({
        localId: localId, // 图片的localID
        success: function (res) {
          // that.base64 = res.localData
          if(res.localData.indexOf('data:image')>-1){
            that.toUploadServer(res.localData);
          }else{
            that.toUploadServer('data:image/jpg;base64,' + res.localData);
          }
        }
      });
    },
    // toUploadWX(localIds) {
    //   let that = this
    //   WX.uploadImage({
    //     localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
    //     isShowProgressTips: 1, // 默认为1，显示进度提示
    //     success: function (res) {
    //       var serverId = res.serverId; // 返回图片的服务器端ID
    //       that.id = res.serverId
    //       that.$indicator.open()
    //       that.toUploadServer(res.serverId)
    //     }
    //   })
    // },
    toUploadServer(imageData) {
      detectUploadUsingPOST({
        param: {
          accountId: 0,
          appName: 'weixin-app',
          imageData: imageData,
          testUserId: 0
        }
      }).then((res)=>{
        this.$indicator.close()
        if(res.data.code === 0) {
          this.$store.commit('setIndexHealth', res)
          this.result = res.data.body
          this.switchProject(res.data.viewType)
        } else {
          this.$toast(res.data.message)
        }
      }).catch((err)=>{
        this.$indicator.close()
        this.$toast(err)
      })
    },
    switchProject(project) {
      switch (project) {
        case 'urine_summary':
          //尿常规
          this.$router.push('/healths')
          break;
        case 'early_pregnancy_summary':
          //早孕
          this.$router.push('/gravidity')
          break;
        case 'ovulation_period_summary':
          //排卵
          this.$router.push('/ovulation')
          break;
        case 'pesticide_summary':
          //农残
          this.$router.push('/pesticide')
          break;
        case 'cruorin_summary':
          //血红蛋白
          this.$router.push('/cruorin')
          break;
      }
    }
  },
  created() {
    this.toConfig()
  }
}
</script>

<style lang="less" scoped>
  .upload{
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(245, 245, 245);
    .warp{
      height: 60%;
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .camera{
        margin-bottom: 5%;
      }
      .album{
        margin-top: 5%;
      }
    }
    .test{
      position: absolute;
      bottom: 0;
      width: 200px;
      p{
        width: 200px;
        word-wrap:break-word;
        overflow: scroll;
      }
    }
  }
</style>
