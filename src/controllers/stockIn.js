import * as axios from '../axios'

export default {
  name: 'stockIn',

  async getMonthGroup() {
    const res = await axios._get({ url: '/stockIn/getMonthGroup' })
    return res.data
  },

  async getList(monthTime) {
    const res = await axios._get({ url: '/stockIn/list', params: { monthTime: monthTime } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/stockIn/create', data: entity })
    return res.data
  }
}
