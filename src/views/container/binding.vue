<template>
  <div class="binding">
    <!-- <HEADER></HEADER> -->
    <div class="warp">
      <div class="btns">
        <mt-button class="btnBind" type="primary" size="small" @click="toPhone">绑定手机</mt-button>
        <mt-button class="btnVisitor" size="small" @click="toUpload">匿名检测</mt-button>
      </div>
      <div class="tips">
        <p>绑定手机可自动记录每次检测结果，您可以随时查看历史检测记录，匿名用户无法享受此功能。</p>
        <p>关于隐私：绑定手机或匿名检测都不会泄露用户隐私，请放心使用。</p>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue'
import axios from 'axios'
import { mapState } from 'vuex'
let domain = DOMAIN
  export default {
    name: 'binding',
    components: {
      HEADER
    },
    data() {
      return {

      }
    },
    computed: mapState({
      bindingPhone: state => {
        return state.bindingPhone
      }
    }),
    methods: {
      toPhone() {
        this.$router.push('/phone')
      },
      toUpload() {
        this.$router.push('/upload')
      }
    },
    mounted() {
      // console.log(this.$store.state.oath2.openId)
    }
  }
</script>

<style lang="less">
  .binding{
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(245, 245, 245);
    .warp{
      height: 60%;
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mint-button--small{
        border-radius: 8px;
        width: 100%;
        background: white;
      }
      .mint-button--primary {
        background: rgb(55, 107, 152);
      }
      .btns{
        margin-bottom: 8%;
        .btnBind{
          margin-bottom: 8%;
        }
        .btnVisitor{
          margin-top: 8%;
        }
      }
      .tips{
        margin-top: 8%;
        p{
          font-size: 0.75rem;
          color: rgb(150, 150, 150);
          text-align: left;
        }
      }
    }
  }
</style>
