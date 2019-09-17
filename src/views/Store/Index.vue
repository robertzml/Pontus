<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>仓库库存</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-select :items="warehouseListData" item-value="id" item-text="name" solo return-object label="仓库选择" @change="selectWarehouse" style="width:200px;">
            <template v-slot:selection="{ item, index }">
              {{ item.number }} - {{ item.name }}
            </template>
          </v-select>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>
      <v-sheet class="d-flex flex-row">
        <div class="d-flex ml-4 mr-8 align-center">
          <span>货架</span>
        </div>

        <v-chip-group active-class="primary--text" v-model="sShelfId" class="d-flex justify-space-between">
          <v-chip v-for="shelf in shelfListData" :key="shelf.id" :value="shelf.id">
            <template v-if="shelf.type==1">
              <v-avatar left>
                <v-icon>home</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
            <template v-else-if="shelf.type==2">
              <v-avatar left>
                <v-icon>account-circle</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
            <template v-else>
              <v-avatar left>
                <v-icon>account-circle</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-flex>

    <v-flex xs12 md12>
      <v-sheet class="px-1">
        <v-chip-group active-class="primary--text">
          <v-chip label v-for="row in currentShelf.row" :key="row" :value="row">
            {{ row }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import warehouse from '@/controllers/warehouse'
import shelf from '@/controllers/shelf'

export default {
  name: 'StoreIndex',
  data: () => ({
    warehouseListData: [],
    shelfListData: [],
    sShelfId: 0,
    currentShelf: {}
  }),
  watch: {
    sShelfId(val) {
      if (val == undefined) {
        return
      }
      this.currentShelf = this.shelfListData.find(r => r.id == val)
    }
  },
  methods: {
    init() {
      this.loadWarehouse()
    },

    loadWarehouse() {
      let vm = this
      warehouse.getList().then(res => {
        vm.warehouseListData = res
      })
    },

    selectWarehouse(val) {
      let vm = this
      shelf.getList(val.id).then(res => {
        vm.shelfListData = res
      })
    },

    refresh() {}
  },
  mounted: function() {
    this.init()
  }
}
</script>
