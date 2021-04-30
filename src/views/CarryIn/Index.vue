<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>搬运入库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'CarryInDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CarryInList from './List'
import CarryInDetails from './Details'

export default {
  name: 'CarryInIndex',
  components: {
    CarryInList,
    CarryInDetails
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: (state) => state.carryIn.tab,
      carryInId: (state) => state.carryIn.carryInId
    })
  },
  methods: {
    ...mapMutations({
      setCarryInId: 'carryIn/setCarryInId',
      refresh: 'carryIn/refresh'
    }),

    ...mapActions({
      showList: 'carryIn/showList'
    })
  }
}
</script>
