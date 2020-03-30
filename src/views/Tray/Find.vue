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
      <v-alert type="info"> 托盘: {{ trayCode }}， 当前库存状态: {{ storeStatus }}，当前搬运状态: {{ carryStatus }} </v-alert>
    </v-col>

    <v-col cols="12" v-if="storeListData.length > 0">
      <v-card>
        <v-card-title>库存情况</v-card-title>
        <v-card-text v-for="item in storeListData" :key="item.id">
          <store-details-view :storeInfo="item"> </store-details-view>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="carryInListData.length > 0">
      <v-card>
        <v-card-title>搬运入库情况</v-card-title>
        <v-card-text v-for="item in carryInListData" :key="item.id">
          <carry-in-details-view :carryInInfo="item"> </carry-in-details-view>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="carryOutListData.length > 0">
      <v-card>
        <v-card-title>搬运出库情况</v-card-title>
        <v-card-text v-for="item in carryOutListData" :key="item.id">
          <carry-out-details-view :carryOutInfo="item"> </carry-out-details-view>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import store from '@/controllers/store'
import carryIn from '@/controllers/carryIn'
import carryOut from '@/controllers/carryOut'
import StoreDetailsView from '@/components/View/StoreDetailsView'
import CarryInDetailsView from '@/components/View/CarryInDetailsView'
import CarryOutDetailsView from '@/components/View/CarryOutDetailsView'

export default {
  name: 'TrayFind',
  components: {
    StoreDetailsView,
    CarryInDetailsView,
    CarryOutDetailsView
  },
  data: () => ({
    valid: false,
    loading: false,
    trayCode: '',
    trayCodeRules: [v => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    storeStatus: '',
    carryStatus: '',
    storeListData: [],
    carryInListData: [],
    carryOutListData: []
  }),
  methods: {
    async searchTray() {
      if (this.$refs.form.validate()) {
        this.$nextTick(() => {
          this.loading = true
        })

        let result = await store.findTray({ trayCode: this.trayCode })
        this.storeStatus = result.entity.storeStatus
        this.carryStatus = result.entity.carryStatus

        if (this.storeStatus == 1) {
          this.storeListData = await store.findByTray(this.trayCode)
        } else {
          this.storeListData = []
        }

        if (this.carryStatus == 1) {
          this.carryInListData = await carryIn.listByTray(this.trayCode)
          this.carryOutListData = []
        } else if (this.carryStatus == 2 || this.carryStatus == 3) {
          this.carryOutListData = await carryOut.listByTray(this.trayCode)
          this.carryInListData = []
        } else if (this.carryStatus == 4) {
          this.carryInListData = await carryIn.listByTray(this.trayCode)
          this.carryOutListData = await carryOut.listByTray(this.trayCode)
        } else if (this.carryStatus == 5) {
          this.carryInListData = []
          this.carryOutListData = []
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
