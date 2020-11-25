import VueRouter from 'vue-router'
import { UtilBase } from './plugins/util'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter

    /**
     * 工具方法集合
     */
    $util: UtilBase
  }
}
