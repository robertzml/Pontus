<template>
  <v-container fluid class="pa-0 my-n1">
    <v-row dense>
      <v-col cols="12">
        <v-toolbar dense>
          <v-toolbar-title>货品出库</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn v-if="window != 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
            <v-btn text @click.stop="showCreate">货品出库</v-btn>
            <v-btn text @click.stop="refresh">刷新</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-col>

      <v-col cols="12">
        <v-window v-model="window">
          <v-window-item value="details" eager>
            <v-row>
              <v-col cols="3">
                <stock-out-list ref="listMod" @activate="showDetails"></stock-out-list>
              </v-col>

              <v-col cols="9">
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>

    <stock-out-create ref="stockOutCreateMod"></stock-out-create>
  </v-container>
</template>

<script>
import StockOutList from './List'
import StockOutCreate from './Create'

export default {
  name: 'StockOutIndex',
  components: {
    StockOutList,
    StockOutCreate
  },
  data: () => ({
    window: 'details'
  }),
  methods: {
    // 切换视图
    showWindow: function(window, id) {
      this.window = window
      switch (window) {
        case 'details':
          break
        case 'taskDetails':
          // this.$refs.taskDetailsMod.init(id)
          break
        case 'editTask':
          // this.$refs.editTaskMod.init(id)
          break
      }
    },

    // 进入货品出库
    showCreate() {
      this.$refs.stockOutCreateMod.init()
    },

    toList() {
      this.showWindow('details')
    },

    refresh() {},

    closeCreate() {},

    showDetails() {}
  }
}
</script>