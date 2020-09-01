import * as axios from '../plugins/axios'

export default {
  // 获取周期费用项目
  async getExpenseRecord(model) {
    const res = await axios._post({ url: '/statistic/getExpenseRecord', data: model })
    return res.data
  },

  // 获取客户出入库流水
  async getCustomerStockFlow({ customerId, startTime, endTime }) {
    const res = await axios._get({
      url: '/statistic/getCustomerStockFlow',
      params: { customerId: customerId, startTime: startTime, endTime: endTime }
    })
    return res.data
  },

  // 获取客户实时欠款
  async getDebt(customerId) {
    const res = await axios._get({
      url: '/statistic/getDebt',
      params: { customerId: customerId }
    })
    return res.data
  },

  // 获取客户费用数据
  async getCustomerFee({ customerId, startTime, endTime }) {
    const res = await axios._get({
      url: '/statistic/getCustomerFee',
      params: { customerId: customerId, startTime: startTime, endTime: endTime }
    })
    return res.data
  },

  // 获取客户货品库存报表
  async getCustomerCargoStore({ contractId, date, groupByBatch }) {
    const res = await axios._get({
      url: '/statistic/getCustomerCargoStore',
      params: { contractId: contractId, date: date, groupByBatch: groupByBatch }
    })
    return res.data
  }
}
