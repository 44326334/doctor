<template>
  <div class="warp">
    <HEADER></HEADER>
    <div class="con">
      <div class="canvas">
        <!-- <div>
          <span class="state">{{this.$store.state.login.state?'已登陆':'未登陆'}}</span>
          <span @click="login" v-show="!this.$store.state.login.state">点击登陆</span>
        </div> -->
        <div class="robotimg">
          <img src="../../assets/robot.png" alt="" height="100%">
        </div>
        <div class="question">
          <div class="box">
            <p class="info">您好，我是问诊小精灵，请问有什么可以帮助您？点击下面标签可以快速咨询。</p>
            <div class="board">
              <template v-for="(ques,index) in questions">
                <div :key="index" @click="creatAsk(ques.name)">{{ques.name}}</div>
              </template>
            </div>
          </div>
        </div>
        <div class="small" @click="toHistory">查看咨询历史记录？</div>
        <!-- <ul>
          <template v-for="(item,index) in records">
            <li :key="index" class="chat-mine" v-if="item.type==1">
              <div class="chat-user"><img src="../../assets/user.png"></div>
              <div class="time"><cite><i>{{item.time}}</i>{{item.name}}</cite></div>
              <div class="chat-text">{{item.content}}</div>
            </li>
          </template>
        </ul> -->
      </div>
      <div class="result" v-show="isRid">
        <mt-button type="primary" size="large" @click.native="toChat">医生问诊</mt-button>
        <p>什么是医生问诊？</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  loginUsingGET,
  getQueryQuestionIdUsingGET,
  getProblemDetailUsingPOST
} from '@/../client/javascript/vue-api-client.js'
import HEADER from '@/components/header.vue'
import { mapState } from  'vuex'
import util from '../../common/util'
  export default {
    name: 'robot',
    components: {HEADER},
    data() {
      return {
        userid: 2,
        records: [],
        questions: [
          {
            name: '糖尿病'
          },
          {
            name: '高血压'
          },
          {
            name: '尿毒症'
          },
          {
            name: '低血糖'
          },
          {
            name: '尿液黄'
          },
          // {
          //   name: '更多'
          // }
        ],
        createAsk: '',
        isRid: false,
        url: '',
        toQID: null
      }
    },
    computed: mapState({
      openId: state => {
        return state.oath2.openId
      }
    }),
    methods: {
      toChat () {
        if(this.$store.state.isQuestioned){
          this.$router.push(this.url)
        }else {
          this.$router.push({
            name: 'chat',
            params: {
              from : 'create',
              create: this.createAsk
            }
          });
        }
      },
      // login () {
      //   let that = this
      //   loginUsingGET ({
      //     id: this.userid
      //   }).then(response => {
      //     if(response.data.code === 0){
      //       that.$store.commit('setLoginState', true)
      //       this.$toast('登陆成功')
      //     }
      //   })
      // },
      creatAsk (ques) {
        this.createAsk = ques
        if(ques === '更多') {
          // this.$router.push('classes')
        } else {
          this.$router.push({
            name: 'robotchat',
            params: {
              from : 'create',
              create: this.createAsk
            }
          });
          this.$store.commit('pushRobotMsg', {
            person: 'p',
            gmtCreate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            contentId: '',
            content: this.createAsk,
            type: 'text'
          })
        }
      },
      toHistory() {
        this.$router.push('/askhistory');
      },
      //滚动条滚动到底部
      scrollToBottom:function(){
        setTimeout(function(){
            var chatlist = document.getElementsByClassName('canvas')[0];
            chatlist.scrollTop=chatlist.scrollHeight;
        },100);
      },
      //替换表情代码
      // replaceFace:function(con){
      //   var _this=this;
      //   var exps=this.EXPS;
      //   for(var i=0;i<exps.length;i++){
      //       //con = con.replace(new RegExp(exps[i].code,'g'), '<img src="static/emotion/' + exps[i].file +'"  alt="" />');
      //       con = con.replace(exps[i].reg, '<img src="static/emotion/' + exps[i].file +'"  alt="" />');
      //   }
      //   return con;
      // }
      /* url参数获取提问记录详情 */
      loadProblemList(id) {
        getProblemDetailUsingPOST({
          param: {
            accountId: 0,
            lastContentId: 0,
            questionId: id,
          }
        }).then(response => {
          if (response.data.code === 0) {
            this.$store.commit('setLinkDoctorView', response.data.body.doctorInfo);
            this.$store.commit('setDoctorHistory', response.data.body.metaItemDetailResultList);
            this.$store.commit('setDoctorQuestion', response.data.body.question);
            this.$store.commit('setAskProblemStatus', response.data.body.question.status)
            this.$store.commit('setAssessed', response.data.body.question.assessed)
          }else{
            this.$toast('加载历史记录失败!')
          }
        });
      },
      /* 结果ID查询是否已提问 */
      isQuestioned(id) {
        getQueryQuestionIdUsingGET({
          id: id
        }).then(response => {
          if (response.data.code === 0) {
            if (response.data.body === 0) {
              this.$store.commit('setAskModal', false)
              this.$store.commit('setIsQuestioned', false);
            }else{
              /* 显示问诊 */
              this.isRid = true
              this.$store.commit('setAskModal', true)
              this.$store.commit('setIsQuestioned', true);
              this.toQID = response.data.body
              this.url = this.$router.currentRoute.path + 'chat/?qid=' + this.toQID
            }
          }else{
            this.$toast(response.data.message)
          }
        });
      }
    },
    mounted() {
      let rid = this.$route.query.rid
      const reg = /^\d+$/;
      if (reg.test(rid)) {
        /* 显示问诊 */
        this.isRid = true
        this.$store.commit('setDeteResultId', rid)
        this.isQuestioned(this.$store.state.deteResultId)
      }
    }
  }
