<template>
  <section class="foot">
    <mt-field placeholder="请输入消息" class="con"></mt-field>
    <span class="btn-face" v-on:click="showSelBox=showSelBox==1?0:1"><i class="fa fa-smile-o" aria-hidden="true"></i></span>
    <span class="btn-plus" v-on:click="showSelBox=showSelBox==2?0:2"><i class="fa" aria-hidden="true" :class="showSelBox==2?'fa-minus-circle':'fa-plus-circle'"></i></span>
    <!-- <section class="selbox" :class="showSelBox>0?'show':'hide'">
      <section v-if="showSelBox==1" class="face-box">
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="n in Math.ceil(EXPS.length/18)">
            <li v-for="(item, index) in getEXP(n)">
              <img :src="'static/emotion/'+item.file" alt="" :data="item.code">
            </li>
          </mt-swipe-item>
        </mt-swipe>
      </section>
      <div v-if="showSelBox==2">{{selOther}}</div>
      <div v-else></div>
    </section> -->
  </section>
</template>

<script>
export default {
  name: 'foot',
  data () {
    return {
      showSelBox: 0, // 0隐藏 1显示表情 2显示其他
      selFace: '表情',
      selOther: '其他功能',
      // EXPS: [
      //   { file: '100.gif', code: '/::)', title: '微笑' }
      // ]
    }
  },
  methods: {
    // getEXP: function (pageNow) {
    //   return this.EXPS.slice((pageNow - 1) * 18, 18 * pageNow)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .foot {
    width: 100%;
    min-height: 48px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #F8F8F8;
  }

  .foot .con {
    position: absolute;
    left: 40px;
    right: 40px;
  }

  .foot .btn-plus {
    width: 30px;
    height: 30px;
    padding: 9px 5px;
    position: absolute;
    right: 0px;
    border-left: 1px solid #d9d9d9;
  }

  .foot .btn-plus i {
    font-size: 2.2em;
    color: #ccc;
  }

  .foot .btn-face {
    width: 30px;
    height: 30px;
    padding: 9px 5px;
    position: absolute;
    left: 0px;
    border-right: 1px solid #d9d9d9;
  }

  .foot .btn-face i {
    font-size: 2.2em;
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
</style>
