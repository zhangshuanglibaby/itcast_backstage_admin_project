// 这里封装axios的基准路径

import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://192.168.1.103:8888/api/private/v1/'

// 在发送请求前,使用拦截器,设置请求报文
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
//   console.log(config)
  // 在请求头添加以键为Authorization值为token
  let mytoken = localStorage.getItem('itcast_admin_token')
  config.headers.Authorization = mytoken
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
