<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card flat class="mx-auto">
        <v-card-title>
          货品管理
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="4">
                  <customer-select :customer-id.sync="customerId"></customer-select>
                </v-col>
                <v-col cols="4">
                  <v-select :items="contractListData" label="选择合同" :hint="`${selectedContract.number}`" item-text="name" item-value="id" v-model="selectedContract" persistent-hint return-object></v-select>
                </v-col>
                <v-col cols="4" align-self="center">
                  <v-btn color="success darken-1" :disabled="!valid" @click="submit">搜索</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="orange">
          货品列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="cargoListData" :search="search" :items-per-page="10">
            <template v-slot:item.billingType="{ item }">
              {{ item.billingType | billingType }}
            </template>
            <template v-slot:item.registerTime="{ item }">
              {{ item.registerTime | displayDate }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewItem(item)">
                <v-icon left dark>pageview</v-icon>
                库存
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomerSelect from '@/components/Control/CustomerSelect'
import contract from '@/controllers/contract'
import cargo from '@/controllers/cargo'

export default {
  name: 'CargoIndex',
  components: {
    CustomerSelect
  },
  data: () => ({
    valid: true,
    customerId: 0,
    selectedContract: { id: 0, name: '', number: '' },
    contractListData: [],
    cargoListData: [],
    headers: [
      { text: '客户名称', value: 'customerName' },
      { text: '合同名称', value: 'contractName' },
      { text: '合同编号', value: 'contractNumber' },
      { text: '计费方式', value: 'billingType' },
      { text: '类别名称', value: 'categoryName' },
      { text: '类别代码', value: 'categoryNumber' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '登记时间', value: 'registerTime' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  watch: {
    customerId: function(val) {
      this.loadContract(val)
    }
  },
  methods: {
    init() {
      this.customerId = 0
      this.selectedContract = { id: 0, name: '', number: '' }
      this.$refs.form.resetValidation()
    },

    loadContract(customerId) {
      this.selectedContract = { number: '' }
      let vm = this
      contract.getList(customerId).then(res => {
        vm.contractListData = res
        vm.contractListData.unshift({ id: 0, name: '-- 选择全部 --', number: '' })

        vm.selectedContract = res[0]
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this
        cargo.getList(this.customerId, this.selectedContract.id).then(res => {
          vm.cargoListData = res
        })
      }
    },

    viewItem(val) {}
  },
  mounted: function() {
    this.init()
  }
}
</script>
