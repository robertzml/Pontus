import * as axios from '../plugins/axios'

export default {
  name: 'category',

  async getList() {
    const res = await axios._get({ url: '/category/list' })
    return res.data
  },

  // 获取首层分类
  async getFirst() {
    const res = await axios._get({ url: '/category/getFirstCategory' })
    return res.data
  },

  async getChildren(parentId) {
    const res = await axios._get({
      url: '/category/GetChildren',
      params: { parentId: parentId }
    })
    return res.data
  },

  async find(id) {
    const res = await axios._get({ url: '/category/get', params: { id: id } })
    return res.data
  },

  async create(entity) {
    const res = await axios._post({ url: '/category/create', data: entity })
    return res.data
  },

  async update(entity) {
    const res = await axios._post({ url: '/category/update', data: entity })
    return res.data
  },

  // 删除入库单
  async delete(data) {
    const res = await axios._postqs({ url: '/category/delete', params: data })
    return res.data
  }
}
