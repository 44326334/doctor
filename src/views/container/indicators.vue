<template>
  <div class="indiwarp">
    <HEADER></HEADER>
    <div class="con">
      <div class="canvas">
        <div class="warp">
          <div class="list" v-for="(item,index) in indicatorHealth" :key="index">
            <div class="title">{{item.label}}</div>
            <div class="content">
              <div
                class="indi"
                v-for="(i,j) in item.details"
                :key="j"
                :id="i.projectShortName"
                :style="{border:'1px solid '+type[index], background: i.abnormal?isAbnormal:type[index]}"
                @click.stop="indicatorsInfo(i)"
              >
                <div class="border" :style="{background:type[index]}">
                  <span>{{i.projectName}}</span>
                  <span>{{i.projectShortName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="popupVisible">
          <h3>{{projectItem && projectItem.projectName}}</h3>
          <div>
            <p>指标描述</p>
            <p class="grey">{{projectItem && projectItem.description}}</p>
            <p>参考结果：{{projectItem && projectItem.refer}}</p>
            <p>检测结果：{{projectItem && projectItem.projectValue}}{{projectItem && projectItem.projectUnit}}</p>
            <p>检测结论</p>
            <p class="blue">{{projectItem && projectItem.conclusion}}</p>
            <p v-show="projectItem && projectItem.abnormal">指标解读</p>
            <p class="grey">{{projectItem && projectItem.abnormalRefer}}</p>
          </div>
        </mt-popup>
      </div>
      <div class="result">
        <p>结果解读:</p>
        <small>{{indicatorMessage.summary}}</small>
        <mt-button type="primary" size="large" @click.native="toRobo">智能问诊</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from "@/components/header.vue";
import { mapState } from "vuex";
import { getHistoryDetialUsingPOST } from "@/../client/javascript/vue-api-client.js";

export default {
  name: "indicators",
  components: { HEADER },
  data() {
    return {
      projectItem: null,
      type: {
        0: "#72c1eb",
        1: "#71bcbf",
        2: "#6798ff",
        3: "#7ccea5",
        4: "#819bd7",
        5: "#9da3b3"
      },
      isAbnormal:
        "-webkit-linear-gradient(90deg, rgb(238, 194, 0), rgb(255, 252, 73))",
      popupVisible: false,
    };
  },
  computed: mapState({
    indicatorHealth: state => {
      return (
        state.indicatorHealth &&
        state.indicatorHealth.body &&
        state.indicatorHealth.body.items
      );
    },
    indicatorMessage: state => {
      return state.indicatorHealth;
    }
  }),
  methods: {
    toRobo() {
      this.$router.push({path:'/',query:{rid:this.indicatorMessage.resultId}})
    },
    indicatorsInfo(item) {
      this.popupVisible = true;
      this.projectItem = item;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.indiwarp {
  height: 100%;
  .con {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    .canvas {
      display: flex;
      flex: 3;
      padding-top: 40px;
      .warp {
        width: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
        .list {
          width: 16%;
          .title {
            padding: 1%;
            border-right: 2px solid rgb(163, 201, 183);
            font-size: 0.75rem;
            font-weight: bold;
            box-sizing: border-box;
            margin: 20% 0;
          }
          .content {
            padding: 0 4%;
            .indi {
              width: 100%;
              margin: 10% 0;
              height: 4rem;
              font-size: 0.75rem;
              display: flex;
              justify-content: center;
              align-items: center;
              // background: -webkit-linear-gradient(90deg, rgb(238, 194, 0), rgb(255, 252, 73));
              border-radius: 10px;
              border: 1px solid #fff;
              .border {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                width: 90%;
                height: 90%;
                background-color: #fff;
                border-radius: 8px;
              }
              .mint-popup-bottom {
                // height: 35%;
                // width: 100%;
              }
            }
          }
        }
        :last-child {
          .title {
            border-right: none;
          }
        }
      }
      .popupVisible {
        width: 100%;
        // display: flex;
        // flex: 1;
        flex-direction: column;
        max-height: 60%;
        overflow-y: scroll;
        h3 {
          padding: 0.5rem 0;
          border-bottom: 1px solid rgb(200, 200, 200);
        }
        div {
          // display: flex;
          // flex-direction: column;
          margin: 0.5rem 1rem;
          p {
            margin: 0.5rem 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-weight: bold;
            word-break: break-all;
            text-align: left;
          }
          .grey {
            text-indent: 2rem;
            color: #c5c5c5;
          }
          .blue {
            text-indent: 2rem;
            color: rgb(55, 107, 152);
          }
        }
      }
    }
    .result {
      padding: 5%;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      p {
        margin: 0;
      }
      small {
        text-indent: 2rem;
        text-align: left;
        margin-bottom: 10px;
      }
      /* covered mint */
      .mint-button--primary {
        background: rgb(55, 107, 152);
        border-radius: 8px;
      }
    }
  }
}
</style>
