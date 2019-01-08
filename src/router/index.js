import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/upload',
      name: 'upload',
      title: '拍照上传',
      component: resolve => {
        require(['@/views/container/upload.vue'], resolve)
      },
      meta: {
        back: true,
        // backPath: '/',
        binding_require: false
      }
    },
    {
      path: '/bind',
      name: 'bind',
      title: '绑定手机号',
      component: resolve => {
        require(['@/views/container/binding.vue'], resolve)
      },
      meta: {
        back: true,
        // backPath: '/',
        binding_require: false
      }
    },
    {
      path: '/phone',
      name: 'phone',
      title: '绑定手机号',
      component: resolve => {
        require(['@/views/container/phone.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/',
        binding_require: false
      }
    },
    {
      path: '/detehistory',
      name: 'detehistory',
      title: '检测历史',
      component: resolve => {
        require(['@/views/container/detehistory.vue'], resolve)
      },
      meta: {
        back: true,
        // backPath: '/',
        binding_require: true
      }
    },
    {
      // path: '/robot',
      path: '/',
      name: 'robot',
      title: '问诊精灵',
      component: resolve => {
        require(['@/views/container/robot.vue'], resolve)
      },
      meta: {
        back: false
        // backPath: '/indicators',
        // binding_require: false
      }
    },
    {
      path: '/askhistory',
      name: 'askhistory',
      title: '历史记录',
      component: resolve => {
        require(['@/views/container/askhistory.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/',
        // backPath: '/robot',
        binding_require: false
      }
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   title: '问诊用户',
    //   component: resolve => {
    //     require(['@/views/container/user.vue'], resolve)
    //   },
    //   meta: {
    //     back: true,
    //     backPath: '/',
    //     binding_require: false
    //   }
    // },
    // {
    //   path: '/createuser',
    //   name: 'createuser',
    //   title: '资料完善',
    //   component: resolve => {
    //     require(['@/views/container/createuser.vue'], resolve)
    //   },
    //   meta: {
    //     back: true,
    //     backPath: '/user',
    //     binding_require: false
    //   }
    // },
    {
      path: '/chat',
      name: 'chat',
      title: '医生问诊',
      component: resolve => {
        require(['@/views/container/chat.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/',
        // backPath: '/robot',
        binding_require: false
      }
    },
    {
      path: '/detail',
      name: 'detail',
      title: '医生简介',
      component: resolve => {
        require(['@/views/container/detail.vue'], resolve)
      },
      meta: {
        back: true,
        // backPath: '/chat',
        binding_require: false
      }
    },
    {
      path: '/robotchat',
      name: 'robotchat',
      title: '问诊精灵',
      component: resolve => {
        require(['@/views/container/robotchat.vue'], resolve)
      },
      meta: {
        back: true,
        // backPath: '/robot',
        backPath: '/',
        binding_require: false
      }
    },
    // {
    //   path: '/classes',
    //   name: 'classes',
    //   title: '功能咨询',
    //   component: resolve => {
    //     require(['@/views/container/classes.vue'], resolve)
    //   },
    //   meta: {
    //     back: true,
    //     backPath: '/robotchat',
    //     binding_require: false
    //   }
    // },
    {
      path: '/evaluate',
      name: 'evaluate',
      title: '评价医生',
      component: resolve => {
        require(['@/views/container/evaluate.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/chat',
        binding_require: false
      }
    },
    {
      path: '/healths',
      name: 'healths',
      title: '健康详情',
      component: resolve => {
        require(['@/views/container/healths.vue'], resolve)
      },
      meta: {
        back: true,
        binding_require: false
      }
    },
    {
      path: '/gravidity',
      name: 'gravidity',
      title: '验孕检测结果',
      component: resolve => {
        require(['@/views/container/gravidity.vue'], resolve)
      },
      meta: {
        back: true,
        binding_require: false
      }
    },
    {
      path: '/ovulation',
      name: 'ovulation',
      title: '排卵检测',
      component: resolve => {
        require(['@/views/container/ovulation.vue'], resolve)
      },
      meta: {
        back: true,
        binding_require: false
      }
    },
    {
      path: '/pesticide',
      name: 'pesticide',
      title: '农药残留检测',
      component: resolve => {
        require(['@/views/container/pesticide.vue'], resolve)
      },
      meta: {
        back: true,
        binding_require: false
      }
    },
    {
      path: '/cruorin',
      name: 'cruorin',
      title: '血红蛋白检测',
      component: resolve => {
        require(['@/views/container/cruorin.vue'], resolve)
      },
      meta: {
        back: true,
        binding_require: false
      }
    },
    {
      path: '/result',
      name: 'result',
      title: '结果详情',
      component: resolve => {
        require(['@/views/container/result.vue'], resolve)
      },
      meta: {
        back: true,
        binding_require: false
      }
    },
    {
      path: '/indicators',
      name: 'indicators',
      title: '指标详情',
      component: resolve => {
        require(['@/views/container/indicators.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/',
        binding_require: true
      }
    },
    {
      path: '/repo',
      name: 'repo',
      title: '完整报告',
      component: resolve => {
        require(['@/views/container/repo.vue'], resolve)
      },
      meta: {
        back: true,
        backPath: '/',
        binding_require: true
      }
    }
    // {
    //   path: '/oath2',
    //   name: 'oath2',
    //   title: '微信授权',
    //   component: resolve => {
    //     require(['@/views/container/oath2.vue'], resolve)
    //   },
    //   meta: {
    //     back: false,
    //     binding_require: true
    //   }
    // }
  ]
})

export default router

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(function (item) {
//     return item.meta.binding_require
//   })) {
//     let phone = localStorage.getItem('phone')
//     if (!phone) {
//       next(
//         {
//           path: '/phone'
//         }
//       )
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
