import { findAll } from '../api/customer'
import { ICustomerData } from '../models/customer'
import { onMounted, reactive } from '@vue/composition-api'

export interface CustomerContext {
  customers: ICustomerData[]
}

/**
 * 获取全部客户信息
 */
export function getCustomerRepository(): CustomerContext {
  const ctx = reactive({ customers: new Array<ICustomerData>() })

  const getCustomers = async () => {
    ctx.customers = await findAll()
  }

  onMounted(getCustomers)

  return ctx
}
