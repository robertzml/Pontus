export default {
  /**
   * 客户类型
   */
  customerType: [
    { text: '团体客户', value: 1 },
    { text: '零散客户', value: 2 }
  ],

  /**
   * 仓库类型
   */
  warehouseType: [
    { text: '普通库', value: 1 },
    { text: '仓位库', value: 2 },
    { text: '急冻库', value: 3 }
  ],

  /**
   * 货架类型
   */
  shelfType: [
    { text: '普通货架', value: 1 },
    { text: '仓位货架', value: 2 },
    { text: '虚拟货架', value: 3 }
  ],

  /**
   * 合同类型
   */
  contractType: [
    { text: '计时冷藏合同', value: 1 },
    { text: '非计时冷藏合同', value: 2 },
    { text: '冷冻合同', value: 3 },
    { text: '冰块合同', value: 4 },
    { text: '最短时间合同', value: 5 }
  ],

  /**
   * 计费类型
   */
  billingType: [
    { text: '件重', value: 1, unit: '元/(吨*天)' },
    { text: '计数', value: 2, unit: '元/(件*天)' },
    { text: '非等重', value: 3, unit: '元/(吨*天)' },
    { text: '仓位', value: 4, unit: '元/(仓位*天)' },
    { text: '板位', value: 5, unit: '元/(板位*天)' }
  ],

  /**
   * 费用计算方式
   */
  expenseItemType: [
    { text: '直接', value: 1 },
    { text: '单价', value: 2 },
    { text: '其它', value: 3 }
  ],

  /** 入库类型 */
  stockInType: [
    { text: '普通库入库', value: 1 },
    { text: '仓位库入库', value: 2 },
    { text: '冷冻库入库', value: 3 }
  ],

  /** 出库类型 */
  stockOutType: [
    { text: '普通库出库', value: 1 },
    { text: '仓位库出库', value: 2 }
  ],

  /** 入库搬运类型 */
  carryInTaskType: [
    { text: '入库搬运', value: 1 },
    { text: '临时搬运', value: 2 }
  ],

  /** 出库搬运类型 */
  carryOutTaskType: [
    { text: '出库搬运', value: 1 },
    { text: '临时搬运', value: 2 }
  ],

  /** 库存状态 */
  storeStatus: [
    { text: '在库', value: 61 },
    { text: '出库', value: 62 },
    { text: '准备移入', value: 63 },
    { text: '准备移出', value: 64 }
  ],

  /** 用户组 */
  userGroup: [
    { text: '超级管理员', value: 1 },
    { text: '系统管理员', value: 2 },
    { text: '总经理', value: 3 },
    { text: '业务主管', value: 4 },
    { text: '仓库管理员', value: 5 },
    { text: '叉车工', value: 6 }
  ]
}
