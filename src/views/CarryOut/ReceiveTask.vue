<template>
  <v-row dense>
    <v-col cols="3">
      <v-card>
        <v-list shaped>
          <v-subheader class="subtitle-1 teal--text text--lighten-2">出库任务列表</v-subheader>
          <v-list-item-group v-model="taskInfo" color="primary" mandatory>
            <v-list-item v-for="item in carryOutList" :key="item.id" :value="item">
              <v-list-item-content>
                <v-list-item-title v-text="item.taskCode"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="9">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="mx-auto">
          <v-card-title class="cyan">
            出库接单
          </v-card-title>

          <v-card-text class="pt-1 mb-0">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title class="subheading font-weight-bold">{{ taskInfo.taskCode }}</v-card-title>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>客户名称:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.customerName }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>类别名称:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.categoryName }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>货品名称:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.cargoName }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>搬运数量:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.moveCount }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>搬运重量(t):</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.moveWeight }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>货架码:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.shelfCode }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>托盘码:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.trayCode }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>仓位码:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.positionNumber }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>搬运类型:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.type | carryOutTaskType }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>创建时间:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.createTime | displayDateTime }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>状态:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ taskInfo.status | displayStatus }}</v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn color="success" class="ml-8" large :disabled="!taskInfo" :loading="loading" @click="receive">
              出 库 接 单
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import carryOut from '@/controllers/carryOut'

export default {
  name: 'CarryOutReceiveTask',
  data: () => ({
    valid: true,
    loading: false,
    taskInfo: '',
    carryOutList: [],
    moveCount: 0
  }),
  methods: {
    init() {
      this.taskInfo = ''
      this.loading = false
      this.carryOutList = []

      this.loadTask()
    },

    loadTask() {
      let vm = this
      carryOut.listToDo().then(res => {
        vm.carryOutList = res
      })
    },

    receive() {
      if (!this.taskInfo) {
        return
      }

      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      let req = { taskCode: this.taskInfo.taskCode, userId: this.$store.state.user.id }
      carryOut.receiveTask(req).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '出库接单成功')
          vm.loading = false
          this.$router.push({ name: 'carryOutLeaveTask' })
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>
