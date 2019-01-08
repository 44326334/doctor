<template>
  <div id="chat">
    <HEADER></HEADER>
    <Heads :detail="doctor" :history="list" :chatShow="chatShow" v-show="chatShow"></Heads>
    <ChatList :type="from" :history="list" :chatShow="chatShow" v-show="chatShow"></ChatList>
    <cute-modal class="askModal" name="askModal" :width="bodyWidth+'px'">
      <span class="modalClose" @click="closeModal">×</span>
      <div class="header">
        <h4>医生问诊</h4>
        <nav class="modal-nav">
          <a href="#" class="nav-item checked">导诊接待</a><i>></i>
          <a href="#" class="nav-item">安排医生</a><i>></i>
          <a href="#" class="nav-item">医生诊断</a>
        </nav>
      </div>
      <div class="con">
        <div class="profile">
          <mt-field label="年 龄:" disableClear v-model="age.data" :attr="{ maxlength: 2 }"></mt-field>
          <mt-cell title="性 别:" :value="sex.data" @click.native="popupVisible = true" class="sexWarp">
          </mt-cell>
          <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <mt-picker :slots="sexSlots" @change="onSexChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
          </mt-popup>
        </div>
        <textarea class="modal-con" rows="8" cols="30" v-model="askContent" :placeholder="placeholder" autofocus="autofocus" >
        </textarea>
      </div>
      <div class="attached">
        <input type="checkbox" v-model="attached"><span>发送检测报告</span>
      </div>
      <div class="footer">
        <div class="cancel" @click="cancel">取消问诊</div>
        <div class="confirm" @click="confirm">立即问诊</div>
      </div>
    </cute-modal>
  </div>
</template>

<script>
import util from '../../common/util';
import HEADER from '../../components/header';
import Heads from '../../components/Heads';
import ChatList from '../../components/ChatList';
import { MessageBox } from 'mint-ui';
import {
  getDoctorDetailUsingGET,
  createFreeProblemUsingPOST,
  getProblemDetailUsingPOST,
  } from '@/../client/javascript/vue-api-client.js';

export default {
  name: 'chat',
  components: {
    Heads,
    ChatList,
    HEADER
  },
  data() {
    return {
      bodyWidth: null,
      bodyHeight: null,
      from: '',
      createProblem: {
        id: 2,
        text: '',
        state: false
      },
      list: {},
      doctor: {},
      popupVisible: false,
      sexSlots: [
        {
          flex: 1,
          values: ['男', '女'],
          className: 'sexSlot',
        }
      ],
      attached: true,
      askContent: '',
      askContentFlag: false,
      placeholder: '请输入您想咨询的问题，十个文字以上，尽量描述清楚',
      chatShow: false,
      age: {
        data: null,
        state: false
      },
      sex: {
        data: '男',
        state: true
      }
    };
  },
  watch: {
    askContent: function() {
      // const reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff0c]{10,}/;
      // if (!reg.test(this.askContent)) {
      //   this.askContentFlag = false;
      // } else {
      //   this.askContentFlag = true;
      // }
      if (this.askContent.length >= 10) {
        this.askContentFlag = true;
      } else {
        this.askContentFlag = false;
      }
    },
    'age.data': function() {
      const reg = /^[0-9]{1,2}$/;
      if (!reg.test(this.age.data)) {
        this.age.state = false;
      } else {
        this.age.state = true;
      }
    },
    'sex.data': function() {
      const reg = /^['男'|'女']$/ ;
      if (!reg.test(this.sex.data)) {
        this.sex.state = false;
      } else {
        this.sex.state = true;
      }
    }
  },
  methods: {
    //获取医生详情
    doctorDetail(id) {
      getDoctorDetailUsingGET({
        questionId: id
      }).then(response => {
        if (response.data.code === 0) {
          this.$store.commit('setLinkDoctorView', response.data.body);
        }
      });
    },
    cancel() {
      this.$cuteModal.hide('askModal')
      // this.$router.push('/'+"?rid="+this.$store.state.deteResultId)
      window.history.go(-1)
    },
    closeModal() {
      this.cancel()
    },
    onSexChange(picker, values) {
      this.sex.data = values[0];
    },
    confirm() {
      if(this.age.state) {
        if (this.sex.state) {
          if (this.askContent) {
            if(this.askContentFlag&&this.age.state&&this.sex.state) {
              this.createProblemId()
            }else{
              this.$toast("请用十个以上文字描述您的问题!")
            }
          }else{
            this.placeholder = "请输入您的问题!"
            this.$toast("请输入您的问题!")
          }
        }else {
          this.$toast("请输入正确的性别!")
        }
      } else {
        this.$toast("请输入正确的年龄!")
      }

    },
    /* 获取新建问题id */
    createProblemId() {
      createFreeProblemUsingPOST({
        param: {
          accountId: this.createProblem.id,
          age: parseInt(this.age.data),
          attached: this.attached,
          content: this.askContent,
          gender: this.sex.data,
          // testUserId: this.createProblem.id
          testResultId: this.$store.state.deteResultId
        }
      }).then(response => {
        if (response.data.code === 0) {
          this.$store.commit('setCreateProblem', response.data.body)
          this.doctorDetail(this.$store.state.createProblem.id)
          this.$cuteModal.hide('askModal')
          this.from = ''
          this.$store.commit('setAskModal', true)
          this.chatShow = true
          this.$store.commit('pushMessage', {
            person: 'p',
            gmtCreate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            contentId: '',
            content: this.askContent
          });
          this.loadProblemList(this.$store.state.createProblem.id)
        }
      });
    },
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
  },
  created() {
    /* 父组件参数 */
    this.from = this.$route.params.from;
    this.createProblem.text = this.$route.params.create;
    this.list = this.$route.params.list;
    /* url参数 */
    let qid = this.$route.query.qid
    if (this.from === 'create') {

    } else {
      if(!qid){
        this.doctorDetail(this.$store.state.createProblem.id);
      } else {
        this.$store.commit('setCreateProblem', qid);
        this.doctorDetail(qid);
      }
      this.chatShow = true;
    }
  },
  mounted() {
    this.bodyWidth = document.body.clientWidth
    this.bodyHeight = document.body.clientHeight
    if (this.from === 'create') {
      if(this.$store.state.askModal){
        this.$cuteModal.open('askModal');
      }else {
        this.$cuteModal.hide('askModal')
      }
    }
    /* url参数 */
    let qid = this.$route.query.qid
    if(qid) {
      this.$store.commit('setCreateProblem', qid);
      this.loadProblemList(qid)
    }
    let rid = this.$route.query.rid
    if(rid){
      this.$store.commit('setDeteResultId', rid)
    }
  }
};
</script>

