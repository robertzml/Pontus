<template>
  <v-row dense>
    <v-col cols="3">
      <v-card>
        <v-list shaped>
          <v-subheader class="subtitle-1 teal--text text--lighten-2">待出库仓位</v-subheader>
          <v-list-item-group v-model="positionNumber" color="primary" mandatory>
            <v-list-item v-for="item in outPositionList" :key="item" :value="item" @click="selectPosition(item)">
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>

    <v-col cols="9">
      <v-card class="mx-auto">
        <v-card-text>
          <v-data-iterator :items="carryOutList" :disable-pagination="true" :hide-default-footer="true">
            <template v-slot:header>
              <v-toolbar color="indigo darken-5" dark flat>
                <v-toolbar-title>货物情况</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.taskCode" cols="12" sm="12" md="6" lg="4">
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">{{ item.taskCode }}</v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>客户名称:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.customerName }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>类别名称:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.categoryName }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>货品名称:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.cargoName }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>搬运数量:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.moveCount }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>搬运重量(t):</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.moveWeight }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>货架码:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.shelfCode }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>托盘码:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.trayCode }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>仓位码:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.positionNumber }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>搬运类型:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.type | carryOutTaskType }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>创建时间:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.createTime | displayDateTime }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>状态:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.status | displayStatus }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>

        <v-card-actions>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-btn color="success" class="ml-8" large :disabled="!positionNumber" :loading="loading" @click="receive">
              出 库 接 单
            </v-btn>
          </v-form>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import carryOut from '@/controllers/carryOut'

export default {
  name: 'ForkliftReceiveOutTask',
  data: () => ({
    valid: true,
    loading: false,
    positionNumber: '',
    carryOutList: [],
    outPositionList: []
  }),
  methods: {
    init() {
      this.loading = false
      this.carryOutList = []
      this.outPositionList = []
      this.loadPositions()
    },

    loadPositions() {
      let vm = this
      carryOut.listToOut().then(res => {
        vm.outPositionList = res
      })
    },

    // 选择仓位码
    selectPosition(item) {
      let vm = this
      carryOut.findByPosition(item).then(res => {
        vm.carryOutList = res
      })
    },

    receive() {
      if (!this.positionNumber) {
        return
      }

      this.$nextTick(() => {
        this.loading = true
      })

      let trayCode = this.carryOutList[0].trayCode

      let vm = this
      let req = { trayCode: trayCode, userId: this.$store.state.user.id }
      carryOut.receiveTask(req).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '出库接单成功')
          vm.loading = false
          this.$router.push({ name: 'forkliftLeaveTask' })
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
