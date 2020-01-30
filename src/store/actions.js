import * as axios from '../plugins/axios'

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