</script>

<style lang="less" scoped>
.warp{
  height: 100%;
  .con {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    .canvas {
      display: flex;
      flex: 5;
      flex-direction: column;
      padding-top: 40px;
      .robotimg {
        margin-bottom: 2%;
      }
      .question {
        margin: 0 5%;
        border-radius: 8px;
        background: rgb(243, 243, 243);
        .box {
          margin: 0 5%;
          .info {
            border-bottom: 2px solid rgb(227, 227, 227);
            padding-bottom: 0.5rem;
            text-align: left;
            margin: 0.5rem 0;
            font-size: 0.8rem;
          }
          .board {
            display: flex;
            flex: 1;
            width: 100%;
            flex-wrap: wrap;
            margin-bottom: 0.5rem;
            div {
              display: flex;
              width: 27%;
              height: 30px;
              flex-wrap: wrap;
              background: white;
              border-radius: 8px;
              justify-content: center;
              align-items: center;
              margin: 2% 3%;
              font-size: 0.85rem;
            }
          }
        }
      }
      ul {
        // min-height: 10%;
        list-style-type: none;
        margin: 5% 5% 0 5%;
        .chat-mine {
          position: relative;
          margin-bottom: 10px;
          text-align: right;
          padding-left: 0;
          padding: 0 60px;
          .chat-user {
            left: auto;
            right: 3px;
            position: absolute;
            left: 3px;
            img {
              width: 40px;
              height: 40px;
              border-radius: 100%;
            }
          }
          .time {
            width: 100%;
            cite {
              left: auto;
              right: 60px;
              text-align: right;
              font-style: normal;
              line-height: 24px;
              font-size: 12px;
              white-space: nowrap;
              color: #999;
              text-align: left;
            }
            cite i {
              font-style: normal;
              padding-left: 5px;
              padding-right: 5px;
              font-size: 12px;
            }
          }
          .chat-text {
            margin-left: 0;
            text-align: left;
            background-color: rgb(55, 107, 152);
            color: #fff;
            position: relative;
            line-height: 22px;
            padding: 10px 15px;
            border-radius: 8px;
            word-break: break-all;
            max-width: 462px\9;
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            &::after {
              content: '';
              position: absolute;
              left: -10px;
              top: 15px;
              width: 0;
              height: 0;
              border-style: solid dashed dashed;
              border-color: #eee transparent transparent;
              overflow: hidden;
              border-width: 10px;
              left: auto;
              right: -10px;
              border-top-color: rgb(55, 107, 152);
            }
          }
        }
      }
      .small {
        margin: 0.5rem 5% 0 5%;
        font-size: 0.85rem;
        color: rgb(55, 107, 152);
        text-align: right;
      }
    }
    .result {
      padding: 5%;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-top: 2px rgb(240, 240, 240) solid;
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
      p {
        margin: 0;
        color: rgb(55, 107, 152);
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
