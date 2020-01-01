import * as axios from '../axios'

export default {
  name: 'carryOut',

  async create(entity) {
    const res = await axios._post({ url: '/carryOutTask/create', data: entity })
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
   * 获取待办出库搬运任务
   */
  async listToDo() {
    const res = await axios._get({ url: '/carryOutTask/listToDo ' })
    return res.data
  }
}
