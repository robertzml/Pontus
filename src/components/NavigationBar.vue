<template>
  <v-list dense>
    <template v-for="item in items">
      <v-row v-if="item.heading" :key="item.heading" align="center">
        <v-col cols="6">
          <v-subheader v-if="item.heading">
            {{ item.heading }}
          </v-subheader>
        </v-col>
        <v-col cols="6" class="text-center"> </v-col>
      </v-row>
      <v-list-group
        v-else-if="item.children"
        :key="item.text"
        v-model="item.model"
        :prepend-icon="item.model ? item.icon : item['icon-alt']"
        append-icon=""
      >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-item v-for="(child, i) in item.children" :key="i" v-model="child.model" :to="{ name: child.name }">
          <v-list-item-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ child.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item v-else :key="item.text" @click="navTo(item)">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { topRoutes, menuRoutes } from '@/router/menu'

export default {
  name: 'NavigationBar',
  data() {
    return {
      items: []
    }
  },
  methods: {
    navTo: function(item) {
      this.$router.push({ name: item.name })
    },

    makeMenu(groupId) {
      this.items = []
      topRoutes.forEach(item => {
        if (item.meta.roles.includes(groupId)) {
          if (item.children != undefined) {
            item.children = []
          }

          menuRoutes.forEach(sub => {
            if (sub.group == item.name) {
              if (sub.meta.roles.includes(groupId)) {
                item.children.push(sub)
              }
            }
          })
          this.items.push(item)
        }
      })
    }
  },
  mounted: function() {
    this.makeMenu(this.$store.state.user.userGroupId)
  }
}
</script>
