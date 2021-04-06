<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>仓位管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items> </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="3">
      <v-list min-height="292px">
        <v-subheader>仓库选择</v-subheader>
        <v-list-item-group v-model="sWarehouse" mandatory>
          <v-list-item v-for="item in warehouseListData" :key="item.id" :value="item">
            <v-list-item-icon>
              <v-icon>store_mall_directory</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }} - {{ item.number }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <v-col cols="9">
      <v-container class="pa-0" fluid style="max-height: 310px; overflow-y: auto; overflow-x: hidden">
        <v-row>
          <v-col v-for="item in shelfListData" :key="item.id" :value="item" cols="12" sm="6" md="4" class="pt-0">
            <v-card class="align-center" @click="viewShelf(item)">
              <v-list-item three-line>
                <v-list-item-content class="align-self-start">
                  <v-list-item-subtitle class="mb-2">编号：{{ item.number }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">类型：{{ item.type | shelfType }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">入口编号：{{ item.entranceNumber }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="mb-2">排数: {{ item.row }} 层数: {{ item.layer }} 进数: {{ item.depth }}</v-list-item-subtitle>
                  <v-list-item-subtitle>备注: {{ item.remark }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar width="100px" height="65px" tile class="align-self-center">
                  <v-img :src="item.img"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col cols="12">
      <position-list v-show="sShelf != null" ref="listMod"></position-list>
    </v-col>
  </v-row>
</template>

<script>
import warehouse from '@/controllers/warehouse'
import shelf from '@/controllers/shelf'
import PositionList from './List'

export default {
  name: 'PositionIndex',
  components: {
    PositionList
  },
  data: () => ({
    warehouseListData: [],
    shelfListData: [],
    sWarehouse: null,
    sShelf: null
  }),
  watch: {
    sWarehouse: function (val) {
      this.sShelf = null
      this.loadShelf(val.id)
    }
  },
  methods: {
    init: function () {
      this.loadWarehouse()
    },

    loadWarehouse: function () {
      let vm = this
      warehouse.getList(2).then((res) => {
        vm.warehouseListData = res
      })
    },

    loadShelf: function (warehouseId) {
      let vm = this
      shelf.getList(warehouseId).then((res) => {
        vm.shelfListData = res
        vm.shelfListData.forEach((r) => {
          r.img = require('@/assets/shelf' + r.type + '.png')
        })
      })
    },

    viewShelf(item) {
      this.sShelf = item
      this.$refs.listMod.init(item.id)
    }
  },
  mounted: function () {
    this.init()
  }
}
</script>
