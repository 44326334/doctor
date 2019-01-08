<template>
  <div class="warp">
    <HEADER></HEADER>
    <div class="con">
      <ul class="sys" v-for="(sys,index) in classes" :key="index">
        <div class="title">{{sys.title}}</div>
        <li class="list">
          <div class="item" v-for="(item,index) in sys.list" :key="index" @click="selectProblem(item)">
            {{item}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue'
import util from '../../common/util'
  export default {
    name: '',
    components: {HEADER},
    data() {
      return {
        classes: [
          {
            title: '泌尿系统',
            list: ['尿毒症', '尿液黄', '糖尿病', '尿血', '尿毒症', '尿液黄', '糖尿病']
          },
          {
            title: '肝功能',
            list: ['尿毒症', '尿液黄', '糖尿病', '尿血', '尿毒症', '尿液黄', '糖尿病']
          },
          {
            title: '肾功能',
            list: ['尿毒症', '尿液黄', '糖尿病', '尿血', '尿毒症', '尿液黄', '糖尿病']
          },
        ],
        createAsk: ''
      }
    },
    methods: {
      selectProblem(item) {
        this.createAsk = item
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
    }
  }
</script>

<style lang="less" scoped>
.warp {
  height: 100%;
  background: rgb(243, 243, 243);
  .con {
    padding: 5%;
    padding-top: 40px;
    ul,li {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    .sys {
      margin: 5% 0;
    }
    .title {
      text-align: left;
      margin: 2% 1.5%;
    }
    .list {
      display: flex;
      flex: 1;
      width: 100%;
      flex-wrap: wrap;
      .item {
        display: flex;
        width: 22%;
        height: 30px;
        flex-wrap: wrap;
        background: white;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        margin: 2% 1.5%;
        font-size: 0.85rem;
      }
    }
  }
}
</style>
