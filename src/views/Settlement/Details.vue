<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          结算信息
          <v-spacer></v-spacer>
          <v-btn text v-if="userInfo.userGroupId == 1" @click="dialog = true">删除结算</v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.customerNumber" label="客户编号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.customerName" label="客户名称" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDate(settlementInfo.startTime)" label="开始日期" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDate(settlementInfo.endTime)" label="结束日期" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.sumFee" label="费用合计" readonly suffix="元"></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.discount" label="折扣率" readonly suffix="%"></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.remission" label="减免费用" readonly suffix="元"></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.dueFee" label="应付款" readonly suffix="元"></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.number" label="结算单号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDate(settlementInfo.settleTime)" label="结算时间" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="settlementInfo.userName" label="登记人" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.displayDateTime(settlementInfo.createTime)" label="登记时间" readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field v-model="settlementInfo.remark" label="备注" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title class="text-h5">删除结算记录</v-card-title>
          <v-card-text>是否确认删除该结算记录？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
            <v-btn color="green darken-1" text :loading="loading" @click="deleteSettlement">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import settlement from '@/controllers/settlement'

export default {
  name: 'SettlementDetails',
  data: () => ({
    settlementInfo: {},
    dialog: false,
    loading: false
  }),
  computed: {
    ...mapState({
      settlementId: state => state.settlement.settlementId,
      refreshEvent: state => state.settlement.refreshEvent
    }),
    ...mapGetters(['userInfo'])
  },
  watch: {
    refreshEvent: function() {
      this.loadInfo()
    }
  },
  methods: {
    ...mapActions({
      showList: 'settlement/showList'
    }),

    async loadInfo() {
      this.settlementInfo = await settlement.find(this.settlementId)
    },

    deleteSettlement() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      settlement.delete({ id: this.settlementId }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除结算记录成功')
          vm.loading = false
          vm.dialog = false
          vm.showList()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  },
  activated: function() {
    this.loadInfo()
  }
}
</script>
