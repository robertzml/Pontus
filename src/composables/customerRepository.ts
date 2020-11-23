import { findAll } from '../api/customer'
import { ICustomerData } from '../models/customer'
import { onMounted, reactive } from '@vue/composition-api'

interface CustomerContext {
  customers: ICustomerData[]
}

export function getCustomerRepository(): CustomerContext {
  const ctx = reactive({ customers: new Array<ICustomerData>() })

  const getCustomers = async () => {
    ctx.customers = await findAll()
  }

  onMounted(getCustomers)

  return ctx
}
