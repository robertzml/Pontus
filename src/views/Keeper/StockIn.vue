<template>
  <v-row dense>
    <v-col cols="2">
      <v-list shaped>
        <v-subheader class="subtitle-1 teal--text text--lighten-2">待入库单据</v-subheader>
        <v-list-item-group v-model="model" color="primary" mandatory>
          <v-list-item v-for="item in stockInList" :key="item.id" :value="item.id">
            <v-list-item-content>
              <v-list-item-title v-text="item.flowNumber"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <v-col cols="10">
      <v-card class="px-2">
        <v-subheader class="subtitle-1 teal--text text--lighten-2">入库单信息</v-subheader>
        <v-row dense>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDate(stockInInfo.inTime)" label="入库时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="stockInInfo.flowNumber" label="流水单号" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.stockInType(stockInInfo.type)" label="入库类型" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="stockInInfo.vehicleNumber" label="车牌号" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="stockInInfo.customerNumber" label="客户编号" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="stockInInfo.customerName" label="客户名称" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="stockInInfo.contractNumber" label="合同编号" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="stockInInfo.contractName" label="合同名称" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.contractType(stockInInfo.contractType)" label="合同类型" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.billingType(stockInInfo.billingType)" label="计费方式" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field
              v-model="stockInInfo.unitPrice"
              label="冷藏费单价"
              :suffix="$util.billingTypeUnit(stockInInfo.billingType)"
              hide-details
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="stockInInfo.userName" label="登记人" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDateTime(stockInInfo.createTime)" label="创建时间" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayStatus(stockInInfo.status)" label="状态" hide-details readonly></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field label="备注" :value="stockInInfo.remark" hide-details readonly> </v-text-field>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-btn color="primary darken-1" v-if="stockInInfo.status == 71">添加货物</v-btn>
        </v-card-actions>
      </v-card>

      <v-card>
        <v-data-table :headers="headers" :items="taskInfoList" hide-default-footer disable-pagination>
          <template v-slot:item.status="{ item }">
            {{ item.status | displayStatus }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn small color="success" @click="viewTaskItem(item)">
              查看
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'KeeperStockIn',
  data: () => ({
    stockInList: [],
    model: '',
    stockInInfo: {},
    headers: [
      { text: '货品名称', value: 'cargoName' },
      { text: '类别名称', value: 'categoryName' },
      { text: '入库数量', value: 'inCount' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '总重量(t)', value: 'inWeight' },
      { text: '批次', value: 'batch' },
      { text: '产地', value: 'originPlace' },
      { text: '保质期(月)', value: 'durability' },
      { text: '状态', value: 'status' },
      { text: '操作', value: 'action', sortable: false }
    ],
    taskInfoList: []
  }),
  watch: {
    model: function() {
      this.loadStockInInfo()
      this.loadTaskList()
    }
  },
  methods: {
    loadStockInList() {
      let vm = this

      stockIn.getUnfinish().then(res => {
        vm.stockInList = res
      })
    },

    loadStockInInfo() {
      let vm = this
      stockIn.get(this.model).then(res => {
        vm.stockInInfo = res
      })
    },

    // 载入入库任务列表
    loadTaskList() {
      if (this.model) {
        let vm = this
        stockIn.getTaskList(this.model).then(res => {
          vm.taskInfoList = res
        })
      } else {
        this.taskInfoList = []
      }
    }
  },
  mounted: function() {
    this.loadStockInList()
  }
}
</script>
