<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">添加费用项目</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="代码*" v-model="itemInfo.code" :rules="numberRules" hint="格式：001" :counter="3" required></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="费用项目*" v-model="itemInfo.name" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-select :items="$dict.expenseItemType" label="计算方式*" v-model="itemInfo.type" required></v-select>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <v-text-field label="备注" v-model="itemInfo.remark"></v-text-field>
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
import expenseItem from '@/controllers/expenseItem'

export default {
  name: 'ExpenseItemCreate',
  data: () => ({
    valid: true,
    loading: false,
    dialog: false,
    itemInfo: {
      code: '',
      name: '',
      type: 1,
      remark: ''
    },
    numberRules: [(v) => (!!v && v.length <= 3) || '请输入代码，长度3位'],
    nameRules: [(v) => !!v || '请输入费用项目']
  }),
  methods: {
    init() {
      this.itemInfo = {
        code: '',
        name: '',
        type: 1,
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
        expenseItem.create(this.itemInfo).then((res) => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '添加费用项目成功')
            vm.$emit('close')
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
