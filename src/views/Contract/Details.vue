<template>
  <v-card class="mx-auto">
    <v-card-title class="cyan">
      合同信息
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row dense>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.number" label="合同编号" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.name" label="合同名称" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.customerNumber" label="客户编号" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.customerName" label="客户名称" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.contractType(info.type)" label="合同类型" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDate(info.signDate)" label="签订日期" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayDate(info.closeDate)" label="关闭日期" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.userName" label="登记人" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.billingType" label="计费方式" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field v-model="info.unitPrice" label="冷藏费单价" readonly></v-text-field>
          </v-col>
          <v-col cols="3" md="3" sm="6">
            <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
          </v-col>
          <v-col cols="6" md="6" sm="6">
            <v-text-field v-model="info.remark" label="备注" readonly></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import contract from '@/controllers/contract'

export default {
  name: 'ContractDetails',
  data: () => ({}),
  computed: mapState({
    info: state => state.contract.contractInfo,
    refreshEvent: state => state.contract.refreshEvent
  }),
  watch: {
    refreshEvent: function() {
      this.loadInfo()
    }
  },
  methods: {
    ...mapMutations({
      setContractInfo: 'contract/setContractInfo'
    }),
    loadInfo() {
      let vm = this
      contract.get(this.info.id).then(res => {
        vm.setContractInfo(res)
      })
    }
  }
}
</script>
