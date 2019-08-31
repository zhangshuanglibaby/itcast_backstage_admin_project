import axios from '@/utils/myaxios.js'

// 获取商品列表数据
export const getAllGoods = (params) => {
  return axios({
    url: 'goods',
    params
  })
}

// 删除商品
export const delGood = (id) => {
  return axios({
    url: `goods/${id}`,
    method: 'delete'
  })
}
