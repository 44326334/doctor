<template>
  <div class="warp" v-show="isRefresh">
    <div class="tips">
      <p>请重新刷新页面</p>
      <mt-button type="default" size="small" @click="toRefresh">刷&nbsp;&nbsp;&nbsp;&nbsp;新</mt-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let domain = DOMAIN
  export default {
    name: 'oath2',
    data() {
      return {
        isRefresh: false
      }
    },
    methods: {
      getPhoneBinding(openId) {
        axios.get(domain+'/api/mobile/check?openId='+openId)
        .then((res) => {
          this.$indicator.close()
          if(res.data.code === 0) {
            if(res.data.body){
              window.location.replace(domain+"#/upload")
            } else {
              window.location.replace(domain+"#/binding")
            }
          } else {
            this.$toast(res.data.message)
            window.location.replace(domain+"#/binding")
          }
        })
        .catch((err) => {
          this.$indicator.close()
          this.$toast(err)
          this.isRefresh = true
        })
      },
      getOpenId() {
        let code = this.getQueryParam("code")
        if(code) {
          axios.get(domain+'/api/oauth/accesstoken/get?code='+code)
          .then((res) => {
            if(res.data.code ===0){
              /* accessToken openId */
              this.$store.commit('setOath2', res.data.body)
              this.getPhoneBinding(res.data.body.openid)
            } else {
              this.$toast(res.data.message)
            }
          })
          .catch((err) => {
            this.$toast(err)
          })
        } else {
          this.$indicator.close()
          this.$toast("授权失败")
          this.isRefresh = true
        }
      },
      getQueryParam(param) {
        let query = window.location.search.substring(1).split("&")
        for (let i=0;i<query.length;i++){
          let pair = query[i].split("=")
          if(pair[0] == param) {
            return pair[1]
          }
        }
        return (false)
      },
      toRefresh() {
        window.location.reload()
      },
    },
    created() {
      this.$indicator.open()
    },
    mounted() {
      this.getOpenId()
    }
  }
</script>

<style lang="less" scoped>

</style>
