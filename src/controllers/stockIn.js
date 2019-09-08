import * as axios from '../axios'

export default {
  name: 'stockIn',

  async create(entity) {
    const res = await axios._post({ url: '/stockIn/create', data: entity })
    return res.data
  }
}
