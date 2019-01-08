/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import Mint from 'mint-ui'
Vue.use(Mint)
let domain = DOMAIN

/* 拦截器 */
let result = {};
// axios.defaults.baseURL = DOMAIN
// let token = BASE_URL
// store.commit('addToken',token)
axios.interceptors.request.use(
  function(config) {
    // config.headers.Authorization = store.state.user.token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    Mint.Indicator.close();
    if(response.data.code === 0){
      result.code = '0';
      result.message = '返回成功';
    }else {
      Mint.Toast(response.data.message);
    }
    return response;
  },
  error => {
    Mint.Indicator.close();
    if (error && error.response) {
      console.log(error)
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          Mint.Toast('请求错误');
          break;
        case 401:
          error.message = '未授权，请登录';
          Mint.Toast('未授权，请登录');
          break;
        case 403:
          error.message = '拒绝访问';
          Mint.Toast('拒绝访问');
          break;
        case 404:
          error.message = `请求地址出错`;
          Mint.Toast('请求地址出错');
          break;
        case 408:
          error.message = '请求超时';
          Mint.Toast('请求超时');
          break;
        case 500:
          error.message = '服务器内部错误';
          Mint.Toast('服务器内部错误');
          break;
        case 501:
          error.message = '服务未实现';
          Mint.Toast('服务未实现');
          break;
        case 502:
          error.message = '网关错误';
          Mint.Toast('网关错误');
          break;
        case 503:
          error.message = '服务不可用';
          Mint.Toast('服务不可用');
          break;
        case 504:
          error.message = '网关超时';
          Mint.Toast('网关超时');
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          Mint.Toast('HTTP版本不受支持');
          break;
        default:
      }
    }else {
      Mint.Toast(error);
    }
    return Promise.reject(error);
  }
);
/* end */

export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axios[method](queryUrl, body, config)
  } else if (method === 'get') {
    return axios[method](queryUrl, {
      params: form
    }, config)
  } else {
    return axios[method](queryUrl, qs.stringify(form), config)
  }
}
/*==========================================================
 *                    Api Documentation
 ==========================================================*/
/**
 * links
 * request: linksUsingGET
 * url: linksUsingGETURL
 * method: linksUsingGET_TYPE
 * raw_url: linksUsingGET_RAW_URL
 */
export const linksUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/actuator'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const linksUsingGET_RAW_URL = function() {
  return '/actuator'
}
export const linksUsingGET_TYPE = function() {
  return 'get'
}
export const linksUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/actuator'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * handle
 * request: handleUsingGET
 * url: handleUsingGETURL
 * method: handleUsingGET_TYPE
 * raw_url: handleUsingGET_RAW_URL
 * @param body - body
 */
export const handleUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/actuator/health'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const handleUsingGET_RAW_URL = function() {
  return '/actuator/health'
}
export const handleUsingGET_TYPE = function() {
  return 'get'
}
export const handleUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/actuator/health'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * handle
 * request: handleUsingGET_1
 * url: handleUsingGET_1URL
 * method: handleUsingGET_1_TYPE
 * raw_url: handleUsingGET_1_RAW_URL
 * @param body - body
 */
export const handleUsingGET_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/actuator/info'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const handleUsingGET_1_RAW_URL = function() {
  return '/actuator/info'
}
export const handleUsingGET_1_TYPE = function() {
  return 'get'
}
export const handleUsingGET_1URL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/actuator/info'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取医生详细信息
 * request: getDoctorDetailUsingGET
 * url: getDoctorDetailUsingGETURL
 * method: getDoctorDetailUsingGET_TYPE
 * raw_url: getDoctorDetailUsingGET_RAW_URL
 * @param questionId - 问题id
 */