<style lang="less">
@import 'font-awesome/css/font-awesome.min.css';
#chat {
  /*background-color: #324057;*/
  height: 100%;
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  /*font-weight: 400;
    -webkit-font-smoothing: antialiased;*/
  overflow: hidden;
  ul,
  li {
    list-style: none;
  }
}

blockquote,
button,
dd,
div,
dl,
dt,
form,
h1,
h2,
h3,
h4,
h5,
h6,
input,
li,
ol,
p,
pre,
td,
textarea,
th,
ul {
  margin: 0;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

a {
  color: #666;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/

::-webkit-scrollbar {
  // width: 5px;
  // height: 10px;
  // background-color: #F8F8F8;
}
/*定义滚动条轨道 内阴影+圆角*/

::-webkit-scrollbar-track {
  background-color: #f8f8f8;
}
/*定义滑块 内阴影+圆角*/

::-webkit-scrollbar-thumb {
  background-color: #e2e2e2;
}

#app {
  overflow: hidden;
}

/* mint */
.askModal {
  width: 100%;
  .cute-modal__overlay {
    z-index: 0 !important;
  }
  .cute-modal {
    width: 90%;
    z-index: 0 !important;
    top: 20%;
    left: 5%;
    .cute-modal__container {
      width: 100% !important;
      border-radius: 20px;
      .cute-modal__body {
        border-radius: 20px;
        padding: 0;
        background: white;
      }
    }
    .modalClose {
      position: absolute;
      width: 1.4rem;
      height: 1.4rem;
      top: 2%;
      right: 2%;
      font-size: 1.4rem;
      font-weight: bold;
      color: #bebebe;
      z-index: 1;
    }
    .header {
      border-bottom: 1px solid #e6e6e6;
      h4 {
        color: rgb(55, 107, 152);
        padding: 5% 0 0 0;
        position: relative;
      }
      nav {
        text-align: left;
        margin: 2% 5% 2% 5%;
      }
    }
    .con {
      margin-bottom: 3%;
      textarea {
        padding: 3%;
        &::placeholder{
          color: rgb(200, 200, 200)
        }
      }
      .profile {
        display: flex;
        margin-left: 5%;
        .mint-field {
          width: 50%;
        }
        input {
          text-align: center;
        }
        .sexWarp {
          width: 50%;
          .mint-cell-title{
            flex: none;
          }
          .mint-cell-value{
            flex: 1;
            justify-content: center;
          }
        }
        .popup {
          width: 100%;
        }
      }
      .mint-field .mint-cell-title {
        width: auto;
      }
      .mint-cell:last-child {
        background-image: none;
      }
      .mint-cell-wrapper {
        padding: 0 10px 0 0;
        background-image: none;
      }
    }
    .attached {
      margin: 0 0 3% 5%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        margin-left: 3%;
        color: rgb(143, 163, 180);
      }
    }
    .footer {
      display: flex;
      border-radius: 20px;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      .cancel {
        flex: 1;
        background: rgb(240, 240, 240);
        font-size: 1rem;
        border-radius:0 0 0 19px;
      }
      .confirm {
        flex: 1;
        background: rgb(55, 107, 152);
        color: white;
        font-size: 1rem;
        border-radius:0 0 19px 0;
      }
    }
  }
}
.modal-nav {
  a {
    text-decoration: none;
  }
  .nav-item,
  i {
    font-size: 0.75rem;
    color: rgb(200, 200, 200);
  }
  .checked {
    color: rgb(55, 107, 152);
  }
}
.modal-con {
  width: 83%;
  resize: none;
  border: 1px solid rgb(230, 230, 230);
}
</style>
