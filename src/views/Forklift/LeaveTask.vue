<template>
  <v-card class="mx-auto">
    <v-card-title class="light-blue lighten-2">
      出库下架
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field label="仓位码" prepend-icon="dns" v-model="positionNumber" autocomplete="off" readonly></v-text-field>

            <v-text-field
              label="托盘码"
              prepend-icon="power_input"
              v-model="trayCode"
              autocomplete="off"
              :rules="trayCodeRules"
              :counter="6"
              clearable
              autofocus
            ></v-text-field>

            <v-text-field label="货架码" prepend-icon="border_all" v-model="shelfCode" :counter="12" :rules="shelfCodeRules" clearable></v-text-field>

            <v-btn color="success" class="mt-4 ml-8" large :disabled="!valid" :loading="loading" @click="leave">
              货 物 下 架
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text class="pt-0">
      <v-row>
        <v-col cols="12" v-if="assignMode">
          <v-data-iterator :items="taskList" :disable-pagination="true" :hide-default-footer="true">
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
                        <v-list-item-content>接单时间:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.receiveTime | displayDateTime }}</v-list-item-content>
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
        </v-col>

        <v-col cols="12" v-else>
          <v-data-iterator :items="storeList" :disable-pagination="true" :hide-default-footer="true">
            <template v-slot:header>
              <v-toolbar color="indigo darken-5" dark flat>
                <v-toolbar-title>库存情况</v-toolbar-title>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.id" cols="12" sm="12" md="6" lg="4">
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">托盘码：{{ item.trayCode }}</v-card-title>

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
                        <v-list-item-content>规格:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.specification }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>批次:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.batch }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>库存数量:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.storeCount }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>库存重量(t):</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.storeWeight }}</v-list-item-content>
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
                        <v-list-item-content>入库时间:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.InTime | displayDateTime }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import carryOut from '@/controllers/carryOut'

export default {
  name: 'ForkliftLeaveTask',
  data: () => ({
    valid: false,
    loading: false,
    positionNumber: '',
    assignMode: true,
    trayCode: '',
    shelfCode: '',
    taskList: [],
    storeList: [],
    shelfCodeRules: [v => !!v || '请输入货架码', v => (v && v.length == 12) || '请输入正确货架码'],
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入正确托盘码']
  }),
  methods: {
    findCurrentReceive() {
      let userId = this.$store.state.user.id

      let vm = this
      carryOut.findCurrentReceive(userId).then(res => {
        vm.taskList = res
        if (vm.taskList.length > 0) {
          vm.positionNumber = vm.taskList[0].positionNumber
        }
      })
    },

    leave() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        let req = { trayCode: this.trayCode, shelfCode: this.shelfCode, userId: this.$store.state.user.id }

        if (this.positionNumber) {
          carryOut.leaveTask(req).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '出库下架成功')
              vm.loading = false
              this.$router.push({ name: 'forkliftReceiveOutTask' })
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        } else {
          carryOut.leaveUnassign(req).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '出库下架成功')
              vm.storeList = res.entity
              vm.loading = false
              vm.assignMode = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        }
      }
    }
  },
  mounted: function() {
    this.assignMode = true
    this.findCurrentReceive()
  }
}
</script>
