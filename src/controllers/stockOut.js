import * as axios from '../plugins/axios'

export default {
  name: 'stockOut',

  async getMonthGroup() {
    const res = await axios._get({ url: '/stockOut/getMonthGroup' })
    return res.data
  },

  async getList() {
    const res = await axios._get({ url: '/stockOut/list' })
    return res.data
  },

  /**
   * 按出库月份获取入库单
   * @param {出库月份} monthTime
   */
  async getListByMonth(monthTime) {
    let mt = monthTime.replace(/-/, '')
    const res = await axios._get({ url: '/stockOut/listByMonth', params: { monthTime: mt } })
    return res.data
  },

  /**
   * 按出库日期获取出库单
   * @param {出库日期}} outTime
   */
  async getListByTime(outTime) {
    const res = await axios._get({ url: '/stockOut/listByTime', params: { outTime: outTime } })
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

  // 编辑出库单
  async update(entity) {
    const res = await axios._post({ url: '/stockOut/update', data: entity })
    return res.data
  },

  // 确认出库单
  async confirm(data) {
    const res = await axios._postqs({ url: '/stockOut/confirm', params: data })
    return res.data
  },

  // 删除出库单
  async deleteStockOut(data) {
    const res = await axios._postqs({ url: '/stockOut/delete', params: data })
    return res.data
  },

  // 出库任务列表
  async getTaskList(stockOutId) {
    const res = await axios._get({ url: '/stockOut/taskList', params: { stockOutId: stockOutId } })
    return res.data
  },

  // 获取入库任务
  async getTask(taskId) {
    const res = await axios._get({ url: '/stockOut/getTask', params: { taskId: taskId } })
    return res.data
  },

  // 添加出库任务
  async addTask(entity) {
    const res = await axios._post({ url: '/stockOut/addTask', data: entity })
    return res.data
  },

  // 确认出库任务
  async finishTask(data) {
    const res = await axios._postqs({ url: '/stockOut/finishTask', params: data })
    return res.data
  },

  // 删除出库任务
  async deleteTask(data) {
    const res = await axios._postqs({ url: '/stockOut/deleteTask', params: data })
    return res.data
  }
}
