import * as axios from '../plugins/axios'

export default {
  name: 'cargo',

  async getList(customerId) {
    const res = await axios._get({ url: '/cargo/list', params: { customerId: customerId } })
    return res.data
  },

  async getListByNumber(customerNumber) {
    const res = await axios._get({ url: '/cargo/listByNumber', params: { customerNumber: customerNumber } })
    return res.data
  },

  async find(id) {
    const res = await axios._get({ url: '/cargo/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/cargo/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/cargo/update', data: entity })
    return res.data
  },

  // 删除货品
  async delete(data) {
    const res = await axios._postqs({ url: '/cargo/delete', params: data })
    return res.data
  }
}
