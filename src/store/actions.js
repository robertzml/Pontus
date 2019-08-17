import axios from '../axios'

export default {
  getCustomer(context, id) {
    return axios.get('/customer/get', { params: { id: id } })
  },

  getCustomerList() {
    return axios.get('/customer/list')
  },

  createCustomer(context, entity) {
    return axios.post('/customer/create', entity)
  },

  updateCustomer(context, entity) {
    return axios.post('/customer/update', entity)
  }
}
