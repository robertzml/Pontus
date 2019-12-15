import * as axios from '../axios'

export default {
  name: 'carryIn',

  async create(entity) {
    const res = await axios._post({ url: '/carryInTask/create', data: entity })
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

  // 根据托盘码搜索入库任务
  async listByTray(trayCode) {
    const res = await axios._get({ url: '/carryInTask/findByTray', params: { trayCode: trayCode } })
    return res.data
  }
}
