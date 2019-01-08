<template>
  <div class="healthWarp">
    <!-- <HEADER></HEADER> -->
    <div class="con">
      <!-- <transition> -->
      <div class="canvas" @click="toIndi" >
        <img src="../../assets/man.jpg" alt="" height="100%" width="100%">
        <div id="mask" v-show="indexHealth">
          <p :class="{health: indexHealth && indexHealth.hepatobiliary && indexHealth.hepatobiliary.abnormal}">
            <img src="../../assets/warning.png" alt="" width="14px" height="14px" v-show="indexHealth && indexHealth.hepatobiliary && indexHealth.hepatobiliary.abnormal">
            {{indexHealth && indexHealth.hepatobiliary && indexHealth.hepatobiliary.name}}&nbsp;
            <span v-if="indexHealth && indexHealth.hepatobiliary && indexHealth.hepatobiliary.abnormal">(异常)</span>
            <span v-else>(正常)</span>
          </p>
          <p :class="{health: indexHealth && indexHealth.hepatobiliary && indexHealth.kidney.abnormal}">
            <img src="../../assets/warning.png" alt="" width="14px" height="14px" v-show="indexHealth && indexHealth.hepatobiliary && indexHealth.kidney.abnormal">
            {{indexHealth && indexHealth.hepatobiliary && indexHealth.kidney.name}}&nbsp;
            <span v-if="indexHealth && indexHealth.hepatobiliary && indexHealth.kidney.abnormal">(异常)</span>
            <span v-else>(正常)</span>
          </p>
          <p :class="{health: indexHealth && indexHealth.hepatobiliary && indexHealth.endocrine.abnormal}">
            <img src="../../assets/warning.png" alt="" width="14px" height="14px" v-show="indexHealth && indexHealth.hepatobiliary && indexHealth.endocrine.abnormal">
            {{indexHealth && indexHealth.hepatobiliary && indexHealth.endocrine.name}}&nbsp;
            <span v-if="indexHealth && indexHealth.hepatobiliary && indexHealth.endocrine.abnormal">(异常)</span>
            <span v-else>(正常)</span>
          </p>
          <p :class="{health: indexHealth && indexHealth.hepatobiliary && indexHealth.circulation.abnormal}">
            <img src="../../assets/warning.png" alt="" width="14px" height="14px" v-show="indexHealth && indexHealth.hepatobiliary && indexHealth.circulation.abnormal">
            {{indexHealth && indexHealth.hepatobiliary && indexHealth.circulation.name}}&nbsp;
            <span v-if="indexHealth && indexHealth.hepatobiliary && indexHealth.circulation.abnormal">(异常)</span>
            <span v-else>(正常)</span>
          </p>
          <p :class="{health: indexHealth && indexHealth.hepatobiliary && indexHealth.urinary.abnormal}">
            <img src="../../assets/warning.png" alt="" width="14px" height="14px" v-show="indexHealth && indexHealth.hepatobiliary && indexHealth.urinary.abnormal">
            {{indexHealth && indexHealth.hepatobiliary && indexHealth.urinary.name}}&nbsp;
            <span v-if="indexHealth && indexHealth.hepatobiliary && indexHealth.urinary.abnormal">(异常)</span>
            <span v-else>(正常)</span>
          </p>
        </div>
        <div class="scorewarp">
          <div class="score">
            <div class="content">
              {{indexHealth && indexHealth.score}}<span v-show="indexHealth">分</span>
            </div>
          </div>
          <div class="detehistory" @click.stop="toDete">
            <div>历史</div>
            <div>记录</div>
          </div>
        </div>
      </div>
      <!-- </transition> -->
      <div class="resultWarp" >
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">检测结论</mt-tab-item>
          <mt-tab-item id="2">分数曲线</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" :swipeable="swipeable">
          <mt-tab-container-item id="1">
            <div class="resultText">
              {{indexMessage && indexMessage.summary}}
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="line" :style="{height: lineHeight + 'px'}">
              <v-chart :options="line" :auto-resize="true" ref="scopeline"/>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div class="footer">
        <mt-button class="resultBtn" type="primary" size="large" @click.native="toRepo">查看完整报告</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import util from '../../common/util'
import {
  loginUsingGET,
  getHistoryDetailUsingPOST,
  getTestResultHistoryUsingGET
  } from '@/../client/javascript/vue-api-client.js'

