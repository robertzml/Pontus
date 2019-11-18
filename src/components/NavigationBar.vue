<template>
  <v-navigation-drawer :mini-variant="drawer" :clipped="$vuetify.breakpoint.lgAndUp" :width="220" app>
    <v-list dense>
      <template v-for="item in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col cols="6" class="text-center">
          </v-col>
        </v-row>
        <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
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
            { text: '类别管理', model: false, name: 'category' },
            { text: '仓库管理', model: false, name: 'warehouse' },
            { text: '仓位管理', model: false, name: 'position' }
          ]
        },
        {
          icon: 'shopping_cart',
          'icon-alt': 'shopping_cart',
          text: '冷库租赁',
          model: false,
          children: [
            { text: '货品入库', model: false, name: 'stockin' },
            { text: '货品出库', model: false, name: 'stockout' },
            { text: '货品移库', model: false }
          ]
        },
        {
          icon: 'domain',
          'icon-alt': 'domain',
          text: '库存管理',
          model: false,
          children: [
            { text: '货品管理', model: false, name: 'cargo' },
            { text: '仓库库存', model: false, name: 'store' }
          ]
        },
        {
          icon: 'bar_chart',
          'icon-alt': 'bar_chart',
          text: '统计报表',
          model: false,
          children: [{ text: '货品总报表' }, { text: '货品分项报表' }, { text: '每日库存盘点' }]
        },
        {
          icon: 'person',
          'icon-alt': 'person',
          text: '用户管理',
          model: false,
          children: [
            { text: '用户列表', model: false, name: 'user' },
            { text: '用户组列表', model: false, name: 'usergroup' }
          ]
        },
        {
          icon: 'settings',
          'icon-alt': 'settings',
          text: '系统设置',
          model: false,
          children: [{ text: '编号模板', model: false, name: 'sequenceTemplate' }]
        },
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
