<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title class="lime darken-4">
        托盘手动移动
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field label="托盘码" v-model="trayCode" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="当前仓位码" v-model="positionInfo.number" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="目标仓位码" v-model="totalWeight"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey lighten-3" text @click="dialog = false">取消</v-btn>
        <v-btn color="success darken-1" :disabled="!valid" :loading="loading" @click="save">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import position from '@/controllers/position'

export default {
  name: 'TrayMove',
  data: () => ({
    valid: false,
    dialog: false,
    loading: false,
    positionId: 0,
    trayCode: '',
    positionInfo: {}
  }),
  methods: {
    async init(positionId) {
      this.positionId = positionId
      // this.trayCode = trayCode

      this.positionInfo = await position.getById(positionId)

      this.dialog = true

      this.$nextTick(() => {
        this.$refs.form.resetValidation()
      })
    },

    save() {}
  }
}
</script>
