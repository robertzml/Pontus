<template>
  <v-sheet class="transparent">
    <v-container fluid class="pa-0" v-if="storeList.length > 0">
      <v-row dense>
        <v-col v-for="warehouseId in warehouses" :key="warehouseId" cols="3">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>{{ warehouseInfo(warehouseId).warehouseName }}</v-list-item-title>
                <v-list-item-subtitle> 托盘数量：{{ warehouseInfo(warehouseId).trayCount }} </v-list-item-subtitle>
                <v-list-item-subtitle> 在库总数量：{{ warehouseInfo(warehouseId).totalCount }} </v-list-item-subtitle>
                <v-list-item-subtitle> 在库总重量：{{ warehouseInfo(warehouseId).totalWeight }} 吨 </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn text color="primary" @click="selectWarehouse(warehouseId)">
                  选择
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="3">
          <div class="ml-4">
            <span>货架</span>
          </div>

          <v-chip-group active-class="primary--text" v-model="sShelfId">
            <v-chip v-for="shelf in shelfListData" :key="shelf.id" :value="shelf.id" @click="selectShelf(shelf.id)">
              <template v-if="shelf.type == 1">
                <v-avatar left>
                  <v-icon>home</v-icon>
                </v-avatar>
                {{ shelf.number }} 号货架
              </template>
              <template v-else-if="shelf.type == 2">
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
        </v-col>
        <v-col cols="6">
          <div class="ml-4">
            <span>排</span>
          </div>
          <v-chip-group active-class="amber--text" v-model="sRow">
            <v-chip label v-for="row in rowListData" :key="row" :value="row" @click="selectRow(row)">
              {{ row }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="3">
          <div class="ml-4 mr-8">
            <span>层</span>
          </div>
          <v-chip-group active-class="amber--text" v-model="sLayer">
            <v-chip label v-for="layer in layerListData" :key="layer" :value="layer" @click="selectLayer(layer)">
              {{ layer }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12">
          <v-chip-group active-class="red--text text--accent-4" column v-model="sPosition" class="d-flex justify-space-between">
            <v-chip label v-for="pos in positionList" :key="pos.id" :value="pos" :disabled="isOutCargo(pos)" :color="positionColor(pos)">
              {{ pos.number }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import position from '@/controllers/position'

export default {
  name: 'CarryOutStoreFind',
  props: {
    storeList: {
      type: Array
    }
  },
  data: () => ({
    shelfListData: [],
    rowListData: [],
    layerListData: [],
    positionList: [],
    sShelfId: 0,
    sRow: 0,
    sLayer: 0,
    sPosition: ''
  }),
  computed: {
    warehouses: function() {
      let ids = this.storeList.map(r => r.warehouseId)
      return [...new Set(ids)]
    }
  },
  watch: {
    storeList: function() {
      this.sShelfId = 0
      this.sRow = 0
      this.sLayer = 0
      this.sPosition = null
    },
    // 选择出库仓位
    sPosition: function(val) {
      if (val) {
        let sStoreInfo = this.storeList.find(r => r.positionId == val.id)
        this.$emit('select', sStoreInfo, val)
      } else {
        this.$emit('select', null, null)
      }
    }
  },
  methods: {
    // 生成仓库选择信息
    warehouseInfo: function(id) {
      let s = this.storeList.find(r => r.warehouseId == id)

      let sum = this.storeList.reduce(
        (acc, cur) => {
          if (cur.warehouseId == id) {
            acc.trayCount++
            acc.totalCount += cur.storeCount
            acc.totalWeight += cur.storeWeight
          }

          return acc
        },
        { trayCount: 0, totalCount: 0, totalWeight: 0 }
      )

      let info = {
        warehouseId: id,
        warehouseName: s.warehouseName,
        trayCount: sum.trayCount,
        totalCount: sum.totalCount,
        totalWeight: sum.totalWeight
      }

      return info
    },

    // 选择仓库
    selectWarehouse(id) {
      let shelfs = this.storeList.filter(r => r.warehouseId == id).map(r => r.shelfId)
      let sids = [...new Set(shelfs)]

      this.shelfListData = sids.map(r => {
        return {
          id: r,
          type: this.storeList.find(s => s.shelfId == r).shelfType,
          number: this.storeList.find(s => s.shelfId == r).shelfNumber
        }
      })

      this.shelfListData.sort(function(a, b) {
        if (a.number > b.number) {
          return 1
        }
        if (a.number < b.number) {
          return -1
        }

        return 0
      })
    },

    // 选择货架
    selectShelf(id) {
      let rows = this.storeList.filter(r => r.shelfId == id).map(r => r.row)
      this.rowListData = [...new Set(rows)]
      this.rowListData.sort(function(a, b) {
        return a - b
      })
    },

    // 选择排
    selectRow(row) {
      let layers = this.storeList.filter(r => r.shelfId == this.sShelfId && r.row == row).map(r => r.layer)
      this.layerListData = [...new Set(layers)]
      this.layerListData.sort(function(a, b) {
        return a - b
      })
    },

    // 选择层
    selectLayer(layer) {
      this.sLayer = layer
      this.loadPoistions()
    },

    // 载入选中层的仓位
    loadPoistions() {
      let vm = this
      position.getListInLayer({ shelfId: this.sShelfId, row: this.sRow, layer: this.sLayer }).then(res => {
        vm.positionList = res
      })
    },

    // 该仓位是否出库货物
    isOutCargo(pos) {
      let index = this.storeList.findIndex(r => r.positionId == pos.id)
      return index == -1
    },

    // 仓位颜色
    positionColor(pos) {
      if (pos.status == 2) {
        return 'grey darken-4'
      } else if (pos.status == 31) {
        return ''
      } else {
        return 'primary'
      }
    }
  }
}
</script>
