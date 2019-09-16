import * as axios from '../axios'

export default {
  name: 'cargo',

  async getList({ customerId, contractId }) {
    const res = await axios._get({ url: '/cargo/list', params: { customerId: customerId, contractId: contractId } })
    return res.data
  }
}
