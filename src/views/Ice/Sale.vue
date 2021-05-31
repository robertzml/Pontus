<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>冰块销售</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="showCreate">冰块销售</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-title class="pb-2 red darken-1">
          总计销售库存数量
          <v-spacer></v-spacer>
          <v-btn text @click.stop="loadSaleCount">刷新</v-btn>
        </v-card-title>
        <v-card-text class="py-0">
          <v-row dense>
            <v-col cols="3">
              <v-text-field label="整冰销售数量" v-model="completeSaleCount" readonly></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field label="碎冰销售数量" v-model="fragmentSaleCount" readonly></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field label="整冰在库数量" v-model="completeStoreCount" readonly></v-text-field>
            </v-col>

            <v-col cols="3">
              <v-text-field label="碎冰在库数量" v-model="fragmentStoreCount" readonly></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="3">
                <v-text-field label="销售年度*" v-model="search.saleYear" :rules="digitalRules" required></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" @click="searchSale">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-green darken-4">过滤条件</v-card-subtitle>
        <v-card-text class="pt-0">
          <v-row dense>
            <v-col cols="3">
              <v-select :items="$dict.iceType" label="冰块类型" v-model="filter.iceType" clearable></v-select>
            </v-col>

            <v-col cols="3">
              <v-text-field v-model="filter.text" append-icon="search" label="搜索" clearable single-line hide-details> </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title class="orange">
          冰块销售列表
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 ml-4">销售总记录: {{ iceSaleFilterData.length }} 条</span>
          <span class="text-subtitle-2 ml-4">销售总数量: {{ totalSaleCount }} </span>
          <span class="text-subtitle-2 ml-4">销售总金额: {{ totalSaleFee }} 元</span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="iceSaleFilterData" :search="filter.text" :items-per-page="10">
            <template v-slot:[`item.iceType`]="{ item }">
              {{ item.iceType | iceType }}
            </template>
            <template v-slot:[`item.saleTime`]="{ item }">
              {{ item.saleTime | displayDate }}
            </template>
            <template v-slot:[`item.createTime`]="{ item }">
              {{ item.createTime | displayDateTime }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn small color="warning" @click="deleteItem(item)"> 删除 </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <ice-sale-create ref="iceSaleMod" @close="loadIceSale"></ice-sale-create>
    </v-col>

    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">删除冰块销售记录</v-card-title>
        <v-card-text>是否确认删除该冰块销售记录？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="loading" @click="deleteIceSale">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ice from '@/controllers/ice'
import IceSaleCreate from './Dialog/SaleCreate.vue'

export default {
  name: 'IceSale',

  components: {
    IceSaleCreate
  },

  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    search: {
      saleYear: 2020
    },
    digitalRules: [(v) => /^\d+$/.test(v) || '请输入数字'],
    filter: {
      iceType: 0,
      text: ''
    },
    headers: [
      { text: '流水单号', value: 'flowNumber', align: 'left' },
      { text: '销售时间', value: 'saleTime' },
      { text: '冰块类型', value: 'iceType' },
      { text: '客户名称', value: 'customerName' },
      { text: '销售数量', value: 'saleCount' },
      { text: '销售单价', value: 'saleUnitPrice' },
      { text: '销售金额(元)', value: 'saleFee' },
      { text: '登记人', value: 'userName' },
      { text: '登记时间', value: 'createTime' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ],
    iceSaleList: [],
    deleteId: '',
    completeSaleCount: 0,
    fragmentSaleCount: 0,
    completeStoreCount: 0,
    fragmentStoreCount: 0
  }),

  computed: {
    // 过滤后列表
    iceSaleFilterData() {
      let temp = this.iceSaleList

      if (this.filter.iceType) {
        temp = temp.filter((r) => r.iceType == this.filter.iceType)
      }

      return temp
    },

    totalSaleCount: function () {
      const list = this.iceSaleFilterData

      let total = 0
      list.forEach((r) => {
        total = total + r.saleCount
      })

      return total
    },

    totalSaleFee: function () {
      const list = this.iceSaleFilterData

      let total = 0
      list.forEach((r) => {
        total = total + r.saleFee
      })

      return total
    }
  },

  methods: {
    async loadIceSale() {
      this.iceSaleList = await ice.getSaleList(this.search.saleYear)
    },

    async loadSaleCount() {
      this.completeSaleCount = await ice.getCompleteSale()
      this.fragmentSaleCount = await ice.getFragmentSale()
      this.completeStoreCount = await ice.getCompleteStore()
      this.fragmentStoreCount = await ice.getFragmentStore()
    },

    searchSale() {
      if (this.$refs.form.validate()) {
        this.loadIceSale()
      }
    },

    showCreate() {
      this.$refs.iceSaleMod.init()
    },

    deleteItem(item) {
      this.dialog = true
      this.deleteId = item.id
    },

    deleteIceSale() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      ice.deleteSale({ id: this.deleteId }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除冰块销售记录成功')
          vm.loading = false
          vm.dialog = false
          vm.deleteId = ''
          vm.loadIceSale()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  },
  mounted() {
    this.search.saleYear = this.$moment().year()

    this.loadSaleCount()
  }
}
</script>
