<template>
<div class="charconwarp">
  <section class="chatlist" :class="showSelBox>0?'chatlist-bottom-collapse':'chatlist-bottom'">
    <mt-loadmore :top-method="loadTop" top-pull-text="加载更多" top-drop-text="释放加载" @top-status-change="handleTopChange" ref="loadmore">
      <ul :style="{minHeight: ulHeight + 'px'}">
        <template v-for="(item) in doctorHistory">
          <li class="chat-mine" v-if="item.person==='p'">
              <div class="chat-user"><img src="../assets/user.png"></div>
              <div class="time"><cite><i>{{formatDate(item.gmtCreate)}}</i></cite></div>
              <div class="chat-text">{{item.content}}</div>
          </li>
          <li v-if="item.person==='d'">
              <div class="chat-user"><img :src="detail===null?defaultImage:detail.image"></div>
              <div class="time"><cite>{{detail&&detail.name}}<i>{{formatDate(item.gmtCreate)}}</i></cite></div>
              <div class="chat-text" v-if="item.type==='text'">{{item.content}}</div>
              <div class="chat-text" v-else-if="item.type==='image'">
                <img :src="item.content" alt="">
              </div>
              <div class="chat-text" v-else-if="item.type==='audio'">
                <audio controls="controls" preload="auto" :src="item.content"></audio>
              </div>
          </li>
        </template>
      </ul>
    </mt-loadmore>
  </section>

  <section class="foot" v-show="
  this.$store.state.askProblemStatus===''?true:
  this.$store.state.askProblemStatus==='n'?true:
  this.$store.state.askProblemStatus==='a'?true:
  this.$store.state.askProblemStatus==='s'?true:false">
    <mt-field id="txtContent" placeholder="" class="con" v-model="content" type="textarea" rows="1"></mt-field>
    <!-- <span class="btn-face" v-on:click="showSelBox=showSelBox==1?0:1"><i class="fa fa-smile-o" aria-hidden="true"></i></span>
    <span class="btn-plus" v-on:click="showSelBox=showSelBox==2?0:2"><i class="fa" aria-hidden="true" :class="showSelBox==2?'fa-minus-circle':'fa-plus-circle'"></i></span> -->
    <div class="sendgroup">
      <span class="btn btn-detectRes" v-on:click="detectRes">检测结果</span>
      <span class="btn btn-send" v-on:click="sendMsg">发送</span>
    </div>

    <!-- <section class="selbox" :class="showSelBox>0?'show':'hide'">
        <section v-show="showSelBox==1" class="face-box">
            <mt-swipe :auto="0" :continuous="false">
                <mt-swipe-item v-for="n in Math.ceil(EXPS.length/18)" :key="n">
                    <li v-for="(item, index) in getEXP(n,18)" :key="index">
                        <img :src="'static/emotion/'+item.file" alt="" :data="item.code" v-on:click="content+=item.code">
                    </li>
                </mt-swipe-item>
            </mt-swipe>
        </section>
        <div v-show="showSelBox==2">{{selOther}}</div>
    </section> -->
  </section>
  <section class="evaluate" v-show="this.$store.state.askProblemStatus==='c'&&!this.$store.state.assessed">
    <mt-button type="primary" size="large" @click="toAssess">立即评价</mt-button>
  </section>
</div>
</template>

<script>
import util from '../common/util';
import { Toast } from 'mint-ui';
import { mapState } from 'vuex';
import { createContentUsingPOST } from '@/../client/javascript/vue-api-client.js';

