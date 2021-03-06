<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>冰块出入库</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="showCreate">冰块入库</v-btn>
          <v-btn text @click.stop="showStockOut">整冰制冰出库</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 red darken-1">总计出入库数量</v-card-subtitle>
        <v-card-text class="py-0">
          <v-row dense>
            <v-col cols="4">
              <v-text-field label="整冰入库数量" v-model="completeInCount" readonly></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field label="碎冰入库数量" v-model="fragmentInCount" readonly></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field label="整冰制冰出库数量" v-model="completeOutCount" readonly></v-text-field>
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
                <v-text-field label="入库年度*" v-model="search.stockYear" :rules="digitalRules" required></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" @click="searchStock">搜索</v-btn>
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
              <v-select :items="$dict.iceStockType" label="出入库类型" v-model="filter.stockType" clearable></v-select>
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
          冰块出入库列表
          <v-spacer></v-spacer>
          <span class="text-subtitle-2 ml-4">入库总记录: {{ iceStockFilterData.length }} 条</span>
          <span class="text-subtitle-2 ml-4">入库总数量: {{ totalInCount }} </span>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="iceStockFilterData" :search="filter.text" :items-per-page="10">
            <template v-slot:[`item.iceType`]="{ item }">
              {{ item.iceType | iceType }}
            </template>
            <template v-slot:[`item.iceStockType`]="{ item }">
              {{ item.stockType | iceStockType }}
            </template>
            <template v-slot:[`item.stockTime`]="{ item }">
              {{ item.stockTime | displayDate }}
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
      <ice-stock-in ref="iceStockInMod" @close="loadIceStock"></ice-stock-in>

      <ice-stock-out ref="iceStockOutMod" @close="loadIceStock"></ice-stock-out>
    </v-col>

    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">删除冰块入库记录</v-card-title>
        <v-card-text>是否确认删除该冰块入库记录？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
          <v-btn color="green darken-1" text :loading="loading" @click="deleteIceStock">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ice from '@/controllers/ice'
import IceStockIn from './Dialog/StockIn.vue'
import IceStockOut from './Dialog/StockOut.vue'

export default {
  name: 'IceStock',
  components: {
    IceStockIn,
    IceStockOut
  },

  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    search: {
      stockYear: 2020
    },
    filter: {
      iceType: 0,
      stockType: 0,
      text: ''
    },
    digitalRules: [(v) => /^\d+$/.test(v) || '请输入数字'],
    iceStockList: [],
    headers: [
      { text: '流水单号', value: 'flowNumber', align: 'left' },
      { text: '入库时间', value: 'stockTime' },
      { text: '冰块类型', value: 'iceType' },
      { text: '出入库类型', value: 'iceStockType' },
      { text: '入库数量', value: 'flowCount' },
      { text: '登记人', value: 'userName' },
      { text: '登记时间', value: 'createTime' },
      { text: '备注', value: 'remark' },
      { text: '操作', value: 'action', sortable: false }
    ],
    deleteId: '',
    completeInCount: 0,
    fragmentInCount: 0,
    completeOutCount: 0
  }),

  computed: {
    // 过滤后列表
    iceStockFilterData() {
      let temp = this.iceStockList

      if (this.filter.iceType) {
        temp = temp.filter((r) => r.iceType == this.filter.iceType)
      }

      if (this.filter.stockType) {
        temp = temp.filter((r) => r.stockType == this.filter.stockType)
      }

      return temp
    },

    totalInCount: function () {
      const list = this.iceStockFilterData

      let total = 0
      list.forEach((r) => {
        total = total + r.flowCount
      })

      return total
    }
  },

  methods: {
    async loadIceStock() {
      this.iceStockList = await ice.getList(this.search.stockYear)
    },

    async loadIceCount() {
      this.completeInCount = await ice.getCompleteIn()
      this.completeOutCount = await ice.getCompleteOut()
      this.fragmentInCount = await ice.getFragmentIn()
    },

    searchStock() {
      if (this.$refs.form.validate()) {
        this.loadIceStock()
      }
    },

    showCreate() {
      this.$refs.iceStockInMod.init()
    },

    showStockOut() {
      this.$refs.iceStockOutMod.init()
    },

    deleteItem(item) {
      this.dialog = true
      this.deleteId = item.id
    },

    deleteIceStock() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      ice.delete({ id: this.deleteId }).then((res) => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '删除冰块入库记录成功')
          vm.loading = false
          vm.dialog = false
          vm.deleteId = ''
          vm.loadIceStock()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
          vm.loading = false
        }
      })
    }
  },
  mounted() {
    this.search.stockYear = this.$moment().year()

    this.loadIceCount()
  }
}
</script>
