import * as axios from '../axios'

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

  async get(id) {
    const res = await axios._get({ url: '/cargo/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/cargo/create', data: entity })
    return res.data
  }
}
