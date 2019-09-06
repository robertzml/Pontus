import * as axios from '../axios'

export default {
  name: 'customer',

  async get(id) {
    const res = await axios._get({ url: '/customer/get', params: { id: id } })
    return res.data
  },

  async getList() {
    const res = await axios._get({ url: '/customer/list' })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/customer/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/customer/update', data: entity })
    return res.data
  }
}
