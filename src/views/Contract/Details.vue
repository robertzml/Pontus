<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          合同信息
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field v-model="info.number" label="合同编号" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.name" label="合同名称" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.customerNumber" label="客户编号" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.customerName" label="客户名称" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.type" label="合同类型" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDate(info.signDate)" label="签订日期" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDate(info.closeDate)" label="关闭日期" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.userName" label="登记人" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.billingType" label="计费方式" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.unitPrice" label="冷藏费单价" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 md12>
                <v-textarea label="备注" :value="info.remark" readonly auto-grow></v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import contract from '@/controllers/contract'

export default {
  name: 'ContractDetails',
  data: () => ({
    contractId: 0,
    info: {}
  }),
  methods: {
    getInfo(id) {
      this.contractId = id
      if (this.contractId == 0) {
        return
      }

      let vm = this
      contract.get(id).then(res => {
        vm.info = res
      })
    }
  }
}
</script>
