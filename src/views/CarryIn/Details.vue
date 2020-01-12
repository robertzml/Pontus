<template>
  <v-card flat>
    <v-card-title>
      <p class="headline">搬运入库任务</p>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container fluid class="mx-0 px-0">
          <v-row dense>
            <v-col cols="6">
              <v-text-field label="仓库" v-model="carryInTask.warehouseName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="仓位码" v-model="carryInTask.positionNumber" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="任务码" v-model="carryInTask.taskCode" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="托盘码" v-model="carryInTask.trayCode" hide-details readonly></v-text-field>
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
              <v-text-field label="移入时间" :value="$util.displayDateTime(carryInTask.moveTime)" hide-details readonly></v-text-field>
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

          <v-row v-if="carryInTask.status == 74">
            <v-col cols="12">
              <v-text-field label="入库确认备注" v-model="remark"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue-grey lighten-3" text @click="close">关闭</v-btn>
      <v-btn color="success darken-1" v-if="carryInTask.status == 74" :disabled="!enableConfirm" @click="confirmTask">入库确认</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInDetails',
  data: () => ({
    enableConfirm: true,
    remark: ''
  }),
  computed: {
    ...mapState({
      carryInTask: state => state.stockIn.carryInTaskInfo
    })
  },
  methods: {
    close() {
      this.$emit('close', false)
    },

    confirmTask() {
      this.$nextTick(() => {
        this.enableConfirm = false
      })
      let vm = this

      let model = {
        taskId: this.carryInTask.id,
        userId: this.$store.state.user.id,
        remark: this.remark
      }

      carryIn.finishTask(model).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '任务确认成功')
          vm.enableConfirm = true
          vm.$emit('close', true)
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          this.enableConfirm = true
        }
      })
    }
  }
}
</script>
