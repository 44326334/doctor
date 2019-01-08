<template>
  <div class="phonewarp">
    <HEADER></HEADER>
    <div class="con">
      <div class="form">
        <mt-cell class="formcell">
          <img src="../../assets/phone_icon.png" alt="" width="20px" height="20px">
          <mt-field type="tel" v-model.number="phone.data" :state="phone.state" placeholder="请输入手机号">
            <mt-button size="small" type="primary" @click.native='handleSendCode' :disabled="!show" class="codebtn">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}} s</span>
            </mt-button>
          </mt-field>
        </mt-cell>
        <mt-cell class="formcell">
          <img src="../../assets/password_icon.png" alt="" width="20px" height="20px">
          <mt-field type="number" v-model.number="code.data" :state="code.state" class="validate"
          placeholder="请输入验证码">
          </mt-field>
        </mt-cell>
        <div class="btncon">
          <mt-button size="large" type="primary" @click.native='handleSubmit' class='checkRecnextbtn'>下一步</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HEADER from '@/components/header.vue'
import axios from 'axios'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui';
import {
  getUserInfoUsingGET,
  getSmsVerificationCodeUsingGET,
  bindMobileUsingPOST
  } from '@/../client/javascript/vue-api-client.js'
let domain = DOMAIN
const TIME_COUNT = 60;
  export default {
    name: 'phone',
    components: {HEADER},
    data() {
      return {
        phone: {
          data: null,
          state: ''
        },
        code: {
          data: null,
          state: ''
        },
        count: '',
        timer: null,
        show: true,
      }
    },
    computed: mapState({
      openId: state => {
        return state.oath2.openId
      }
    }),
    methods: {
      /* 获取微信用户数据 */
      getOpenId() {
        getUserInfoUsingGET({}).then((res) => {
          if(res.data.code === 0){
            /* openId */
            this.$store.commit('setOath2', res.data.body)
          } else {
            this.$toast(res.data.message)
          }
        }).catch((err) => {
          this.$toast(res.data.message)
        })
      },
      handleSendCode() {
        if (this.phone.state !== 'success') {
          this.$toast({ message: '请填写手机号', position: 'top' });
        } else {
          // console.log(this.openId)
          getSmsVerificationCodeUsingGET({
            mobile: this.phone.data
          }).then((res) => {
            if(res.data.code ===0) {
              this.$toast('短信已发送');
            } else {
              this.$toast(res.data.message);
            }
          }).catch((err) => {
            this.$toast(err);
          })
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
          }
        }
      },
      handleSubmit() {
        if (this.phone.state === 'success' && this.code.state === 'success') {
          bindMobileUsingPOST ({
            param: {
              mobile: this.phone.data,
              openId: this.openId,
              msgCode: this.code.data
            }
          }).then((res) => {
            if(res.data.code ===0) {
              MessageBox.alert('绑定成功').then(action => {
                this.$store.commit('setUser', {
                  phone: this.phone.data,
                  token: '123456'
                })
                // this.$router.replace('/upload')
                window.location.replace(domain+"#/upload")
              });
            } else {
              this.$toast(res.data.message)
            }
          })
          .catch((err) => {
            this.$toast(err)
          })
        } else {
          this.$toast({ message: '请填写正确', position: 'top' });
        }
      },
      /* getPhoneBinding(openId) {
        axios.get(domain+'/api/mobile/check?openId='+openId)
        .then((res) => {
          if(res.data.code === 0) {
            if(res.data.body) {
              this.$toast('请勿重复绑定');
            } else {
              axios.get(domain+'/api/sms/get?mobile='+this.phone.data)
              this.$toast('短信已发送');
            }
          } else {
            this.$toast(res.data.message);
          }
        })
        .catch((err) => {
          this.$toast(err)
        })
      } */
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
      'code.data': function() {
        const reg = 6 && /^\d{6}$/;
        if (!reg.test(this.code.data)) {
          this.code.state = 'error';
        } else {
          this.code.state = 'success';
        }
      },
      deep: true
    },
    created() {
      this.getOpenId()
    },
  }
</script>

<style lang="less">
.phonewarp {
  height: 100%;
  .con {
    height: 100%;
    .form {
      padding: 5%;
      padding-top: 80px;
      .formcell {
        /* covered mint */
        border-bottom: 1px solid rgb(246, 246, 246);
      }
      .mint-cell-title {
        flex: 0;
      }
      .mint-field .mint-cell-title {
        width: auto;
      }
      .mint-field, .checkRecform .mint-cell-wrapper{
        background-image: none;
      }
      .mint-cell:last-child {
        background-image: none;
      }
      .mint-field-state {
        margin-left: 5px;
      }
      .mint-button--primary {
        background: rgb(240, 240, 240);
        border-radius: 8px;
        color: black;
      }
      .mint-cell-wrapper {
        padding: 0 0 0 10px;
      }
      .btncon {
        margin-top: 20px;
        .mint-button--primary {
          background: rgb(55, 107, 152);
          border-radius: 8px;
          color: white;
        }
      }
      /* covered end */
    }
  }
}
</style>
