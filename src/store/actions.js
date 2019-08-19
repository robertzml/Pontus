import * as axios from '../axios'

export default {
  /** 登录 */
  async login({ commit }, payload) {
    const res = await axios._postqs({ url: '/user/login', params: payload })
    if (res.data.status == 0) {
      commit('login', {
        login: true,
        id: 1,
        userName: payload.userName,
        name: 'zml',
        userGroupId: 1
      })
    } else {
      commit('logout')
    }
    return res.data
  },

  /** 注销 */
  logout({ commit }) {
    commit('logout')
  },

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

  /** 分类操作 */
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

  /** 用户操作 */
  async getUserList() {
    const res = await axios._get({ url: '/user/list' })
    return res.data
  },

  async enableUser(context, data) {
    const res = await axios._postqs({
      url: '/user/enable',
      params: data
    })
    return res.data
  },

  /** 用户组操作 */
  async getUserGroupList() {
    const res = await axios._get({ url: '/usergroup/list' })
    return res.data
  }
}
