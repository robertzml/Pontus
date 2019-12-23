import * as axios from '../axios'

export default {
  name: 'store',

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
  }
}
