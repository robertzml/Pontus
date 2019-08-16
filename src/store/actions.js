import axios from '../axios'

export default {
  getCustomer(context, id) {
    return axios.get('/customer/get', { params: { id: id } })
  },

  getCustomerList() {
    return axios.get('/customer/list')
  }
}
