import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* 温馨提示 */
    messageBox: {
      read: false
    },
    user: {
      get phone () {
        return localStorage.getItem('phone')
      },
      get token () {
        return localStorage.getItem('token')
      }
    },
    oath2: {
      get openId () {
        return localStorage.getItem('openId')
      }
    },
    // /* 登陆 */
    // login: {
    //   state: false
    // },
    /* 模拟账户accountId */
    account: {
      id: 2
    },
    /* 创建问题 */
    createProblem: {
      id: null
    },
    /* 连线医生详情 */
    linkDoctorView: {},
    /* 选中医生历史详情 */
    // doctorView: {},
    /* 选中医生提问历史 */
    doctorHistory: [],
    /* 选中医生提问问题 */
    doctorQuestion: {},
    isQuestioned: false,
    /* robot消息 */
    robotMsg: [],
    /* 提问框状态 */
    askModal: false,
    /* 问诊问题状态 */
    askProblemStatus: '',
    /* 问题是否可评价 */
    assessed: false,
    /* 保存检测结果id */
    deteResultId: null,
    /* 首页健康状态默认展示 */
    indexHealth: {},
    /* 详情页健康状态展示 */
    indicatorHealth: {},
    /* 报告页健康状态展示 */
    reportHealth: {},
    /* 选中健康状态item */
    healthDetail: {
      resultId: 99
    },
    /* 绑定的手机号 */
    bindingPhone: null
  },
  mutations: {
    readMessage (state, reading) {
      state.messageBox.read = reading
    },
    /* 保存token */
    setUser (state, {phone, token}) {
      localStorage.setItem('phone', phone)
      localStorage.setItem('token', token)
    },
    /* 保存openId */
    setOath2 (state, {openid, accessToken}) {
      localStorage.setItem('openId', openid)
      localStorage.setItem('accessToken', accessToken)
    },
    /* 保存登陆状态 */
    setLoginState (state, loginState) {
      state.login.state = loginState
    },
    setCreateProblem (state, id) {
      state.createProblem.id = id
    },
    setLinkDoctorView (state, doctor) {
      state.linkDoctorView = doctor
    },
    // setDoctorView (state, item) {
    //   state.doctorView = item
    // },
    setDoctorHistory (state, result) {
      state.doctorHistory = result
    },
    setDoctorQuestion (state, question) {
      state.doctorQuestion = question
    },
    setIsQuestioned (state, flag) {
      state.isQuestioned = flag
    },
    pushMessage (state, msg) {
      state.doctorHistory.push(msg)
    },
    pushRobotMsg (state, msg) {
      state.robotMsg.push(msg)
    },
    setAskModal (state, flag) {
      state.askModal = flag
    },
    setAskProblemStatus (state, status) {
      state.askProblemStatus = status
    },
    setAssessed (state, flag) {
      state.assessed = flag
    },
    setDeteResultId (state, id) {
      state.deteResultId = id
    },
    setIndexHealth (state, obj) {
      state.indexHealth = obj
    },
    setIndicatorHealth (state, obj) {
      state.indicatorHealth = obj
    },
    setReportHealth (state, obj) {
      state.reportHealth = obj
    },
    setHealthDetail (state, id) {
      state.healthDetail.resultId = id
    },
    setBindingPhone (state, phone) {
      state.bindingPhone = phone
    },
    setOpenId (state, obj) {
      state.openId = obj
    }
  },
  actions: {

  }
})

export default store
