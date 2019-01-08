<template>
  <div class="warp">
    <HEADER></HEADER>
    <div class="con">
      <ul class="detelist" v-show="result === 'true'">
        <li v-for="item in list" :key="item.id">
          <div class="left">
            <div class="title">
              <!-- <p>健康评分：<span>{{item&&item.urineScore}}</span>分</p> -->
              <p>{{item&&item.productName}}</p>
            </div>
            <div class="time">
              <img src="../../assets/time.png" alt="">
              <!-- <span>{{item.time}}</span> -->
              <span>{{formatDate(item.gmtCreate)}}</span>
            </div>
          </div>
          <div class="right">
            <div class="callback" @click="toReport(item.resultId)">查看报告</div>
          </div>
        </li>
      </ul>
      <ul class="nolist" v-show="result === 'false'">
        <div>
          <img src="../../assets/nolist.png" alt="" width="90%">
        </div>
        <p>当前没有历史记录</p>
        <!-- js无法直接格式化gmt_时区 -->
        <!-- <p>{{formatDate('2018-11-14T17:28:10.000+0000')}}</p>  -->
        <!-- <p>{{formatDate('2018-11-14 17:28:10')}}</p> -->
      </ul>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue'
import util from '../../common/util'
import {
  getTestResultHistoryUsingGET,
  getHistoryDetailUsingPOST
} from '@/../client/javascript/vue-api-client.js'

  export default {
    name: 'detehistory',
    components: {HEADER},
    data() {
      return {
        list: [],
        result: 'null'
      }
    },
    methods: {
      deteHistory() {
        getTestResultHistoryUsingGET ({}).then(response => {
          if(response.data.code === 0){
            this.$indicator.close()
            if(response.data.list.length > 0) {
              this.list = response.data.list
              this.result = 'true'
            } else {
              this.list = []
              this.result = 'false'
            }
          } else {
            this.$indicator.close()
            this.result = 'false'
          }
        }).catch(error => {
          this.result = 'false'
        })
      },
      formatDate (string) {
        // let time = string.substr(0, string.length - 5);
        // let time = string.replace(/-/g, '/')
        return util.formatDate.format(string, 'yyyy-MM-dd hh:mm:ss')
      },
      toReport(id) {
        // window.location.href = url
        // this.$store.commit('setHealthDetail', id)
        getHistoryDetailUsingPOST ({
          param: {
            // resultId: this.$store.state.healthDetail.resultId,
            resultId: id,
            viewType: "urine_details"
          }
        }).then(response => {
          if(response.data.code === 0){
            this.$store.commit('setReportHealth', response.data.body)
            this.$router.push({name: 'repo', params: {goto: 'repo'}});
          }
        })
      }
    },
    created() {
      let rid = this.$route.query.rid
      const reg = /^\d+$/;
      if (reg.test(rid)) {
        this.$store.commit('setDeteResultId', rid)
      }
      this.$indicator.open()
      this.deteHistory()
    }
  }
</script>

<style lang="less" scoped>
.warp{
  height: 100%;
  .con {
    height: 100%;
    overflow-y: scroll;
    .detelist {
      list-style-type: none;
      padding: 0;
      margin: 50px 5%;
      border-top: 1px solid rgb(240, 240, 240);
      li {
        height: 5rem;
        border-bottom: 1px solid rgb(240, 240, 240);
        display: flex;
        .left {
          display: flex;
          flex: 2;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          padding: 0.5rem 0;
          .title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 0.7rem;
            span {
              font-size: 1.2rem;
            }
          }
          .time {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 1rem;
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
        .right {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          .callback {
            font-size: 0.75rem;
            color: rgb(80, 126, 165)
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
