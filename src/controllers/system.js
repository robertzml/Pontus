import * as axios from '../plugins/axios'

export default {
  // 修复普通库初始入库单ID
  async fixNormalStoreStockInId() {
    const res = await axios._post({ url: '/system/fixNormalStoreStockInId' })
    return res.data
  },

  // 修复普通库初始入库时间
  async fixNormalStoreInitialTime() {
    const res = await axios._post({ url: '/system/fixNormalStoreInitialTime' })
    return res.data
  }
}
