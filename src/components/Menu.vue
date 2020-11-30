<template>
  <div class="text-center ml-4">
    <v-menu offset-y open-on-hover :rounded="false" v-for="(item, index) in items" :key="index">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey lighten-5" text tile v-bind="attrs" v-on="on" @click="navTo(item)" width="120px"
          ><v-icon left>{{ item.meta.icon }}</v-icon
          >{{ item.meta.text }}</v-btn
        >
      </template>
      <v-list flat v-if="item.children != undefined">
        <v-list-item v-for="(sub, idx) in item.children" :key="idx" link>
          <v-list-item-title @click="navTo(sub)">{{ sub.meta.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { routes } from '@/router/menu'
import bus from '@/plugins/bus'

@Component
export default class Menu extends Vue {
  /**
   * 解析后菜单
   */
  items = new Array<RouteConfig>()

  /**
   * 导航
   * @param item 路由对象
   */
  navTo(item: RouteConfig): void {
    if (item.path) {
      if (this.$router.currentRoute.path != item.path) {
        this.$router.push({ path: item.path })

        bus.$emit('menu', item.name)
      }
    }
  }

  /**
   * 生成菜单
   */
  makeMenu(): void {
    const topRoutes = routes.filter((r) => !r.meta.group)

    this.items.push(...topRoutes)

    topRoutes.forEach((item) => {
      const sub = routes.filter((r) => r.meta.group == item.name)
      if (sub.length > 0) {
        item.children = sub
      }
    })
  }

  mounted(): void {
    this.makeMenu()
  }
}
</script>
