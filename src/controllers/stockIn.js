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

  async get(id) {
    const res = await axios._get({ url: '/stockIn/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/stockIn/create', data: entity })
    return res.data
  },

  // 添加入库任务
  async addTask(entity) {
    const res = await axios._post({ url: '/stockIn/addTask', data: entity })
    return res.data
  }
}
