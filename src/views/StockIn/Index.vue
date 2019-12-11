<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>货品入库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window != 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn text @click.stop="showCreate">新建入库单</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="3">
      <stock-in-list ref="listMod" @activate="showDetails"></stock-in-list>
    </v-col>

    <v-col cols="9">
      <v-window v-model="window">
        <v-window-item value="details" eager>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header ripple>入库单信息</v-expansion-panel-header>
              <v-expansion-panel-content eager>
                <stock-in-details ref="detailsMod" :show-title="false" @updateTask="updateTask"></stock-in-details>
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
      </v-window>
    </v-col>

    <v-col cols="12">
      <stock-in-create ref="stockInCreateMod" @close="closeCreate"></stock-in-create>
    </v-col>
  </v-row>
</template>

<script>
import StockInList from './List'
import StockInCreate from './Create'
import StockInDetails from './Details'
import StockInTaskList from './TaskList'
import StockInTaskDetails from './TaskDetails'

export default {
  name: 'StockInIndex',
  components: {
    StockInList,
    StockInCreate,
    StockInDetails,
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

    // 显示货品入库
    showCreate() {
      // this.showWindow('create')
      this.$refs.stockInCreateMod.init(0)
    },

    /**
     * 关闭添加入库
     * val: 入库id
     * update: 是否新增
     *  */
    closeCreate(val, update) {
      if (update) {
        this.$refs.listMod.init()
      }

      this.showWindow('details', val)
    },

    updateTask() {
      this.$refs.taskListMod.init(this.currentStockInId)
    }
  }
}
</script>
