<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text class="py-2">
        <div class="title text--primary">货品选择</div>

        <v-container fluid>
          <v-row dense>
            <v-col cols="6">
              <cargo-select ref="cargoSelect" :cargo-id.sync="cargoId" :cargo-data="cargoListData"></cargo-select>
            </v-col>
            <v-col cols="6">
              <v-btn class="primary mt-2" @click="searchStore">搜索库存</v-btn>
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
    storeHeaders: [
      { text: '分类编码', value: 'categoryNumber' },
      { text: '分类名称', value: 'categoryName' },
      { text: '仓位码', value: 'positionNumber' },
      { text: '托盘码', value: 'trayCode' },
      { text: '货品总数量', value: 'totalCount' },
      { text: '在库数量', value: 'storeCount' },
      { text: '货品总重量(吨)', value: 'totalWeight' },
      { text: '在库重量(吨)', value: 'storeWeight' },
      { text: '入库时间', value: 'inTime' },
      { text: '操作', value: 'action', sortable: false }
    ],
    storeListData: [],
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
  computed: mapState({
    stockOutId: state => state.stockOut.stockOutId,
    stockOutInfo: state => state.stockOut.stockOutInfo
  }),
  watch: {
    stockOutId: function() {
      this.loadCargoData()
    }
  },
  methods: {
    init: function() {
      this.loadCargoData()
      this.$refs.form.resetValidation()
    },

    loadCargoData() {
      if (this.stockOutInfo) {
        let vm = this
        cargo.getList(this.stockOutInfo.customerId).then(res => {
          vm.cargoListData = res
        })
      }
    },

    searchStore() {
      if (this.cargoId == '') {
        return
      }

      let vm = this
      store.findByCargo({ contractId: this.stockOutInfo.contractId, cargoId: this.cargoId }).then(res => {
        vm.storeListData = res
      })
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
    this.init()
  }
}
</script>
