import * as axios from '../axios'

export default {
  name: 'store',

  async findStoreIn(positionId) {
    const res = await axios._get({ url: '/store/findStoreIn', params: { positionId: positionId } })
    return res.data
  }
}
