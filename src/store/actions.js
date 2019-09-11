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

  /** 初始化字典 */
  initDict({ commit }) {
    axios._get({ url: '/utility/getEntityStatus' }).then(res => {
      commit('entityStatus', res.data)
    })
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
