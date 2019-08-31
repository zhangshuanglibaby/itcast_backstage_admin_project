import axios from '@/utils/myaxios.js'

export const getAllParams = (id, sel) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
