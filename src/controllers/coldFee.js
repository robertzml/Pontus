import * as axios from '../plugins/axios'

export default {
  name: 'coldFee',

  /**
   * 获取库存冷藏费
   * @param {库存ID} storeId 库存ID
   * @param {当前日期} dt currentTime
   */
  async getByStore(storeId, dt) {
    const res = await axios._get({ url: '/coldFee/getByStore', params: { storeId: storeId, current: dt } })
    return res.data
  }
}
