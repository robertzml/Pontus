import * as axios from '../plugins/axios'

export default {
  name: 'carryOut',

  async create(entity) {
    const res = await axios._post({ url: '/carryOutTask/create', data: entity })
    return res.data
  },

  async get(id) {
    const res = await axios._get({ url: '/carryOutTask/get', params: { id: id } })
    return res.data
  },

  // 获取所有搬运出库任务
  async getList() {
    const res = await axios._get({ url: '/carryOutTask/list' })
    return res.data
  },

  /**
   * 根据出库任务查找
   * @param {出库任务ID}} taskId
   */
  async listByStockOutTask(taskId) {
    const res = await axios._get({ url: '/carryOutTask/findByStockOutTask', params: { taskId: taskId } })
    return res.data
  },

  /**
   * 获取待办出库搬运任务仓位码
   */
  async listToOut() {
    const res = await axios._get({ url: '/carryOutTask/listToOut' })
    return res.data
  },

  /**
   * 根据仓位获取出库搬运任务
   * @param {仓位码} positionNumber
   */
  async findByPosition(positionNumber) {
    const res = await axios._get({ url: '/carryOutTask/findByPosition', params: { positionNumber: positionNumber } })
    return res.data
  },

  /**
   * 获取用户当前接单任务
   * @param {用户ID} userId
   */
  async findCurrentReceive(userId) {
    const res = await axios._get({ url: '/carryOutTask/findCurrentReceive', params: { userId: userId } })
    return res.data
  },

  /**
   * 根据托盘码获取当前搬运出库任务
   * @param {托盘码} trayCode
   */
  async findByTray(trayCode) {
    const res = await axios._get({ url: '/carryOutTask/findByTray', params: { trayCode: trayCode } })
    return res.data
  },

  /**
   * 任务接单
   * @param {任务数据} entity
   */
  async receiveTask(entity) {
    const res = await axios._post({ url: '/carryOutTask/receiveTask', data: entity })
    return res.data
  },

  /**
   * 任务下架
   * @param {任务数据} entity
   */
  async leaveTask(entity) {
    const res = await axios._post({ url: '/carryOutTask/leaveTask', data: entity })
    return res.data
  },

  /**
   * 出库直接下架
   * @param {任务数据} entity
   */
  async leaveUnassign(entity) {
    const res = await axios._post({ url: '/carryOutTask/leaveUnassignTask', data: entity })
    return res.data
  },

  /**
   * 任务确认
   * @param {任务数据} entity
   */
  async finishTask(entity) {
    const res = await axios._post({ url: '/carryOutTask/finishTask', data: entity })
    return res.data
  },

  // 删除搬运入库任务
  async delete(data) {
    const res = await axios._postqs({ url: '/carryOutTask/delete', params: data })
    return res.data
  }
}
