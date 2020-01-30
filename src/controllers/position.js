import * as axios from '../plugins/axios'

export default {
  name: 'position',

  async get({ shelfId, row, layer, depth }) {
    const res = await axios._get({
      url: '/position/find',
      params: { shelfId: shelfId, row: row, layer: layer, depth: depth }
    })
    return res.data
  },

  async getById(id) {
    const res = await axios._get({ url: '/position/get', params: { id: id } })
    return res.data
  },

  async getList({ shelfId, row }) {
    const res = await axios._get({ url: '/position/list', params: { shelfId: shelfId, row: row } })
    return res.data
  },

  // 获取一层的所有仓位
  async getListInLayer({ shelfId, row, layer }) {
    const res = await axios._get({ url: '/position/listInLayer', params: { shelfId: shelfId, row: row, layer: layer } })
    return res.data
  },

  async count(shelfId) {
    const res = await axios._get({ url: '/position/count', params: { shelfId: shelfId } })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/position/update', data: entity })
    return res.data
  },

  // 生成仓位
  async generate(data) {
    const res = await axios._postqs({
      url: '/position/generate',
      params: data
    })
    return res.data
  }
}
