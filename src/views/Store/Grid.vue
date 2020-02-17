<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>库存表格视图</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="gridTab == 'StoreDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <keep-alive>
          <component v-bind:is="gridTab"></component>
        </keep-alive>
      </v-slide-x-transition>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StoreList from './List'
import StoreDetails from './Details'

export default {
  name: 'StoreGrid',
  components: {
    StoreList,
    StoreDetails
  },
  data: () => ({}),
  computed: {
    ...mapState({
      gridTab: state => state.store.gridTab,
      refreshEvent: state => state.store.refreshEvent
    })
  },
  methods: {
    ...mapActions({
      showList: 'store/showStoreList'
    })
  }
}
</script>
