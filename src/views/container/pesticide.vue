<template>
  <div class="pesticide">
    <!-- <HEADER></HEADER> -->
    <div class="con">
      <div class="title">农药残留检测</div>
      <v-stage ref="stage" :config="stageSize" class="canvas">
        <v-layer>
          <v-shape :config="scaleCircle" :preventDefault="false"/>
          <v-shape :config="valueCircle" :preventDefault="false"/>
          <v-shape :config="redCircle" :preventDefault="false"/>
          <v-rect :config="scale" :preventDefault="false"/>
          <v-image :config="{
            image: image,
            x: imageX,
            y: imageY,
            width: imageW,
            height: imageH
          }" :preventDefault="false"/>
        </v-layer>
      </v-stage>
      <div class="res">
        <div class="deteresult">
          {{result}}
        </div>
        <template v-for="(item,index) in indexHealth">
        <div class="tips" :key="index">
          <span>{{item.projectName}}{{item.projectLevelValue}}{{item.projectUnit}}</span>
          <a href="https://baike.baidu.com/item/农药残留" target="_blank">(点击查询专业知识)</a>
        </div>
        </template>
      </div>
    </div>
    <div class="summary">
    <template v-for="(item,index) in indexHealth">
      <div :key="index">检测结论：{{item.projectName}}{{item.projectLevelValue}}{{item.projectUnit}}</div>
    </template>
      <p>温馨提示：{{indexMessage&&indexMessage.summary}}</p>
    </div>
    <div class="btns">
      <mt-button size="large" class="btn shapeBtn" @click="toShare">分享我的检测</mt-button>
    </div>
    <div class="mask" v-show="isShare" @click="isShare=false">
      <img src="../../assets/arrow.png" alt="" width="100%">
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue'
import { mapState } from 'vuex'
const width = window.innerWidth;
const height = window.innerHeight;
const scaleValue = ["0", "0.02", "0.05", "0.1", "0.2", "1", "2"]
const Angle = ["2.46", "3.18", "3.96", "4.7", "5.44", "6.18", "0.68"]
const per_scale = 4.5/10000
const originW = 111
const originH = 235
let redValue = 2.46
  export default {
    name: 'pesticide',
    components: {HEADER},
    data() {
      return {
        stageSize: {
          width: width,
          height: 400
        },
        image: null,
        imageX: width/2-originW*0.8/2,
        imageY: 200-originH*0.5/2,
        imageW: originW*0.8,
        imageH: originH*0.5,
        result: '',
        isSummary: false,
        isShare: false,
        scaleCircle: {
          sceneFunc: function(context, shape) {
            context.beginPath();
            context.arc(width/2, 200, 120, 2.45, 0.68, false);
            context.moveTo(65, 65);
            context.closePath();
            context.fillStrokeShape(shape);
          },
          stroke: '#7fb2df',
          strokeWidth: 2
        },
        valueCircle: {
          sceneFunc: function(context, shape) {
            context.beginPath();
            context.arc(width/2, 200, 100, 2.45, 0.68, false);
            context.moveTo(65, 65);
            context.closePath();
            context.fillStrokeShape(shape);
          },
          stroke: '#5ea2df',
          strokeWidth: 15
        },
        redCircle: {
          sceneFunc: function(context, shape) {
            context.beginPath();
            context.arc(width/2, 200, 100, 2.45, redValue, false);
            context.moveTo(65, 65);
            context.closePath();
            context.fillStrokeShape(shape);
          },
          stroke: 'red',
          strokeWidth: 15
        },
        scale: {
          sceneFunc: function(context, shape) {
            let scaleLineRadius = 100 + 7
            let scaleValueRadius = 135;
            for (let x = 0; x < 7; x++) {
              /* 灰色刻度线 */
              context.save();
              let deg = Math.PI / 180 * ((-40) + ((180 - 2 * (-40)) / 6) * x)  // 角度换算弧度
              let offsetY = -(Math.sin(deg) * scaleLineRadius)  // 计算刻度Y轴位置
              let offsetX = -(Math.cos(deg) * scaleLineRadius)  // 计算刻度X轴位置
              context.translate(width/2 + offsetX, 200 + offsetY); // 修改画布坐标原点
              context.rotate(deg); // 旋转刻度
              context.fillStyle = '#7fb2df';
              context.fillRect(0, 0, 20, 2); // 画出刻度
              context.restore();
              /* 刻度值 */
              context.font = "12px Arial";
              context.fillStyle = '#7fb2df';
              context.textBaseline = 'middle';
              let offY = -(Math.sin(deg) * scaleValueRadius); // 计算刻度Y轴位置
              let offX = -(Math.cos(deg) * scaleValueRadius); // 计算刻度X轴位置
              context.fillText(scaleValue[x], width/2 + offX - 10, 200 + offY);
            }
          }
        }
      }
    },
    computed: mapState({
      indexHealth: state => {
        return state.indexHealth && state.indexHealth.data && state.indexHealth.data.body &&state.indexHealth.data.body.items
      },
      indexMessage: state => {
        return state.indexHealth && state.indexHealth.data
      }
    }),
    methods: {
      textResult(scaleValueIndex) {
        const texts = [
          "未检测到农药残留！",
          "含有微量农药残留物",
          "含有少量农药残留物",
          "含有农药残留物",
          "含有较多农药残留物",
          "含有大量农药残留物",
          "含有大量农药残留物"
        ]
        return texts[scaleValueIndex]
      },
      toShare() {
        this.isShare = true
      },
    },
    created() {
      const image = new window.Image();
      image.src = require('../../assets/apple.png');
      image.onload = () => {
        // set image only when it is loaded
        this.image = image;
      };
      let items = this.indexHealth
      if(items) {
        this.isSummary = true
        let index
        for(let i = 0; i<items.length; i++) {
          index = scaleValue.indexOf(items[i].projectValue)
        }
        if(index>=0){
          this.result = this.textResult(index)
          redValue = Angle[index]
        }
      }
    },
    mounted() {},
  }
</script>

<style lang="less">
.pesticide {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .con {
    width: 100%;
    height: 400px;
    background: url('../../assets/bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .title {
      position: absolute;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align:center;
      color: #fef7e9;
      font-size: 20px;
      &::after, &::before {
        position: absolute;
        width: 25%;
        height: 1px;
        background: white;
        content: '';
        top: 25px;
      }
      &::after {
        left: 0;
      }
      &::before {
        right: 0;
      }
    }
    .res {
      position: absolute;
      bottom: 6%;
      width: 100%;
      .deteresult {
        color:#fef7e9;
        font-size: 20px;
        margin-bottom: 16px;
      }
      .tips {
        color:#fef7e9;
        font-size: 0.8em;
        a {
          color:#fef7e9;
        }
      }
    }
  }
  .summary {
    width: 100%;
    height: 120px;
    background-color: #4a8bc2;
    margin-top: 1rem;
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
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      text-indent: 2em;
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
  .mask{
    z-index: 99;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0,0,0,0.8);
    img {
      margin-top: 20%;
    }
  }
}
</style>
