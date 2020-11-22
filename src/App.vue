<template>
  <v-app id="pontus">
    <v-app-bar app color="black" dark>
      <v-toolbar-title>海安润思达食品有限公司</v-toolbar-title>
      <v-spacer></v-spacer>

      <Menu></Menu>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Menu from '@/components/Menu.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Menu
  },

  data: () => ({})
})
</script>
