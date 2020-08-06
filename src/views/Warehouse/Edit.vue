<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">仓库信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="4" md="4" sm="6">
              <v-text-field label="名称*" v-model="warehouseInfo.name" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6">
              <v-text-field
                label="编号*"
                v-model="warehouseInfo.number"
                :rules="numberRules"
                counter="3"
                hint="格式：A01"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6">
              <v-select :items="this.$dict.warehouseType" label="类型*" v-model="warehouseInfo.type" required></v-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="容量" v-model="warehouseInfo.capacity"></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" v-model="warehouseInfo.remark"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import warehouse from '@/controllers/warehouse'

export default {
  name: 'WarehouseEdit',
  data: () => ({
    dialog: false,
    loading: false,
    valid: true,
    warehouseId: 0,
    warehouseInfo: {
      number: '',
      name: '',
      type: 1,
      capacity: '',
      remark: ''
    },
    numberRules: [v => (!!v && v.length <= 3) || '请输入编号，长度3位'],
    nameRules: [v => !!v || '请输入名称']
  }),
  methods: {
    init: function(warehouseId) {
      this.warehouseId = warehouseId
      if (warehouseId == 0) {
        this.warehouseInfo = {
          number: '',
          name: '',
          type: 1,
          capacity: '',
          remark: ''
        }
      } else {
        let vm = this
        warehouse.find(warehouseId).then(res => {
          vm.warehouseInfo = res
        })
      }

      this.loading = false
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    submit: function() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        if (this.warehouseId == 0) {
          warehouse.create(this.warehouseInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加仓库成功')
              vm.$emit('update')
              vm.loading = false
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        } else {
          warehouse.update(this.warehouseInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '修改仓库成功')
              vm.$emit('update')
              vm.loading = false
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        }
      }
    }
  }
}
</script>
