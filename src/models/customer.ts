// 客户信息类
export interface ICustomerData {
  // 客户ID
  id: number

  // 客户姓名
  name: string

  // 客户编号
  number: string

  // 地址
  address: string

  // 电话
  telephone: string

  // 联系人
  contact: string

  // 联系人电话
  contactTelephone: string

  // 身份证号
  identityCard: string

  // 客户类型
  type: number

  // 备注
  remark: string

  // 状态
  status: number
}

export function createCustomer(): ICustomerData {
  return {
    id: 0,
    name: '',
    number: '',
    address: '',
    telephone: '',
    contact: '',
    contactTelephone: '',
    identityCard: '',
    type: 0,
    remark: '',
    status: -1
  }
}
