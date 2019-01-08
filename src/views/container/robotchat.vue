<template>
  <div id="robotchat">
    <HEADER></HEADER>
    <section class="chatlist">
      <ul>
        <template v-for="(item) in records">
          <li class="chat-mine" v-if="item.person==='p'">
              <div class="chat-user"><img src="../../assets/user.png"></div>
              <div class="time"><cite><i>{{item.gmtCreate}}</i>{{item.contentId}}</cite></div>
              <div class="chat-text">{{item.content}}</div>
          </li>
          <li v-if="item.person==='d'">
              <div class="chat-user"><img src="../../assets/doctor.png"></div>
              <div class="time"><cite>{{item.contentId}}<i>{{item.gmtCreate}}</i></cite></div>
              <div class="chat-text" v-if="item.type==='text'">
                {{item.content}}
                <!-- <hr>
                <div class="board">
                  <template v-for="(ques,index) in questions">
                    <div :key="index" @click="creatAsk(ques.name)">{{ques.name}}</div>
                  </template>
                  <div @click="extend">更多</div>
                </div> -->
              </div>
              <div class="chat-text" v-else-if="item.type==='image'">
                <img :src="item.content" alt="">
              </div>
              <div class="chat-text" v-else-if="item.type==='audio'">
                <audio controls="controls" preload="auto" :src="item.content"></audio>
              </div>
              <div class="small" @click="toChat">未解决您的问题？点这里</div>
          </li>
        </template>
      </ul>
    </section>
  </div>
</template>

<script>
import util from '../../common/util';
import HEADER from '../../components/header';
import robotResponse from '../../../static/robotResponse.json';

  export default {
    name: 'robotchat',
    components: {
      HEADER
    },
    data() {
      return {
        content: '',
        questions: [
          {
            name: '糖尿病'
          },
          {
            name: '高血压'
          }
        ],
        records: this.$store.state.robotMsg,
        // 表情
        EXPS: [
          {
            file: '100.gif',
            code: '/::)',
            title: '微笑',
            reg: /\/::\)/g
          }
        ]
      }
    },
    methods: {
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
      extend () {
        this.$router.push('classes')
      },
      // creatAsk (ques) {
      //   this.createAsk = ques
      //   this.$store.commit('pushRobotMsg', {
      //     person: 'p',
      //     gmtCreate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      //     contentId: '',
      //     content: this.createAsk,
      //     type: 'text'
      //   })
      //   this.$store.commit('pushRobotMsg', {
      //     person: 'd',
      //     gmtCreate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      //     contentId: '',
      //     content: robotResponse[ques].content,
      //     type: 'text'
      //   })
      //   this.scrollToBottom()
      // },
      toChat() {
        this.$router.push({
          name: 'chat',
          params: {
            from : 'create',
            create: this.createAsk
          }
        });
      }
    },
    mounted() {
      let ques = this.$route.params.create
      if (this.$route.params.from ==='create') {
        this.$store.commit('pushRobotMsg', {
          person: 'd',
          gmtCreate: util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
          contentId: '',
          content: robotResponse[ques].content,
          type: 'text'
        })
        this.scrollToBottom();
      }
    },
    created() {
      this.scrollToBottom();
    },
    updated() {
      this.records = this.$store.state.robotMsg
    }
  }
</script>

<style lang="less" scoped>
ul,li {
  list-style: none;
}
ul {
  padding: 0;
}
.chatlist {
  position: absolute;
  top: 40px;
  bottom: 48px;
  left: 0px;
  right: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
  .board {
    display: flex;
    flex: 1;
    width: 100%;
    flex-wrap: wrap;
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
      font-size: 0.75rem;
    }
  }
  .small {
    margin-top: 0.5rem;
    font-size: 0.5rem;
    color: rgb(170, 170, 170);
    text-align: right;
  }
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
  min-height: 300px;
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

</style>

