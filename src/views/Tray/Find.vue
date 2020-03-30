<template>
  <v-row dense>
    <v-col cols="12">
      <v-toolbar dense>
        <v-toolbar-title>托盘查找</v-toolbar-title>
      </v-toolbar>
    </v-col>

    <v-col cols="12">
      <v-card flat>
        <v-card-subtitle class="pb-2 light-blue darken-4">搜索条件</v-card-subtitle>
        <v-card-text class="py-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  label="托盘码*"
                  v-model="trayCode"
                  :counter="6"
                  clearable
                  :rules="trayCodeRules"
                  @keyup.enter="searchTray"
                ></v-text-field>

                <v-text-field v-show="false"></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" :loading="loading" @click="searchTray">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-alert type="info"> 托盘: {{ trayCode }}， 当前状态: {{ trayStatus }} </v-alert>
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-title>库存情况</v-card-title>
        <v-card-text v-for="item in storeListData" :key="item.id">
          <store-details-view :storeInfo="item"> </store-details-view>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import store from '@/controllers/store'
import StoreDetailsView from '@/components/View/StoreDetailsView'

export default {
  name: 'TrayFind',
  components: {
    StoreDetailsView
  },
  data: () => ({
    valid: false,
    loading: false,
    trayCode: '',
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    trayStatus: '',
    storeListData: []
  }),
  methods: {
    async searchTray() {
      if (this.$refs.form.validate()) {
        let vm = this
        this.$nextTick(() => {
          this.loading = true
        })

        let result = await store.findTray({ trayCode: this.trayCode })
        if (result.entity == 1) {
          this.trayStatus = '在库'
          this.storeListData = await store.findByTray(this.trayCode)
        } else {
          this.trayStatus = '不在库'
          this.storeListData = []
          vm.$store.commit('alertSuccess', '不在库')
        }

        this.loading = false
      }
    }
  },
  mounted: function() {
    this.trayCode = ''
  }
}
</script>
