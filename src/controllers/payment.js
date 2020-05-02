import * as axios from '../plugins/axios'

export default {
  name: 'payment',

  // 获取缴费列表
  async getList(customerId) {
    const res = await axios._get({ url: '/payment/list', params: { customerId: customerId } })
    return res.data
  },

  // 获取缴费记录
  async get(id) {
    const res = await axios._get({ url: '/payment/get', params: { id: id } })
    return res.data
  },

  // 添加缴费
  async create(entity) {
    const res = await axios._post({ url: '/payment/create', data: entity })
    return res.data
  },

  // 删除缴费记录
  async delete(data) {
    const res = await axios._postqs({ url: '/payment/delete', params: data })
    return res.data
  }
}
