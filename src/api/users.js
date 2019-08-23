import axios from '@/utils/myaxios.js'

export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}
