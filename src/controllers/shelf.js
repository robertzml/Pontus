import * as axios from '../plugins/axios'

export default {
  name: 'shelf',

  /**
   * 货架列表
   * @param {Number} warehouseId 仓库ID（可选）
   */
  async getList(warehouseId) {
    const res = await axios._get({ url: '/shelf/list', params: { warehouseId: warehouseId } })
    return res.data
  },

  async find(id) {
    const res = await axios._get({ url: '/shelf/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/shelf/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/shelf/update', data: entity })
    return res.data
  }
}
