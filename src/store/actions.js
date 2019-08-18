import * as axios from '../axios'

export default {
  /** 客户操作 */
  async getCustomer(context, id) {
    const res = await axios._get({ url: '/customer/get', params: { id: id } })
    return res.data
  },

  async getCustomerList() {
    const res = await axios._get({ url: '/customer/list' })
    return res.data
  },

  async createCustomer(context, entity) {
    const res = await axios._post({ url: '/customer/create', data: entity })
    return res.data
  },

  async updateCustomer(context, entity) {
    const res = await axios._post({ url: '/customer/update', data: entity })
    return res.data
  },

  /** 类别操作 */
  async getCategoryList() {
    const res = await axios._get({ url: '/category/list' })
    return res.data
  },

  async getFirstCategory() {
    const res = await axios._get({ url: '/category/getFirstCategory' })
    return res.data
  },

  async getChildrenCategory(context, parentId) {
    const res = await axios._get({
      url: '/category/GetChildren',
      params: { parentId: parentId }
    })
    return res.data
  },

  async getCategory(context, id) {
    const res = await axios._get({ url: '/category/get', params: { id: id } })
    return res.data
  },

  async createCategory(context, entity) {
    const res = await axios._post({ url: '/category/create', data: entity })
    return res.data
  },

  async updateCategory(context, entity) {
    const res = await axios._post({ url: '/category/update', data: entity })
    return res.data
  },

  //用户操作
  async getUserList() {
    const res = await axios._get({ url: '/user/list' })
    return res.data
  },

  async enableUser(context, data) {
    let param = new URLSearchParams()
    param.append('id', data.id)
    param.append('enable', data.enable)
    const res = await axios._post({
      url: '/user/enable',
      data: param
    })
    return res.data
  },

  //用户组操作
  async getUserGroupList() {
    const res = await axios._get({ url: '/usergroup/list' })
    return res.data
  }
}
