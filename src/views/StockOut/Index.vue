<template>
  <v-container fluid class="pa-0 my-n1">
    <v-row dense>
      <v-col cols="12">
        <v-toolbar dense>
          <v-toolbar-title>货品出库</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn v-if="window != 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
            <v-btn text @click.stop="toCreate">货品出库</v-btn>
            <v-btn text @click.stop="refresh">刷新</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-col>

      <v-col cols="12">
        <v-window v-model="window">
          <v-window-item value="create" eager>
            <stock-out-create ref="createMod" @close="closeCreate"></stock-out-create>
          </v-window-item>

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
    <!--
     <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>货品出库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window != 'details'" text color="amber accent-4" @click.stop="toList">返回</v-btn>
          <v-btn text @click.stop="toCreate">货品出库</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>
    <v-flex xs12 md12>
      <v-window v-model="window">
        <v-window-item value="create" eager>
          <stock-out-create ref="createMod" @close="closeCreate"></stock-out-create>
        </v-window-item>

        <v-window-item value="details" eager>
          <v-flex xs3 md3>
            <stock-out-list ref="listMod" @activate="showDetails"></stock-out-list>
          </v-flex>

          <v-flex xs9 md9>
          </v-flex>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
  -->
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
    toCreate() {
      this.showWindow('create')
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