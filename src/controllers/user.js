import * as axios from '../plugins/axios'

export default {
  name: 'user',

  async getList() {
    const res = await axios._get({ url: '/user/list' })
    return res.data
  },

  async find(id) {
    const res = await axios._get({ url: '/user/getById', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/user/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/user/update', data: entity })
    return res.data
  },

  async enable(data) {
    const res = await axios._postqs({
      url: '/user/enable',
      params: data
    })
    return res.data
  }
}
