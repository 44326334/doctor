<template>
  <div class="warp">
    <HEADER></HEADER>
    <div class="con">
      <div class="bar">
        <v-chart :options="bar" :auto-resize="true" ref="scopeline"/>
      </div>
      <div class="sign">
          <div class="box">
            <div class="prog"></div>
            <div class="info">
              <div class="bad">异常</div>
              <div class="good">良好</div>
            </div>
          </div>
      </div>
    </div>
    <div class="result">
      <ul>
        <li v-for="(item,index) in reportItem" :key="index">
          <div class="name">{{item.projectName}}</div>
          <div>{{item.projectSymbol?item.projectSymbol:'&nbsp;'}}</div>
          <div>{{item.projectValue+item.projectUnit}}</div>
        </li>
      </ul>
      <div class="footer">
        <p>{{reportResult&&reportResult.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from "@/components/header.vue";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
// import "echarts/lib/component/markPoint";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import { mapState } from 'vuex'
// import { getHistoryDetialUsingPOST } from "@/../client/javascript/vue-api-client.js";
const project = ["胆红素","尿胆原","白细胞","葡萄糖","亚硝酸盐","潜血","蛋白质","酮体","参考值"]
const scales = ["阴性", "中性", "弱阳性", "阳性", "强阳性"]
const point = 50
const barMatrix = new Array(scales.length)

export default {
  name: "repo",
  components: { HEADER, "v-chart": ECharts },
  data() {
    return {
      bar: {}
    };
  },
  computed: mapState({
    reportItem: state => {
      return state.reportHealth && state.reportHealth.data &&state.reportHealth.data.body&&state.reportHealth.data.body.items
    },
    reportResult: state => {
      return state.reportHealth && state.reportHealth.data &&state.reportHealth.data.body
    },
    reportMessage: state => {
      return state.reportHealth && state.reportHealth.data
    }
  }),
  methods: {
    initBar() {
      /* 根据项目和档位生成图表二维数组 */
      for (let i in scales) {
        if(i == 0) {
          barMatrix[i] = new Array(-50, -50, -50, -50, -50, -50, -50, -50, -50)
        } else {
          barMatrix[i] = new Array(0, 0, 0, 0, 0, 0, 0, 0, 50)
        }
      }
    },
    drawBar() {
      /* 图表绘制 */
      // let result = [{name: "葡萄糖", value: 4},{name: "蛋白质", value: 3}]
      for (let item in this.reportItem) {
        let index = project.indexOf(this.reportItem[item].projectName)
        if(index >= 0) {
          /* 1开始, 阴性数值不变 */
          for (let i = 1; i < this.reportItem[item].projectLevelValue+1; i++) {
            for (let j = 0; j < project.length; j++)
              barMatrix[i][index] = point
          }
        }
      }
      this.bar = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        enterable: true,
        formatter: function(params, ticket, callback) {
          let res = "中性";
          let resval = 0;
          let link = "";
          for (var i in params) {
            resval += params[i]["value"];
          }
          switch (resval) {
            case -50:
              res = "阴性";
              break;
            case 0:
              res = "中性";
              break;
            case 50:
              res = "弱阳性";
              break;
            case 100:
              res = "阳性";
              break;
            case 150:
              res = "强阳性";
              break;
            default:
              res = "中性";
          }
          return "<span>" + params[i]["name"] + ":" + res + "</span><br>";
        },
        legend: {
          show: false,
          selectedMode: false,
          data: ["阴性", "中性", "弱阳性", "阳性", "强阳性"]
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "0",
          top: "0",
          containLabel: true
        },
        xAxis: {
          type: "value",
          show: false
        },
        yAxis: {
          type: "category",
          axisLine: { show: false },
          axisTick: { show: false },
          data: [
            "胆红素",
            "尿胆原",
            "白细胞",
            "葡萄糖",
            "亚硝酸盐",
            "潜血",
            "蛋白质",
            "酮体",
            "参考值"
          ],
          axisLabel: {
            fontWeight: 'bold'
          },
        },
        series: [
          {
            name: "中性",
            type: "bar",
            stack: "阳性",
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#5e7d91"
                  },
                  {
                    offset: 1,
                    color: "#838e8b"
                  }
                ]),
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              barWidth: 6
            },
            data: barMatrix[1]
          },
          {
            name: "弱阳性",
            type: "bar",
            stack: "阳性",
            label: {
              normal: {
                show: false
              }
            },
            barWidth: 25,
            itemStyle: {
              normal: {
                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#838e8b"
                  },
                  {
                    offset: 1,
                    color: "#aba084"
                  }
                ]),
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data: barMatrix[2]
          },
          {
            name: "阳性",
            type: "bar",
            stack: "阳性",
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#aba084"
                  },
                  {
                    offset: 1,
                    color: "#d9b57c"
                  }
                ]),
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data: barMatrix[3]
          },
          {
            name: "强阳性",
            type: "bar",
            stack: "阳性",
            label: {
              normal: {
                show: false,
                position: "right"
              }
            },
            itemStyle: {
              normal: {
                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#d9b57c"
                  },
                  {
                    offset: 1,
                    color: "#f2c078"
                  }
                ]),
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data: barMatrix[4]
          },
          {
            name: "阴性",
            type: "bar",
            stack: "阳性",
            label: {
              normal: {
                show: false,
                position: "left"
              }
            },
            itemStyle: {
              normal: {
                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#3a6c98"
                  },
                  {
                    offset: 1,
                    color: "#577993"
                  }
                ]),
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data: barMatrix[0]
          }
        ]
      };
    },
  },
  mounted() {
    if (this.reportItem) {
      this.initBar()
      this.drawBar()
    } else {
      this.$toast("请重新检测");
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  height: 100%;
  overflow-y: scroll;
  // display: flex;
  // flex: 1;
  // flex-direction: column;
  justify-content: space-around;
  .con {
    // height: 100%;
    display: flex;
    flex: 1;
    // flex-direction: column;
    justify-content: space-between;
    margin-top: 40px;
    border-bottom: 2px rgb(240, 240, 240) solid;
    position: relative;
    .bar {
      // display: flex;
      flex: 1;
      // padding: 4% 0;
      width: 100%;
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
    .sign {
      display: flex;
      width: 40px;
      justify-content: center;
      align-items: center;
      margin-right: 0;
      .box {
        width: 100%;
        height: 60%;
        min-height: 200px;
        display: flex;
        flex: 1;
        .prog {
          display: flex;
          flex: 1;
          background: -webkit-linear-gradient(
            #f4c177,
            #376b98
          ); /* Safari 5.1-6.0 */
          background: -o-linear-gradient(
            #f4c177,
            #376b98
          ); /* Opera 11.1-12.0 */
          background: -moz-linear-gradient(
            #f4c177,
            #376b98
          ); /* Firefox 3.6-15 */
          background: linear-gradient(#f4c177, #376b98); /* 标准语法 */
        }
        .info {
          display: flex;
          flex: 3;
          font-size: 0.5rem;
          flex-direction: column;
          .good {
            color: #376b98;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: flex-end;
          }
          .bad {
            color: #f4c177;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: flex-start;
          }
        }
      }
    }
  }
  .result {
    padding: 2%;
    // display: flex;
    // flex: 1;
    // flex-direction: column;
    // justify-content: space-around;
    // align-items: center;
    ul {
      list-style: none;
      display: flex;
      flex: 1;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      align-content: flex-start;
      padding: 0;
      margin: 0;
      width: 100%;
      // overflow-y: scroll;
      li {
        width: 25%;
        height: 50px;
        // margin: 5px;
        display: flex;
        flex-direction: column;
        color: rgb(133, 133, 133);
        font-size: 0.75rem;
        .name {
          color: black;
          font-size: 0.85rem;
          font-weight: bold;
        }
      }
    }
    .footer {
      margin-top: 1rem;
      p {
        margin: 0;
        font-size: 0.7rem;
        color: rgb(57, 108, 152);
        word-break: break-all;
        white-space: pre-line;
      }
    }
  }
}
</style>

