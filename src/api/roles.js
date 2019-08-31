import axios from '@/utils/myaxios.js'

// 获取所有角色列表数据
export const getAllRoles = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色指定权限
export const delRights = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 编辑提交角色
export const editRoleRights = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}

// 添加角色
export const addRole = (data) => {
  return axios({
    url: 'roles',
    method: 'post',
    data
  })
}
