import * as axios from '../plugins/axios'

export default {
  name: 'carryIn',

  async create(entity) {
    const res = await axios._post({ url: '/carryInTask/create', data: entity })
    return res.data
  },

  async get(id) {
    const res = await axios._get({ url: '/carryInTask/get', params: { id: id } })
    return res.data
  },

  // 获取所有搬运入库任务
  async getList() {
    const res = await axios._get({ url: '/carryInTask/list' })
    return res.data
  },

  /**
   * 根据入库任务查找
   * @param {入库任务ID}} taskId
   */
  async listByStockInTask(taskId) {
    const res = await axios._get({ url: '/carryInTask/findByStockInTask', params: { taskId: taskId } })
    return res.data
  },

  /**
   * 根据出库任务查找
   * @param {出库任务ID}} taskId
   */
  async listByStockOutTask(taskId) {
    const res = await axios._get({ url: '/carryInTask/findByStockOutTask', params: { taskId: taskId } })
    return res.data
  },

  /**
   * 根据托盘码搜索入库任务
   * @param {托盘码} trayCode
   */
  async listByTray(trayCode) {
    const res = await axios._get({ url: '/carryInTask/findByTray', params: { trayCode: trayCode } })
    return res.data
  },

  /**
   * 获取用户当前接单任务
   * @param {用户ID} userId
   */
  async findCurrentReceive(userId) {
    const res = await axios._get({ url: '/carryInTask/findCurrentReceive', params: { userId: userId } })
    return res.data
  },

  /**
   * 任务接单
   * @param {任务数据} entity
   */
  async receiveTask(entity) {
    const res = await axios._post({ url: '/carryInTask/receiveTask', data: entity })
    return res.data
  },

  /**
   * 任务上架
   * @param {任务数据} entity
   */
  async enterTask(entity) {
    const res = await axios._post({ url: '/carryInTask/enterTask', data: entity })
    return res.data
  },

  /**
   * 任务确认
   * @param {任务数据} entity
   */
  async finishTask(entity) {
    const res = await axios._post({ url: '/carryInTask/finishTask', data: entity })
    return res.data
  },

  /**
   * 任务取消接单
   * @param {任务数据} entity
   */
  async unReceiveTask(entity) {
    const res = await axios._post({ url: '/carryInTask/unReceiveTask', data: entity })
    return res.data
  },

  // 删除搬运入库任务
  async delete(data) {
    const res = await axios._postqs({ url: '/carryInTask/delete', params: data })
    return res.data
  }
}
