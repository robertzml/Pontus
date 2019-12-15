<template>
  <v-card class="mx-auto">
    <v-card-title class="light-blue lighten-2">
      入库上架
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field label="托盘码" prepend-icon="power_input" autocomplete="off" v-model="trayCode" readonly></v-text-field>

            <v-text-field label="货架码" prepend-icon="border_all" v-model="shelfCode" :rules="shelfCodeRules" autofocus></v-text-field>

            <v-btn color="success" class="mt-4 ml-8" large :disabled="taskList.length == 0 || !valid" @click="enter">
              货 物 上 架
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>

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
  name: 'CarryInEnterTask',
  data: () => ({
    valid: false,
    trayCode: '',
    shelfCode: '',
    taskList: [],
    shelfCodeRules: [v => !!v || '请输入货架码', v => (v && v.length == 12) || '请输入正确货架码']
  }),
  methods: {
    findCurrentReceive() {
      let userId = this.$store.state.user.id

      let vm = this
      carryIn.findCurrentReceive(userId).then(res => {
        vm.taskList = res
        if (vm.taskList.length > 0) {
          vm.trayCode = vm.taskList[0].trayCode
        }
      })
    },

    enter() {
      if (this.$refs.form.validate()) {
        let vm = this
        let req = { trayCode: this.trayCode, shelfCode: this.shelfCode, userId: this.$store.state.user.id }
        carryIn.enterTask(req).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '入库上架成功')
            this.$router.push({ name: 'home' })
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    }
  },
  mounted: function() {
    this.findCurrentReceive()
  }
}
</script>
