<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card flat class="mx-auto">
        <v-card-title class="cyan" v-if="showTitle">
          入库信息
        </v-card-title>

        <v-form>
          <v-layout wrap>
            <v-flex xs6 md3>
              <v-text-field :value="$util.displayDate(info.inTime)" label="入库时间" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.monthTime" label="入库月份" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.flowNumber" label="流水单号" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field :value="$util.stockInType(info.type)" label="入库类型" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.customerNumber" label="客户编号" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.customerName" label="客户名称" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.contractNumber" label="合同编号" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.contractName" label="合同名称" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field :value="$util.contractType(info.contractType)" label="合同类型" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field :value="$util.billingType(info.billingType)" label="计费方式" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.unitPrice" label="冷藏费单价" :suffix="$util.billingTypeUnit(info.billingType)" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field v-model="info.userName" label="登记人" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field :value="$util.displayDateTime(info.confirmTime)" label="确认时间" readonly></v-text-field>
            </v-flex>
            <v-flex xs6 md3>
              <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-textarea label=" 备注" :value="info.remark" readonly auto-grow rows="1">
              </v-textarea>
            </v-flex>
          </v-layout>
        </v-form>

        <v-card-actions>
          <v-btn color="primary darken-1" :disabled="info.status != 71">添加任务</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInDetails',
  props: {
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    stockInId: 0,
    info: {}
  }),
  methods: {
    init(id) {
      this.stockInId = id
      if (id == undefined || id == '') {
        return
      }

      this.getInfo()
    },

    getInfo() {
      let vm = this
      stockIn.get(this.stockInId).then(res => {
        vm.info = res
      })
    }
  }
}
</script>
