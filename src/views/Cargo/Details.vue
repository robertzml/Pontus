<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card class="mx-auto">
      <v-card-title class="deep-purple">
        货品信息
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="4" md="4" sm="4">
            <v-text-field label="货品名称" v-model="cargoInfo.name" readonly></v-text-field>
          </v-col>

          <v-col cols="4" md="4" sm="4">
            <v-text-field label="客户名称" v-model="cargoInfo.customerName" readonly></v-text-field>
          </v-col>

          <v-col cols="4" md="4" sm="4">
            <v-text-field label="客户代码" v-model="cargoInfo.customerNumber" readonly></v-text-field>
          </v-col>

          <v-col cols="4" md="4" sm="4">
            <v-text-field label="类别名称" v-model="cargoInfo.categoryName" readonly></v-text-field>
          </v-col>

          <v-col cols="4" md="4" sm="4">
            <v-text-field label="类别代码" v-model="cargoInfo.categoryNumber" readonly></v-text-field>
          </v-col>

          <v-col cols="4" md="4" sm="4">
            <v-text-field label="备注" v-model="cargoInfo.remark" readonly></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import cargo from '@/controllers/cargo'

export default {
  name: 'CargoDetails',
  data: () => ({
    dialog: false,
    cargoId: '',
    cargoInfo: {
      name: '',
      customerId: 0,
      categoryId: 0,
      unitWeight: 0,
      remark: ''
    }
  }),
  methods: {
    init(cargoId) {
      this.cargoId = cargoId
      this.loadInfo()

      this.dialog = true
    },

    loadInfo() {
      let vm = this
      cargo.find(this.cargoId).then(res => {
        vm.cargoInfo = res
      })
    }
  }
}
</script>
