import * as axios from '../plugins/axios'

export default {
  name: 'expenseItem',

  async get(id) {
    const res = await axios._get({ url: '/expenseItem/get', params: { id: id } })
    return res.data
  },

  async getList() {
    const res = await axios._get({ url: '/expenseItem/list' })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/expenseItem/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/expenseItem/update', data: entity })
    return res.data
  }
}
