<template>
  <mt-header :title="currentRoute.title" fixed>
    <mt-button slot="left"
    icon="back" @click="back"></mt-button>
    <!-- <mt-button slot="right" v-if="currentRoute.path === '/'" @click="logout">{{phone?'已登陆':''}}</mt-button> -->
    <mt-button slot="right" v-if="currentRoute.path === '/repo'" @click="printRepo">打印报告</mt-button>
    <!-- <mt-button slot="right" v-else-if="currentRoute.path === '/'" @click="toAskHis">历史记录</mt-button> -->
    <mt-button slot="right" v-else-if="currentRoute.path === '/user'" @click="toCreate">添加用户</mt-button>
    <!-- <mt-button slot="right" v-else-if="currentRoute.path === '/chat'" @click="toAssess">
    {{this.$store.state.isAssess?"提问":"评价"}}</mt-button> -->
  </mt-header>
</template>

<style lang="less">
.mint-header {
  height: 40px !important;
  font-size: 16px !important;
  background: rgb(242, 242, 242) !important;
  color: black !important;
  font-weight: bold !important;
  .mintui-search {
    font-size: 20px;
  }
  .mint-button-text {
    font-size: 0.85rem;
  }
}
</style>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      currentRoute: {},
      phone: localStorage.getItem('phone'),
    };
  },
  methods: {
    back() {
      if (this.$router.currentRoute.path === '/') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'chat'){
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'detehistory') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'detail') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'evaluate') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'phone') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'upload') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'healths') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'gravidity') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'indicators') {
        window.history.go(-1)
      } else if (this.$router.currentRoute.name === 'repo') {
        window.history.go(-1)
      } else {
        this.$router.currentRoute.meta.back
        ? this.$router.push(this.$router.currentRoute.meta.backPath+"?rid="+this.$store.state.deteResultId)
        : null;
      }
    },
    login () {
      this.$router.push('/phone');
    },
    logout () {
      MessageBox.confirm(this.phone+'&nbsp;&nbsp;确定退出?').then(() => {
        localStorage.clear();
        window.location.reload();
      },() => {})
    },
    printRepo () {
      // MessageBox.confirm('您将打印本次报告页,请确保与打印机相连无误后点击确认。', '打印提示').then(() => {
      //   console.log('print')
      // },() => {})
      MessageBox.confirm('', {
        message: '您将打印本次报告页,请确保与打印机相连无误后点击确认。',
        title: '打印提示',
        confirmButtonText:'确认打印',
        cancelButtonText:'取消打印'
      }).then(() => {
        console.log('print')
      },() => {})
    },
    toAskHis () {
      this.$router.push('/askhistory');
    },
    toCreate () {
      this.$router.push('/createuser');
    },
    toAssess () {
      if(!this.$store.state.isAssess){
        this.$store.commit('setAssess', true)
      } else {
        this.$store.commit('setAssess', false)
      }
    }
  },
  mounted() {
    let currentPath = this.$router.currentRoute.path;
    let routes = this.$router.options.routes;
    for (let i in routes) {
      routes[i].path === currentPath ? (this.currentRoute = routes[i]) : '';
    }
  }
};
</script>
