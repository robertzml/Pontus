<template>
  <v-tabs show-arrows v-model="tab">
    <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import bus from '@/plugins/bus'

@Component
export default class Tab extends Vue {
  tab = null

  items = new Array<string>()

  mounted(): void {
    bus.$on('menu', (menu: string) => {
      console.log('event :' + menu)
    })
  }
}
</script>
