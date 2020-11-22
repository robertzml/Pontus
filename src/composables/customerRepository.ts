import { findAll } from '../api/customer'
import { ICustomerData } from '../models/customer'
import { onMounted, ref, Ref, reactive } from '@vue/composition-api'

type CustomerContext = {
  customers: Ref<ICustomerData[]>
}

export default function getCustomerRepository(): CustomerContext {
  const repository = ref<ICustomerData[]>([])

  const getCustomers = async () => {
    repository.value = await findAll()
  }

  onMounted(getCustomers)

  const ctx = { customers: repository }
  return ctx
}
