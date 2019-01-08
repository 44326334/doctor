<template>
  <div class="ovulation">
    <!-- <HEADER></HEADER> -->
    <div class="con">
      <div class="line" :style="{height: lineHeight + 'px'}">
        <v-chart :options="line" :auto-resize="true" ref="scopeline"/>
      </div>
    </div>
    <div class="summary">
      <div>检测结论：{{indexMessage&&indexMessage.summary}}</div>
    </div>
    <div class="tip">
      <div>温馨提示：{{indexMessage&&indexMessage.resultMessage}}</div>
    </div>
    <div class="btns">
      <mt-button size="large" class="btn shapeBtn" @click="toShare">分享我的检测</mt-button>
    </div>
    <div class="mask" v-show="isShare" @click="isShare=false">
      <img src="../../assets/arrow.png" alt width="100%">
    </div>
  </div>
</template>

<script>
import HEADER from "@/components/header.vue";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/line";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markArea";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";
import { mapState } from "vuex";
import util from "../../common/util";
export default {
  name: "ovulation",
  components: {
    HEADER,
    "v-chart": ECharts
  },
  data() {
    return {
      result: "",
      isSummary: false,
      isShare: false,
      lineHeight: 400,
      line: {}
    };
  },
  computed: mapState({
    indexHealth: state => {
      return (
        state.indexHealth &&
        state.indexHealth.data &&
        state.indexHealth.data.body &&
        state.indexHealth.data.body.items
      );
    },
    indexData: state => {
      return (
        state.indexHealth &&
        state.indexHealth.data &&
        state.indexHealth.data.body
      );
    },
    indexMessage: state => {
      return state.indexHealth && state.indexHealth.data;
    }
  }),
  methods: {
    toShare() {
      this.isShare = true;
    },
    deteHistory() {
      /* 绘制折线图 */
      let xValue = []
      let yValue = []
      let startDate = util.formatDate.formatNormal(new Date(this.indexData.startDate), 'MM月dd日hh:mm:ss')
      let endDate = util.formatDate.formatNormal(new Date(this.indexData.endDate), 'MM月dd日hh:mm:ss')
      for(let i in this.indexHealth) {
        let time = util.formatDate.formatNormal(new Date(this.indexHealth[i].createDate), 'MM月dd日hh:mm:ss')
        xValue.push(time)
        yValue.push(this.indexHealth[i].projectValue)
      }
      this.line = {
        title: {
          text: "排卵检测"
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ["促黄体生成激素"]
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            start: 0,
            end: 4,
            // zoomLock: true
          },
          {
            start: 50, //默认为0
            end: 100,
            type: "slider",
            show: true,
            xAxisIndex: [0],
            zoomOnMouseWheel: true,
            handleSize: 0, //滑动条的 左右2个滑动条的大小
            height: 10, //组件高度
            left: 50, //左边的距离
            right: 40, //右边的距离
            bottom: 26, //右边的距离
            handleColor: "#ddd", //h滑动图标的颜色
            handleStyle: {
              borderColor: "#cacaca",
              borderWidth: "1",
              shadowBlur: 2,
              background: "#ddd",
              shadowColor: "#ddd"
            },
            fillerColor: new ECharts.graphic.LinearGradient(1, 0, 0, 0, [{
                //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
                //给第一个设置0，第四个设置1，就是垂直渐变
                offset: 0,
                color: '#1eb5e5'
            }, {
                offset: 1,
                color: '#5ccbb1'
            }]),
            backgroundColor: "#ddd", //两边未选中的滑动条区域的颜色
            showDataShadow: false, //是否显示数据阴影 默认auto
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
            handleIcon:
              "M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z",
            filterMode: "filter"
          }
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: xValue,
          data: ['1','2','3'],
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fffff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#4fa8e6"
            }
          }
          // show: false
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: {
              show: true,
              textStyle: {
                color: "#ffffff"
              }
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff"
            }
          },
          max: 70
          // show: false
        },
        series: [
          {
            name: "促黄体生成激素",
            // data: yValue,
            data: [1, 2, 3],
            type: "line",
            smooth: true,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            },
            markArea: {
              data: [
                [
                  {
                    name: '排卵日期' + startDate + '至' + endDate,
                    xAxis: startDate
                  },
                  {
                    xAxis: endDate
                  }
                ]
              ],
              itemStyle: {
                color: 'rgba(255, 0, 0, 0.5)'
              },
              label: {
                color: 'rgba(255, 0, 0, 0.5)'
              }
            },
            color: ['green']
          }
        ]
      }
      this.$refs.scopeline.mergeOptions(this.line);
    }
  },
  mounted() {

  },
  created() {
    if(this.indexHealth) {
      this.deteHistory()
    } else {
      this.$toast('请重新检测')
    }
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.ovulation {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .con {
    width: 100%;
    height: 420px;
    // background: url('../../assets/bg.png') no-repeat;
    // background-size: 100% 100%;
    background-color: #8ec7ef;
    position: relative;
    padding-top: 20px;
    .line {
      // margin-top: 40px;
      width: 100%;
      // height: 120px !important;
      .echarts {
        width: 100%;
        // height: 100%;
        div {
          width: 100% !important;
          canvas {
            width: 100% !important;
          }
        }
      }
    }
  }
  .summary {
    width: 100%;
    height: 80px;
    background-color: #4a8bc2;
    // margin-top: 1rem;
    color: #fef7e9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    div {
      margin-top: 0.75rem;
      text-align: left;
      padding: 0 2%;
    }
  }
  .tip {
    width: 100%;
    height: 100px;
    background-color: #dff0d8;
    // margin-top: 1rem;
    color: green;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    div {
      margin-top: 0.75rem;
      text-align: left;
      padding: 0 2%;
    }
  }
  .btns {
    margin-top: 0.75rem;
    .mint-button--default {
      background-color: #0862a7;
      color: #fef7e9;
    }
  }
  .mask {
    z-index: 99;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
    img {
      margin-top: 20%;
    }
  }
}
</style>
