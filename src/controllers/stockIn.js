import * as axios from '../plugins/axios'

export default {
  name: 'stockIn',

  async getMonthGroup() {
    const res = await axios._get({ url: '/stockIn/getMonthGroup' })
    return res.data
  },

  /**
   * 获取入库单列表
   */
  async getList() {
    const res = await axios._get({ url: '/stockIn/list' })
    return res.data
  },

  /**
   * 按入库月份获取入库单
   * @param {入库月份} monthTime
   */
  async getListByMonth(monthTime) {
    let mt = monthTime.replace(/-/, '')
    const res = await axios._get({ url: '/stockIn/listByMonth', params: { monthTime: mt } })
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

  /**
   * 获取未完成入库单
   */
  async getUnfinish() {
    const res = await axios._get({ url: '/stockIn/listUnfinish' })
    return res.data
  },

  async find(id) {
    const res = await axios._get({ url: '/stockIn/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/stockIn/create', data: entity })
    return res.data
  },

  // 编辑入库单
  async update(entity) {
    const res = await axios._post({ url: '/stockIn/update', data: entity })
    return res.data
  },

  // 确认入库单
  async confirm(data) {
    const res = await axios._postqs({ url: '/stockIn/confirm', params: data })
    return res.data
  },

  // 撤回入库单
  async revert(data) {
    const res = await axios._postqs({ url: '/stockIn/revert', params: data })
    return res.data
  },

  // 删除入库单
  async deleteStockIn(data) {
    const res = await axios._postqs({ url: '/stockIn/delete', params: data })
    return res.data
  },

  // 获取入库计费
  async getBilling(stockInId) {
    const res = await axios._get({ url: '/stockIn/getBillings', params: { stockInId: stockInId } })
    return res.data
  },

  // 设置入库费用
  async setBilling(entity) {
    const res = await axios._post({ url: '/stockIn/setBilling', data: entity })
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

  /**
   * 按日期获取入库任务
   * @param {日期，合同ID} param0
   */
  async getTaskByDate({ date, contractId }) {
    const res = await axios._get({ url: '/stockIn/findTaskByDate', params: { date: date, contractId: contractId } })
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
  },

  // 编辑入库任务
  async updateTask(entity) {
    const res = await axios._post({ url: '/stockIn/updateTask', data: entity })
    return res.data
  },

  // 删除入库任务
  async deleteTask(data) {
    const res = await axios._postqs({ url: '/stockIn/deleteTask', params: data })
    return res.data
  }
}
