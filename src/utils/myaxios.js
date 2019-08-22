// 这里封装axios的基准路径

import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://192.168.1.104:8888/api/private/v1/'

export default axios
