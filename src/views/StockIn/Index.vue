<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>入库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window=='create'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window=='details'" text @click.stop="showEdit">编辑合同</v-btn>
          <v-btn text @click.stop="toCreate" :show-window="showWindow">仓位库入库</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>
      <v-window v-model="window">
        <v-window-item value="list">

        </v-window-item>
        <v-window-item value="create" :eager="true">
          <stock-in-create-position ref="createMod"></stock-in-create-position>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</template>

<script>
import StockInCreatePosition from './CreatePosition'

export default {
  name: 'StockInIndex',
  components: {
    StockInCreatePosition
  },
  data: () => ({
    window: ''
  }),
  methods: {
    // 切换视图
    showWindow: function(window, id) {
      this.window = window
      switch (window) {
        case 'details':
          this.currentWarehouseId = id
          this.$refs.detailsMod.getInfo(id)
          break
        case 'list':
          this.currentWarehouseId = 0
          break
      }
    },

    toCreate() {
      this.window = 'create'
    }
  }
}
</script>