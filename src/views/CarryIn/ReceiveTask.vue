<template>
  <v-card class="mx-auto">
    <v-card-title class="cyan">
      入库接单
    </v-card-title>

    <v-card-text class="mb-0 pb-1">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fluid class="py-0">
          <v-row dense>
            <v-col cols="10">
              <v-text-field
                label="托盘码"
                autofocus
                prepend-icon="power_input"
                :counter="6"
                autocomplete="off"
                v-model="trayCode"
                :rules="trayCodeRules"
                @input="changeText"
                @keyup.enter="search"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-show="false"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" class="ml-4" large :disabled="!valid" @click="search">
        托 盘 搜 索
      </v-btn>
      <v-btn color="success" class="ml-8" large :disabled="taskList.length == 0 || !valid" :loading="loading" @click="receive">
        入 库 接 单
      </v-btn>
    </v-card-actions>

    <v-card-text class="pt-0">
      <v-row>
        <v-col cols="12">
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
                        <v-list-item-content>规格:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.specification }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>产地:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.originPlace }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>保质期(月):</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.durability }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>创建时间:</v-list-item-content>
                        <v-list-item-content class="align-end">{{ item.createTime | displayDateTime }}</v-list-item-content>
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
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInReceiveTask',
  data: () => ({
    valid: false,
    loading: false,
    trayCode: '',
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    taskList: []
  }),
  methods: {
    init() {
      this.trayCode = ''
      this.loading = false
      this.valid = false
      this.taskList = []
    },
    changeText() {
      this.taskList = []
    },
    search() {
      if (this.$refs.form.validate()) {
        let vm = this

        carryIn.listByTray(this.trayCode).then(res => {
          vm.taskList = res
        })
      }
    },
    receive() {
      if (this.taskList.length == 0) {
        return
      }

      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      let req = { trayCode: this.trayCode, userId: this.$store.state.user.id }
      carryIn.receiveTask(req).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '入库接单成功')
          vm.loading = false
          this.$router.push({ name: 'carryInEnterTask' })
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
