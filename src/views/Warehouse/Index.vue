<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>仓库管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="tab == 'WarehouseDetails'" text color="amber accent-4" @click.stop="showList">返回</v-btn>
          <v-btn text @click.stop="refresh">刷新</v-btn>
          <v-btn v-if="tab == 'WarehouseDetails'" text @click.stop="showEdit">编辑仓库</v-btn>
          <v-btn v-if="tab == 'WarehouseList'" text @click.stop="showCreate">添加仓库</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-slide-x-transition leave-absolute>
        <component v-bind:is="tab"></component>
      </v-slide-x-transition>
    </v-col>

    <v-col cols="12">
      <warehouse-edit ref="warehouseEditMod" @update="refresh"></warehouse-edit>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
  data: () => ({}),
  computed: {
    ...mapState({
      tab: (state) => state.warehouse.tab,
      warehouseInfo: (state) => state.warehouse.warehouseInfo
    })
  },
  methods: {
    ...mapMutations({
      refresh: 'warehouse/refresh'
    }),
    ...mapActions({
      showList: 'warehouse/showList'
    }),

    showCreate: function () {
      this.$refs.warehouseEditMod.init(0)
    },

    showEdit() {
      this.$refs.warehouseEditMod.init(this.warehouseInfo.id)
    }
  },
  mounted: function () {
    this.showList()
  }
}
</script>
