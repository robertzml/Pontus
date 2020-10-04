<template>
  <v-row dense>
    <v-col cols="12" class="pt-0">
      <v-card flat class="mx-auto">
        <v-card-text>
          <p class="title mb-0 text--primary">
            货品管理
          </p>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="6">
                <customer-select :customer-id.sync="customerId"></customer-select>
              </v-col>
              <v-col cols="5" align-self="center">
                <v-btn color="success darken-1" :disabled="!valid" @click="submit">搜索</v-btn>

                <v-btn color="lime darken-4" :disabled="!valid" class="ml-2" @click="showCreate">添加货物</v-btn>
              </v-col>
              <v-col cols="1">
                <v-text-field v-show="false"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="teal">
          货品列表
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="搜索" single-line hide-details> </v-text-field>
        </v-card-title>
        <v-card-text class="px-0">
          <v-data-table :headers="headers" :items="cargoListData" :search="search" :items-per-page="10">
            <template v-slot:item.registerTime="{ item }">
              {{ item.registerTime | displayDate }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn small color="success" @click="viewItem(item)" class="mr-2">
                <v-icon left dark>pageview</v-icon>
                查看
              </v-btn>
              <v-btn small color="warning" @click="editItem(item)" class="mr-2">
                <v-icon left dark>edit</v-icon>
                编辑
              </v-btn>
              <v-btn small color="error" @click="deleteItem(item)">
                <v-icon left dark>delete</v-icon>
                删除
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>

        <cargo-create ref="cargoCreateMod" @close="submit"></cargo-create>
        <cargo-edit ref="cargoEditMod" @update="submit"></cargo-edit>
        <cargo-details ref="cargoDetailsMod"></cargo-details>
        <cargo-delete ref="cargoDeleteMod" @close="submit"></cargo-delete>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CustomerSelect from '@/components/Control/CustomerSelect'
import CargoCreate from './Create'
import CargoEdit from './Edit'
import CargoDetails from './Details'
import CargoDelete from './Delete'
import cargo from '@/controllers/cargo'

export default {
  name: 'CargoIndex',
  components: {
    CustomerSelect,
    CargoCreate,
    CargoEdit,
    CargoDetails,
    CargoDelete
  },
  data: () => ({
    valid: true,
    search: '',
    customerId: 0,
    contractListData: [],
    cargoListData: [],
    headers: [
      { text: '类别代码', value: 'categoryNumber' },
      { text: '类别名称', value: 'categoryName' },
      { text: '货品名称', value: 'name' },
      { text: '客户编号', value: 'customerNumber' },
      { text: '客户名称', value: 'customerName' },
      { text: '规格', value: 'specification' },
      { text: '资产单价(元/吨)', value: 'assetUnit' },
      { text: '登记时间', value: 'registerTime' },
      { text: '操作', value: 'action', sortable: false }
    ]
  }),
  methods: {
    init() {
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
      if (this.$refs.form.validate()) {
        this.$refs.cargoCreateMod.init(this.customerId)
      }
    },

    viewItem(val) {
      this.$refs.cargoDetailsMod.init(val.id)
    },

    editItem(val) {
      this.$refs.cargoEditMod.init(this.customerId, val.id)
    },

    deleteItem(val) {
      this.$refs.cargoDeleteMod.init(val.id)
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>
