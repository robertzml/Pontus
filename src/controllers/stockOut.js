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
   * 按出库月份获取出库单
   * @param {出库月份} monthTime
   */
  async getListByMonth(monthTime) {
    let mt = monthTime.replace(/-/, '')
    const res = await axios._get({ url: '/stockOut/listByMonth', params: { monthTime: mt } })
    return res.data
  },

  /**
   * 获取未完成出库单
   */
  async getUnfinish() {
    const res = await axios._get({ url: '/stockOut/listUnfinish' })
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

  async find(id) {
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

  // 撤回出库单
  async revert(data) {
    const res = await axios._postqs({ url: '/stockOut/revert', params: data })
    return res.data
  },

  // 删除出库单
  async deleteStockOut(data) {
    const res = await axios._postqs({ url: '/stockOut/delete', params: data })
    return res.data
  },

  // 获取出库计费
  async getBilling(stockOutId) {
    const res = await axios._get({ url: '/stockOut/getBillings', params: { stockOutId: stockOutId } })
    return res.data
  },

  // 设置出库费用
  async setBilling(entity) {
    const res = await axios._post({ url: '/stockOut/setBilling', data: entity })
    return res.data
  },

  // 设置冷藏费差价
  async setDiffCold(data) {
    const res = await axios._postqs({ url: '/stockOut/setDiffCold', params: data })
    return res.data
  },

  // 出库任务列表
  async getTaskList(stockOutId) {
    const res = await axios._get({ url: '/stockOut/taskList', params: { stockOutId: stockOutId } })
    return res.data
  },

  // 获取出库任务
  async getTask(taskId) {
    const res = await axios._get({ url: '/stockOut/getTask', params: { taskId: taskId } })
    return res.data
  },

  /**
   * 按日期获取出库任务
   * @param {日期，合同ID} param0
   */
  async getTaskByDate({ date, contractId }) {
    const res = await axios._get({ url: '/stockOut/findTaskByDate', params: { date: date, contractId: contractId } })
    return res.data
  },

  // 添加出库任务
  async addPositionOut(data) {
    const res = await axios._post({ url: '/stockOut/addPositionOut', data: data })
    return res.data
  },

  // 添加普通出库任务
  async addNormalOut(data) {
    const res = await axios._post({ url: '/stockOut/addNormalOut', data: data })
    return res.data
  },

  // 编辑出库任务
  async editTask(data) {
    const res = await axios._post({ url: '/stockOut/editTask', data: data })
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
  },

  // 扫托盘码出库
  async scanCarryOut(data) {
    const res = await axios._post({ url: '/stockOut/scanCarryOut', data: data })
    return res.data
  }
}
