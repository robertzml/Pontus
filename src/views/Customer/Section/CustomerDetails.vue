<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="cyan"> 客户信息 </v-card-title>
        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col cols="3" md="4" sm="6">
                <v-text-field v-model="info.number" label="客户编号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="4" sm="6">
                <v-text-field v-model="info.name" label="客户名称" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="4" sm="6">
                <v-text-field v-model="info.address" label="地址" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="4" sm="6">
                <v-text-field v-model="info.telephone" label="电话" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="4" sm="6">
                <v-text-field v-model="info.contact" label="联系人" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="4" sm="6">
                <v-text-field v-model="info.contactTelephone" label="联系人电话" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="4" sm="6">
                <v-text-field v-model="info.identityCard" label="身份证号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="4" sm="6">
                <v-text-field :value="$util.customerType(info.type)" label="客户类型" readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field v-model="info.remark" label="备注" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ICustomerData } from '@/models/customer'

/**
 * 客户信息部件
 */
@Component
export default class CustomerDetails extends Vue {
  @Prop() info!: ICustomerData
}
</script>
