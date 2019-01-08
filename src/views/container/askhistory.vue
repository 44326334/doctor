<template>
  <div class="warp">
    <HEADER></HEADER>
    <div class="con">
      <ul class="asklist" v-show="!nullList">
        <li v-for="(item,index) in list" :key="index">
          <div class="title">
            <div class="left">
              <div class="headimg">
                <img :src="item.interaction===0?require('../../assets/doctor.png'):item.image"
                alt="" width="100%">
              </div>
              <div class="doct" :style="{color: item.interaction===0?'rgb(192,192,192)':'black'}">
              <!-- <div class="doct" :style="{color: 'black'}"> -->
                {{item.status==='n'?'暂无回复':item.doctor}}
              </div>
            </div>
            <div class="right">
              <div :style="{color: askStatus(item).color}">
              <!-- <div :style="{color: 'black'}"> -->
                {{askStatus(item).content}}
              </div>
            </div>
          </div>
          <div class="content">
            <div class="left">
              <p style="-webkit-box-orient: vertical">{{item.ask}}</p>
            </div>
            <div class="right">
              <div class="callback" @click="chatDetail(index)">查看问诊记录</div>
            </div>
          </div>
          <div class="time">
            <img src="../../assets/time.png" alt="">
            <span>{{formatDate(item.gmtCreate)}}</span>
          </div>
        </li>
        <!-- <li v-show="nullList">暂无记录</li> -->
      </ul>
      <ul class="nolist" v-show="nullList">
        <div>
          <img src="../../assets/nolist.png" alt="" width="90%">
        </div>
        <p>当前没有历史记录</p>
      </ul>
    </div>
  </div>
</template>

<script>
import util from '../../common/util';
import {
  getProblemHistoryUsingGET,
  getProblemDetailUsingPOST,
  getDoctorDetailUsingGET
} from '@/../client/javascript/vue-api-client.js'
import HEADER from '@/components/header.vue'
  export default {
    name: 'askhistory',
    components: {HEADER},
    data() {
      return {
        userid: 2,
        nullList: false,
        list: [],
        olist: [],
        createProblem: {
          id: 2,
          text: '',
          state: false,
          problemId: 29
        }
      }
    },
    methods: {
      /* 获取提问记录列表 */
      loadAskList () {
        let that = this
        getProblemHistoryUsingGET ({
          testUserId: this.userid
        }).then(response => {
          if(response.data.code === 0 && response.data.list.length > 0){
            /* 查找有接入医生问题 */
            this.olist = response.data.list
            for(let i in this.olist) {
              if(this.olist[i].interaction !== 0) {
                this.doctorDetail(this.olist[i].id, i)
              }
            }
            this.list = this.olist
            this.$indicator.close()
          } else {
            this.nullList = true
          }
        }).catch(error => {
          this.nullList = true
        })
      },
      formatDate (string) {
        let time = string.substr(0, string.length - 5);
        let t = new Date(time)
        return util.formatDate.format(new Date(time), 'yyyy-MM-dd hh:mm:ss')
      },
      /* 获取提问记录详情 */
      loadProblemList(index) {
        getProblemDetailUsingPOST({
          param: {
            accountId: this.createProblem.id,
            lastContentId: 0,
            questionId: this.list[index].id,
            // testUserId: this.createProblem.id
          }
        }).then(response => {
          if (response.data.code === 0) {
            this.$store.commit('setLinkDoctorView', response.data.body.doctorInfo);
            this.$store.commit('setDoctorHistory', response.data.body.metaItemDetailResultList);
          }else{
            this.$toast('加载历史记录失败!')
          }
        });
      },
      //查看问题详情
      chatDetail (index) {
        this.loadProblemList(index)
        this.$store.commit('setCreateProblem', this.list[index].id);
        this.$store.commit('setAskProblemStatus', this.list[index].status)
        this.$store.commit('setAssessed', this.list[index].assessed)
        this.$router.push({
          name: 'chat',
          params: {
            from : 'history',
            list: this.list[index]
          }
        });
      },
      /* 显示医生详情 */
      doctorDetail(id, index) {
        getDoctorDetailUsingGET({
          questionId: id
        }).then(response => {
          if (response.data.code === 0) {
            this.$set(this.olist[index], 'doctor', response.data.body.name)
            this.$set(this.olist[index], 'image', response.data.body.image)
          }
        });
      },
      /* 问题状态显示 */
      askStatus(item) {
        let res = {}
        switch (item.status) {
          case 'n':
            res.content = '待回复'
            res.color = 'rgb(247, 209, 158)'
            return res
          case 'c':
            if(!item.assessed){
              res.content = '待评价'
              res.color = 'rgb(247, 209, 158)'
              return res
            } else {
              res.content = '已关闭'
              res.color = 'rgb(184, 184, 184)'
              return res
            }
          case 'a':
            res.content = '待回复'
            res.color = 'rgb(184, 184, 184)'
            return res
          case 's':
            res.content = '已回复'
            res.color = 'rgb(184, 184, 184)'
            return res
          case 'v':
            res.content = '回复已查看'
            res.color = 'rgb(184, 184, 184)'
            return res
          case 'p':
            res.content = '已关闭'
            res.color = 'rgb(184, 184, 184)'
            return res
        }
      }
    },
    created() {
      this.$indicator.open()
      this.loadAskList()
    }
  }
</script>

<style lang="less" scoped>
.warp{
  height: 100%;
  .con {
    height: 100%;
    overflow-y: scroll;
    .asklist {
      list-style-type: none;
      padding: 0;
      margin: 50px 5% 0 5%;
      border-top: 1px solid rgb(240, 240, 240);
      li {
        border-bottom: 1px solid rgb(240, 240, 240);
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          width: 100%;
          margin: 0.75rem 0;
          display: flex;
          align-items: center;
          .left {
            display: flex;
            flex: 2;
            justify-content: flex-start;
            align-items: center;
            .headimg {
              width: 1.75rem;
              height: 1.75rem;
              border-radius: 50%;
              border: 1px solid rgb(224, 224, 224);
              position: relative;
              align-self: flex-start;
              img {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .doct {
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1;
              text-align: justify;
              font-size: 1.25rem;
              height: 1.75rem;
              margin-left: 1rem;
            }
          }
          .right {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            align-items: center;
            // color: rgb(247, 209, 158)
          }
        }
        .content {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 0.75rem;
          .left {
            display: flex;
            width: 50%;
            justify-content: flex-start;
            align-items: center;
            color: rgb(184, 184, 184);
            p {
              width: 100%;
              margin: 0;
              // word-break: break-all;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
            }
          }
          .right {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            align-items: center;
            color: rgb(80, 126, 165);
          }
        }
        .time {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 1rem;
          padding-left: 0.25rem;
          margin-bottom: 0.75rem;
          img {
            width: 1rem;
            height: 1rem;
            margin-right: 0.75rem;
          }
          span {
            height: 1rem;
            font-size: 0.85rem;
            color: rgb(184, 184, 184);
          }
        }
      }
    }
    .nolist {
      list-style-type: none;
      padding: 0;
      margin: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        margin: 0 5%;
      }
      p {
        font-size: 1rem;
        letter-spacing: 1px;
        font-weight: 500;
        margin-top: 1rem;
      }
    }
  }
}
</style>
