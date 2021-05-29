// 辅助工具类
import moment from 'moment'
import dict from './dict'
import store from '../store/index'
import config from './config'

export default {
  treeListTransform(source) {
    let tree = []

    for (let i = 0; i < source.length; i++) {
      for (let j = i; j < source.length; j++) {
        if (source[j].parentId == source[i].id) {
          if (source[i].children == undefined) {
            source[i].children = []
          }
          source[i].children.push(source[j])
        } else if (source[j].id == source[i].parentId) {
          if (source[j].children == undefined) {
            source[j].children = []
          }
          source[j].children.push(source[i])
        }
      }
      if (source[i].parentId == null) {
        tree.push(source[i])
      }
    }

    return tree
  },

  reportUrl() {
    return config.baseURL + '/report/'
  },

  displayStatus(val) {
    return store.getters.entityStatus(val)
  },

  displayDateTime(date) {
    if (date === null || date == undefined || date === '') {
      return ''
    } else {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },

  displayDate(date) {
    if (date === null || date == undefined || date === '') {
      return ''
    } else {
      return moment(date).format('YYYY-MM-DD')
    }
  },

  // 日期选择器格式
  pickerDayFormat: (val) => {
    if (val != null || val != undefined) {
      let date = new Date(val)
      return date.getDate()
    } else {
      return ''
    }
  },

  // 用户组名称
  userGroupName: (val) => {
    let ug = dict.userGroup.find((r) => r.value == val)
    if (ug != undefined) {
      return ug.text
    } else {
      return ''
    }
  },

  // 客户类型
  customerType: (type) => {
    let ct = dict.customerType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 仓库类型
  warehouseType: (type) => {
    let wt = dict.warehouseType.find((r) => r.value == type)
    if (wt != undefined) {
      return wt.text
    } else {
      return ''
    }
  },

  // 货架类型
  shelfType: (type) => {
    let st = dict.shelfType.find((r) => r.value == type)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  },

  // 合同类型
  contractType: (type) => {
    let ct = dict.contractType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 计费方式
  billingType: (type) => {
    let bt = dict.billingType.find((r) => r.value == type)
    if (bt != undefined) {
      return bt.text
    } else {
      return ''
    }
  },

  // 计费单价
  billingTypeUnit: (type) => {
    let bt = dict.billingType.find((r) => r.value == type)
    if (bt != undefined) {
      return bt.unit
    } else {
      return ''
    }
  },

  // 计费计量
  billingTypeMeter: (type) => {
    let bt = dict.billingType.find((r) => r.value == type)
    if (bt != undefined) {
      return bt.meter
    } else {
      return ''
    }
  },

  // 费用计算方式
  expenseItemType: (type) => {
    let et = dict.expenseItemType.find((r) => r.value == type)
    if (et != undefined) {
      return et.text
    } else {
      return ''
    }
  },

  // 入库类型
  stockInType: (type) => {
    let st = dict.stockInType.find((r) => r.value == type)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  },

  // 出库类型
  stockOutType: (type) => {
    let st = dict.stockOutType.find((r) => r.value == type)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  },

  // 搬运入库类型
  carryInTaskType: (type) => {
    let ct = dict.carryInTaskType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 搬运出库类型
  carryOutTaskType: (type) => {
    let ct = dict.carryOutTaskType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 入库状态
  stockInStatus: (status) => {
    let st = dict.stockInStatus.find((r) => r.value == status)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  },

  // 出库状态
  stockOutStatus: (status) => {
    let st = dict.stockOutStatus.find((r) => r.value == status)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  },

  // 库存状态
  storeStatus: (status) => {
    let st = dict.storeStatus.find((r) => r.value == status)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  },

  // 流水类型
  flowType: (type) => {
    let ct = dict.flowType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 缴费方式
  paidType: (type) => {
    let ct = dict.paidType.find((r) => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 冰块类型
  iceType: (type) => {
    let it = dict.iceType.find((r) => r.value == type)
    if (it != undefined) {
      return it.text
    } else {
      return ''
    }
  },

  // 冰块出入库类型
  iceStockType: (type) => {
    let st = dict.iceStockType.find((r) => r.value == type)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  }
}
