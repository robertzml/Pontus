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
    { text: '件重', value: 1, unit: '元/(吨*天)', meter: '吨' },
    { text: '计数', value: 2, unit: '元/(件*天)', meter: '件' },
    { text: '非等重', value: 3, unit: '元/(吨*天)', meter: '吨' },
    { text: '仓位', value: 4, unit: '元/(仓位*天)', meter: '仓位' },
    { text: '板位', value: 5, unit: '元/(板位*天)', meter: '板位' }
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

  /** 入库状态 */
  stockInStatus: [
    { text: '待入库', value: 71 },
    { text: '已清点', value: 72 },
    { text: '已接单', value: 73 },
    { text: '已上架', value: 74 },
    { text: '已入库', value: 75 }
  ],

  /** 出库状态 */
  stockOutStatus: [
    { text: '待出库', value: 81 },
    { text: '已接单', value: 82 },
    { text: '已下架', value: 83 },
    { text: '已清点', value: 84 },
    { text: '已出库', value: 85 }
  ],

  /** 库存状态 */
  storeStatus: [
    { text: '在库', value: 61 },
    { text: '出库', value: 62 },
    { text: '准备移入', value: 63 },
    { text: '准备移出', value: 64 }
  ],

  /** 流水类型 */
  flowType: [
    { text: '无', value: 0 },
    { text: '入库', value: 1 },
    { text: '出库', value: 2 },
    { text: '移库', value: 3 },
    { text: '移入', value: 4 },
    { text: '移出', value: 5 }
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
