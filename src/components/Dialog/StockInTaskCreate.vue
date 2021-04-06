<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="cyan"> 添加入库任务 </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <cargo-select ref="cargoSelect" :cargo-id.sync="cargoId" :cargo-data="cargoListData"></cargo-select>
              </v-col>

              <v-col cols="6" md="4" sm="6">
                <v-text-field label="入库数量*" v-model="taskInfo.inCount"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field label="单位重量*" v-model="taskInfo.unitWeight" suffix="千克"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field label="总重量*" v-model="totalWeight" suffix="吨" readonly></v-text-field>
              </v-col>

              <v-col cols="6" md="4" sm="6">
                <v-text-field label="批次" v-model="taskInfo.batch"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field label="产地" v-model="taskInfo.originPlace"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field label="保质期" v-model="taskInfo.durability" suffix="月"></v-text-field>
              </v-col>

              <v-col cols="6" md="4" sm="6" v-if="stockInInfo.type == 1">
                <v-select
                  :items="warehouseList"
                  label="存放仓库"
                  item-text="name"
                  item-value="id"
                  :rules="warehouseRules"
                  v-model="taskInfo.warehouseId"
                ></v-select>
              </v-col>
              <v-col cols="6" md="8" sm="6" v-if="stockInInfo.type == 1">
                <v-text-field label="存放位置" v-model="taskInfo.place"></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="12">
                <v-text-field label="库存附加信息" v-model="taskInfo.remark"></v-text-field>
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
import stockIn from '@/controllers/stockIn'
import cargo from '@/controllers/cargo'
import warehouse from '@/controllers/warehouse'
import CargoSelect from '@/components/Control/CargoSelect'

export default {
  name: 'StockInTaskCreate',
  components: {
    CargoSelect
  },
  data: () => ({
    dialog: false,
    submitLoading: false,
    valid: false,
    stockInInfo: {},
    cargoId: '',
    cargoListData: [],
    warehouseList: [],
    taskInfo: {
      stockInId: '',
      cargoId: '',
      inCount: 0,
      unitWeight: 0.0,
      inWeight: 0.0,
      batch: '',
      originPlace: '',
      durability: 0,
      warehouseId: 0,
      place: '',
      remark: ''
    },
    warehouseRules: [(v) => !!v || '请选择仓库']
  }),
  computed: {
    totalWeight: function () {
      return ((this.taskInfo.inCount * this.taskInfo.unitWeight) / 1000).toFixed(4)
    }
  },
  methods: {
    init(inInfo) {
      this.stockInInfo = inInfo
      this.dialog = true
      this.loadCargoData()
      this.clearTask()
      this.cargoId = ''

      if (this.stockInInfo.type == 1) {
        this.loadWarehouse()
      }

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    // 载入仓库
    async loadWarehouse() {
      this.warehouseList = await warehouse.getList(1)
    },

    loadCargoData() {
      if (this.stockInInfo) {
        let vm = this
        cargo.getList(this.stockInInfo.customerId).then((res) => {
          vm.cargoListData = res
        })
      }
    },

    clearTask() {
      this.taskInfo = {
        stockInId: '',
        cargoId: '',
        inCount: 0,
        unitWeight: 0.0,
        inWeight: 0.0,
        batch: '',
        originPlace: '',
        durability: 0,
        warehouseId: 0,
        place: '',
        remark: '',
        userId: 0,
        userName: ''
      }
    },

    addTask() {
      if (this.$refs.form.validate()) {
        if (this.cargoId == '') {
          this.$store.commit('alertError', '请选择货品')
          return
        }

        if (this.taskInfo.inCount <= 0) {
          this.$store.commit('alertError', '请输入正确入库数量')
          return
        }

        this.$nextTick(() => {
          this.submitLoading = true
        })

        let vm = this

        this.taskInfo.cargoId = this.cargoId
        this.taskInfo.inWeight = this.totalWeight
        this.taskInfo.stockInId = this.stockInInfo.id
        this.taskInfo.userId = this.$store.state.user.id
        this.taskInfo.userName = this.$store.state.user.name

        stockIn.addTask(this.taskInfo).then((res) => {
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
