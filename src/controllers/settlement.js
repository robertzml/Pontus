import * as axios from '../plugins/axios'

export default {
  name: 'settlement',

  // 获取结算列表
  async getList(customerId) {
    const res = await axios._get({ url: '/settlement/list', params: { customerId: customerId } })
    return res.data
  },

  // 获取结算记录
  async find(id) {
    const res = await axios._get({ url: '/settlement/get', params: { id: id } })
    return res.data
  },

  // 添加结算
  async create(entity) {
    const res = await axios._post({ url: '/settlement/create', data: entity })
    return res.data
  },

  // 删除结算记录
  async delete(data) {
    const res = await axios._postqs({ url: '/settlement/delete', params: data })
    return res.data
  },

  // 获取入库费用
  async getPeriodInBilling({ customerId, startTime, endTime }) {
    const res = await axios._get({
      url: '/settlement/getPeriodInBilling',
      params: { customerId: customerId, startTime: startTime, endTime: endTime }
    })
    return res.data
  },

  // 获取出库费用
  async getPeriodOutBilling({ customerId, startTime, endTime }) {
    const res = await axios._get({
      url: '/settlement/getPeriodOutBilling',
      params: { customerId: customerId, startTime: startTime, endTime: endTime }
    })
    return res.data
  },

  // 获取冷藏费用
  async getPeriodColdFee({ customerId, startTime, endTime }) {
    const res = await axios._get({
      url: '/settlement/getPeriodColdFee',
      params: { customerId: customerId, startTime: startTime, endTime: endTime }
    })
    return res.data
  }
}
