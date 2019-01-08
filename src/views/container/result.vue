<template>
  <div></div>
</template>

<script>
import axios from 'axios'
import {
  getHistoryDetailUsingPOST,
  getTestResultDefaultViewTypeUsingGET
  } from '@/../client/javascript/vue-api-client.js'
let domain = DOMAIN
  export default {
    name: 'result',
    data() {
      return {
        viewType: ''
      }
    },
    methods: {
      getViewType() {
        /* 检测结果历史详情 */
        let rid = this.$route.query.rid
        const reg = /^\d+$/
        if (reg.test(rid)) {
          getTestResultDefaultViewTypeUsingGET ({
            resultId: rid
          }).then((res)=>{
            if(res.data.code === 0) {
              this.viewType = res.data.body
              if(this.viewType) {
                this.getDetail()
              } else {
                this.$toast('无检测结果')
                this.$indicator.close()
              }
            } else {
              this.$toast(res.data.message)
            }
          }).catch((err)=>{
            this.$indicator.close()
            this.$toast(err)
          })
        } else {
          this.$toast('检测id错误')
          this.$indicator.close()
        }
      },
      getDetail() {
        /* 检测结果历史详情 */
        let rid = this.$route.query.rid
        const reg = /^\d+$/
        if (reg.test(rid)) {
          getHistoryDetailUsingPOST ({
            param: {
              resultId: rid,
              viewType: this.viewType
            }
          }).then(response => {
            this.$indicator.close()
            if(response.data.code === 0){
              this.$store.commit('setIndexHealth', response)
              this.switchProject(this.viewType)
            }
          })
        }
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
      this.$indicator.open()
      this.getViewType()
    },
  }
</script>

<style lang="less" scoped>

</style>