export default {
  props: ['type', 'history'],
  name: 'chatlist',
  computed: mapState({
    createProblem: state => {
      return state.createProblem;
    },
    doctorView: state => state.doctorView,
    doctorHistory: state => {
      return state.doctorHistory
    },
    detail: state => state.linkDoctorView,
    doctorQuestion: state => state.doctorQuestion
  }),
  data() {
    return {
      ulHeight: null,
      defaultImage: require('../assets/doctor.png'),
      doctor: {},
      appendProblem: {
        id: 2,
        text: '',
        state: false
      },
      showSelBox: 0, // 0隐藏 1显示表情 2显示其他
      selFace: '表情',
      selOther: '其他功能',
      content: '',
      topStatus: '',
      //聊天记录
      records: [],
      // 表情
      // EXPS: [
      //   {
      //     file: '100.gif',
      //     code: '/::)',
      //     title: '微笑',
      //     reg: /\/::\)/g
      //   }
      // ]
    };
  },
  methods: {
    // getEXP: function(pageNow, pageSize) {
    //   return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow);
    // },
    //发送消息
    sendMsg: function() {
      var _this = this;

      if (this.content == '') {
        Toast('请输入消息');
        return;
      } else {
        let content = this.content
        this.content = ''
        this.appendMsg(content)
        this.scrollToBottom();
      }
      //this.focusTxtContent();//聚焦输入框
    },
    //发送单条消息
    // sendPro: function(text) {
    //   this.$store.commit('pushMessage', {
    //     person: 'p',
    //     gmtCreate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    //     contentId: '',
    //     content: text
    //   });
    //   this.scrollToBottom();
    // },
    //追加问题
    appendMsg(content) {
      createContentUsingPOST({
        param: {
          accountId: this.appendProblem.id,
          content: content,
          questionId: this.createProblem.id,
          // testUserId: this.appendProblem.id
        }
      }).then(response => {
        if (response.data.code === 0) {
          this.$store.commit('pushMessage', {
            person: 'p',
            gmtCreate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            contentId: '',
            content: content
          });
          this.content = '';
        }else{
          this.$toast('发送失败!')
        }
      });
    },
    formatDate (string) {
      let time = string.substr(0, string.length - 5);
      let t = new Date(time)
      return util.formatDate.format(new Date(time), 'yyyy-MM-dd hh:mm:ss')
    },
    //检测结果
    detectRes() {
      console.log(this.$store.state.deteResultId);
    },
    //评价
    toAssess () {
      this.$router.push('/evaluate');
    },
    //聚焦输入框
    focusTxtContent: function() {
      document.querySelector('#txtContent input').focus();
    },
    //滚动条滚动到底部
    scrollToBottom: function() {
      setTimeout(function() {
        var chatlist = document.getElementsByClassName('chatlist')[0];
        chatlist.scrollTop = chatlist.scrollHeight;
      }, 100);
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop(id) {
      var _this = this;
      setTimeout(() => {
        var chatlist = document.getElementsByClassName('chatlist')[0];
        var oldHeight = chatlist.scrollHeight;

        _this.records.unshift(
          {
            type: 1,
            time: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            name: '',
            content: '这里是历史记录'
          },
          {
            type: 2,
            time: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            name: '',
            content: '历史记录'
          }
        );

        setTimeout(function() {
          var newHeight = chatlist.scrollHeight;
          chatlist.scrollTop = newHeight - oldHeight;
        }, 100);

        this.$refs.loadmore.onTopLoaded(id);
      }, 1500);
    },
    /* 是否显示评价 */
    showEvaluate() {
      if(this.$store.state.askProblemStatus==='c'){
        if(this.$store.state.assessed){
          return true
        }
      }else {
        return false
      }
    }
  },
  mounted: function() {
    this.ulHeight = document.body.clientHeight - 190
    this.scrollToBottom();
    // this.focusTxtContent();
    switch (this.type) {
      case 'create':
        //新建问题清空vuex
        this.$store.commit('setDoctorHistory', []);
        break;
      case 'history':
        this.createProblem.id = this.$route.params.list.id
        // if (JSON.stringify(this.doctorHistory) !== '{}') {
        //   let list = this.history;
        //   // this.sendPro(list.ask);
        // }
        break;
      default:
        break;
    }
  },
  updated: function() {
    this.scrollToBottom();
  },
  created: function() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.charconwarp {
.chatlist {
  position: absolute;
  top: 120px;
  bottom: 48px;
  left: 0px;
  right: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
}

.doctorinfo {
  width: 100%;
  height: 100px;
  border: 3px rgb(243, 243, 243);
  border-radius: 8px;
}

.chatlist-bottom {
  bottom: 48px;
}

.chatlist-bottom-collapse {
  bottom: 198px;
}

.chatlist ul {
  // min-height: 300px;
}

.chatlist ul .chat-mine {
  text-align: right;
  padding-left: 0;
  padding: 0 60px;
}

.chatlist ul li {
  position: relative;
  /*font-size: 0;*/
  margin-bottom: 10px;
  padding: 0 60px;
  min-height: 68px;
  text-align: left;
}

.chat-mine .chat-user {
  left: auto;
  right: 3px;
}

.chat-user {
  position: absolute;
  left: 3px;
}

.chat-text,
.chat-user {
  display: inline-block;
  vertical-align: top;
  /*font-size: 14px;*/
}

.chat-user img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid #e6e6e6;
}

.time {
  width: 100%;
}

cite {
  left: auto;
  right: 60px;
  text-align: right;
}

cite {
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

.chat-mine .chat-text {
  margin-left: 0;
  text-align: left;
  background-color: rgb(55, 107, 152);
  color: #fff;
}

.chat-text {
  position: relative;
  line-height: 22px;
  /*margin-top: 25px;*/
  padding: 10px 15px;
  background-color: #eee;
  border-radius: 8px;
  color: #333;
  word-break: break-all;
  max-width: 462px\9;
  white-space: pre-line;
  audio {
    width: 13rem;
  }
}

.chat-text,
.chat-user {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}

.chat-text img {
  max-width: 100%;
  vertical-align: middle;
}

.chat-user {
  position: absolute;
  left: 3px;
}

.chat-text:after {
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
}

.chat-mine .chat-text:after {
  left: auto;
  right: -10px;
  border-top-color: rgb(55, 107, 152);
}

.foot {
  width: 100%;
  min-height: 48px;
  position: fixed;
  bottom: 0px;
  left: 0px;
}
.evaluate {
  width: 100%;
  min-height: 48px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  .mint-button--primary {
    background: rgb(55, 107, 152);
    border-radius: 8px;
    width: 90%;
  }
}

.foot .con {
  position: absolute;
  left: 10px;
  right: 40px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 5px;
  width: 55%;
  top: 5px;
}

.foot .mint-cell {
  min-height: 35px;
}

.foot .btn-plus {
  width: 28px;
  padding: 9px 3px;
  position: absolute;
  left: 0px;
  border-left: 1px solid #d9d9d9;
}

.foot .btn-plus i {
  font-size: 2em;
  color: #ccc;
}

.foot .btn-face {
  width: 28px;
  padding: 9px 3px 9px 0px;
  position: absolute;
  left: 35px;
  /*border-right: 1px solid #d9d9d9;*/
}

.foot .btn-face i {
  font-size: 2em;
  color: #d9d9d9;
}

.foot .selbox {
  height: 150px;
  margin-top: 48px;
  border-top: 1px solid #d9d9d9;
}

.show {
  display: block;
}

.hide {
  display: none;
}

.face-box {
  /* position: absolute; */
  /* top: 48px; */
  /* left: 0px; */
  /* right: 0px; */
  /* bottom: 0px; */
  padding: 15px 15px 0px 15px;
  overflow: hidden;
  width: 290px;
  margin: 0px auto;
  height: 135px;
}

.face-box li {
  width: 30px;
  float: left;
  padding: 6px 10px 0px 8px;
}

.btn {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  line-height: 32px;
  margin-left: 5px;
  padding: 0 6px;
  background-color: rgb(55, 107, 152);
  color: #fff;
  border-radius: 3px;
}

.sendgroup {
  width: 39%;
  height: 35px;
  position: absolute;
  top: 5px;
  right: 3%;
  display: flex;
  justify-content: flex-end;
}

.btn-detectRes {
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 35%;
  background-color: rgb(243, 243, 243);
  color: black;
}

.btn-send {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  right: 0px;
  top: 0;
}
}
</style>
