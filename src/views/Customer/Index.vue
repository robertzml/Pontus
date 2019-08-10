<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title>客户管理</v-card-title>
        <v-card-text>
          I'm card text
          <v-combobox
            v-model="select"
            :items="items"
            label="Select a favorite activity or create a new one"
          ></v-combobox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="primary">添加客户</v-btn>
          <v-btn small color="primary" @click.stop="openMod">Open Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <customer-edit ref="customerMod"></customer-edit>

    <v-flex xs12>
      <v-card dark color="primary">
        <v-card-text class="px-0">12</v-card-text>
      </v-card>
    </v-flex>
    <v-flex v-for="i in 2" :key="`6${i}`" xs6>
      <v-card dark color="secondary">
        <v-card-text class="px-0">6</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomerEdit from '@/components/Customer/Edit'

export default {
  name: 'customer',
  components: {
    CustomerEdit
  },
  data: () => ({
    select: 'Programming',
    items: ['Programming', 'Design', 'Vue', 'Vuetify'],
    dialog: false
  }),
  methods: {
    openMod() {
      this.$refs.customerMod.init(0)
    }
  }
}
</script>
