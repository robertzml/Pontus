<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card class="mx-auto">
      <v-card-title class="cyan">
        货品信息
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="6" md="6" sm="6">
                <v-text-field label="货品名称*" v-model="cargoInfo.name" :rules="nameRules"></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <category-select :category-id.sync="cargoInfo.categoryId"></category-select>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="单位重量*" v-model="cargoInfo.unitWeight" suffix="千克"></v-text-field>
              </v-col>

              <v-col cols="6" md="6" sm="6">
                <v-text-field label="备注" v-model="cargoInfo.remark"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="submit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CategorySelect from '@/components/Control/CategorySelect'
import cargo from '@/controllers/cargo'

export default {
  name: 'CargoCreate',
  components: {
    CategorySelect
  },
  data: () => ({
    dialog: false,
    loading: false,
    valid: true,
    customerId: 0,
    cargoInfo: {
      name: '',
      customerId: 0,
      categoryId: 0,
      unitWeight: 0,
      remark: ''
    },
    nameRules: [v => !!v || '请输入货品名称']
  }),
  methods: {
    init(customerId) {
      this.customerId = customerId
      this.cargoInfo = {
        name: '',
        customerId: customerId,
        categoryId: 0,
        unitWeight: 0,
        remark: ''
      }
      this.loading = false
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })
        let vm = this

        cargo.create(this.cargoInfo).then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加货品成功')
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
</script>
