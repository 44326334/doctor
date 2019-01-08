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
 * clinicChat
 * request: clinicChatUsingGET
 * url: clinicChatUsingGETURL
 * method: clinicChatUsingGET_TYPE
 * raw_url: clinicChatUsingGET_RAW_URL
 * @param qid - qid
 */
export const clinicChatUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/chat'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['qid'] !== undefined) {
    queryParameters['qid'] = parameters['qid']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const clinicChatUsingGET_RAW_URL = function() {
  return '/chat'
}
export const clinicChatUsingGET_TYPE = function() {
  return 'get'
}
export const clinicChatUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/chat'
  if (parameters['qid'] !== undefined) {
    queryParameters['qid'] = parameters['qid']
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
 * 如果未登录，body为null
 * request: getUserInfoUsingGET_1
 * url: getUserInfoUsingGET_1URL
 * method: getUserInfoUsingGET_1_TYPE
 * raw_url: getUserInfoUsingGET_1_RAW_URL
 */
export const getUserInfoUsingGET_1 = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/clinic/free_problem/create'
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
export const getUserInfoUsingGET_1_RAW_URL = function() {
  return '/clinic/free_problem/create'
}
export const getUserInfoUsingGET_1_TYPE = function() {
  return 'get'
}
export const getUserInfoUsingGET_1URL = function(parameters = {}) {
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
 * request: getHistoryDetailUsingPOST
 * url: getHistoryDetailUsingPOSTURL
 * method: getHistoryDetailUsingPOST_TYPE
 * raw_url: getHistoryDetailUsingPOST_RAW_URL
 * @param param - param
 */
export const getHistoryDetailUsingPOST = function(parameters = {}) {
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
export const getHistoryDetailUsingPOST_RAW_URL = function() {
  return '/detect/histtory/detail'
}
export const getHistoryDetailUsingPOST_TYPE = function() {
  return 'post'
}
export const getHistoryDetailUsingPOSTURL = function(parameters = {}) {
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
 * 获取历史结果详情。
 * request: getResultDetailUsingGET
 * url: getResultDetailUsingGETURL
 * method: getResultDetailUsingGET_TYPE
 * raw_url: getResultDetailUsingGET_RAW_URL
 * @param id - id
 */
export const getResultDetailUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/detect/result/detail'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['id'] !== undefined) {
    queryParameters['id'] = parameters['id']
  }
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
export const getResultDetailUsingGET_RAW_URL = function() {
  return '/detect/result/detail'
}
export const getResultDetailUsingGET_TYPE = function() {
  return 'get'
}
export const getResultDetailUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/detect/result/detail'
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
 * 获取检测结果id的默认视图名称。
 * request: getTestResultDefaultViewTypeUsingGET
 * url: getTestResultDefaultViewTypeUsingGETURL
 * method: getTestResultDefaultViewTypeUsingGET_TYPE
 * raw_url: getTestResultDefaultViewTypeUsingGET_RAW_URL
 * @param resultId - resultId
 */
export const getTestResultDefaultViewTypeUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/detect/test_result/view_type'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['resultId'] !== undefined) {
    queryParameters['resultId'] = parameters['resultId']
  }
  if (parameters['resultId'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: resultId'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getTestResultDefaultViewTypeUsingGET_RAW_URL = function() {
  return '/detect/test_result/view_type'
}
export const getTestResultDefaultViewTypeUsingGET_TYPE = function() {
  return 'get'
}
export const getTestResultDefaultViewTypeUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/detect/test_result/view_type'
  if (parameters['resultId'] !== undefined) {
    queryParameters['resultId'] = parameters['resultId']
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
 * error
 * request: errorUsingGET
 * url: errorUsingGETURL
 * method: errorUsingGET_TYPE
 * raw_url: errorUsingGET_RAW_URL
 */
export const errorUsingGET = function(parameters = {}) {
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
export const errorUsingGET_RAW_URL = function() {
  return '/error'
}
export const errorUsingGET_TYPE = function() {
  return 'get'
}
export const errorUsingGETURL = function(parameters = {}) {
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
 * error
 * request: errorUsingHEAD
 * url: errorUsingHEADURL
 * method: errorUsingHEAD_TYPE
 * raw_url: errorUsingHEAD_RAW_URL
 */
export const errorUsingHEAD = function(parameters = {}) {
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
export const errorUsingHEAD_RAW_URL = function() {
  return '/error'
}
export const errorUsingHEAD_TYPE = function() {
  return 'head'
}
export const errorUsingHEADURL = function(parameters = {}) {
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
 * error
 * request: errorUsingPOST
 * url: errorUsingPOSTURL
 * method: errorUsingPOST_TYPE
 * raw_url: errorUsingPOST_RAW_URL
 */
export const errorUsingPOST = function(parameters = {}) {
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
export const errorUsingPOST_RAW_URL = function() {
  return '/error'
}
export const errorUsingPOST_TYPE = function() {
  return 'post'
}
export const errorUsingPOSTURL = function(parameters = {}) {
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
 * error
 * request: errorUsingPUT
 * url: errorUsingPUTURL
 * method: errorUsingPUT_TYPE
 * raw_url: errorUsingPUT_RAW_URL
 */
export const errorUsingPUT = function(parameters = {}) {
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
export const errorUsingPUT_RAW_URL = function() {
  return '/error'
}
export const errorUsingPUT_TYPE = function() {
  return 'put'
}
export const errorUsingPUTURL = function(parameters = {}) {
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
 * error
 * request: errorUsingDELETE
 * url: errorUsingDELETEURL
 * method: errorUsingDELETE_TYPE
 * raw_url: errorUsingDELETE_RAW_URL
 */
export const errorUsingDELETE = function(parameters = {}) {
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
export const errorUsingDELETE_RAW_URL = function() {
  return '/error'
}
export const errorUsingDELETE_TYPE = function() {
  return 'delete'
}
export const errorUsingDELETEURL = function(parameters = {}) {
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
 * error
 * request: errorUsingOPTIONS
 * url: errorUsingOPTIONSURL
 * method: errorUsingOPTIONS_TYPE
 * raw_url: errorUsingOPTIONS_RAW_URL
 */
export const errorUsingOPTIONS = function(parameters = {}) {
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
export const errorUsingOPTIONS_RAW_URL = function() {
  return '/error'
}
export const errorUsingOPTIONS_TYPE = function() {
  return 'options'
}
export const errorUsingOPTIONSURL = function(parameters = {}) {
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
 * error
 * request: errorUsingPATCH
 * url: errorUsingPATCHURL
 * method: errorUsingPATCH_TYPE
 * raw_url: errorUsingPATCH_RAW_URL
 */
export const errorUsingPATCH = function(parameters = {}) {
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
export const errorUsingPATCH_RAW_URL = function() {
  return '/error'
}
export const errorUsingPATCH_TYPE = function() {
  return 'patch'
}
export const errorUsingPATCHURL = function(parameters = {}) {
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
 * historyList
 * request: historyListUsingGET
 * url: historyListUsingGETURL
 * method: historyListUsingGET_TYPE
 * raw_url: historyListUsingGET_RAW_URL
 */
export const historyListUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/history'
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
export const historyListUsingGET_RAW_URL = function() {
  return '/history'
}
export const historyListUsingGET_TYPE = function() {
  return 'get'
}
export const historyListUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/history'
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
 * @param to - to
 * @param sign - sign
 * @param rid - rid
 * @param qid - qid
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
  if (parameters['to'] !== undefined) {
    queryParameters['to'] = parameters['to']
  }
  if (parameters['to'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: to'))
  }
  if (parameters['sign'] !== undefined) {
    queryParameters['sign'] = parameters['sign']
  }
  if (parameters['sign'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: sign'))
  }
  if (parameters['rid'] !== undefined) {
    queryParameters['rid'] = parameters['rid']
  }
  if (parameters['qid'] !== undefined) {
    queryParameters['qid'] = parameters['qid']
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
  if (parameters['to'] !== undefined) {
    queryParameters['to'] = parameters['to']
  }
  if (parameters['sign'] !== undefined) {
    queryParameters['sign'] = parameters['sign']
  }
  if (parameters['rid'] !== undefined) {
    queryParameters['rid'] = parameters['rid']
  }
  if (parameters['qid'] !== undefined) {
    queryParameters['qid'] = parameters['qid']
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
 * result
 * request: resultUsingGET
 * url: resultUsingGETURL
 * method: resultUsingGET_TYPE
 * raw_url: resultUsingGET_RAW_URL
 * @param id - id
 */
export const resultUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/result'
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
export const resultUsingGET_RAW_URL = function() {
  return '/result'
}
export const resultUsingGET_TYPE = function() {
  return 'get'
}
export const resultUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/result'
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
  let path = '/test/login'
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
  return '/test/login'
}
export const loginUsingGET_TYPE = function() {
  return 'get'
}
export const loginUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/test/login'
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
 * 获取签名信息，开发调试用
 * request: getSignUsingGET
 * url: getSignUsingGETURL
 * method: getSignUsingGET_TYPE
 * raw_url: getSignUsingGET_RAW_URL
 */
export const getSignUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/test/sign'
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
  return '/test/sign'
}
export const getSignUsingGET_TYPE = function() {
  return 'get'
}
export const getSignUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/test/sign'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * upload
 * request: uploadUsingGET
 * url: uploadUsingGETURL
 * method: uploadUsingGET_TYPE
 * raw_url: uploadUsingGET_RAW_URL
 */
export const uploadUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/upload'
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
export const uploadUsingGET_RAW_URL = function() {
  return '/upload'
}
export const uploadUsingGET_TYPE = function() {
  return 'get'
}
export const uploadUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/upload'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 微信用户信息
 * request: getUserInfoUsingGET
 * url: getUserInfoUsingGETURL
 * method: getUserInfoUsingGET_TYPE
 * raw_url: getUserInfoUsingGET_RAW_URL
 */
export const getUserInfoUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/user/info'
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
export const getUserInfoUsingGET_RAW_URL = function() {
  return '/user/info'
}
export const getUserInfoUsingGET_TYPE = function() {
  return 'get'
}
export const getUserInfoUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/user/info'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取js签名
 * request: getJsSignUsingGET
 * url: getJsSignUsingGETURL
 * method: getJsSignUsingGET_TYPE
 * raw_url: getJsSignUsingGET_RAW_URL
 * @param url - url
 */
export const getJsSignUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/user/jssdk/get'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['url'] !== undefined) {
    queryParameters['url'] = parameters['url']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getJsSignUsingGET_RAW_URL = function() {
  return '/user/jssdk/get'
}
export const getJsSignUsingGET_TYPE = function() {
  return 'get'
}
export const getJsSignUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/user/jssdk/get'
  if (parameters['url'] !== undefined) {
    queryParameters['url'] = parameters['url']
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
 * 绑定手机号
 * request: bindMobileUsingPOST
 * url: bindMobileUsingPOSTURL
 * method: bindMobileUsingPOST_TYPE
 * raw_url: bindMobileUsingPOST_RAW_URL
 * @param param - param
 */
export const bindMobileUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/user/mobile/bind'
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
export const bindMobileUsingPOST_RAW_URL = function() {
  return '/user/mobile/bind'
}
export const bindMobileUsingPOST_TYPE = function() {
  return 'post'
}
export const bindMobileUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/user/mobile/bind'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 查询手机号是否已绑定
 * request: getMobileBindStatusUsingGET
 * url: getMobileBindStatusUsingGETURL
 * method: getMobileBindStatusUsingGET_TYPE
 * raw_url: getMobileBindStatusUsingGET_RAW_URL
 * @param openId - 微信openId
 */
export const getMobileBindStatusUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/user/mobile/check'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['openId'] !== undefined) {
    body = parameters['openId']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getMobileBindStatusUsingGET_RAW_URL = function() {
  return '/user/mobile/check'
}
export const getMobileBindStatusUsingGET_TYPE = function() {
  return 'get'
}
export const getMobileBindStatusUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/user/mobile/check'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * 获取短信验证码
 * request: getSmsVerificationCodeUsingGET
 * url: getSmsVerificationCodeUsingGETURL
 * method: getSmsVerificationCodeUsingGET_TYPE
 * raw_url: getSmsVerificationCodeUsingGET_RAW_URL
 * @param mobile - 手机号
 */
export const getSmsVerificationCodeUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/user/sms/get'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['mobile'] !== undefined) {
    body = parameters['mobile']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getSmsVerificationCodeUsingGET_RAW_URL = function() {
  return '/user/sms/get'
}
export const getSmsVerificationCodeUsingGET_TYPE = function() {
  return 'get'
}
export const getSmsVerificationCodeUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/user/sms/get'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * messageHandler
 * request: messageHandlerUsingGET
 * url: messageHandlerUsingGETURL
 * method: messageHandlerUsingGET_TYPE
 * raw_url: messageHandlerUsingGET_RAW_URL
 */
export const messageHandlerUsingGET = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/weixin/message'
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
export const messageHandlerUsingGET_RAW_URL = function() {
  return '/weixin/message'
}
export const messageHandlerUsingGET_TYPE = function() {
  return 'get'
}
export const messageHandlerUsingGETURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/weixin/message'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * messageHandler
 * request: messageHandlerUsingHEAD
 * url: messageHandlerUsingHEADURL
 * method: messageHandlerUsingHEAD_TYPE
 * raw_url: messageHandlerUsingHEAD_RAW_URL
 */
export const messageHandlerUsingHEAD = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/weixin/message'
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
export const messageHandlerUsingHEAD_RAW_URL = function() {
  return '/weixin/message'
}
export const messageHandlerUsingHEAD_TYPE = function() {
  return 'head'
}
export const messageHandlerUsingHEADURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/weixin/message'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * messageHandler
 * request: messageHandlerUsingPOST
 * url: messageHandlerUsingPOSTURL
 * method: messageHandlerUsingPOST_TYPE
 * raw_url: messageHandlerUsingPOST_RAW_URL
 */
export const messageHandlerUsingPOST = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/weixin/message'
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
export const messageHandlerUsingPOST_RAW_URL = function() {
  return '/weixin/message'
}
export const messageHandlerUsingPOST_TYPE = function() {
  return 'post'
}
export const messageHandlerUsingPOSTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/weixin/message'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * messageHandler
 * request: messageHandlerUsingPUT
 * url: messageHandlerUsingPUTURL
 * method: messageHandlerUsingPUT_TYPE
 * raw_url: messageHandlerUsingPUT_RAW_URL
 */
export const messageHandlerUsingPUT = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/weixin/message'
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
export const messageHandlerUsingPUT_RAW_URL = function() {
  return '/weixin/message'
}
export const messageHandlerUsingPUT_TYPE = function() {
  return 'put'
}
export const messageHandlerUsingPUTURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/weixin/message'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * messageHandler
 * request: messageHandlerUsingDELETE
 * url: messageHandlerUsingDELETEURL
 * method: messageHandlerUsingDELETE_TYPE
 * raw_url: messageHandlerUsingDELETE_RAW_URL
 */
export const messageHandlerUsingDELETE = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/weixin/message'
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
export const messageHandlerUsingDELETE_RAW_URL = function() {
  return '/weixin/message'
}
export const messageHandlerUsingDELETE_TYPE = function() {
  return 'delete'
}
export const messageHandlerUsingDELETEURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/weixin/message'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * messageHandler
 * request: messageHandlerUsingOPTIONS
 * url: messageHandlerUsingOPTIONSURL
 * method: messageHandlerUsingOPTIONS_TYPE
 * raw_url: messageHandlerUsingOPTIONS_RAW_URL
 */
export const messageHandlerUsingOPTIONS = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/weixin/message'
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
export const messageHandlerUsingOPTIONS_RAW_URL = function() {
  return '/weixin/message'
}
export const messageHandlerUsingOPTIONS_TYPE = function() {
  return 'options'
}
export const messageHandlerUsingOPTIONSURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/weixin/message'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * messageHandler
 * request: messageHandlerUsingPATCH
 * url: messageHandlerUsingPATCHURL
 * method: messageHandlerUsingPATCH_TYPE
 * raw_url: messageHandlerUsingPATCH_RAW_URL
 */
export const messageHandlerUsingPATCH = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/weixin/message'
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
export const messageHandlerUsingPATCH_RAW_URL = function() {
  return '/weixin/message'
}
export const messageHandlerUsingPATCH_TYPE = function() {
  return 'patch'
}
export const messageHandlerUsingPATCHURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/weixin/message'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
