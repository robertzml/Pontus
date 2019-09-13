<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>入库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window != 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn v-if="window == 'details' && currentStockInId != ''" text @click.stop="toEntrance">上架操作</v-btn>
          <v-btn v-if="window == 'details' && currentStockInId != ''" text @click.stop="toEditTask">任务录入</v-btn>
          <v-btn text @click.stop="toCreate">货品入库</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs3 md3>
      <stock-in-list ref="listMod" @activate="showDetails"></stock-in-list>
    </v-flex>

    <v-flex xs9 md9>
      <v-window v-model="window">
        <v-window-item value="details" eager>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header ripple>入库信息</v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <stock-in-details ref="detailsMod" :show-title="false"></stock-in-details>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header ripple>入库任务</v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <stock-in-task-list ref="taskListMod" @showDetails="toTaskDetails"></stock-in-task-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-window-item>

        <v-window-item value="taskDetails" eager>
          <stock-in-task-details ref="taskDetailsMod"></stock-in-task-details>
        </v-window-item>

        <v-window-item value="create" eager>
          <stock-in-create ref="createMod" @close="closeCreate"></stock-in-create>
        </v-window-item>

        <v-window-item value="editTask" eager>
          <stock-in-edit-task ref="editTaskMod"></stock-in-edit-task>
        </v-window-item>
      </v-window>
    </v-flex>

    <v-flex xs12 md12>

    </v-flex>
  </v-layout>
</template>

<script>
import StockInList from './List'
import StockInCreate from './Create'
import StockInDetails from './Details'
import StockInTaskList from './TaskList'
import StockInEditTask from './EditTask'
import StockInTaskDetails from './TaskDetails'

export default {
  name: 'StockInIndex',
  components: {
    StockInList,
    StockInCreate,
    StockInDetails,
    StockInEditTask,
    StockInTaskList,
    StockInTaskDetails
  },
  data: () => ({
    window: 'details',
    panel: [0],
    currentStockInId: ''
  }),
  methods: {
    // 切换视图
    showWindow: function(window, id) {
      this.window = window
      switch (window) {
        case 'details':
          this.currentStockInId = id
          this.$refs.detailsMod.init(id)
          this.$refs.taskListMod.init(id)
          break
        case 'taskDetails':
          this.$refs.taskDetailsMod.init(id)
          break
        case 'create':
          // this.currentStockInId = ''
          break
        case 'editTask':
          this.$refs.editTaskMod.init(id)
          break
      }
    },

    refresh() {
      this.$refs.listMod.init()
    },

    // 显示入库信息
    showDetails(val) {
      this.showWindow('details', val)
    },

    // 返回入库列表
    toList() {
      this.showWindow('details', this.currentStockInId)
    },

    // 显示入库任务信息
    toTaskDetails(val) {
      this.showWindow('taskDetails', val)
    },

    // 进入货品入库
    toCreate() {
      this.showWindow('create')
    },

    closeCreate(val, update) {
      if (update) {
        this.$refs.listMod.init()
      }

      this.showWindow('details', val)
    },

    toEditTask() {
      if (this.currentStockInId != '') {
        this.showWindow('editTask', this.currentStockInId)
      }
    },

    toEntrance() {
      if (this.currentStockInId != '') {
        this.showWindow('entrance', this.currentStockInId)
      }
    }
  }
}
</script>
