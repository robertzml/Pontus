import * as axios from '../axios'

export default {
  name: 'cargo',

  async getList(customerId) {
    const res = await axios._get({ url: '/cargo/list', params: { customerId: customerId } })
    return res.data
  }
}
