<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>仓库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="window == 'details'" text color="amber accent-4" @click.stop="showWindow('list')">返回</v-btn>
          <v-btn v-if="window == 'details'" text @click.stop="showEdit">编辑仓库</v-btn>
          <v-btn v-if="window != 'shelfDetails'" text @click.stop="showCreate">添加仓库</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-window v-model="window">
        <v-window-item value="list" :eager="true">
          <warehouse-list ref="listMod" :show-window="showWindow"></warehouse-list>
        </v-window-item>
        <v-window-item value="details" :eager="true">
          <warehouse-details ref="detailsMod" :show-window="showWindow"></warehouse-details>
        </v-window-item>
      </v-window>
    </v-col>

    <v-col cols="12">
      <warehouse-edit ref="warehouseEditMod" @update="refresh"></warehouse-edit>
    </v-col>
  </v-row>
</template>

<script>
import WarehouseList from './List'
import WarehouseDetails from './Details'
import WarehouseEdit from './Edit'

export default {
  name: 'WarehouseIndex',
  components: {
    WarehouseList,
    WarehouseDetails,
    WarehouseEdit
  },
  data: () => ({
    window: 'list',
    currentWarehouseId: 0
  }),
  methods: {
    showCreate: function() {
      this.$refs.warehouseEditMod.init(0)
    },
    showEdit() {
      this.$refs.warehouseEditMod.init(this.currentWarehouseId)
    },

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

    refresh() {
      if (this.currentWarehouseId != 0) {
        this.$refs.detailsMod.getInfo(this.currentWarehouseId)
      } else {
        this.$refs.listMod.loadList()
      }
    }
  }
}
</script>
