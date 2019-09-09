<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="orange">
          入库列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-treeview :items="monthTime" :load-children="fetchStockIn" @update:active="showActive" :active.sync="active" activatable open-on-click transition>
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
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInList',
  data: () => ({
    monthTime: [],
    active: []
  }),
  methods: {
    init() {
      this.loadMonthTime()
    },

    loadMonthTime() {
      let vm = this
      this.monthTime = []
      stockIn.getMonthGroup().then(res => {
        res.forEach(r => {
          vm.monthTime.push({ id: r, name: r, children: [] })
        })
      })
    },

    async fetchStockIn(item) {
      return stockIn.getList(item.id).then(res => {
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