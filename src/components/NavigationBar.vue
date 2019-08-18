<template>
  <v-navigation-drawer :mini-variant="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-list dense>
      <template v-for="item in items">
        <v-layout v-if="item.heading" :key="item.heading" align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
          <v-flex xs6 class="text-center">
          </v-flex>
        </v-layout>
        <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon>
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item v-for="(child, i) in item.children" v-model="child.model" :key="i" :to="{name: child.name}">
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" @click="navTo(item)">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    drawer: Boolean
  },
  data() {
    return {
      items: [
        { icon: 'home', text: '主页', name: 'home' },
        {
          icon: 'contacts',
          'icon-alt': 'contacts',
          text: '信息管理',
          model: false,
          children: [
            { text: '客户管理', model: false, name: 'customer' },
            { text: '合同管理', model: false, name: 'contract' },
            { text: '类别管理', model: false, name: 'category' }
          ]
        },
        { icon: 'home', text: '标题', heading: '标题' },
        {
          icon: 'domain',
          'icon-alt': 'domain',
          text: '冷库租赁',
          model: false,
          children: [
            { text: '货品入库' },
            { text: '货品出库' },
            { text: '货品移库' }
          ]
        },
        {
          icon: 'bar_chart',
          'icon-alt': 'bar_chart',
          text: '统计报表',
          model: false,
          children: [
            { text: '货品总报表' },
            { text: '货品分项报表' },
            { text: '每日库存盘点' }
          ]
        },
        {
          icon: 'person',
          'icon-alt': 'person',
          text: '用户管理',
          model: false,
          children: [{ text: '用户列表' }, { text: '用户组列表' }]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'help', text: '关于', name: 'about' }
      ]
    }
  },
  methods: {
    navTo: function(item) {
      this.$router.push({ name: item.name })
    }
  }
}
</script>
