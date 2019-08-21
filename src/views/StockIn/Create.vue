<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">
          入库信息
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-layout wrap>
              <v-flex md6>
                <customer-select></customer-select>
              </v-flex>
              <v-flex md3>
                <v-text-field label="合同编号" readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomerSelect from '@/components/Customer/CustomerSelect'

export default {
  name: 'StockInCreate',
  components: {
    CustomerSelect
  },
  data: () => ({})
}
</script>
