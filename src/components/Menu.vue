<template>
  <div class="text-center ml-4">
    <v-menu offset-y open-on-hover v-for="(item, index) in items" :key="index">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" text v-bind="attrs" v-on="on" width="100px">{{ item.meta.text }}</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(sub, idx) in item.children" :key="idx" link>
          <v-list-item-title @click="navTo(sub)">{{ sub.meta.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { RouteConfig } from 'vue-router'
import { routes } from '@/router/menu'

export default defineComponent({
  name: 'Menu',

  data: () => ({
    items: new Array<RouteConfig>()
  }),

  methods: {
    navTo: function (item: RouteConfig) {
      this.$router.push({ name: item.name })
    },

    makeMenu: function () {
      routes.forEach((item) => {
        if (!item.meta.group) {
          this.items.push(item)
        }
      })

      this.items.forEach((item) => {
        const sub = routes.filter((r) => r.meta.group == item.name)
        item.children = sub
      })
    }
  },

  mounted: function () {
    this.makeMenu()
  }
})
</script>
