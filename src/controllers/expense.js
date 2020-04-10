import * as axios from '../plugins/axios'

export default {
  // 获取日冷藏费记录
  async dailyCodeFee(model) {
    const res = await axios._post({ url: '/expense/dailyColdFee', data: model })
    return res.data
  },

  // 获取库存冷藏费
  async getStoreColdFee({ storeId, current, storeType }) {
    const res = await axios._get({
      url: '/expense/getStoreColdFee',
      params: { storeId: storeId, current: current, storeType: storeType }
    })
    return res.data
  },

  // 获取入库费用
  async getPeriodInBilling({ contractId, startTime, endTime }) {
    const res = await axios._get({
      url: '/expense/getPeriodInBilling',
      params: { contractId: contractId, startTime: startTime, endTime: endTime }
    })
    return res.data
  },

  // 获取出库费用
  async getPeriodOutBilling({ contractId, startTime, endTime }) {
    const res = await axios._get({
      url: '/expense/getPeriodOutBilling',
      params: { contractId: contractId, startTime: startTime, endTime: endTime }
    })
    return res.data
  }
}
