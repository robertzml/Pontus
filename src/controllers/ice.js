import * as axios from '../plugins/axios'

export default {
  name: 'ice',

  /**
   * 冰块入库
   * @param {*} entity
   * @returns
   */
  async stockIn(entity) {
    const res = await axios._post({ url: '/iceStock/stockIn', data: entity })
    return res.data
  },

  /**
   * 冰块入库列表
   * @returns
   */
  async getList(year) {
    const res = await axios._get({ url: '/iceStock/list', params: { year: year } })
    return res.data
  },

  /**
   * 删除冰块入库
   * @param {*} data
   * @returns
   */
  async delete(data) {
    const res = await axios._postqs({ url: '/iceStock/delete', params: data })
    return res.data
  },

  /**
   *
   * @returns 获取整冰入库数量
   */
  async getCompleteIn() {
    const res = await axios._get({ url: '/iceStock/getCompleteIn' })
    return res.data
  },

  async getCompleteOut() {
    const res = await axios._get({ url: '/iceStock/getCompleteOut' })
    return res.data
  },

  async getFragmentIn() {
    const res = await axios._get({ url: '/iceStock/getFragmentIn' })
    return res.data
  }
}
