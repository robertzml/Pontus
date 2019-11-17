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

  async create(entity, tasks) {
    const res = await axios._post({ url: '/stockOut/create', data: { stockOut: entity, tasks: tasks } })
    return res.data
  }
}
