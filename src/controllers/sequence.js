import * as axios from '../plugins/axios'

export default {
  name: 'sequence',

  async getTemplateList() {
    const res = await axios._get({ url: '/sequenceTemplate/list' })
    return res.data
  },

  async getTemplate(id) {
    const res = await axios._get({ url: '/sequenceTemplate/get', params: { id: id } })
    return res.data
  },

  async createTemplate(entity) {
    const res = await axios._post({ url: '/sequenceTemplate/create', data: entity })
    return res.data
  },

  async updateTemplate(entity) {
    const res = await axios._post({ url: '/sequenceTemplate/update', data: entity })
    return res.data
  },

  async getNext({ tableName, dt }) {
    const res = await axios._get({ url: '/sequenceTemplate/getNext', params: { tableName: tableName, dt: dt } })
    return res.data
  }
}
