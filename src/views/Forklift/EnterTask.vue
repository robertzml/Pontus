<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-subheader>
          入库上架
          <v-spacer></v-spacer>
          <v-btn depressed class="primary" @click="refresh">新上架</v-btn>
        </v-subheader>

        <v-card-text class="pt-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="6" sm="6" md="5">
                <v-text-field
                  label="托盘码"
                  :counter="6"
                  autocomplete="off"
                  v-model="trayCode"
                  ref="trayCodeInput"
                  @input="inputTrayCode"
                  :rules="trayCodeRules"
                  autofocus
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="5">
                <v-text-field label="货架码" v-model="shelfCode" clearable :counter="12" :rules="shelfCodeRules" ref="shelfCodeInput"></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="2">
                <v-btn color="success" class="mt-4 ml-4" large :disabled="!valid" :loading="loading" @click="enter">
                  货 物 上 架
                </v-btn>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <div class="subtitle-1">
                  上架仓位: <br />
                  {{ enterPosition }}
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" md="6">
      <v-card>
        <v-card-text class="pt-0">
          <v-data-iterator :items="taskList" :disable-pagination="true" :hide-default-footer="true">
            <template v-slot:header>
              <v-toolbar color="indigo darken-5" dark flat>
                <v-toolbar-title>入库任务情况</v-toolbar-title>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.taskCode" cols="12" sm="12" md="6">
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
                        <v-list-item-content>托盘码:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.trayCode }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>搬运数量:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.moveCount }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>单位重量(kg):</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.unitWeight }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>搬运重量(t):</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.moveWeight }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>规格:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.specification }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>状态:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.status | displayStatus }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>清点时间:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.checkTime | displayDateTime }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" md="6">
      <v-card>
        <v-card-text class="pt-0">
          <v-data-iterator :items="carryOutList" :disable-pagination="true" :hide-default-footer="true">
            <template v-slot:header>
              <v-toolbar color="indigo darken-5" dark flat>
                <v-toolbar-title>临时出库任务情况</v-toolbar-title>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row>
                <v-col v-for="item in props.items" :key="item.taskCode" cols="12" sm="12" md="6">
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
                        <v-list-item-content>托盘码:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.trayCode }}</v-list-item-content>
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
                        <v-list-item-content>托盘上数量:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.storeCount }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>托盘上重量(t):</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.storeWeight }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>仓位码:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.positionNumber }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>下架时间:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.moveTime | displayDateTime }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import carryIn from '@/controllers/carryIn'
import carryOut from '@/controllers/carryOut'

export default {
  name: 'ForkliftEnterTask',
  data: () => ({
    valid: false,
    loading: false,
    trayCode: '',
    shelfCode: '',
    taskList: [],
    carryOutList: [],
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    shelfCodeRules: [v => !!v || '请输入货架码', v => (v && v.length == 12) || '请输入正确货架码'],
    enterPosition: ''
  }),
  methods: {
    // 输入托盘码
    inputTrayCode() {
      if (this.trayCode.length == 6) {
        this.$refs.shelfCodeInput.focus()
        this.findStores()
        this.searchTray()
      } else {
        this.taskList = []
        this.carryOutList = []
      }
    },

    // 根据托盘码查找搬运入库任务
    async findStores() {
      this.taskList = await carryIn.findInCheck(this.trayCode)
    },

    // 搜索托盘
    async searchTray() {
      if (this.trayCode == null || this.trayCode.length != 6) {
        return
      }

      this.carryOutList = await carryOut.findByTray(this.trayCode)
    },

    refresh() {
      this.valid = false
      this.loading = false
      this.trayCode = ''
      this.shelfCode = ''
      this.taskList = []
      this.carryOutList = []
      this.enterPosition = ''

      this.$refs.trayCodeInput.focus()
    },

    // 货物上架
    enter() {
      if (this.$refs.form.validate()) {
        if (this.taskList.length == 0 && this.carryOutList.length == 0) {
          this.$store.commit('alertError', '该托盘无法上架')
          return
        }

        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        let req = { trayCode: this.trayCode, shelfCode: this.shelfCode.toUpperCase(), userId: this.$store.state.user.id }
        carryIn
          .enterTask(req)
          .then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '入库上架成功')
              this.trayCode = ''
              this.shelfCode = ''
              this.taskList = []
              this.carryOutList = []
              this.enterPosition = res.entity.number
              this.$refs.trayCodeInput.focus()
              vm.loading = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
          .catch(() => {
            vm.loading = false
          })
      }
    }
  },
  mounted: function() {
    this.refresh()
  }
}
</script>
