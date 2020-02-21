<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>搬运出库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'CustomerDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CarryOutIndex',
  data: () => ({}),
  computed: {
    ...mapState({
      tab: state => state.carryOut.tab,
      carryOutId: state => state.carryOut.carryOutId
    })
  },
  methods: {
    ...mapMutations({
      setCarryOutId: 'carryOut/setCarryOutId',
      refresh: 'carryOut/refresh'
    }),

    ...mapActions({
      showList: 'carryOut/showList'
    })
  }
}
</script>
