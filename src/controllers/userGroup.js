import * as axios from '../axios'

export default {
  name: 'userGroup',

  async getList() {
    const res = await axios._get({ url: '/usergroup/list' })
    return res.data
  }
}
