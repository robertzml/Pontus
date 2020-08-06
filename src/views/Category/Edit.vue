<template>
  <v-dialog v-model="dialog" persistent eager max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">分类信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-alert v-if="categoryId != 0" dense type="info" class="mt-2 body-2">可修改名称、代码、备注</v-alert>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row dense>
            <v-col cols="4" md="4" sm="6">
              <v-text-field label="代码*" v-model="categoryInfo.number" :rules="numberRules" required></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6">
              <v-text-field label="名称*" v-model="categoryInfo.name" :rules="nameRules" required></v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="6">
              <v-text-field label="级别" v-model="categoryInfo.hierarchy" :rules="hierarchyRules" :readonly="categoryId != 0"></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-select
                :items="firstClass"
                v-model="firstId"
                item-text="name"
                item-value="id"
                label="一级分类"
                :rules="firstRules"
                v-if="categoryInfo.hierarchy > 1 && categoryId == 0"
                @input="selectFirst"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-select
                :items="secondClass"
                v-model="secondId"
                item-text="name"
                item-value="id"
                label="二级分类"
                :rules="secondRules"
                v-if="categoryInfo.hierarchy > 2 && categoryId == 0"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field label="备注" v-model="categoryInfo.remark"></v-text-field>
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
import category from '@/controllers/category'

export default {
  name: 'CategoryEdit',
  data: () => ({
    valid: true,
    loading: false,
    dialog: false,
    categoryId: 0,
    categoryInfo: {
      number: '',
      name: '',
      hierarchy: 1,
      parentId: null,
      remark: ''
    },
    firstClass: [],
    secondClass: [],
    firstId: 0,
    secondId: 0,
    numberRules: [v => !!v || '请输入编号'],
    nameRules: [v => !!v || '请输入名称'],
    hierarchyRules: [v => (v && /^[1-3]{1}$/.test(v)) || '级别在1-3'],
    firstRules: [v => !!v || '请选择一级分类'],
    secondRules: [v => !!v || '请选择二级分类']
  }),
  methods: {
    init(categoryId) {
      this.categoryId = categoryId
      let vm = this
      if (categoryId != 0) {
        category.find(categoryId).then(res => {
          vm.categoryInfo = res
        })
      } else {
        this.categoryInfo = {
          number: '',
          name: '',
          hierarchy: 1,
          parentId: null,
          remark: ''
        }
        category.getFirst().then(res => {
          vm.firstClass = res
        })
      }

      this.loading = false
      this.dialog = true
      this.$refs.form.resetValidation()
    },

    selectFirst(val) {
      let vm = this
      category.getChildren(val).then(res => {
        vm.secondClass = res
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let vm = this
        if (this.categoryId != 0) {
          category.update(this.categoryInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '编辑分类信息成功')
              vm.$emit('update')
              vm.loading = false
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
              vm.loading = false
            }
          })
        } else {
          if (this.categoryInfo.hierarchy == 2) {
            this.categoryInfo.parentId = this.firstId
          } else if (this.categoryInfo.hierarchy == 3) {
            this.categoryInfo.parentId = this.secondId
          }

          category.create(this.categoryInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加分类信息成功')
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
