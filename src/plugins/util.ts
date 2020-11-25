import dict from './dict'

/**
 * 工具方法接口
 */
export interface UtilBase {
  /**
   * 客户类型
   * @param type 客户类型代码
   * @returns 客户类型名称
   */
  customerType: (type: number) => string
}

export default {
  /**
   * 客户类型
   * @param type 客户类型代码
   * @returns 客户类型名称
   */
  customerType: (type: number): string => {
    const ct = dict.customerType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  }
}
