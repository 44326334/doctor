<template>
  <div class="userwarp">
    <HEADER></HEADER>
    <div class="con">
      <div class="head">
        <mt-cell title="选择问诊用户"></mt-cell>
        <div class="cell" v-for="(item, index) in users" :key="index">
          <div class="warp">
            <input type="radio" v-model="cell" :value="item" :id="item.id"/>
            <label :for="item.id">
              <div class="left">
                {{item.name}}
              </div>
              <div class="center">{{item.gender}}</div>
              <div class="right">{{item.age}}岁</div>
            </label>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="box">
          <mt-button type="primary" size="large" @click.native="toAsking">下一步</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell } from 'mint-ui';
import { getTestUserListUsingGET } from '@/../client/javascript/vue-api-client.js'
import HEADER from '@/components/header.vue'
  export default {
    name: 'user',
    components: {HEADER},
    data() {
      return {
        users: [],
        cell: ''
      }
    },
    methods: {
      toAsking () {
        // this.$router.push('/asking')
      },
      loadUserList () {
        getTestUserListUsingGET({}).then(response => {
          if(response.data.code === 0 && response.data.list.length > 0){
            this.$indicator.close();
            this.users = response.data.list
          }
        })
      }
    },
    created() {
      this.$indicator.open();
      this.loadUserList()
    },
  }
</script>

<style lang="less">
.userwarp {
  height: 100%;
  .con {
    height: 100%;
    background: rgb(240, 240, 240);
    display: flex;
    flex: 1;
    flex-direction: column;
    // justify-content: space-around;
    text-align: left;
    .head {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // flex: 1;
      .mint-cell-text {
        font-weight: bold;
      }
      .cell {
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: inherit;
        min-height: 48px;
        display: block;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        .warp {
          display: flex;
          font-size: 16px;
          line-height: 1;
          min-height: inherit;
          overflow: hidden;
          padding: 0 10px;
          width: 100%;
          box-sizing: border-box;
          align-items: center;
          // justify-content: space-between;
          label {
            width: 100%;
            display: flex;
            flex: 1;
            justify-content: space-between;
            padding: 0 3%;
            .left, .center, .right{
              flex: 1;
            }
            .center {
              text-align: center;
            }
            .right {
              text-align: right;
            }
          }
        }
      }
    }
    .footer {
      background: white;
      flex: 1.5;
      .box {
        margin: 5%;
        /* covered mint */
        .mint-button--primary {
          background: rgb(55, 107, 152);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
