import * as axios from '../plugins/axios'

export default {
  name: 'store',

  /**
   * 获取所有库存
   */
  async list() {
    const res = await axios._get({ url: '/store/list' })
    return res.data
  },

  async find(id) {
    const res = await axios._get({ url: '/store/get', params: { id: id } })
    return res.data
  },

  /**
   * 按仓位查找在库库存
   * @param {仓位ID} positionId
   */
  async findStoreIn(positionId) {
    const res = await axios._get({ url: '/store/findStoreIn', params: { positionId: positionId } })
    return res.data
  },

  /**
   * 按合同查找库存
   * @param {合同ID} contractId
   */
  async findByContract(contractId) {
    const res = await axios._get({
      url: '/store/findByContract',
      params: { contractId: contractId }
    })
    return res.data
  },

  /**
   * 按货品查找库存
   * @param {合同ID，货品ID} param0
   */
  async findByCargo({ contractId, cargoId }) {
    const res = await axios._get({
      url: '/store/findByCargo',
      params: { contractId: contractId, cargoId: cargoId }
    })
    return res.data
  },

  /**
   * 按托盘码查找库存
   * @param {托盘码} trayCode
   */
  async findByTray(trayCode) {
    const res = await axios._get({
      url: '/store/findByTray',
      params: { trayCode: trayCode }
    })
    return res.data
  },

  /**
   * 按货架码查找最外侧库存
   * @param {货架码} shelfCode
   */
  async findOutside(shelfCode) {
    const res = await axios._get({
      url: '/store/findOutside',
      params: { shelfCode: shelfCode }
    })
    return res.data
  },

  /**
   * 出库时查找库存
   * @param {合同ID，货品ID} param0
   */
  async findForStockOut({ contractId, cargoId }) {
    const res = await axios._get({
      url: '/store/findForStockOut',
      params: { contractId: contractId, cargoId: cargoId }
    })
    return res.data
  },

  /**
   * 获取指定仓位托盘码
   * @param {仓位ID} positionId
   */
  async getPositionTray(positionId) {
    const res = await axios._get({
      url: '/store/getPositionTray',
      params: { positionId: positionId }
    })
    return res.data
  },

  /**
   * 获取库存记录链表
   * @param {库存ID} id
   */
  async findInOrder(id) {
    const res = await axios._get({
      url: '/store/getInOrder',
      params: { id: id }
    })
    return res.data
  },

  /**
   * 获取指定日合同库存记录
   * @param {合同ID，日期} param0
   */
  async findInDay({ contractId, date }) {
    const res = await axios._get({
      url: '/store/getInDay',
      params: { contractId: contractId, date: date }
    })
    return res.data
  },

  /**
   * 托盘移动
   * @param {任务数据} entity
   */
  async moveTray(entity) {
    const res = await axios._post({ url: '/store/moveTray', data: entity })
    return res.data
  },

  // 强制删除库存
  async forceDelete(data) {
    const res = await axios._postqs({ url: '/store/forceDelete', params: data })
    return res.data
  }
}
