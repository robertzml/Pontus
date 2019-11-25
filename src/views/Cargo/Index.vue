<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <v-card flat class="mx-auto">
        <v-card-text>
          <p class="headline">货品管理</p>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="6">
                  <customer-select :customer-id.sync="customerId"></customer-select>
                </v-col>
                <v-col cols="6" align-self="center">
                  <v-btn color="success darken-1" :disabled="!valid" @click="submit">搜索</v-btn>

                  <v-btn color="lime darken-4" :disabled="!valid" class="ml-2" @click="showCreate">添加货物</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="orange">
          货品列表
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="cargoListData" :items-per-page="10">
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

        <cargo-edit ref="cargoEditMod"></cargo-edit>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CustomerSelect from '@/components/Control/CustomerSelect'
import CargoEdit from './Edit'
import contract from '@/controllers/contract'
import cargo from '@/controllers/cargo'

export default {
  name: 'CargoIndex',
  components: {
    CustomerSelect,
    CargoEdit
  },
  data: () => ({
    valid: true,
    customerId: 0,
    selectedContract: { id: 0, name: '', number: '' },
    contractListData: [],
    cargoListData: [],
    headers: [
      { text: '货品名称', value: 'name' },
      { text: '客户编号', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '类别名称', value: 'categoryName' },
      { text: '类别代码', value: 'categoryNumber' },
      { text: '单位重量(kg)', value: 'unitWeight' },
      { text: '登记时间', value: 'registerTime' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  watch: {},
  methods: {
    init() {
      this.customerId = 0
      this.selectedContract = { id: 0, name: '', number: '' }
      this.$refs.form.resetValidation()
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this
        cargo.getList(this.customerId).then(res => {
          vm.cargoListData = res
        })
      }
    },

    showCreate() {
      this.$refs.cargoEditMod.init(this.customerId)
    },

    viewItem(val) {}
  },
  mounted: function() {
    this.init()
  }
}
</script>
