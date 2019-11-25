<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="cyan">
        入库任务确认
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="6" md="6" sm="6">
                <cargo-select :customer-number.sync="customerNumber" @change="selectCargo"></cargo-select>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="库存备注" v-model="remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CargoSelect from '@/components/Control/CargoSelect'
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInFinishTask',
  components: {
    CargoSelect
  },
  data: () => ({
    dialog: false,
    valid: true,
    customerNumber: '',
    cargoId: '',
    taskId: '',
    remark: ''
  }),
  methods: {
    init(customerNumber, taskId) {
      this.customerNumber = customerNumber
      this.taskId = taskId
      this.dialog = true
    },

    selectCargo(val) {
      this.cargoId = val.id
    },

    submit() {
      if (this.cargoId == '') {
        return
      }

      let vm = this
      let req = { taskId: this.taskId, cargoId: this.cargoId, userId: this.$store.state.user.id, remark: this.remark }
      stockIn.finishTask(req).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库确认成功')
          vm.dialog = false
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    }
  }
}
</script>
