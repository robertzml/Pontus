declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $util: any
  }
}