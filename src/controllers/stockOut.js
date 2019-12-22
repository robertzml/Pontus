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

  async get(id) {
    const res = await axios._get({ url: '/stockOut/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/stockOut/create', data: entity })
    return res.data
  },

  // 出库任务列表
  async getTaskList(stockOutId) {
    const res = await axios._get({ url: '/stockOut/taskList', params: { stockOutId: stockOutId } })
    return res.data
  },

  // 添加出库任务
  async addTask(entity) {
    const res = await axios._post({ url: '/stockOut/addTask', data: entity })
    return res.data
  }
}
