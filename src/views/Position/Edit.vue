<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">仓位信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="主编号" v-model="positionInfo.number" readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="副编号" v-model="positionInfo.viceNumber" readonly></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6">
              <v-text-field label="排数" v-model="positionInfo.row" readonly></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6">
              <v-text-field label="层数" v-model="positionInfo.layer" readonly></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6">
              <v-text-field label="进数" v-model="positionInfo.depth" readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="主货架码" v-model="positionInfo.shelfCode" readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="副货架码" v-model="positionInfo.viceShelfCode" readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-select label="状态" v-model="positionInfo.status" :items="positionStatus"></v-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" v-model="positionInfo.remark"></v-text-field>
            </v-col>
          </v-row>
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
import position from '@/controllers/position'

export default {
  name: 'PositionEdit',
  data: () => ({
    valid: true,
    dialog: false,
    positionId: 0,
    positionInfo: {
      row: 0,
      layer: 0,
      depth: 0,
      number: '',
      viceNumber: '',
      shelfCode: '',
      viceShelfCode: '',
      remark: '',
      status: 0
    },
    positionStatus: [
      { value: 0, text: '可用' },
      { value: 2, text: '禁用' }
    ]
  }),
  methods: {
    init(positionId) {
      this.positionId = positionId
      if (positionId == 0) {
        return
      } else {
        let vm = this
        position.getById(positionId).then(res => {
          vm.positionInfo = res
        })
      }
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this
        if (this.positionId == 0) {
          return
        } else {
          position.update(this.positionInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改仓位信息成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        }
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
