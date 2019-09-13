<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          入库任务单
        </v-card-title>

        <v-layout wrap>
          <v-flex xs12 md12>
            <stock-in-task-list ref="taskListMod"></stock-in-task-list>

            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12 md12>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-subheader>新增货物</v-subheader>

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
                    <v-text-field label="总重量*" v-model="totalWeight" suffix="吨"></v-text-field>
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
                    <v-select v-model="selectWarehouse" :items="warehouseList" item-text="name" item-value="id" :rules="warehouseRules" label="所属仓库" :hint="`${selectWarehouse.name}, ${selectWarehouse.number}`" return-object persistent-hint required></v-select>
                  </v-flex>
                  <v-flex xs6 md3>
                    <v-text-field label="备注" v-model="taskInfo.remark"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-btn class="mt-4" color="success darken-1" :disabled="!valid" @click="addTask">添加</v-btn>
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
import warehouse from '@/controllers/warehouse'
import CategorySelect from '@/components/Control/CategorySelect'
import StockInTaskList from './TaskList'

export default {
  name: 'StockInEditTask',
  components: {
    CategorySelect,
    StockInTaskList
  },
  data: () => ({
    valid: false,
    stockInId: '',
    stockInInfo: {},
    categoryId: 0,
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
      warehouseId: 0,
      remark: ''
    },
    warehouseList: [],
    selectWarehouse: {
      id: 0,
      name: '',
      number: ''
    },
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    warehouseRules: [v => (v && v.number != '') || '请选择仓库']
  }),
  computed: {
    totalWeight: function() {
      return (this.taskInfo.inCount * this.taskInfo.unitWeight) / 1000
    }
  },
  methods: {
    init(stockInId) {
      this.stockInId = stockInId

      this.clearTask()
      this.loadStockIn()
      this.$refs.taskListMod.init(stockInId)
      this.$refs.form.resetValidation()
    },

    loadStockIn() {
      let vm = this
      stockIn.get(this.stockInId).then(res => {
        vm.stockInInfo = res

        vm.loadWarehouse(vm.stockInInfo.type)
      })
    },

    loadTaskList() {
      let vm = this
      stockIn.getTaskList(this.stockInId).then(res => {
        vm.taskInfoList = res
      })
    },

    loadWarehouse(type) {
      let vm = this
      warehouse.getList(type).then(res => {
        vm.warehouseList = res
      })
    },

    clearTask() {
      this.taskInfo = {
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
        warehouseId: 0,
        remark: ''
      }
    },

    selectCategory(val) {
      this.taskInfo.categoryId = val.id
      this.taskInfo.categoryName = val.name
    },

    addTask() {
      if (this.$refs.form.validate()) {
        let vm = this

        this.taskInfo.stockInId = this.stockInId
        this.taskInfo.warehouseId = this.selectWarehouse.id
        this.taskInfo.inWeight = this.totalWeight
        this.taskInfo.userId = this.$store.state.user.id
        this.taskInfo.userName = this.$store.state.user.name

        stockIn.addTask(this.taskInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加任务成功')
            vm.$refs.taskListMod.init(vm.stockInId)
            vm.clearTask()
          } else {
            vm.$store.commit('alertError', res.errorMessage)
          }
        })
      }
    }
  }
}
</script>
