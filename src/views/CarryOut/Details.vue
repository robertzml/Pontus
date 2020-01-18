<template>
  <v-card flat>
    <v-card-title>
      <p class="headline">搬运出库任务</p>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container fluid class="mx-0 px-0">
          <v-row dense>
            <v-col cols="6">
              <v-text-field label="仓库" v-model="carryOutTask.warehouseName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="仓位码" v-model="carryOutTask.positionNumber" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="任务码" v-model="carryOutTask.taskCode" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="托盘码" v-model="carryOutTask.trayCode" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="在库数量" v-model="carryOutTask.storeCount" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="在库重量" v-model="carryOutTask.storeWeight" suffix="吨" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="移出数量" v-model="carryOutTask.moveCount" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="移出重量" v-model="carryOutTask.moveWeight" suffix="吨" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="接单人" v-model="carryOutTask.receiveUserName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="接单时间" :value="$util.displayDateTime(carryOutTask.receiveTime)" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="清点人" v-model="carryOutTask.checkUserName" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="清点时间" :value="$util.displayDateTime(carryOutTask.checkTime)" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="下架时间" :value="$util.displayDateTime(carryOutTask.moveTime)" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="确认时间" :value="$util.displayDateTime(carryOutTask.finishTime)" hide-details readonly></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field label="状态" :value="$util.displayStatus(carryOutTask.status)" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field label="备注" v-model="carryOutTask.remark" hide-details readonly></v-text-field>
            </v-col>
          </v-row>

          <v-sheet :elevation="10" color="blue-grey darken-2" class="mt-4 pa-2" v-if="carryOutTask.status == 83">
            <v-subheader>出库确认</v-subheader>
            <v-row>
              <v-col cols="6">
                <v-text-field label="出库数量" v-model="finishInfo.moveCount"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="出库重量" v-model="moveWeight" suffix="吨" readonly></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="出库确认备注" v-model="finishInfo.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue-grey lighten-3" text @click="close">关闭</v-btn>
      <v-btn color="success darken-1" v-if="carryOutTask.status == 83" @click="confirmTask" :loading="submitLoading">出库确认</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import carryOut from '@/controllers/carryOut'

export default {
  name: 'CarryOutDetails',
  data: () => ({
    submitLoading: false,
    finishInfo: {
      moveCount: 0,
      remark: ''
    }
  }),
  computed: {
    ...mapState({
      carryOutTask: state => state.stockOut.carryOutTaskInfo
    }),
    moveWeight: function() {
      return (this.finishInfo.moveCount * this.carryOutTask.unitWeight) / 1000
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },

    confirmTask() {
      let vm = this

      let model = {
        taskId: this.carryOutTask.id,
        moveCount: this.finishInfo.moveCount,
        moveWeight: this.moveWeight,
        userId: this.$store.state.user.id,
        remark: this.finishInfo.remark
      }

      this.$nextTick(() => {
        this.submitLoading = true
      })

      carryOut.finishTask(model).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '任务确认成功')
          vm.submitLoading = false
          vm.$emit('close', true)
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.submitLoading = false
        }
      })
    }
  }
}
</script>
