import axios from '@/utils/myaxios.js'

// 获取用户数据列表
export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}

// 添加用户
export const addRole = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 编辑用户
export const editRole = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}
