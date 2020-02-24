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

  async get(id) {
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
   * 按出库单查找库存
   * @param {出库单ID，货品ID} param0
   */
  async findByStockOut({ stockOutId, cargoId }) {
    const res = await axios._get({
      url: '/store/findByStockOut',
      params: { stockOutId: stockOutId, cargoId: cargoId }
    })
    return res.data
  }
}
