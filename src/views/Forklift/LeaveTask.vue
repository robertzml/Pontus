<template>
  <v-row dense>
    <v-col cols="2">
      <v-card>
        <v-list shaped>
          <v-subheader class="subtitle-1 teal--text text--lighten-2">待出库仓位</v-subheader>

          <v-list-item v-for="item in outPositionList" :key="item" :value="item">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="10">
      <v-card class="mx-auto">
        <v-card-title class="light-blue lighten-2">
          扫码
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="5">
                <v-text-field
                  label="托盘码"
                  prepend-icon="power_input"
                  v-model="trayCode"
                  autocomplete="off"
                  :rules="trayCodeRules"
                  :counter="6"
                  @input="inputTrayCode"
                  ref="trayCodeInput"
                  clearable
                  autofocus
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  label="货架码"
                  prepend-icon="border_all"
                  v-model="shelfCode"
                  :counter="12"
                  :rules="shelfCodeRules"
                  ref="shelfCodeInput"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn color="success" class="mt-4 ml-8" large :disabled="!valid" :loading="loading" @click="leave">
                  货 物 下 架
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text class="pt-0">
          <v-row>
            <v-col cols="12">
              <v-data-iterator :items="storeList" :disable-pagination="true" :hide-default-footer="true">
                <template v-slot:header>
                  <v-toolbar color="indigo darken-5" dark flat>
                    <v-toolbar-title>库存情况</v-toolbar-title>
                  </v-toolbar>
                </template>

                <template v-slot:default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.id" cols="12" sm="12" md="6" lg="4">
                      <v-card :color="checkIsCarryOut(item) ? 'green' : ''">
                        <v-card-title class="subheading font-weight-bold">
                          托盘码：{{ item.trayCode }}
                          <span v-if="checkIsCarryOut(item)" class="red--text ml-2">
                            出库任务托盘
                          </span>
                        </v-card-title>

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
                            <v-list-item-content class="align-end">{{ item.inTime | displayDate }}</v-list-item-content>
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
    </v-col>
  </v-row>
</template>

<script>
import carryOut from '@/controllers/carryOut'
import store from '@/controllers/store'

export default {
  name: 'ForkliftLeaveTask',
  data: () => ({
    valid: false,
    loading: false,
    outPositionList: [],
    trayCode: '',
    shelfCode: '',
    storeList: [],
    shelfCodeRules: [v => !!v || '请输入货架码', v => (v && v.length == 12) || '请输入正确货架码'],
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入正确托盘码']
  }),
  directives: {},
  methods: {
    // 载入待出库仓位
    async loadOutPositions() {
      this.outPositionList = await carryOut.listToOut()
    },

    // 输入托盘码
    inputTrayCode() {
      if (this.trayCode.length == 6) {
        this.$refs.shelfCodeInput.focus()
        this.findStores()
      }
    },

    // 查找库存
    async findStores() {
      this.storeList = await store.findByTray(this.trayCode)
    },

    // 检查库存是否搬运出库任务
    checkIsCarryOut(item) {
      if (this.outPositionList.includes(item.positionNumber)) {
        return true
      } else if (this.outPositionList.includes(item.vicePositionNumber)) {
        return true
      } else {
        return false
      }
    },

    leave() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        let req = { trayCode: this.trayCode, shelfCode: this.shelfCode, userId: this.$store.state.user.id }

        carryOut.leaveTask(req).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '出库下架成功')
            vm.trayCode = ''
            vm.shelfCode = ''
            this.$refs.trayCodeInput.focus()
            vm.loadOutPositions()
            vm.loading = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.loading = false
          }
        })
      }
    }
  },
  mounted: function() {
    this.loadOutPositions()
  }
}
</script>
