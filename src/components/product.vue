<template>
  <div class="warp">
    <p>{{title}}</p>
    <div class="con">
      <div class="item" v-for="item in products" :key="item.id">
        <router-link to="/product">
          <img :src="item.url" alt="" width="100%">
        </router-link>
        <div class="infos">
          <span class="name">小测试·尿液分析试纸条</span>
          <span class="price">&yen;29.8</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.warp{
  background: white;
  margin-top: 10px;
  padding-bottom: 6rem;
  p{
    text-align: left;
    margin: 0;
    font-size: 1.3rem;
    padding: 1rem 1rem 0;
  }
  .con{
    display: flex;
    flex: 1;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      width: 100%;
      margin: 5%;
      .infos {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        padding: 0 3%;
        .price {
          color: red;
        }
      }
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      title: '产品展示',
      products: [
        {
          url: require("../assets/product.jpg")
        }
      ]
    }
  }
}
</script>
