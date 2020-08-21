import * as axios from '../plugins/axios'

export default {
  name: 'carryOut',

  async find(id) {
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
   * 根据入库任务查找
   * @param {入库任务ID}} taskId
   */
  async listByStockInTask(taskId) {
    const res = await axios._get({ url: '/carryOutTask/findByStockInTask', params: { taskId: taskId } })
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
   * 根据托盘码获取当前搬运出库任务
   * @param {托盘码} trayCode
   */
  async findByTray(trayCode) {
    const res = await axios._get({ url: '/carryOutTask/findByTray', params: { trayCode: trayCode } })
    return res.data
  },

  /**
   * 根据托盘码查找进行中的搬运任务
   * @param {托盘码} trayCode
   */
  async findWorking(trayCode) {
    const res = await axios._get({ url: '/carryOutTask/findWorking', params: { trayCode: trayCode } })
    return res.data
  },

  /**
   * 按库存入库时间查找
   * @param {合同ID，入库时间} param0
   */
  async listByInTime({ contractId, inTime }) {
    const res = await axios._get({ url: '/carryOutTask/findByInTime', params: { contractId: contractId, inTime: inTime } })
    return res.data
  },

  /**
   * 按库存出库时间查找
   * @param {合同ID，出库时间} param0
   */
  async listByOutTime({ contractId, outTime }) {
    const res = await axios._get({ url: '/carryOutTask/findByOutTime', params: { contractId: contractId, outTime: outTime } })
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

  // 编辑搬运出库任务
  async editTask(entity) {
    const res = await axios._post({ url: '/carryOutTask/editTask', data: entity })
    return res.data
  },

  // 删除搬运入库任务
  async delete(data) {
    const res = await axios._postqs({ url: '/carryOutTask/delete', params: data })
    return res.data
  }
}
