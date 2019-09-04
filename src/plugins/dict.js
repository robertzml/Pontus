export default {
  /**
   * 客户类型
   */
  customerType: [{ text: '团体客户', value: 1 }, { text: '零散客户', value: 2 }],

  /**
   * 仓库类型
   */
  warehouseType: [
    {
      text: '普通库',
      value: 1
    },
    {
      text: '仓位库',
      value: 2
    },
    {
      text: '急冻库',
      value: 3
    }
  ],

  /**
   * 货架类型
   */
  shelfType: [{ text: '普通货架', value: 1 }, { text: '仓位货架', value: 2 }, { text: '虚拟货架', value: 3 }],

  /**
   * 合同类型
   */
  contractType: [{ text: '计时冷藏合同', value: 1 }],

  /**
   * 计费类型
   */
  billingType: [{ text: '件重', value: 1 }]
}
