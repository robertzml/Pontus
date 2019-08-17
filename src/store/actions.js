import * as axios from '../axios'

export default {
  async getCustomer(context, id) {
    const res = await axios._get({ url: '/customer/get', params: { id: id } })
    return res.data
  },

  async getCustomerList() {
    const res = await axios._get({ url: '/customer/list' })
    return res.data
  },

  async createCustomer(context, entity) {
    const res = await axios._post({ url: '/customer/create', data: entity })
    return res.data
  },

  async updateCustomer(context, entity) {
    const res = await axios._post({ url: '/customer/update', data: entity })
    return res.data
  }
}
