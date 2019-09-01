<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">货架信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-select v-model="selectWarehouse" :items="warehouseList" item-text="name" item-value="id" :rules="warehouseRules" label="所属仓库" :hint="`${selectWarehouse.name}, ${selectWarehouse.number}`" return-object persistent-hint required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="编号*" v-model="shelfInfo.number" :rules="numberRules" hint="2位：01" counter="2" persistent-hint required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="this.$dict.shelfType" label="类型*" v-model="shelfInfo.type" required></v-select>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="入口数" v-model="shelfInfo.entrance" type="number" :rules="digitRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="入口编号" v-model="shelfInfo.entranceNumber" hint="每个入口一位，用-连接，如：X或 X-Y" persistent-hint></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="排数" v-model="shelfInfo.row" type="number" :rules="digitRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="层数" v-model="shelfInfo.layer" type="number" :rules="digitRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="进数" v-model="shelfInfo.depth" type="number" :rules="digitRules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="备注" v-model="shelfInfo.remark"></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ShelfEdit',
  data: () => ({
    dialog: false,
    valid: true,
    warehouseId: 0,
    shelfId: 0,
    shelfInfo: {
      warehouseId: 0,
      number: '',
      type: 1,
      entrance: 1,
      entranceNumber: '',
      row: 0,
      layer: 0,
      depth: 0,
      remark: ''
    },
    warehouseList: [],
    selectWarehouse: {
      id: 0,
      name: '',
      number: ''
    },
    warehouseRules: [v => (v && v.number != '') || '请选择仓库'],
    numberRules: [v => (!!v && v.length <= 2) || '请输入编号，长度2位'],
    digitRules: [v => (v != null && /^\d+/.test(v)) || '请输入数字']
  }),
  methods: {
    init: function(warehouseId, shelfId) {
      this.warehouseId = warehouseId
      this.shelfId = shelfId

      let vm = this
      this.$store.dispatch('getWarehouseList').then(res => {
        vm.warehouseList = res
        vm.selectWarehouse = vm.warehouseList.find(r => r.id == warehouseId)
      })

      if (shelfId == 0) {
        this.shelfInfo = {
          warehouseId: 0,
          number: '',
          type: 1,
          entrance: 1,
          entranceNumber: '',
          row: 0,
          layer: 0,
          depth: 0,
          remark: ''
        }
      } else {
        let vm = this
        this.$store.dispatch('getShelf', shelfId).then(res => {
          vm.shelfInfo = res
        })
      }
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    submit: function() {
      if (this.$refs.form.validate()) {
        let vm = this
        this.shelfInfo.warehouseId = this.warehouseId
        if (this.shelfId == 0) {
          this.$store.dispatch('createShelf', this.shelfInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加货架成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        } else {
          this.$store.dispatch('updateShelf', this.shelfInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改货架成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        }
      }
    }
  }
}
</script>
