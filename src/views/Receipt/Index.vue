<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>单据管理</v-toolbar-title>
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

    <v-col cols="12"> </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ReceiptList from './List'

export default {
  name: 'ReceiptIndex',
  components: {
    ReceiptList
  },
  data: () => ({}),
  computed: {
    ...mapState({
      tab: state => state.receipt.tab,
      customerInfo: state => state.receipt.customerInfo
    })
  },
  methods: {
    ...mapMutations({
      refresh: 'receipt/refresh'
    }),

    ...mapActions({
      showList: 'receipt/showList'
    }),

    showCreate() {
      this.$refs.customerEditMod.init(0)
    },
    showEdit() {
      this.$refs.customerEditMod.init(this.customerInfo.id)
    }
  },
  mounted: function() {
    this.showList()
  }
}
</script>
