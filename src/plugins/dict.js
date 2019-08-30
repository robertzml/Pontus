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
  shelfType: [{ text: '普通货架', value: 1 }, { text: '仓位货架', value: 2 }, { text: '虚拟货架', value: 3 }]
}
