<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="cyan">
        入库任务单
      </v-card-title>
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
                <v-text-field label="单位重量*" v-model="unitWeight" suffix="千克"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field label="总重量*" v-model="totalWeight" suffix="吨"></v-text-field>
              </v-col>

              <v-col cols="6" md="4" sm="6">
                <v-text-field label="规格" v-model="taskInfo.specification"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field label="产地" v-model="taskInfo.originPlace"></v-text-field>
              </v-col>
              <v-col cols="6" md="4" sm="6">
                <v-text-field label="保质期" v-model="taskInfo.durability" suffix="月"></v-text-field>
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
        <v-btn color="success darken-1" :disabled="!valid" @click="addTask">添加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import stockIn from '@/controllers/stockIn'
import cargo from '@/controllers/cargo'
import CargoSelect from '@/components/Control/CargoSelect'

export default {
  name: 'StockInEditTask',
  components: {
    CargoSelect
  },
  data: () => ({
    dialog: false,
    valid: false,
    cargoId: '',
    unitWeight: 0.0,
    cargoListData: [],
    taskInfo: {
      stockInId: '',
      cargoId: '',
      inCount: 0,
      unitWeight: 0.0,
      inWeight: 0.0,
      specification: '',
      originPlace: '',
      durability: 0,
      remark: ''
    },
    warehouseRules: [v => (v && v.number != '') || '请选择仓库']
  }),
  watch: {
    cargoId: function(val) {
      var find = this.cargoListData.find(r => r.id == val)
      if (find != undefined) {
        this.unitWeight = find.unitWeight
      } else {
        this.unitWeight = 0.0
      }
    }
  },
  computed: {
    ...mapState({
      stockInId: state => state.stockIn.stockInId,
      stockInInfo: state => state.stockIn.stockInInfo
    }),
    totalWeight: function() {
      return (this.taskInfo.inCount * this.unitWeight) / 1000
    }
  },
  methods: {
    init() {
      this.clearTask()
      this.dialog = true
      this.loadCargoData()

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    loadCargoData() {
      if (this.stockInInfo) {
        let vm = this
        cargo.getList(this.stockInInfo.customerId).then(res => {
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
        specification: '',
        originPlace: '',
        durability: 0,
        remark: '',
        userId: 0,
        userName: ''
      }
    },

    selectCargo(val) {
      if (val == null) {
        this.unitWeight = 0
      } else {
        this.unitWeight = val.unitWeight
      }
    },

    addTask() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.valid = false
        })

        let vm = this

        this.taskInfo.cargoId = this.cargoId
        this.taskInfo.unitWeight = this.unitWeight
        this.taskInfo.inWeight = this.totalWeight
        this.taskInfo.stockInId = this.stockInId
        this.taskInfo.userId = this.$store.state.user.id
        this.taskInfo.userName = this.$store.state.user.name

        stockIn.addTask(this.taskInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加任务成功')
            vm.$emit('update')
            vm.dialog = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            this.$refs.form.resetValidation()
          }
        })
      }
    }
  }
}
</script>
