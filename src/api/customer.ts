import service from '../plugins/axios'
import { ICustomerData } from '../models/customer'

export const findAll = (): Promise<Array<ICustomerData>> => {
  return service.get('/customer/list')
}
