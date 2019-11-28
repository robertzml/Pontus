import * as axios from '../axios'

export default {
  name: 'stockOut',

  async getMonthGroup() {
    const res = await axios._get({ url: '/stockOut/getMonthGroup' })
    return res.data
  },

  async getList(monthTime) {
    const res = await axios._get({ url: '/stockOut/list', params: { monthTime: monthTime } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/stockOut/create', data: entity })
    return res.data
  }
}
