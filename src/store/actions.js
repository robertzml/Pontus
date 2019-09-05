import * as axios from '../axios'

export default {
  /** 登录 */
  async login({ commit }, payload) {
    const res = await axios._postqs({ url: '/user/login', params: payload })
    if (res.data.status == 0) {
      commit('login', {
        login: true,
        id: res.data.entity.id,
        userName: payload.userName,
        name: res.data.entity.name,
        userGroupId: res.data.entity.userGroupId
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

  /**
   * 合同操作
   */
  async getContractList() {
    const res = await axios._get({ url: '/contract/list' })
    return res.data
  },

  async getContract(context, id) {
    const res = await axios._get({ url: '/contract/get', params: { id: id } })
    return res.data
  },

  async createContract(context, entity) {
    const res = await axios._post({ url: '/contract/create', data: entity })
    return res.data
  },

  async updateContract(context, entity) {
    const res = await axios._post({ url: '/contract/update', data: entity })
    return res.data
  },

  /**
   * 分类操作
   */
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

  /**
   * 仓库操作
   */
  async getWarehouseList(context, type) {
    const res = await axios._get({ url: '/warehouse/list', params: { type: type } })
    return res.data
  },

  async getWarehouse(context, id) {
    const res = await axios._get({ url: '/warehouse/get', params: { id: id } })
    return res.data
  },

  async createWarehouse(context, entity) {
    const res = await axios._post({ url: '/warehouse/create', data: entity })
    return res.data
  },

  async updateWarehouse(context, entity) {
    const res = await axios._post({ url: '/warehouse/update', data: entity })
    return res.data
  },

  /**
   * 货架操作
   */
  async getShelfList(context, warehouseId) {
    const res = await axios._get({ url: '/shelf/list', params: { warehouseId: warehouseId } })
    return res.data
  },

  async getShelf(context, id) {
    const res = await axios._get({ url: '/shelf/get', params: { id: id } })
    return res.data
  },

  async createShelf(context, entity) {
    const res = await axios._post({ url: '/shelf/create', data: entity })
    return res.data
  },

  async updateShelf(context, entity) {
    const res = await axios._post({ url: '/shelf/update', data: entity })
    return res.data
  },

  /**
   * 仓位操作
   */
  async getPosition(context, { shelfId, row, layer, depth }) {
    const res = await axios._get({
      url: '/position/find',
      params: { shelfId: shelfId, row: row, layer: layer, depth: depth }
    })
    return res.data
  },

  async countPosition(context, shelfId) {
    const res = await axios._get({ url: '/position/count', params: { shelfId: shelfId } })
    return res.data
  },

  async generatePosition(context, data) {
    const res = await axios._postqs({
      url: '/position/generate',
      params: data
    })
    return res.data
  },

  /**
   *  用户操作
   */
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
  },

  /**
   * 编号模板操作
   */
  async getSequenceTemplateList() {
    const res = await axios._get({ url: '/sequenceTemplate/list' })
    return res.data
  },

  async getSequenceTemplate(context, id) {
    const res = await axios._get({ url: '/sequenceTemplate/get', params: { id: id } })
    return res.data
  },

  async createSequenceTemplate(context, entity) {
    const res = await axios._post({ url: '/sequenceTemplate/create', data: entity })
    return res.data
  },

  async updateSequenceTemplate(context, entity) {
    const res = await axios._post({ url: '/sequenceTemplate/update', data: entity })
    return res.data
  },
  /**
   * 工具类
   */
  async getTableList() {
    const res = await axios._get({ url: '/utility/getTables' })
    return res.data
  },

  async getColumnList(context, tableName) {
    const res = await axios._get({ url: '/utility/getColumns', params: { tableName: tableName } })
    return res.data
  }
}
