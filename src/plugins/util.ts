import dict from './dict'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'

const utilInstall = {
  install: (Vue: VueConstructor<Vue>): void => {
    console.log('util install')

    Vue.prototype.$util = {
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
  }
}

export default utilInstall
