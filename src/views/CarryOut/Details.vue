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
              <v-text-field label="搬运数量" v-model="carryOutTask.moveCount" hide-details readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="搬运重量" v-model="carryOutTask.moveWeight" suffix="吨" hide-details readonly></v-text-field>
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
              <v-text-field label="移出时间" :value="$util.displayDateTime(carryOutTask.moveTime)" hide-details readonly></v-text-field>
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

          <v-row v-if="carryOutTask.status == 83">
            <v-col cols="12">
              <v-text-field label="出库确认备注" v-model="remark"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue-grey lighten-3" text @click="closeTaskDrawer">关闭</v-btn>
      <v-btn color="success darken-1" v-if="carryOutTask.status == 83" @click="confirmTask">出库确认</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import carryOut from '@/controllers/carryOut'

export default {
  name: 'CarryOutDetails',
  data: () => ({
    remark: ''
  }),
  computed: {
    ...mapState({
      carryOutTask: state => state.stockOut.carryOutTaskInfo
    })
  },
  methods: {
    ...mapMutations({
      closeTaskDrawer: 'stockOut/closeTaskDrawer'
    }),

    confirmTask() {
      let vm = this

      let model = {
        taskId: this.carryOutTask.id,
        userId: this.$store.state.user.id,
        remark: this.remark
      }

      carryOut.finishTask(model).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '任务确认成功')
          vm.$emit('update')
          vm.closeTaskDrawer()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    }
  }
}
</script>
