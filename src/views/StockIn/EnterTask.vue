<template>
  <v-card>
    <v-card-title>
      <span class="headline">上架操作</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field label="任务码" v-model="stockInTaskInfo.taskCode" readonly></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field label="托盘码" v-model="stockInTaskInfo.trayCode" readonly></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field label="货架码" v-model="stockInTaskInfo.shelfCode" v-focus></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-grey lighten-3" text @click="close">关闭</v-btn>
      <v-btn color="success darken-1" :disabled="!valid" @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInEnterTask',
  data: () => ({
    valid: true,
    taskId: '',
    stockInTaskInfo: {
      taskCode: '',
      trayCode: '',
      shelfCode: ''
    },
    shelfCodeRules: [v => !!v || '请输入货架码']
  }),
  methods: {
    init(taskId) {
      this.taskId = taskId

      this.stockInTaskInfo = {
        taskCode: '',
        trayCode: '',
        shelfCode: ''
      }
      this.loadTask()
      this.$refs.form.resetValidation()
    },

    loadTask() {
      let vm = this
      stockIn.getTask(this.taskId).then(res => {
        vm.stockInTaskInfo = res
      })
    },

    close() {
      this.$emit('close')
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this

        this.stockInTaskInfo.status = 74
        stockIn.handleTask(this.stockInTaskInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '货品上架成功')
            vm.$emit('close')
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    }
  }
}
</script>
