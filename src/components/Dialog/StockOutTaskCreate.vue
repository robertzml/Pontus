<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="cyan">
        出库任务单
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row dense>
              <v-col cols="6">
                <cargo-select ref="cargoSelect" :cargo-id.sync="cargoId" :cargo-data="cargoListData"></cargo-select>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title>托盘数量：{{ cargoStoreInfo.trayCount }}</v-list-item-title>
                      <v-list-item-subtitle> 在库总数量：{{ cargoStoreInfo.totalCount }} </v-list-item-subtitle>
                      <v-list-item-subtitle> 在库总重量：{{ cargoStoreInfo.totalWeight }} 吨 </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field label="出库数量*" v-model="taskInfo.outCount" :rules="digitRules"></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field label="单位重量" v-model="unitWeight" readonly suffix="千克"></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field label="出库重量*" v-model="totalWeight" suffix="吨"></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12">
                <v-text-field label="备注" v-model="taskInfo.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="submitLoading" @click="addTask">添加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import store from '@/controllers/store'
import stockOut from '@/controllers/stockOut'
import cargo from '@/controllers/cargo'
import CargoSelect from '@/components/Control/CargoSelect'

export default {
  name: 'StockOutTaskCreate',
  components: {
    CargoSelect
  },
  data: () => ({
    dialog: false,
    valid: true,
    submitLoading: false,
    stockOutInfo: {},
    cargoId: '',
    unitWeight: 0.0,
    cargoListData: [],
    storeListData: [],
    digitRules: [v => (v != null && /^\d+$/.test(v)) || '请输入数字'],
    taskInfo: {
      stockOutId: '',
      cargoId: '',
      storeCount: 0,
      outCount: 0,
      storeWeight: 0.0,
      outWeight: 0.0,
      remark: ''
    }
  }),
  watch: {
    cargoId: function(val) {
      this.searchStore()
      var find = this.cargoListData.find(r => r.id == val)
      if (find != undefined) {
        this.unitWeight = find.unitWeight
      } else {
        this.unitWeight = 0.0
      }
    }
  },
  computed: {
    // 货品库存信息
    cargoStoreInfo: function() {
      let sum = this.storeListData.reduce(
        (acc, cur) => {
          acc.trayCount++
          acc.totalCount += cur.storeCount
          acc.totalWeight += cur.storeWeight

          return acc
        },
        { trayCount: 0, totalCount: 0, totalWeight: 0 }
      )

      let info = {
        trayCount: sum.trayCount,
        totalCount: sum.totalCount,
        totalWeight: sum.totalWeight.toFixed(4)
      }

      return info
    },

    totalWeight: function() {
      return ((this.taskInfo.outCount * this.unitWeight) / 1000).toFixed(4)
    }
  },
  methods: {
    init(outInfo) {
      this.dialog = true
      this.stockOutInfo = outInfo
      this.loadCargoData()

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

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
        this.storeListData = []
        return
      }

      let vm = this
      store.findByStockOut({ stockOutId: this.stockOutInfo.id, cargoId: this.cargoId }).then(res => {
        vm.storeListData = res
      })
    },

    addTask() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.submitLoading = true
        })

        let vm = this

        this.taskInfo.stockOutId = this.stockOutInfo.id
        this.taskInfo.cargoId = this.cargoId
        this.taskInfo.outWeight = this.totalWeight
        this.taskInfo.userId = this.$store.state.user.id
        this.taskInfo.userName = this.$store.state.user.name

        stockOut.addTask(this.taskInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加任务成功')
            vm.$emit('close')
            vm.submitLoading = false
            vm.dialog = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.submitLoading = false
          }
        })
      }
    }
  }
}
</script>
