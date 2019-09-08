// 辅助工具类
import moment from 'moment'
import dict from './dict'
import store from '../store/index'

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

  displayStatus(val) {
    return store.getters.entityStatus(val)
  },

  displayDateTime(date) {
    if (date === null || date === '') {
      return ''
    } else {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },

  displayDate(date) {
    if (date === null || date === '') {
      return ''
    } else {
      return moment(date).format('YYYY-MM-DD')
    }
  },

  pickerDayFormat: val => {
    if (val != null || val != undefined) {
      let date = new Date(val)
      return date.getDate()
    } else {
      return ''
    }
  },

  // 客户类型
  customerType: type => {
    let ct = dict.customerType.find(r => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 仓库类型
  warehouseType: type => {
    let wt = dict.warehouseType.find(r => r.value == type)
    if (wt != undefined) {
      return wt.text
    } else {
      return ''
    }
  },

  // 货架类型
  shelfType: type => {
    let st = dict.shelfType.find(r => r.value == type)
    if (st != undefined) {
      return st.text
    } else {
      return ''
    }
  },

  // 合同类型
  contractType: type => {
    let ct = dict.contractType.find(r => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  },

  // 计费方式
  billingType: type => {
    let bt = dict.billingType.find(r => r.value == type)
    if (bt != undefined) {
      return bt.text
    } else {
      return ''
    }
  },

  billingTypeUnit: type => {
    let bt = dict.billingType.find(r => r.value == type)
    if (bt != undefined) {
      return bt.unit
    } else {
      return ''
    }
  }
}
