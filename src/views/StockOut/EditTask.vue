<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="py-2">
        <div class="title text--primary">货品选择</div>

        <v-container fluid class="px-0">
          <v-row dense>
            <v-col cols="6">
              <cargo-select ref="cargoSelect" :cargo-id.sync="cargoId" :cargo-data="cargoListData"></cargo-select>
            </v-col>
            <v-col cols="6">
              <v-btn class="primary mt-2" @click="searchStore">搜索库存</v-btn>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col v-for="warehouseId in warehouses" :key="warehouseId" cols="3">
              <v-card>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ warehouseInfo(warehouseId).warehouseName }}</v-list-item-title>
                    <v-list-item-subtitle> 托盘数量：{{ warehouseInfo(warehouseId).trayCount }} </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      在库总数量：{{ warehouseInfo(warehouseId).totalCount }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      在库总重量：{{ warehouseInfo(warehouseId).totalWeight }} 吨
                    </v-list-item-subtitle>
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
            <v-col cols="12">
              <v-sheet class="d-flex flex-row">
                <div class="d-flex ml-4 mr-8 align-center">
                  <span>货架</span>
                </div>

                <v-chip-group active-class="primary--text" v-model="sShelfId" class="d-flex justify-space-between">
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
              </v-sheet>
            </v-col>
            <v-col cols="12">
              <v-sheet class="d-flex flex-row">
                <div class="d-flex ml-4 mr-8 align-center">
                  <span>排</span>
                </div>
                <v-chip-group active-class="amber--text" v-model="sRow" class="d-flex justify-space-between">
                  <v-chip label v-for="row in rowListData" :key="row" :value="row">
                    {{ row }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/controllers/store'
import stockOut from '@/controllers/stockOut'
import cargo from '@/controllers/cargo'
import CargoSelect from '@/components/Control/CargoSelect'

export default {
  name: 'StockOutEditTask',
  components: {
    CargoSelect
  },
  data: () => ({
    valid: true,
    cargoId: '',
    cargoListData: [],
    storeListData: [],
    shelfListData: [],
    rowListData: [],
    sShelfId: 0,
    sRow: 0,
    digitRules: [v => (v != null && /^\d+/.test(v)) || '请输入数字'],
    taskHeaders: [
      { text: '托盘码', value: 'trayCode', align: 'left' },
      { text: '类别名称', value: 'categoryName' },
      { text: '在库数量', value: 'storeCount' },
      { text: '出库数量', value: 'outCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'storeWeight' },
      { text: '规格', value: 'specification' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
      { text: '备注', value: 'remark' }
    ],
    taskInfoList: []
  }),
  watch: {},
  computed: {
    ...mapState({
      stockOutId: state => state.stockOut.stockOutId,
      stockOutInfo: state => state.stockOut.stockOutInfo
    }),

    warehouses: function() {
      let ids = this.storeListData.map(r => r.warehouseId)
      return [...new Set(ids)]
    }
  },
  methods: {
    loadCargoData() {
      if (this.stockOutInfo) {
        let vm = this
        cargo.getList(this.stockOutInfo.customerId).then(res => {
          vm.cargoListData = res
        })
      }
    },

    // 搜索货品在库库存
    searchStore() {
      if (this.cargoId == '') {
        return
      }

      let vm = this
      store.findByStockOut({ stockOutId: this.stockOutInfo.id, cargoId: this.cargoId }).then(res => {
        vm.storeListData = res
      })
    },

    // 生成仓库选择信息
    warehouseInfo: function(id) {
      let s = this.storeListData.find(r => r.warehouseId == id)

      let sum = this.storeListData.reduce(
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
      let shelfs = this.storeListData.filter(r => r.warehouseId == id).map(r => r.shelfId)
      let sids = [...new Set(shelfs)]

      this.shelfListData = sids.map(r => {
        return {
          id: r,
          type: this.storeListData.find(s => s.shelfId == r).shelfType,
          number: this.storeListData.find(s => s.shelfId == r).shelfNumber
        }
      })
    },

    // 选择货架
    selectShelf(id) {
      let rows = this.storeListData.filter(r => r.shelfId == id).map(r => r.row)
      this.rowListData = [...new Set(rows)]
    },

    addStockOut(item) {
      let task = {
        storeId: item.id,
        trayCode: item.trayCode,
        categoryName: item.categoryName,
        storeCount: item.storeCount,
        outCout: 0,
        unitWeight: item.unitWeight,
        storeWeight: item.storeWeight,
        specification: item.specification,
        originPlace: item.originPlace,
        durability: item.durability,
        remark: ''
      }
      this.taskInfoList.push(task)
    },

    taskSave() {},
    taskCancel() {},
    taskOpen() {},
    taskClose() {
      console.log('Dialog closed')
    },

    submit() {
      if (this.$refs.form.validate()) {
        if (this.taskInfoList.length == 0) {
          this.$store.commit('alertError', '请选择出库货品')
          return
        }

        stockOut.create(this.stockOutInfo, this.taskInfoList).then(res => {})
      }
    }
  },
  mounted: function() {
    console.log('stock out edit task mounted')
    this.loadCargoData()
    this.$refs.form.resetValidation()
  }
}
</script>
