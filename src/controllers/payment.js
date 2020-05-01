import * as axios from '../plugins/axios'

export default {
  name: 'payment',

  // 获取缴费记录
  async getList(customerId) {
    const res = await axios._get({ url: '/payment/list', params: { customerId: customerId } })
    return res.data
  },

  // 添加缴费
  async create(entity) {
    const res = await axios._post({ url: '/payment/create', data: entity })
    return res.data
  }
}
