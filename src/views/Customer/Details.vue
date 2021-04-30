<template>
  <v-container fluid class="pa-0">
    <v-row dense>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title class="cyan">
            客户信息
            <v-spacer></v-spacer>
            <v-btn text v-if="userInfo.userGroupId == 1" @click="dialog = true">强制删除</v-btn>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row dense>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.number" label="客户编号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.name" label="客户名称" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.address" label="地址" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.telephone" label="电话" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.contact" label="联系人" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.contactTelephone" label="联系人电话" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field v-model="info.identityCard" label="身份证号" readonly></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm="6">
                  <v-text-field :value="$util.customerType(info.type)" label="客户类型" readonly></v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="6">
                  <v-text-field v-model="info.remark" label="备注" readonly></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">强制删除员工</v-card-title>
        <v-card-text>是否确认删除该员工？员工关联合同、库存、出入库、计费记录、结算记录、缴费记录均被删除，占用仓位置空。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="loading" @click="forceDelete">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import customer from '@/controllers/customer'

export default {
  name: 'CustomerDetails',
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapState({
      info: (state) => state.customer.customerInfo,
      refreshEvent: (state) => state.customer.refreshEvent
    }),
    ...mapGetters(['userInfo'])
  },
  watch: {
    refreshEvent: function () {
      this.loadInfo()
    }
  },
  methods: {
    ...mapMutations({
      setCustomerInfo: 'customer/setCustomerInfo'
    }),
    ...mapActions({
      showList: 'customer/showList'
    }),
    loadInfo() {
      let vm = this
      customer.find(this.info.id).then((res) => {
        vm.setCustomerInfo(res)
      })
    },

    forceDelete() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      customer.forceDelete({ id: this.info.id }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除员工成功')
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
