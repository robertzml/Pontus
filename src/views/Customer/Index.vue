<template>
  <v-row dense>
    <v-col cols="12" class="pt-0">
      <v-toolbar dense>
        <v-toolbar-title>客户管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab != 'CustomerList'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <keep-alive>
          <component v-bind:is="tab"></component>
        </keep-alive>
      </v-slide-x-transition>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CustomerList from './Section/CustomerList.vue'

export default defineComponent({
  name: 'CustomerIndex',
  components: {
    CustomerList
  },
  data: () => ({
    tab: ''
  }),
  methods: {
    refresh() {
      console.log('refresh')
    },

    showList() {
      this.tab = 'CustomerList'
    }
  }
})
</script>
