<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>结算管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'SettlementDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="tab == 'SettlementList'" text @click.stop="showCreate">添加结算</v-btn>
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

    <v-col cols="12">
      <settlement-create ref="settlementCreateMod" @close="refresh"></settlement-create>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import SettlementList from './List'
import SettlementDetails from './Details'
import SettlementCreate from './Create'

export default {
  name: 'SettlementIndex',
  components: {
    SettlementList,
    SettlementCreate,
    SettlementDetails
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: (state) => state.settlement.tab
    })
  },
  methods: {
    ...mapMutations({
      refresh: 'settlement/refresh'
    }),

    ...mapActions({
      showList: 'settlement/showList'
    }),

    showCreate() {
      this.$refs.settlementCreateMod.init()
    }
  }
}
</script>
