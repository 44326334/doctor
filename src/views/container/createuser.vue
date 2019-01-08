<template>
  <div class="createwarp">
    <HEADER></HEADER>
    <div class="con">
      <div class="title">完善问诊信息</div>
      <div class="form">
        <mt-field label="姓名" type="string" v-model="name.data" :state="name.state"></mt-field>
        <mt-field label="年龄" type="number" v-model="age.data" :state="age.state"></mt-field>
        <!-- <mt-field label="性别" type="string" v-model="sex.data" :state="sex.state"></mt-field> -->
        <mt-cell class="sex" title="性别" :value="sex.data" @click.native="handlerSex"></mt-cell>
        <mt-popup v-model="sexVisible" class="sex-class" position="bottom">
          <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
          <mt-button class="sexbtn" type="primary" size="large" @click.native='handlePopdown("sexVisible")'>确认</mt-button>
        </mt-popup>
        <mt-field label="手机号" type="tel" v-model.number="phone.data" :state="phone.state"></mt-field>
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
import HEADER from '@/components/header.vue'
import { createTestUserUsingPOST } from '@/../client/javascript/vue-api-client.js'
  export default {
    name: 'createuser',
    components: {HEADER},
    data() {
      return {
        userid: 2,
        name: {
          data: null,
          state: ''
        },
        age: {
          data: null,
          state: ''
        },
        sex: {
          data: null,
          state: ''
        },
        phone: {
          data: null,
          state: ''
        },
        sexVisible: false,
        slots: [
          {
            flex: 1,
            values: ['男', '女'],
            className: 'slot1',
            textAlign: 'center'
          },
        ],
        sexPicker: ''
      }
    },
    watch: {
      'phone.data': function() {
        const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(this.phone.data)) {
          this.phone.state = 'error';
        } else {
          this.phone.state = 'success';
        }
      },
      'name.data': function() {
        const reg = /^[\u4E00-\u9FA5]{2,4}$/;
        if (!reg.test(this.name.data)) {
          this.name.state = 'error';
        } else {
          this.name.state = 'success';
        }
      },
      'age.data': function() {
        const reg = /^((1[0-1])|[1-9])?\d$/;
        if (!reg.test(this.age.data)) {
          this.age.state = 'error';
        } else {
          this.age.state = 'success';
        }
      },
      'sex.data': function() {
        const reg = /^[\u4E00-\u9FA5]{1}$/;
        if (!reg.test(this.sex.data)) {
          this.sex.state = 'error';
        } else {
          this.sex.state = 'success';
        }
      },
      deep: true
    },
    methods: {
      handlerSex () {
        this.sexVisible = true;
      },
      onValuesChange (picker, value) {
        this.sexPicker = value[0]
      },
      handlePopdown () {
        this.sexVisible = false;
        this.sex.data = this.sexPicker;
        this.sex.state = 'success';
      },
      toAsking () {
        if (this.phone.state === 'success' &&
            this.name.state === 'success' &&
            this.age.state === 'success' &&
            this.sex.state === 'success'
            ){
              createTestUserUsingPOST ({
                param: {
                  accountId: this.userid,
                  age: this.age.data,
                  gender: this.sex.data,
                  name: this.name.data
                }
              }).then(response => {
                if(response.data.code === 0){
                  // that.$store.commit('setLoginState', true)
                  this.$toast(response.data.message)
                  this.$router.push('/user')
                }
              })
            } else {
              this.$toast('请填写正确');
            }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
.createwarp{
  height: 100%;
  .con {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    .title {
      margin-top: 50px;
      margin-bottom: 10px;
      padding: 0 5%;
      font-weight: bold;
      text-align: left;
    }
    .form {
      padding: 0 8%;
      .sex-class {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;
      }
      /* covered mint */
      .mint-cell-wrapper {
        border-bottom: 1px solid rgb(212, 212, 212);
      }
      .mint-field .mint-cell-title, .sex .mint-cell-title{
        width: 60px;
        text-align: justify;
        text-align-last: justify;
        padding-right: 10%;
        flex: unset;
      }
      .mint-cell-value {
        flex: 1;
      }
      .mint-field-state {
        margin-left: 8px;
      }
      .mint-button--primary {
        background: rgb(55, 107, 152);
        border-radius: 8px;
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
