import * as axios from '../plugins/axios'

export default {
  name: 'contract',

  async getList(customerId) {
    const res = await axios._get({ url: '/contract/list', params: { customerId: customerId } })
    return res.data
  },

  async find(id) {
    const res = await axios._get({ url: '/contract/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/contract/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/contract/update', data: entity })
    return res.data
  },

  // 强制删除合同
  async forceDelete(data) {
    const res = await axios._postqs({ url: '/contract/forceDelete', params: data })
    return res.data
  }
}
