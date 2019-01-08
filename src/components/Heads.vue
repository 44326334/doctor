<template>
  <section class="top waiting" v-if="!show">
    <div>正在为您转接{{count}} s</div>
    <div style="display:none">{{this.$store.state.askModal}}</div>
  </section>
  <section class="top waiting" @click="detailView" v-else>
    <template v-if="!this.$store.state.linkDoctorView">
      <div>暂无医生接入</div>
    </template>
    <template v-else>
      <div class="left">
        <img class="head" :src="detail===null?'':detail.image" />
      </div>
      <div class="right">
        <div class="name">
          <span>{{detail&&detail.name}}</span>
          <span>{{detail&&detail.clinicName}}</span>
          <span>{{detail&&detail.title}}</span>
        </div>
        <small>{{detail&&detail.goodAt}}</small>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex';

const CHAT_COUNT = 5;

export default {
  props: ['history', 'chatShow'],
  name: 'heads',
  computed: mapState({
    detail: state => state.linkDoctorView
  }),
  data() {
    return {
      vociceOpen: true,
      info: '6年专业从医经验，耐心，解答详细',
      show: false,
      timer: null,
      count: ''
    };
  },
  methods: {
    detailView() {
      if(!this.$store.state.linkDoctorView){

      } else {
        this.$router.push({ name: 'detail', params: { detail: this.detail } });
      }
    },
    linkDoctorTime() {
      if (!this.timer) {
        this.count = CHAT_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= CHAT_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            this.$store.commit('setAskModal', false)
          }
        }, 1000);
      }
      if(this.$route.params.from === 'history') {
        this.show = true;
      }
    }
  },
  created() {
    if (this.chatShow) {
      this.show = true
    }
  },
  updated() {
    if(this.$store.state.askModal){
      this.linkDoctorTime()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.waiting {
  display: flex;
  justify-content: center;
  align-items: center;
}
.top {
  height: 70px;
  // line-height: 50px;
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  background-color: white;
  margin: 5px 10px;
  border: 1px rgb(245, 245, 245) solid;
  border-radius: 8px;
  box-shadow: 1px 5px 10px rgb(240, 240, 240);
  display: flex;
  .left {
    width: 25%;
    border-right: 1px solid rgb(240, 240, 240);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    overflow: hidden;
    white-space: nowrap;
    div {
      display: flex;
      flex: 1;
      justify-content: space-around;
      align-items: center;
    }
    small {
      // display: flex;
      // flex: 1;
      justify-content: flex-start;
      align-items: center;
      color: rgb(176, 176, 176);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.top .head {
  width: 50px;
  height: 50px;
  float: left;
  border-radius: 100%;
}

.top .name {
  font-size: 16px;
  color: #444;
}

.top .voice {
  width: 30px;
  height: 50px;
  float: right;
  text-align: center;
}
</style>
