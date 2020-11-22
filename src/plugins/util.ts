import dict from './dict'

export default {
  // 客户类型
  customerType: (type: number): string => {
    const ct = dict.customerType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  }
}
