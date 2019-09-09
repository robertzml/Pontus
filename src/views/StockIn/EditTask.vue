<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          入库任务单
        </v-card-title>

        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field label="入库数量*" v-model="taskInfo.inCount" :rules="numberRules" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field label="单位重量*" v-model="taskInfo.unitWeight" suffix="千克" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field label="总重量*" v-model="taskInfo.inWeight" suffix="吨"></v-text-field>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="备注" v-model="taskInfo.remark"></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'StockInEditTask',
  data: () => ({
    valid: false,
    taskInfo: {}
  })
}
</script>