import * as axios from '../plugins/axios'

export default {
  name: 'normalStore',

  async find(id) {
    const res = await axios._get({ url: '/normalStore/get', params: { id: id } })
    return res.data
  },

  /**
   * 按合同查找库存
   * @param {合同ID} contractId
   */
  async findByContract(contractId) {
    const res = await axios._get({
      url: '/normalStore/findByContract',
      params: { contractId: contractId }
    })
    return res.data
  },

  /**
   * 出库时查找库存
   * @param {合同ID，货品ID} param0
   */
  async findForStockOut({ contractId, cargoId }) {
    const res = await axios._get({
      url: '/normalStore/findForStockOut',
      params: { contractId: contractId, cargoId: cargoId }
    })
    return res.data
  },

  /**
   * 获取库存记录链表
   * @param {库存ID} id
   */
  async findInOrder(id) {
    const res = await axios._get({
      url: '/normalStore/getInOrder',
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
      url: '/normalStore/getInDay',
      params: { contractId: contractId, date: date }
    })
    return res.data
  }
}
