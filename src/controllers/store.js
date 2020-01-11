import * as axios from '../axios'

export default {
  name: 'store',

  /**
   * 按仓位查找在库库存
   * @param {仓位ID} positionId
   */
  async findStoreIn(positionId) {
    const res = await axios._get({ url: '/store/findStoreIn', params: { positionId: positionId } })
    return res.data
  },

  async findByContract({ contractId, isStoreIn }) {
    const res = await axios._get({
      url: '/store/findByContract',
      params: { contractId: contractId, isStoreIn: isStoreIn }
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
