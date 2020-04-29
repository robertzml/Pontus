<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>系统功能</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-text>
          <v-btn color="primary" @click="fixStockIn" :loading="loading">修复普通库初始入库单</v-btn>

          <v-btn color="primary" class="ml-4" @click="fixInitialTime" :loading="loading">修复普通库初始入库时间</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import system from '@/controllers/system'

export default {
  name: 'System',
  data: () => ({
    loading: false
  }),
  methods: {
    fixStockIn() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      system
        .fixNormalStoreStockInId()
        .then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '操作完成')
            vm.loading = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.loading = false
          }
        })
        .catch(() => {
          vm.loading = false
        })
    },

    fixInitialTime() {
      this.$nextTick(() => {
        this.loading = true
      })

      let vm = this
      system
        .fixNormalStoreInitialTime()
        .then(res => {
          if (res.status == 0) {
            vm.$store.commit('alertSuccess', '操作完成')
            vm.loading = false
          } else {
            vm.$store.commit('alertError', res.errorMessage)
            vm.loading = false
          }
        })
        .catch(() => {
          vm.loading = false
        })
    }
  }
}
</script>
