<template>
  <div class="navWarp">
    <div class="item" v-for="item in navs" :key="item.id" @click="goto(item.id,item.pathType)">
      <img :src="item.icon" width="60px" height="60px" />
      <p>{{item.name}}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .navWarp {
    display: flex;
    flex: 1;
    justify-content: space-around;
    background: white;
  }
  .item-active {
    background: rgb(244, 244, 244);
  }
  .item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-top: 1rem;
    &:active {
      &:extend(.item-active);
    }
    p {
      font-size: 0.8rem;
    }
  }
</style>

<script>
export default {
  data () {
    return {
      navs: [
        {
          id: 'product',
          icon: require("../assets/Group1.png"),
          name: '服务介绍',
          pathType: 'route'
        },
        {
          id: 'buy',
          icon: require("../assets/Group2.png"),
          name: '购买教程',
          pathType: 'route'
        },
        {
          id: 'checkrecord',
          icon: require("../assets/Group3.png"),
          name: '查询购买记录',
          pathType: 'route'
        },
        {
          id: 'detection',
          icon: require("../assets/Group4.png"),
          name: '检测教程',
          pathType: 'route'
        }
      ]
    }
  },
  methods: {
    goto (id,type) {
      if(type === 'href'){
        // window.location.href = "http://devlopapp.unishep.cn:8080/coupons/index.html#/";
      }else {
        this.$router.push("./"+id);
      }
    }
  }
}
</script>
