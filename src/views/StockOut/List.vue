<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="orange">
          出库列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-treeview :items="monthTime" :load-children="fetchStockOut" @update:active="showActive" :active.sync="active" :open.sync="open" activatable open-on-click transition>
            <template v-slot:prepend="{ item, active }">
              <v-icon v-if="!item.children">markunread</v-icon>
            </template>
          </v-treeview>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import stockOut from '@/controllers/stockOut'

export default {
  name: 'StockOutList',
  data: () => ({
    monthTime: [],
    active: [],
    open: []
  }),
  methods: {
    init() {
      this.loadMonthTime()
    },

    loadMonthTime() {
      let vm = this
      this.monthTime = []
      stockOut.getMonthGroup().then(res => {
        res.forEach(r => {
          vm.monthTime.push({ id: r, name: r, children: [] })
        })
      })
    },

    async fetchStockOut(item) {
      return stockOut.getList(item.id).then(res => {
        res.forEach(r => {
          item.children.push({
            id: r.id,
            name: r.flowNumber
          })
        })
      })
    },

    showActive(item) {
      if (item.length > 0) {
        this.$emit('activate', item[0])
      }
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>
