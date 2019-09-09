<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>入库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window == 'create'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn text @click.stop="toEditTask">任务设置</v-btn>
          <v-btn text @click.stop="toCreate">仓位库入库</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs3 md3>
      <stock-in-list ref="listMod" @activate="showDetails"></stock-in-list>
    </v-flex>
    <v-flex xs9 md9>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>入库信息</v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <stock-in-details ref="detailsMod" :show-title="false"></stock-in-details>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-flex>

    <v-dialog v-model="createDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <stock-in-create ref="createMod" @close="closeCreate"></stock-in-create>
    </v-dialog>

    <v-flex xs12 md12>
      <v-window v-model="window">
      </v-window>
      <v-window v-model="editTask">
        <stock-in-edit-task ref="editTaskMod"></stock-in-edit-task>
      </v-window>
    </v-flex>
  </v-layout>
</template>

<script>
import StockInList from './List'
import StockInCreate from './Create'
import StockInDetails from './Details'
import StockInEditTask from './EditTask'

export default {
  name: 'StockInIndex',
  components: {
    StockInList,
    StockInCreate,
    StockInDetails,
    StockInEditTask
  },
  data: () => ({
    window: 'list',
    currentStockInId: '',
    createDialog: false
  }),
  methods: {
    // 切换视图
    showWindow: function(window, id) {
      this.window = window
      switch (window) {
        case 'details':
          //this.currentWarehouseId = id
          //this.$refs.detailsMod.getInfo(id)
          break
        case 'list':
          //this.currentWarehouseId = 0
          break
        case 'editTask':
          this.$refs.editTaskMod.init(id)
          break
      }
    },

    showDetails(val) {
      this.currentStockInId = val
      this.$refs.detailsMod.init(val)
    },

    toList() {
      this.window = 'list'
    },

    toCreate() {
      this.createDialog = true
    },

    toEditTask() {
      if (this.currentStockInId != '') {
        this.showWindow(this.currentStockInId)
      }
    },

    closeCreate(update) {
      if (update) {
        this.$refs.listMod.init()
      }

      this.createDialog = false
    }
  }
}
</script>
