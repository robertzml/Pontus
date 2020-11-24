<template>
  <v-row dense>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title class="cyan"> 客户信息 </v-card-title>
        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="$props.info.number" label="客户编号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="$props.info.name" label="客户名称" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="$props.info.address" label="地址" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="$props.info.telephone" label="电话" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="$props.info.contact" label="联系人" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="$props.info.contactTelephone" label="联系人电话" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field v-model="$props.info.identityCard" label="身份证号" readonly></v-text-field>
              </v-col>
              <v-col cols="3" md="3" sm="6">
                <v-text-field :value="$util.customerType($props.info.type)" label="客户类型" readonly></v-text-field>
              </v-col>
              <v-col cols="6" md="6" sm="6">
                <v-text-field v-model="$props.info.remark" label="备注" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { ICustomerData } from '@/models/customer'

/**
 * 客户信息部件
 */
export default defineComponent({
  name: 'CustomerDetails',
  props: {
    info: {
      type: Object as PropType<ICustomerData>,
      required: true
    }
  }
})
</script>