export const getDoctorDetailUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/doctor/detail'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['questionId'] !== undefined) {
    queryParameters['questionId'] = parameters['questionId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getDoctorDetailUsingGET_RAW_URL = function() {
  return '/clinic/doctor/detail'
}
export const getDoctorDetailUsingGET_TYPE = function() {
  return 'get'
}
export const getDoctorDetailUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/doctor/detail'
  if (parameters['questionId'] !== undefined) {
    queryParameters['questionId'] = parameters['questionId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 根据mobile标识唯一用户
 * request: createFreeProblemUsingPOST
 * url: createFreeProblemUsingPOSTURL
 * method: createFreeProblemUsingPOST_TYPE
 * raw_url: createFreeProblemUsingPOST_RAW_URL
 * @param param - param
 */
export const createFreeProblemUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/free_problem/create'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const createFreeProblemUsingPOST_RAW_URL = function() {
  return '/clinic/free_problem/create'
}
export const createFreeProblemUsingPOST_TYPE = function() {
  return 'post'
}
export const createFreeProblemUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/free_problem/create'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 模拟登录
 * request: loginUsingGET
 * url: loginUsingGETURL
 * method: loginUsingGET_TYPE
 * raw_url: loginUsingGET_RAW_URL
 * @param id - 账号ID
 */
export const loginUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/login'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const loginUsingGET_RAW_URL = function() {
  return '/clinic/login'
}
export const loginUsingGET_TYPE = function() {
  return 'get'
}
export const loginUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/login'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 对医生进行评价
 * request: assessProblemUsingPOST
 * url: assessProblemUsingPOSTURL
 * method: assessProblemUsingPOST_TYPE
 * raw_url: assessProblemUsingPOST_RAW_URL
 * @param param - param
 */
export const assessProblemUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/problem/assess'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const assessProblemUsingPOST_RAW_URL = function() {
  return '/clinic/problem/assess'
}
export const assessProblemUsingPOST_TYPE = function() {
  return 'post'
}
export const assessProblemUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/problem/assess'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 条件：状态不是已关闭且医生有回复，合作方可以主动关闭这个问题。
 * request: closeProblemUsingPOST
 * url: closeProblemUsingPOSTURL
 * method: closeProblemUsingPOST_TYPE
 * raw_url: closeProblemUsingPOST_RAW_URL
 * @param param - param
 */
export const closeProblemUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/problem/close'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const closeProblemUsingPOST_RAW_URL = function() {
  return '/clinic/problem/close'
}
export const closeProblemUsingPOST_TYPE = function() {
  return 'post'
}
export const closeProblemUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/problem/close'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取问题详情
 * request: getProblemDetailUsingPOST
 * url: getProblemDetailUsingPOSTURL
 * method: getProblemDetailUsingPOST_TYPE
 * raw_url: getProblemDetailUsingPOST_RAW_URL
 * @param param - param
 */
export const getProblemDetailUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/problem/detail'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const getProblemDetailUsingPOST_RAW_URL = function() {
  return '/clinic/problem/detail'
}
export const getProblemDetailUsingPOST_TYPE = function() {
  return 'post'
}
export const getProblemDetailUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/problem/detail'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 提问历史
 * request: getProblemHistoryUsingGET
 * url: getProblemHistoryUsingGETURL
 * method: getProblemHistoryUsingGET_TYPE
 * raw_url: getProblemHistoryUsingGET_RAW_URL
 */
export const getProblemHistoryUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/problem/list/my'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getProblemHistoryUsingGET_RAW_URL = function() {
  return '/clinic/problem/list/my'
}
export const getProblemHistoryUsingGET_TYPE = function() {
  return 'get'
}
export const getProblemHistoryUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/problem/list/my'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 会使问题状态变更为'用户已查看'
 * request: viewProblemUsingPOST
 * url: viewProblemUsingPOSTURL
 * method: viewProblemUsingPOST_TYPE
 * raw_url: viewProblemUsingPOST_RAW_URL
 * @param param - param
 */
export const viewProblemUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/problem/view'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const viewProblemUsingPOST_RAW_URL = function() {
  return '/clinic/problem/view'
}
export const viewProblemUsingPOST_TYPE = function() {
  return 'post'
}
export const viewProblemUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/problem/view'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 追加问题内容
 * request: createContentUsingPOST
 * url: createContentUsingPOSTURL
 * method: createContentUsingPOST_TYPE
 * raw_url: createContentUsingPOST_RAW_URL
 * @param param - param
 */
export const createContentUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/problem_content/create'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const createContentUsingPOST_RAW_URL = function() {
  return '/clinic/problem_content/create'
}
export const createContentUsingPOST_TYPE = function() {
  return 'post'
}
export const createContentUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/problem_content/create'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 用检测结果ID查询是否已提问，并返回问题id。
 * request: getQueryQuestionIdUsingGET
 * url: getQueryQuestionIdUsingGETURL
 * method: getQueryQuestionIdUsingGET_TYPE
 * raw_url: getQueryQuestionIdUsingGET_RAW_URL
 * @param id - id
 */
