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

// 分配角色用户
export const grantRoleById = (id, rid) => {
  return axios({
    url: `users/${id}/role`,
    method: 'put',
    data: { rid }
  })
}

// 修改用户状态
export const changeUserStatus = (uId, type) => {
  return axios({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}
