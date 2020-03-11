import * as axios from '../plugins/axios'

export default {
  // 获取日冷藏费记录
  async dailyCodeFee(model) {
    const res = await axios._post({ url: '/expense/dailyColdFee', data: model })
    return res.data
  }
}