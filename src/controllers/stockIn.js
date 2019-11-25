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

  // 获取当前接单任务
  async findCurrentReceive(userId) {
    const res = await axios._get({ url: '/stockIn/findCurrentReceive', params: { userId: userId } })
    return res.data
  },

  // 添加入库任务
  async addTask(entity) {
    const res = await axios._post({ url: '/stockIn/addTask', data: entity })
    return res.data
  },

  // 根据托盘码搜索入库任务
  async findTask(trayCode) {
    const res = await axios._get({ url: '/stockIn/findTask', params: { trayCode: trayCode } })
    return res.data
  },

  // 任务接单
  async receiveTask(entity) {
    const res = await axios._post({ url: '/stockIn/receiveTask', data: entity })
    return res.data
  },

  // 任务上架
  async enterTask(entity) {
    const res = await axios._post({ url: '/stockIn/enterTask', data: entity })
    return res.data
  },

  // 任务确认
  async finishTask(entity) {
    const res = await axios._post({ url: '/stockIn/finishTask', data: entity })
    return res.data
  }
}
