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
                <v-text-field label="托盘码" v-model="trayCode" :counter="6" clearable :rules="trayCodeRules" @keyup.enter="searchTray"></v-text-field>

                <v-text-field v-show="false"></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn color="success darken-1 mt-2" :disabled="!valid" @click="searchTray">搜索</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="storeListData.length > 0">
      <v-card>
        <v-card-title class="orange">库存情况</v-card-title>
        <v-card-text v-for="item in storeListData" :key="item.id">
          <store-details-view :storeInfo="item"> </store-details-view>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="carryInListData.length > 0">
      <v-card>
        <v-card-title class="primary">搬运入库情况</v-card-title>
        <v-card-text v-for="item in carryInListData" :key="item.id">
          <carry-in-details-view :carryInInfo="item"> </carry-in-details-view>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="carryOutListData.length > 0">
      <v-card>
        <v-card-title class="deep-purple">搬运出库情况</v-card-title>
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
    trayCode: '',
    trayCodeRules: [(v) => /^[0-9]{6}$/.test(v) || '请输入托盘码'],
    storeListData: [],
    carryInListData: [],
    carryOutListData: []
  }),
  methods: {
    async searchTray() {
      if (this.$refs.form.validate()) {
        this.storeListData = await store.findByTray(this.trayCode)
        this.carryInListData = await carryIn.findWorking(this.trayCode)
        this.carryOutListData = await carryOut.findWorking(this.trayCode)
      }
    }
  },
  mounted: function () {
    this.trayCode = ''
  }
}
</script>
