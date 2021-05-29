<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title> 冰块入库 </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <v-menu v-model="stockInTimeMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="iceStockInfo.stockTime" label="入库时间" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="iceStockInfo.stockTime" :day-format="$util.pickerDayFormat" @input="stockInTimeMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.iceType" label="冰块类型*" v-model="iceStockInfo.iceType"></v-select>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-text-field label="入库数量*" v-model="iceStockInfo.flowCount" :rules="digitalRules" required></v-text-field>
            </v-col>

            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" v-model="iceStockInfo.remark"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="submitLoading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ice from '@/controllers/ice'

export default {
  name: 'IceStockIn',
  data: () => ({
    dialog: false,
    submitLoading: false,
    valid: true,
    stockInTimeMenu: false,
    iceStockInfo: {
      stockTime: null,
      flowNumber: '',
      iceType: 1,
      flowCount: 0,
      userId: 0,
      userName: '',
      remark: ''
    },
    digitalRules: [(v) => /^\d+$/.test(v) || '请输入数字']
  }),
  methods: {
    init: function () {
      this.iceStockInfo = {
        stockTime: this.$moment().format('YYYY-MM-DD'),
        flowNumber: '',
        iceType: 1,
        flowCount: 0,
        userId: 0,
        userName: '',
        remark: ''
      }
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.submitLoading = true
        })

        let vm = this
        this.iceStockInfo.userId = this.$store.state.user.id
        this.iceStockInfo.userName = this.$store.state.user.name

        ice.stockIn(this.iceStockInfo).then((res) => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '冰块入库成功')
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
