import * as axios from '../plugins/axios'

export default {
  // 获取周期费用记录
  async getPeriodExpense(model) {
    const res = await axios._post({ url: '/statistic/getPeriodExpense', data: model })
    return res.data
  }
}