export const getQueryQuestionIdUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/question/query/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getQueryQuestionIdUsingGET_RAW_URL = function() {
  return '/clinic/question/query/{id}'
}
export const getQueryQuestionIdUsingGET_TYPE = function() {
  return 'get'
}
export const getQueryQuestionIdUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/question/query/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取签名信息，开发调试用
 * request: getSignUsingGET
 * url: getSignUsingGETURL
 * method: getSignUsingGET_TYPE
 * raw_url: getSignUsingGET_RAW_URL
 */
export const getSignUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/sign'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getSignUsingGET_RAW_URL = function() {
  return '/clinic/sign'
}
export const getSignUsingGET_TYPE = function() {
  return 'get'
}
export const getSignUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/sign'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 根据accountId关联账户信息。
 * request: createTestUserUsingPOST
 * url: createTestUserUsingPOSTURL
 * method: createTestUserUsingPOST_TYPE
 * raw_url: createTestUserUsingPOST_RAW_URL
 * @param param - param
 */
export const createTestUserUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/user/create'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const createTestUserUsingPOST_RAW_URL = function() {
  return '/clinic/user/create'
}
export const createTestUserUsingPOST_TYPE = function() {
  return 'post'
}
export const createTestUserUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/user/create'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 根据accountId获取受检人信息列表。
 * request: getTestUserListUsingGET
 * url: getTestUserListUsingGETURL
 * method: getTestUserListUsingGET_TYPE
 * raw_url: getTestUserListUsingGET_RAW_URL
 */
export const getTestUserListUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/user/list'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getTestUserListUsingGET_RAW_URL = function() {
  return '/clinic/user/list'
}
export const getTestUserListUsingGET_TYPE = function() {
  return 'get'
}
export const getTestUserListUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/clinic/user/list'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取检测历史列表。
 * request: getTestResultHistoryUsingGET
 * url: getTestResultHistoryUsingGETURL
 * method: getTestResultHistoryUsingGET_TYPE
 * raw_url: getTestResultHistoryUsingGET_RAW_URL
 */
export const getTestResultHistoryUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/detect/History/list'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getTestResultHistoryUsingGET_RAW_URL = function() {
  return '/detect/History/list'
}
export const getTestResultHistoryUsingGET_TYPE = function() {
  return 'get'
}
export const getTestResultHistoryUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/detect/History/list'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取历史结果详情。
 * request: getHistoryDetialUsingPOST
 * url: getHistoryDetialUsingPOSTURL
 * method: getHistoryDetialUsingPOST_TYPE
 * raw_url: getHistoryDetialUsingPOST_RAW_URL
 * @param param - param
 */
export const getHistoryDetialUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/detect/histtory/detail'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const getHistoryDetialUsingPOST_RAW_URL = function() {
  return '/detect/histtory/detail'
}
export const getHistoryDetialUsingPOST_TYPE = function() {
  return 'post'
}
export const getHistoryDetialUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/detect/histtory/detail'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 接收base64格式的图片数据。
 * request: detectUploadUsingPOST
 * url: detectUploadUsingPOSTURL
 * method: detectUploadUsingPOST_TYPE
 * raw_url: detectUploadUsingPOST_RAW_URL
 * @param param - param
 */
export const detectUploadUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/detect/upload'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['param'] !== undefined) {
    body = parameters['param']
  }
  if (parameters['param'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: param'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const detectUploadUsingPOST_RAW_URL = function() {
  return '/detect/upload'
}
export const detectUploadUsingPOST_TYPE = function() {
  return 'post'
}
export const detectUploadUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/detect/upload'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * errorHtml
 * request: errorHtmlUsingGET
 * url: errorHtmlUsingGETURL
 * method: errorHtmlUsingGET_TYPE
 * raw_url: errorHtmlUsingGET_RAW_URL
 */
export const errorHtmlUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const errorHtmlUsingGET_RAW_URL = function() {
  return '/error'
}
export const errorHtmlUsingGET_TYPE = function() {
  return 'get'
}
export const errorHtmlUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * errorHtml
 * request: errorHtmlUsingHEAD
 * url: errorHtmlUsingHEADURL
 * method: errorHtmlUsingHEAD_TYPE
 * raw_url: errorHtmlUsingHEAD_RAW_URL
 */
export const errorHtmlUsingHEAD = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('head', domain + path, body, queryParameters, form, config)
}
export const errorHtmlUsingHEAD_RAW_URL = function() {
  return '/error'
}
export const errorHtmlUsingHEAD_TYPE = function() {
  return 'head'
}
export const errorHtmlUsingHEADURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * errorHtml
 * request: errorHtmlUsingPOST
 * url: errorHtmlUsingPOSTURL
 * method: errorHtmlUsingPOST_TYPE
 * raw_url: errorHtmlUsingPOST_RAW_URL
 */
