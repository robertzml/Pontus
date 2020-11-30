<template>
  <v-container fluid class="pa-0">
    <v-tabs show-arrows v-model="tab">
      <v-tab v-for="item in items" :key="item.name">{{ item.meta.text }}</v-tab>
    </v-tabs>
    <v-tab-items>
      <v-tab-item v-for="item in items" :key="item.name">
        <keep-alive>
          <component v-bind:is="item.component"></component>
        </keep-alive>
      </v-tab-item>
    </v-tab-items>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import bus from '@/plugins/bus'
import { RouteConfigSingleView } from 'vue-router/types/router'

@Component
export default class Tab extends Vue {
  tab = 'home'

  items = new Array<RouteConfigSingleView>()

  mounted(): void {
    bus.$on('menu', (route: RouteConfig) => {
      const s: RouteConfigSingleView = route

      if (!this.items.includes(s)) {
        this.items.push(s)
      }

      if (typeof s.name === 'string') {
        this.tab = s.name
        console.log(this.tab)
      }
    })
  }
}
</script>
