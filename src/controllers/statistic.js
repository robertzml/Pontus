import * as axios from '../plugins/axios'

export default {
  // 获取周期费用记录
  async getPeriodExpense(model) {
    const res = await axios._post({ url: '/statistic/getPeriodExpense', data: model })
    return res.data
  },

  // 获取客户出入库流水
  async getCustomerStockFlow({ customerId, startTime, endTime }) {
    const res = await axios._get({
      url: '/statistic/getCustomerStockFlow',
      params: { customerId: customerId, startTime: startTime, endTime: endTime }
    })
    return res.data
  }
}
