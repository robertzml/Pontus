<template>
  <v-card class="mx-auto">
    <v-card-title class="cyan">
      合同信息
      <v-spacer></v-spacer>
      <v-btn text v-if="userInfo.userGroupId == 1" @click="dialog = true">强制删除</v-btn>
    </v-card-title>
    <v-card-text>
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
          <v-text-field :value="$util.billingType(info.billingType)" label="计费方式" readonly></v-text-field>
        </v-col>
        <v-col cols="3" md="3" sm="6">
          <v-text-field v-model="info.unitPrice" label="冷藏费单价" :suffix="$util.billingTypeUnit(info.billingType)" readonly></v-text-field>
        </v-col>
        <v-col cols="3" md="3" sm="3" v-if="info.type == 1">
          <v-text-field label="最短天数" v-model="info.parameter1" readonly></v-text-field>
        </v-col>
        <v-col cols="3" md="3" sm="6">
          <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="6">
          <v-text-field v-model="info.remark" label="备注" readonly></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">强制删除合同</v-card-title>
        <v-card-text>是否确认删除该合同？合同关联库存、出入库、计费记录均被删除，占用仓位置空。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="loading" @click="forceDelete">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import contract from '@/controllers/contract'

export default {
  name: 'ContractDetails',
  data: () => ({
    dialog: false,
    loading: false
  }),
  computed: {
    ...mapState({
      info: state => state.contract.contractInfo,
      refreshEvent: state => state.contract.refreshEvent
    }),
    ...mapGetters(['userInfo'])
  },
  watch: {
    refreshEvent: function() {
      this.loadInfo()
    }
  },
  methods: {
    ...mapMutations({
      setContractInfo: 'contract/setContractInfo'
    }),
    ...mapActions({
      showList: 'contract/showList'
    }),
    loadInfo() {
      let vm = this
      contract.find(this.info.id).then(res => {
        vm.setContractInfo(res)
      })
    },

    forceDelete() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      contract.forceDelete({ id: this.info.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除合同成功')
          vm.loading = false
          vm.dialog = false
          vm.showList()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  }
}
</script>
