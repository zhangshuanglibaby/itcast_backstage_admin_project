import axios from '@/utils/myaxios.js'

// 获取所有权限列表
export const getAllRights = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 获取左侧菜单权限
export const getLeftMenus = () => {
  return axios({
    url: 'menus'
  })
}
