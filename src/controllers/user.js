import * as axios from '../axios'

export default {
  name: 'user',

  async getList() {
    const res = await axios._get({ url: '/user/list' })
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
