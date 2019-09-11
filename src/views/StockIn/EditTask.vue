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
                    <category-select :category-id.sync="categoryId" @change="selectCategory"></category-select>
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
                  <v-flex xs6 md3>
                    <v-text-field label="托盘码*" v-model="taskInfo.trayCode" :rules="trayCodeRules"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="规格" v-model="taskInfo.specification"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="产地" v-model="taskInfo.originPlace"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="保质期" v-model="taskInfo.durability" suffix="月"></v-text-field>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="备注" v-model="taskInfo.remark"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-btn class="mr-4" color="success darken-1" :disabled="!valid" @click="addTask">添加</v-btn>
              </v-form>
            </v-container>
          </v-flex>
        </v-layout>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import stockIn from '@/controllers/stockIn'
import CategorySelect from '@/components/Control/CategorySelect'

export default {
  name: 'StockInEditTask',
  components: {
    CategorySelect
  },
  data: () => ({
    valid: false,
    stockInId: '',
    categoryId: 0,
    headers: [
      { text: '托盘码', value: 'trayCode', align: 'left' },
      { text: '类别名称', value: 'categoryName' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量', value: 'unitWeight' },
      { text: '总重量', value: 'inWeight' },
      { text: '规格', value: 'specification' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期', value: 'durability' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: [],
    taskInfo: {
      stockInId: '',
      trayCode: '',
      categoryId: 0,
      categoryName: '',
      specification: '',
      inCount: 0,
      unitWeight: 0.0,
      inWeight: 0.0,
      originPlace: '',
      durability: '',
      remark: ''
    },
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码']
  }),
  methods: {
    init(stockInId) {
      this.stockInId = stockInId

      this.$refs.form.resetValidation()
    },

    selectCategory(val) {
      console.log(val)
      this.taskInfo.categoryId = val.id
      this.taskInfo.categoryName = val.name
    },

    addTask() {
      if (this.$refs.form.validate()) {
        let vm = this

        this.taskInfo.stockInId = this.stockInId
        this.taskInfo.userId = this.$store.state.user.id
        this.taskInfo.userName = this.$store.state.user.name

        stockIn.addTask(this.taskInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加任务成功')
            //vm.$emit('update')
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    }
  }
}
</script>
