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
                <v-icon>storage</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
            <template v-else>
              <v-avatar left>
                <v-icon>cloud</v-icon>
              </v-avatar>
              {{ shelf.number }} 号货架
            </template>
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-flex>

    <v-flex xs12 md12>
      <v-sheet class="d-flex flex-row">
        <div class="d-flex ml-4 mr-8 align-center">
          <span>排</span>
        </div>

        <v-chip-group active-class="amber--text" v-model="sRow" class="d-flex justify-space-between">
          <v-chip label v-for="row in currentShelf.row" :key="row" :value="row">
            {{ row }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-flex>

    <v-flex xs12 md12>
      <v-sheet class="d-flex flex-column">
        <div class="d-flex justify-center">
          <v-icon>arrow_back</v-icon>
          <span class="mb-1">仓位情况</span>
          <v-icon>arrow_forward</v-icon>
        </div>
        <div>
          <v-item-group v-if="sRow != undefined && sRow != 0" mandatory v-model="sPosition">
            <v-container fluid>
              <v-row v-for="depth in currentShelf.depth" :key="depth" no-gutters>
                <v-col v-for="layer in currentShelf.layer" :key="layer" cols="2">
                  <v-item v-slot:default="{ active, toggle }" :value="`${layer}-${depth}`">
                    <v-card :color="active ? 'primary' : ''" @click="toggle" class="pa-2" outlined tile>
                      {{ sRow }}-{{ layer }}-{{ depth }}
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </div>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import warehouse from '@/controllers/warehouse'
import shelf from '@/controllers/shelf'
import position from '@/controllers/position'

export default {
  name: 'StoreIndex',
  data: () => ({
    warehouseListData: [],
    shelfListData: [],
    positionListData: [],
    sShelfId: 0,
    sRow: 0,
    currentShelf: {},
    sPosition: ''
  }),
  watch: {
    sShelfId(val) {
      if (val == undefined) {
        return
      }
      this.currentShelf = this.shelfListData.find(r => r.id == val)
      this.sPosition = ''
      this.loadPosition(val)
    },
    sRow(val) {
      this.sPosition = ''
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

    loadPosition(shelfId) {
      let vm = this
      position.getList(shelfId).then(res => {
        vm.positionListData = res
      })
    },

    refresh() {}
  },
  mounted: function() {
    this.init()
  }
}
</script>
