import * as axios from '../plugins/axios'

export default {
  name: 'ice',

  /**
   * 冰块入库
   * @param {*} entity
   * @returns
   */
  async createStock(entity) {
    const res = await axios._post({ url: '/iceStock/create', data: entity })
    return res.data
  }
}
