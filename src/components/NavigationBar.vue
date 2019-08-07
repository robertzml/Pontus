<template>
 <v-navigation-drawer :mini-variant="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" @click>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" @click>
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
  name: "NavigationBar",
  props: {
    drawer: Boolean
  },
  data() {
    return {
      items: [
        { icon: "home", text: "主页" },
        {
          icon: "contacts",
          "icon-alt": "contacts",
          text: "信息管理",
          model: false,
          children: [
            { text: "Import" },
            { text: "Export" },
            { text: "Print" },
            { text: "Undo changes" },
            { text: "Other contacts" }
          ]
        },
        {
          icon: "domain",
          "icon-alt": "domain",
          text: "冷库租赁",
          model: false,
          children: [{ text: "货品入库" }]
        },
        {
          icon: "bar_chart",
          "icon-alt": "bar_chart",
          text: "统计报表",
          model: false,
          children: [{ text: "每日库存盘点" }]
        },
        {
          icon: "person",
          "icon-alt": "person",
          text: "用户管理",
          model: false,
          children: [{ text: "每日库存盘点" }]
        },
        { icon: "settings", text: "Settings" },
        { icon: "help", text: "Help" }
      ]
    };
  },
  methods: {
    navTo: function(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>