export default {
  name: "indicators",
  components: {
    HEADER,
    'v-chart': ECharts
  },
  data() {
    return {
      lineHeight: null,
      imageType: 'man',
      selected: '1',
      swipeable: true,
      line: {},
    };
  },
  computed: mapState({
    indexHealth: state => {
      return state.indexHealth && state.indexHealth.data &&state.indexHealth.data.body
    },
    indexMessage: state => {
      return state.indexHealth && state.indexHealth.data
    }
  }),
  methods: {
    toRepo () {
      if(this.indexHealth){
          getHistoryDetailUsingPOST ({
          param: {
            resultId: this.indexMessage.resultId,
            // resultId: 304,
            viewType: "urine_details"
          }
        }).then(response => {
          if(response.data.code === 0){
            this.$store.commit('setReportHealth', response)
            this.$router.push({name: 'repo', params: {goto: 'repo'}});
          }
        })
      }else {
        this.$toast('请重新检测')
      }
    },
    toDete () {
      this.$router.push({name: 'detehistory', params: {goto: 'detehistory'}});
    },
    toIndi () {
      if(this.indexHealth){
        getHistoryDetailUsingPOST ({
          param: {
            resultId: this.indexMessage.resultId,
            // resultId: 304,
            viewType: "urine_desease_analysis"
          }
        }).then(response => {
          if(response.data.code === 0){
            this.$store.commit('setIndicatorHealth', response.data)
            this.$router.push({name: 'indicators', params: {goto: 'indicators'}});
          }
        })
      } else {
        this.$toast('请重新检测')
      }
    },
    deteHistory() {
      let o = this.indexHealth && this.indexHealth.scoreDistribution.distributions
      let percent = this.indexHealth && this.indexHealth.scoreDistribution.overPercent
      if(!percent){percent = 0}
      let score = this.indexHealth && this.indexHealth.score
      let that = this
      this.line = {
        title: {
          text: '您超过了'+percent+'%的用户',
          left: 'center',
          textStyle: {
            color: '#c6c6c6',
            fontSize: '12',
            fontWeight: '400'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: o,
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 0,
          // height: 100
        },
        series: [{
          data: o,
          type: 'line',
          symbol: 'none',
          color: '#26a2ff',
          smooth: true,
          markPoint:{
            itemStyle: {
              color: '#5fb8fc',
              normal: {
                label: {
                  show: true,
                  formatter: function(value){
                    return score
                  }
                }
              }
            },
            large: true,
            effect: {
              show: false,
              shadowBlur: 0
            },
            data:[
              // {name: '标注1', value: o[o.length-1], xAxis: o.length-1, yAxis: o[o.length-1]},
              {
                name: '最大值',
                type: 'max'
              },
            ]
          },
          areaStyle: {
            color: '#5fb8fc'
          }
        }],
      }
      // this.$refs.scopeline.hideLoading();
      this.$refs.scopeline.mergeOptions(this.line)
    },
  },
  mounted() {
    this.clientHeight = document.body.clientHeight
    this.lineHeight = document.body.clientHeight - 40 - 32 - 41 - this.clientHeight*0.0185
    if(!this.MessageBoxRead){
      if(this.indexHealth){
        MessageBox({
          title: '温馨提示',
          message: this.indexMessage&&this.indexMessage.resultMessage,
          confirmButtonText: '我知道了'
        });
        this.$store.commit('readMessage', true)
      } else {
        this.$toast('请重新检测')
      }
    }
    // window.alert(JSON.stringify(this.indexHealth))
    this.deteHistory()
  }
};
</script>

<style lang="less">
.healthWarp {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .con {
    width: 100%;
    height: 100%;
    // display: flex;
    // flex: 1;
    // flex-direction: column;
    // justify-content: space-around;
    background: rgb(235, 235, 235);
    .canvas {
      // background: url('../../assets/man.jpg') no-repeat;
      // height:100%;
      // width:100%;
      // overflow: hidden;
      // background-size:100%;
      // display: flex;
      // flex: 3.5;
      // flex-direction: column;
      // margin-top: 40px;
      border-bottom: 2px rgb(240, 240, 240) solid;
      position: relative;
      #mask {
        top: 0;
        width: 100%;
        height: 45%;
        // z-index: 2;
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-top: 10%;
        p {
          width: 50%;
          color: rgb(65, 164, 138);
        }
        .health {
          color: #f4c177;
        }
      }
      .scorewarp {
        width: 100%;
        height: 35%;
        // z-index: 2;
        position: absolute;
        bottom: 0;
        .score {
          background: url('../../assets/scope.png') no-repeat;
          background-size: 100%;
          position: absolute;
          bottom: 2%;
          left: 4%;
          height: 8rem;
          width: 7rem;
          // z-index: 3;
          border-radius: 50%;
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          .content {
            font-size: 1.5rem;
            color: rgb(65, 164, 138);
            display: contents;
            span {
              font-size: 1.3rem;
            }
          }
        }
        .detehistory {
          position: absolute;
          bottom: 8%;
          right: 8%;
          height: 5rem;
          width: 5rem;
          // z-index: 3;
          border: 1px solid rgb(55, 107, 152);
          border-radius: 50%;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 1.25rem;
          color: rgb(55, 107, 152)
        }
      }
    }
    .resultWarp {
      flex: 1.5;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      background: rgb(235, 235, 235);
      padding-bottom: 50px;
      .mint-tab-container-item {
        background: white;
      }
      p {
        margin: 0;
      }
      .resultText {
        text-indent: 2em;
        padding: 6% 2% 6% 2%;
        text-indent: 2rem;
        font-size: 1rem;
        text-align: left;
        word-break: break-all;
        white-space: pre-line;
      }
      .line {
        width: 100%;
        height: 120px !important;
        .echarts {
          width: 100%;
          height: 100%;
          div {
            width: 100% !important;
            canvas {
              width: 100% !important;
            }
          }
        }
      }
      /* covered mint */
      .mint-navbar .mint-tab-item {
        padding: 10px 0;
      }
      .mint-tab-container-wrap {
        margin-top: 2.75%;
        height: 100%;
        background: white;
        .mint-tab-container-item {
          display: flex;
          justify-content: center;
          .mint-button--large {
            width: 90%;
          }
        }
      }
    }
    .footer {
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: 0;
      .mint-button--primary {
        background: rgb(55, 107, 152);
        border-radius: 8px;
      }
      .resultBtn {
        width: 90%;
      }
    }
  }
}
</style>
