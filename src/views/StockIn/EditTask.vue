<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          入库任务单
        </v-card-title>

        <v-layout wrap>
          <v-flex xs12 md12>
            <v-data-table :headers="headers" :items="taskInfoList" :items-per-page="10">
            </v-data-table>
          </v-flex>

          <v-flex xs12 md12>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-layout wrap>
                  <v-flex xs6 md3>
                    <v-text-field label="托盘码*" v-model="taskInfo.trayCode" :rules="trayCodeRules"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="入库数量*" v-model="taskInfo.inCount"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="单位重量*" v-model="taskInfo.unitWeight" suffix="千克"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="总重量*" v-model="taskInfo.inWeight" suffix="吨"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field label="备注" v-model="taskInfo.remark"></v-text-field>
                  </v-flex>

                  <v-btn class="mr-4" color="success darken-1" :disabled="!valid" @click="addTask">添加</v-btn>
                </v-layout>
              </v-form>
            </v-container>
          </v-flex>
        </v-layout>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'StockInEditTask',
  data: () => ({
    valid: false,
    stockInId: '',
    headers: [
      { text: '托盘码', value: 'trayCode', align: 'left' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量', value: 'unitWeight' },
      { text: '总重量', value: 'inWeight' },
      { text: '签订日期', value: 'signDate' },
      { text: '关闭日期', value: 'closeDate' },
      { text: '计费方式', value: 'billingType' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: [],
    taskInfo: {},
    trayCodeRules: [v => !!v || '请输入托盘码']
  }),
  methods: {
    init(stockInId) {
      this.stockInId = stockInId
    },

    addTask() {
      this.taskInfoList.push(this.taskInfo)
    }
  }
}
</script>