export const errorHtmlUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const errorHtmlUsingPOST_RAW_URL = function() {
  return '/error'
}
export const errorHtmlUsingPOST_TYPE = function() {
  return 'post'
}
export const errorHtmlUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * errorHtml
 * request: errorHtmlUsingPUT
 * url: errorHtmlUsingPUTURL
 * method: errorHtmlUsingPUT_TYPE
 * raw_url: errorHtmlUsingPUT_RAW_URL
 */
export const errorHtmlUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const errorHtmlUsingPUT_RAW_URL = function() {
  return '/error'
}
export const errorHtmlUsingPUT_TYPE = function() {
  return 'put'
}
export const errorHtmlUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * errorHtml
 * request: errorHtmlUsingDELETE
 * url: errorHtmlUsingDELETEURL
 * method: errorHtmlUsingDELETE_TYPE
 * raw_url: errorHtmlUsingDELETE_RAW_URL
 */
export const errorHtmlUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const errorHtmlUsingDELETE_RAW_URL = function() {
  return '/error'
}
export const errorHtmlUsingDELETE_TYPE = function() {
  return 'delete'
}
export const errorHtmlUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * errorHtml
 * request: errorHtmlUsingOPTIONS
 * url: errorHtmlUsingOPTIONSURL
 * method: errorHtmlUsingOPTIONS_TYPE
 * raw_url: errorHtmlUsingOPTIONS_RAW_URL
 */
export const errorHtmlUsingOPTIONS = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('options', domain + path, body, queryParameters, form, config)
}
export const errorHtmlUsingOPTIONS_RAW_URL = function() {
  return '/error'
}
export const errorHtmlUsingOPTIONS_TYPE = function() {
  return 'options'
}
export const errorHtmlUsingOPTIONSURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * errorHtml
 * request: errorHtmlUsingPATCH
 * url: errorHtmlUsingPATCHURL
 * method: errorHtmlUsingPATCH_TYPE
 * raw_url: errorHtmlUsingPATCH_RAW_URL
 */
export const errorHtmlUsingPATCH = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/error'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', domain + path, body, queryParameters, form, config)
}
export const errorHtmlUsingPATCH_RAW_URL = function() {
  return '/error'
}
export const errorHtmlUsingPATCH_TYPE = function() {
  return 'patch'
}
export const errorHtmlUsingPATCHURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/error'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * redirect
 * request: redirectUsingGET
 * url: redirectUsingGETURL
 * method: redirectUsingGET_TYPE
 * raw_url: redirectUsingGET_RAW_URL
 * @param id - id
 * @param appkey - appkey
 * @param timestamp - timestamp
 * @param noncestr - noncestr
 * @param sign - sign
 */
export const redirectUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/redirect'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['appkey'] !== undefined) {
    queryParameters['appkey'] = parameters['appkey']
  }
  if (parameters['appkey'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: appkey'))
  }
  if (parameters['timestamp'] !== undefined) {
    queryParameters['timestamp'] = parameters['timestamp']
  }
  if (parameters['timestamp'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: timestamp'))
  }
  if (parameters['noncestr'] !== undefined) {
    queryParameters['noncestr'] = parameters['noncestr']
  }
  if (parameters['noncestr'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: noncestr'))
  }
  if (parameters['sign'] !== undefined) {
    queryParameters['sign'] = parameters['sign']
  }
  if (parameters['sign'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: sign'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const redirectUsingGET_RAW_URL = function() {
  return '/redirect'
}
export const redirectUsingGET_TYPE = function() {
  return 'get'
}
export const redirectUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/redirect'
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
  if (parameters['appkey'] !== undefined) {
    queryParameters['appkey'] = parameters['appkey']
  }
  if (parameters['timestamp'] !== undefined) {
    queryParameters['timestamp'] = parameters['timestamp']
  }
  if (parameters['noncestr'] !== undefined) {
    queryParameters['noncestr'] = parameters['noncestr']
  }
  if (parameters['sign'] !== undefined) {
    queryParameters['sign'] = parameters['sign']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
