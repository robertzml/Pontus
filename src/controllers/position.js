import * as axios from '../axios'

export default {
  name: 'position',

  async get({ shelfId, row, layer, depth }) {
    const res = await axios._get({
      url: '/position/find',
      params: { shelfId: shelfId, row: row, layer: layer, depth: depth }
    })
    return res.data
  },

  async count(shelfId) {
    const res = await axios._get({ url: '/position/count', params: { shelfId: shelfId } })
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
