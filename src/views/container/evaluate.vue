<template>
  <div class="evawarp">
    <HEADER></HEADER>
    <div class="con">
      <div class="head">
        <div class="photo">
          <img :src="detail.image" alt="" width="100%">
          <!-- <img src="../../assets/doctor.png" alt="" v-show="!detail.image"> -->
        </div>
        <div class="info">
          <div class="info-top">
            <div class="title">
              <div class="name">{{detail&&detail.name}}</div>
              <div class="small">
                <small>{{detail&&detail.clinicName}}</small>
                <small>{{detail&&detail.title}}</small>
              </div>
            </div>
            <div class="evaluate">
              <div class="scope">{{detail&&detail.goodRate}}</div>
              <div class="joins">{{detail&&detail.fansNum}}人参与</div>
            </div>
          </div>
          <div class="info-bottom">{{detail&&detail.goodAt === ''?'暂无简介':detail&&detail.goodAt}}</div>
        </div>
      </div>
      <div class="content">
        <div class="buts">
          <mt-button @click="targetSwitch('best')" :class="{btnActive: target === 'best'}">
            <img src="../../assets/degree-good.jpg" height="20" width="20" slot="icon">
            满意
          </mt-button>
          <mt-button @click="targetSwitch('good')" :class="{btnActive: target === 'good'}">
            <img src="../../assets/degree-general.jpg" height="20" width="20" slot="icon">
            一般
          </mt-button>
          <mt-button @click="targetSwitch('bad')" :class="{btnActive: target === 'bad'}">
            <img src="../../assets/degree-bad.jpg" height="20" width="20" slot="icon">
            不满意
          </mt-button>
        </div>
        <div class="selects">
          <div class="btn" v-for="select in degreeTarget.values" :key="select.id">
            <mt-button @click="selectResons(select)" :class="{selectsActive: select.flag}">
              {{select.content}}
            </mt-button>
          </div>
        </div>
        <div class="texts">
          <textarea name="" id="" cols="30" placeholder="请填写评语" v-model="appendContent"></textarea>
        </div>
      </div>
      <div class="evaSubmit">
        <mt-button type="primary" size="large" @click="sendAssess">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HEADER from '../../components/header';
import assess from '../../../static/assess.json';
import { assessProblemUsingPOST } from '@/../client/javascript/vue-api-client.js';

  export default {
    name: 'evaluate',
    components: { HEADER },
    // computed: mapState({
    //   details: state => state.linkDoctorView
    // }),
    data () {
      return {
        detail: this.$store.state.linkDoctorView,
        target: 'best',
        reason: '',
        // reasonId: '',
        selectIds: [],
        selectedResons: {
          best: [],
          good: [],
          bad: []
        },
        reasonGoodSlots: {
          flex: 1,
          values: [
            {"id": "3101", "flag":false, "content": "态度非常好"},
            {"id": "3102", "flag":false, "content": "非常清楚"},
            {"id": "3201", "flag":false, "content": "回复很及时"},
            {"id": "3301", "flag":false, "content": "非常专业认真"},
            {"id": "3302", "flag":false, "content": "意见很有帮助"},
            {"id": "3303", "flag":false, "content": "非常敬业"}
          ],
          className: 'reasonGoodSlots',
        },
        reasonGeneralSlots: {
          flex: 1,
          values: [
            {"id": "2101", "flag":false, "content": "希望更热情"},
            {"id": "2102", "flag":false, "content": "希望更细致"},
            {"id": "2201", "flag":false, "content": "希望回复更快"},
            {"id": "2301", "flag":false, "content": "希望讲得更透彻"}
          ],
          className: 'reasonGeneralSlots',
        },
        reasonBadSlots: {
          flex: 1,
          values: [
            {"id": "1101", "flag":false, "content": "不友好"},
            {"id": "1102", "flag":false, "content": "不细致"},
            {"id": "1201", "flag":false, "content": "等好久没回复"},
            {"id": "1301", "flag":false, "content": "完全听不懂"},
            {"id": "1302", "flag":false, "content": "感觉不专业"},
            {"id": "1303", "flag":false, "content": "没有帮助"}
          ],
          className: 'reasonBadSlots',
        },
        appendContent: '',
      }
    },
    computed: {
      degreeTarget() {
        switch (this.target) {
          case 'best':
            return this.reasonGoodSlots
          case 'good':
            return this.reasonGeneralSlots
          case 'bad':
            return this.reasonBadSlots
          default:
            break;
        }
      }
    },
    methods: {
      targetSwitch(degree) {
        this.target = degree
      },
      selectResons(select) {
        if(!select.flag){
          select.flag = true
          this.selectedResons[this.target].push(select.id)
        } else {
          select.flag = false
          let i = this.selectedResons[this.target].indexOf(select.id)
          this.selectedResons[this.target].splice(i,1)
        }
      },
      //评价对象转拼接字符
      objectToString(keys) {
        let o = {}
        o.level = this.target
        o.tag_keys = keys
        // return JSON.stringify(o).replace(/\"/g, '\\"')
        return JSON.stringify(o)
      },
      /* 提交评价请求 */
      sendAssess() {
        let assess = this.objectToString(this.selectedResons[this.target]);
        if(this.appendContent) {
          assessProblemUsingPOST({
            param: {
              accountId: this.$store.state.account.id,
              assessInfo: assess,
              content: this.appendContent,
              questionId: this.$store.state.createProblem.id,
              // testUserId: this.$store.state.account.id
            }
          }).then(response => {
            if (response.data.code === 0) {
              this.$router.push('/askhistory')
            }else{
              this.$toast(response.data.message)
            }
          });
        } else {
          this.$toast('请填写评语')
        }
      }
    },
    mounted() {
      // this.reason = "请选择评价原因"
    },
  }
