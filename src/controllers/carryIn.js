import * as axios from '../axios'

export default {
  name: 'carryIn',

  async create(entity) {
    const res = await axios._post({ url: '/carryInTask/create', data: entity })
    return res.data
  }
}
