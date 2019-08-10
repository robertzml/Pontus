<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">客户单位信息</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field label="客户单位名称*" v-model="customerInfo.name" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Legal last name*" hint="example of persistent helper text" persistent-hint required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password*" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select :items="customerType" label="客户类型*" v-model="customerInfo.type" required></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']" label="Interests" multiple></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">关闭</v-btn>
        <v-btn color="success darken-1" @click="dialog = false">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CustomerEdit',
  data: () => ({
    dialog: false,
    customerInfo: {
      name: '',
      type: 0
    },
    name: 'jack'
  }),
  computed: mapState({
    customerType: state => state.customerType
  }),
  methods: {
    init(customerId) {
      console.log('init')
      if (customerId == 0) {
        this.customerInfo = {
          name: '',
          type: 0
        }
      }
      this.dialog = true
    }
  }
}
</script>
