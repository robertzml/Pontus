<template>
  <v-navigation-drawer v-model="drawer" fixed temporary right>
    <v-card flat>
      <v-card-title>
        <p class="headline">搬运入库任务</p>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field label="托盘码*" v-model="carryInInfo.trayCode" :rules="trayCodeRules"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="入库数量*" v-model="carryInInfo.moveCount"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="总重量*" v-model="totalWeight" suffix="吨" readonly></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field label="备注" v-model="carryInInfo.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="drawer = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" @click="addTask">添加</v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import carryIn from '@/controllers/carryIn'

export default {
  name: 'CarryInCreate',
  props: {
    stockInTask: {
      type: Object
    }
  },
  data: () => ({
    drawer: null,
    valid: false,
    carryInInfo: {
      trayCode: '',
      moveCount: 0,
      moveWeight: 0.0,
      remark: ''
    },
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码']
  }),
  computed: {
    totalWeight: function() {
      return (this.carryInInfo.moveCount * this.stockInTask.unitWeight) / 1000
    }
  },
  methods: {
    show() {
      this.drawer = true
    },

    addTask() {
      if (this.$refs.form.validate()) {
        let vm = this

        this.carryInInfo.type = 1
        this.carryInInfo.stockInTaskId = this.stockInTask.id
        this.carryInInfo.moveWeight = this.totalWeight
        this.carryInInfo.checkUserId = this.$store.state.user.id
        this.carryInInfo.checkUserName = this.$store.state.user.name

        carryIn.create(this.carryInInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加任务成功')
            vm.$emit('update')
            vm.drawer = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    }
  }
}
</script>
