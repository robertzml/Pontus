<template>
  <v-card flat>
    <v-card-title>
      <p class="headline">搬运入库任务</p>
    </v-card-title>
    <v-card-text>
      <v-container fluid class="mx-0 px-0">
        <v-row dense>
          <v-col cols="6">
            <v-text-field label="仓库" v-model="carryInTask.warehouseName" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="仓位码" v-model="carryInTask.positionNumber" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="货架码" v-model="carryInTask.shelfCode" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="托盘码" v-model="carryInTask.trayCode" hide-details readonly></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field label="任务码" v-model="carryInTask.taskCode" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="货品名称" v-model="carryInTask.cargoName" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="搬运数量" v-model="carryInTask.moveCount" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="搬运重量" v-model="carryInTask.moveWeight" suffix="吨" hide-details readonly></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field label="清点人" v-model="carryInTask.checkUserName" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="清点时间" :value="$util.displayDateTime(carryInTask.checkTime)" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="接单人" v-model="carryInTask.receiveUserName" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="接单时间" :value="$util.displayDateTime(carryInTask.receiveTime)" hide-details readonly></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field label="上架时间" :value="$util.displayDateTime(carryInTask.moveTime)" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="确认时间" :value="$util.displayDateTime(carryInTask.finishTime)" hide-details readonly></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field label="状态" :value="$util.displayStatus(carryInTask.status)" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6" md="6">
            <v-text-field label="备注" v-model="carryInTask.remark" hide-details readonly></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue-grey lighten-3" text @click="close">关闭</v-btn>
    </v-card-actions>

    <v-card-actions>
      <v-btn color="indigo" v-if="carryInTask.status == 72" :loading="receiveLoading" @click="receiveTask">接单</v-btn>
      <v-btn color="teal darken-3" v-if="carryInTask.status == 73" @click="enterDialog = true">上架</v-btn>
    </v-card-actions>

    <v-dialog v-model="enterDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">货物上架</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field label="托盘码" prepend-icon="power_input" autocomplete="off" :value="carryInTask.trayCode" readonly></v-text-field>

            <v-text-field label="货架码" prepend-icon="border_all" v-model="shelfCode" :counter="12" :rules="shelfCodeRules" autofocus></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="enterDialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="enterLoading" :disabled="!valid" @click="enterTask">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInDetails',
  props: {
    carryInTask: Object
  },
  data: () => ({
    valid: false,
    receiveLoading: false,
    enterLoading: false,
    enterDialog: false,
    shelfCode: '',
    shelfCodeRules: [v => !!v || '请输入货架码', v => (v && v.length == 12) || '请输入正确货架码']
  }),
  methods: {
    close() {
      this.$emit('close', false)
    },

    receiveTask() {
      this.$nextTick(() => {
        this.receiveLoading = true
      })
      let vm = this

      let req = { trayCode: this.carryInTask.trayCode, userId: this.$store.state.user.id }
      carryIn.receiveTask(req).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库接单成功')
          vm.receiveLoading = false
          vm.$emit('close', true)
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.receiveLoading = false
        }
      })
    },

    enterTask() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.enterLoading = true
        })

        let vm = this
        let req = { trayCode: this.carryInTask.trayCode, shelfCode: this.shelfCode, userId: this.$store.state.user.id }
        carryIn.enterTask(req).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '入库上架成功')
            vm.enterLoading = false
            vm.enterDialog = false
            vm.shelfCode = ''
            vm.$emit('close', true)
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.enterLoading = false
          }
        })
      }
    }
  }
}
</script>
