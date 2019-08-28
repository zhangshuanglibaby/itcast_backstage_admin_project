import axios from '@/utils/myaxios.js'

// 获取所有角色列表数据
export const getAllRoles = () => {
  return axios({
    url: 'roles'
  })
}