</script>

<style lang="less">
.evawarp {
  height: 100%;
  display: flex;
  .con {
    padding: 3%;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    .head {
      display: flex;
      flex: 1;
      padding-bottom: 1rem;
      // border-bottom: 1px solid rgb(240, 240, 240);
      .photo {
        flex: 1.2;
        display: flex;
        border: 1px solid rgb(240, 240, 240);
        justify-content: center;
        align-items: center;
      }
      .info {
        flex: 2;
        display: flex;
        flex-direction: column;
        .info-top {
          flex: 1;
          display: flex;
          .title {
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            padding: 0.5rem 0;
            padding-left: 5%;
            .name {
              font-size: 1.1rem;
              margin-bottom: 0.3rem;
            }
            .small {
              font-size: 0.95rem;
              color: rgb(61, 132, 194);
            }
          }
          .evaluate {
            flex: 1.2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0.5rem 0;
            font-size: 0.75rem;
            .scope {
              color: rgb(244, 200, 138)
            }
            .joins {
              color: rgb(200, 200, 200)
            }
          }
        }
        .info-bottom {
          flex: 1.6;
          display: flex;
          justify-content: flex-start;
          color: rgb(200, 200, 200);
          font-size: 0.75rem;
          padding: 0 5%;
          text-align: left;
        }
      }
    }
    .content {
      display: flex;
      flex: 2;
      flex-direction: column;
      padding: 0.2rem 0.5rem 0 0.5rem;
      color: rgb(150, 150, 150);
      text-align: justify;
      font-size: 0.9rem;
      line-height: 1.4rem;
      .buts {
        width: 100%;
        min-height: 2rem;
        display: flex;
        justify-content: space-around;
        color: white;
        .mint-button--default {
          color: rgb(200, 200, 200);
          background: white;
          border-radius: 30px;
          font-size: 0.85rem;
          min-width: 30%;
          max-height: 2rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .mint-button-icon {
            height: 20px;
          }
        }
        .btnActive {
          background: rgb(55, 107, 152);
          color: white !important;
        }
      }
      .selects {
        margin: 0.5rem 0;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: flex-start;
        .btn {
          width: 29%;
          margin: 2%;
          display: flex;
        }
        .selectsActive {
          background: rgb(228, 242, 255) !important;
          color: rgb(55, 107, 152) !important;
          border:1px solid rgb(55, 107, 152) !important;
        }
        .mint-button--default {
          font-size: 0.75rem;
          width: 100%;
          height: 2rem;
          padding: 0;
          border:1px solid rgb(230, 230, 230);
          background: white;
          color: rgb(165, 165, 165);
        }
      }
      .texts {
        flex: 0.6;
        textarea {
          border: 1px solid rgb(240, 240, 240);
          width: 94%;
          height: 80%;
          color:rgb(190, 190, 190);
          font-size: 1.25rem;
          padding: 3%;
          resize: none;
          &::-webkit-input-placeholder{
            color:rgb(190, 190, 190);
            font-size: 1rem;
          }
        }
      }
    }
    .evaSubmit {
      // padding: 1rem 0 3rem 0;
      .mint-button--primary {
        background: rgb(55, 107, 152);
        border-radius: 8px;
      }
    }
  }
}
</style>
