<template>
  <v-dialog v-model="dialog" persistent eager max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">客户信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="代码*" v-model="categoryInfo.number" :rules="numberRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="名称*" v-model="categoryInfo.name" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="级别" v-model="categoryInfo.hierarchy" :rules="hierarchyRules" :readonly="categoryId != 0"></v-text-field>
              </v-flex>
              <v-flex xs12 md12>
                <v-select :items="firstClass" v-model="firstId" item-text="name" item-value="id" label="一级分类" :rules="firstRules" v-if="categoryInfo.hierarchy > 1 && categoryId == 0" @input="selectFirst">
                </v-select>
              </v-flex>
              <v-flex xs12 md12>
                <v-select :items="secondClass" v-model="secondId" item-text="name" item-value="id" label="二级分类" :rules="secondRules" v-if="categoryInfo.hierarchy > 2 && categoryId == 0">
                </v-select>
              </v-flex>
              <v-flex xs12 sm6 md12>
                <v-text-field label="备注" v-model="categoryInfo.remark"></v-text-field>
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
  name: 'CategoryEdit',
  data: () => ({
    valid: true,
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
        this.$store.dispatch('getCategory', categoryId).then(res => {
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
        this.$store.dispatch('getFirstCategory').then(res => {
          vm.firstClass = res
        })
      }

      this.dialog = true
      this.$refs.form.resetValidation()
    },

    selectFirst(val) {
      let vm = this
      this.$store.dispatch('getChildrenCategory', val).then(res => {
        vm.secondClass = res
      })
    },

    submit() {
      if (this.$refs.form.validate()) {
        let vm = this
        if (this.categoryId != 0) {
          this.$store.dispatch('updateCategory', this.categoryInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '编辑分类信息成功')
              vm.$emit('update')
              vm.dialog = false
            } else {
              vm.$store.commit('alertError', res.errorMessage)
            }
          })
        } else {
          if (this.categoryInfo.hierarchy == 2) {
            this.categoryInfo.parentId = this.firstId
          } else if (this.categoryInfo.hierarchy == 3) {
            this.categoryInfo.parentId = this.secondId
          }

          this.$store.dispatch('createCategory', this.categoryInfo).then(res => {
            if (res.status == 0) {
              vm.$store.commit('alertSuccess', '添加分类信息成功')
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
