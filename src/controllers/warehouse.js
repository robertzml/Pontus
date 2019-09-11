import * as axios from '../axios'

export default {
  name: 'warehouse',

  /**
   * 仓库列表
   * @param {Number} type 仓库类型(可选)
   */
  async getList(type) {
    const res = await axios._get({ url: '/warehouse/list', params: { type: type } })
    return res.data
  },

  async get(id) {
    const res = await axios._get({ url: '/warehouse/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/warehouse/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/warehouse/update', data: entity })
    return res.data
  }
}
