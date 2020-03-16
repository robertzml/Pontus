<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>普通库存</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'NormalStoreDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
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

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import NormalStoreList from './List'
import NormalStoreDetails from './Details'

export default {
  name: 'StoreIndex',
  components: {
    NormalStoreList,
    NormalStoreDetails
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: state => state.normalStore.tab,
      refreshEvent: state => state.normalStore.refreshEvent
    })
  },
  methods: {
    ...mapActions({
      showList: 'normalStore/showList'
    }),

    ...mapMutations({
      refresh: 'normalStore/refresh'
    })
  }
}
</script>
