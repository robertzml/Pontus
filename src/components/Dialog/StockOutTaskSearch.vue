<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>仓位库出库货物查找</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text class="pt-1">
          <v-container fluid class="px-0">
            <v-row dense>
              <v-col cols="6">
                <cargo-select :cargo-id.sync="cargoId" :cargo-data="cargoListData"></cargo-select>
              </v-col>
              <v-col cols="2">
                <v-btn class="primary mt-2" @click="searchStore" :disabled="!cargoId">搜索库存</v-btn>
              </v-col>

              <v-col cols="12">
                <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
                <v-row dense>
                  <v-col cols="3">
                    <v-select
                      :items="warehouseList"
                      label="存放仓库"
                      item-text="name"
                      item-value="id"
                      clearable
                      v-model="filter.warehouseId"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-menu
                      v-model="timeMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="filter.initialTime"
                          label="初始入库日期"
                          prepend-icon="event"
                          clearable
                          hide-details
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="filter.initialTime" :day-format="$util.pickerDayFormat" @input="timeMenu = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="filter.search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <v-card-subtitle class="pb-2 teal darken-4">
                  库存记录
                </v-card-subtitle>
                <v-data-table
                  v-model="selectedStores"
                  :headers="headers"
                  :items="filterData"
                  :search="filter.search"
                  show-select
                  :items-per-page="10"
                >
                  <template v-slot:item.status="{ item }">
                    {{ item.status | displayStatus }}
                  </template>
                  <template v-slot:item.initialTime="{ item }">
                    {{ item.initialTime | displayDate }}
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-btn small color="primary" @click="viewItem(item)">
                      <v-icon left dark>pageview</v-icon>
                      查看
                    </v-btn>
                  </template>
                </v-data-table>
                <v-btn class="primary mt-n12" @click="addToOut">添加出库</v-btn>
              </v-col>

              <v-col cols="12">
                <v-chip-group column class="d-flex justify-space-between">
                  <v-chip label v-for="pos in positionList" :key="pos.id" :value="pos" :color="positionColor(pos)">
                    {{ pos.number }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <v-card-subtitle class="pb-2 cyan darken-4">出库货物</v-card-subtitle>
                <!-- 待出库货物组件 -->
                <position-store-out ref="storeOutMod"></position-store-out>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" @click="submit" :loading="loading" class="ml-2">提交出库</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import store from '@/controllers/store'
import cargo from '@/controllers/cargo'
import warehouse from '@/controllers/warehouse'
import position from '@/controllers/position'
import stockOut from '@/controllers/stockOut'
import CargoSelect from '@/components/Control/CargoSelect'
import PositionStoreOut from '@/components/Mod/PositionStoreOut'

export default {
  name: 'StockOutTaskSearch',
  components: {
    CargoSelect,
    PositionStoreOut
  },
  data: () => ({
    dialog: false,
    valid: true,
    loading: false,
    stockOutInfo: {},
    cargoId: '',
    cargoListData: [],
    storeListData: [],
    timeMenu: false,
    warehouseList: [],
    filter: {
      warehouseId: 0,
      initialTime: null,
      status: 0,
      search: ''
    },
    headers: [
      { text: '托盘码', value: 'trayCode' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '货品名称', value: 'cargoName' },
      { text: '规格', value: 'specification' },
      { text: '批次', value: 'batch' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期', value: 'durability' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '在库总数量', value: 'storeCount' },
      { text: '在库总重量(t)', value: 'storeWeight' },
      { text: '初始入库时间', value: 'initialTime' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ],
    positionList: [],
    selectedStores: []
  }),
  computed: {
    filterData() {
      let temp = this.storeListData

      if (this.filter.warehouseId) {
        temp = temp.filter(r => r.warehouseId == this.filter.warehouseId)
      }

      if (this.filter.initialTime) {
        let t = this.$moment(this.filter.initialTime)
        temp = temp.filter(r => t.isSame(r.initialTime, 'day'))
      }

      return temp
    }
  },
  methods: {
    init(outInfo) {
      this.clear()
      this.dialog = true
      this.loading = false
      this.stockOutInfo = outInfo
      this.positionList = []

      this.loadCargoData()
      this.loadWarehouse()

      this.$nextTick(() => {
        this.$refs.storeOutMod.init(this.stockOutInfo)
        this.$refs.form.resetValidation()
      })
    },

    // 载入清空
    clear() {
      this.cargoId = ''
      this.storeListData = []
    },

    // 载入货品
    async loadCargoData() {
      this.cargoListData = await cargo.getList(this.stockOutInfo.customerId)
    },

    // 载入仓库
    async loadWarehouse() {
      this.warehouseList = await warehouse.getList(2)
    },

    // 搜索库存
    async searchStore() {
      if (this.cargoId) {
        this.storeListData = await store.findForStockOut({ contractId: this.stockOutInfo.contractId, cargoId: this.cargoId })
        this.selectedStores = []
      }
    },

    // 查看当前一层存放情况
    async viewItem(item) {
      this.positionList = await position.getListInLayer({ shelfId: item.shelfId, row: item.row, layer: item.layer })
    },

    // 仓位颜色
    positionColor(pos) {
      if (pos.shelfType == 3) {
        return 'primary'
      }

      if (pos.status == 2) {
        return 'grey darken-4' //禁用
      } else if (pos.status == 31) {
        return '' // 空置
      } else {
        return 'primary' // 有货
      }
    },

    // 添加出库
    addToOut() {
      this.selectedStores.forEach(item => {
        this.$refs.storeOutMod.addTask(item)
      })
    },

    // 提交出库
    submit() {
      if (this.$refs.form.validate()) {
        let taskList = this.$refs.storeOutMod.getTasks()

        if (taskList.length == 0) {
          this.$store.commit('alertError', '请选择出库货物')
          return
        }

        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        let data = {
          stockOutId: this.stockOutInfo.id,
          tasks: taskList,
          userId: this.$store.state.user.id
        }

        stockOut.addPositionOut(data).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加出库成功')
            this.$emit('close')
            vm.loading = false
            vm.dialog = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.loading = false
          }
        })
      }
    }
  }
}
</script>
