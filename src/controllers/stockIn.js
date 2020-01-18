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

  /**
   * 按入库日期获取入库单
   * @param {入库日期}} inTime
   */
  async getListByTime(inTime) {
    const res = await axios._get({ url: '/stockIn/listByTime', params: { inTime: inTime } })
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

  // 确认入库单
  async confirm(data) {
    const res = await axios._postqs({ url: '/stockIn/confirm', params: data })
    return res.data
  },

  // 删除入库单
  async deleteStockIn(data) {
    const res = await axios._postqs({ url: '/stockIn/delete', params: data })
    return res.data
  },

  // 入库任务列表
  async getTaskList(stockInId) {
    const res = await axios._get({ url: '/stockIn/taskList', params: { stockInId: stockInId } })
    return res.data
  },

  // 获取入库任务
  async getTask(taskId) {
    const res = await axios._get({ url: '/stockIn/getTask', params: { taskId: taskId } })
    return res.data
  },

  // 添加入库任务
  async addTask(entity) {
    const res = await axios._post({ url: '/stockIn/addTask', data: entity })
    return res.data
  },

  // 确认入库任务
  async finishTask(data) {
    const res = await axios._postqs({ url: '/stockIn/finishTask', params: data })
    return res.data
  }
}
