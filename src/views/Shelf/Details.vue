<template>
  <v-card class="mx-auto">
    <v-card-title>
      货架信息
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row dense>
          <v-col cols="3">
            <v-text-field v-model="shelfInfo.number" label="编号" readonly></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field :value="$util.shelfType(shelfInfo.type)" label="类型" readonly></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="shelfInfo.entrance" label="入口数" readonly></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="shelfInfo.entranceNumber" label="入口编号" readonly></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="shelfInfo.row" label="排数" readonly></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="shelfInfo.layer" label="层数" readonly></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="shelfInfo.depth" label="进数" readonly></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="shelfInfo.remark" label="备注" readonly></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import shelf from '@/controllers/shelf'

export default {
  name: 'ShelfDetails',
  data: () => ({
    shelfId: 0,
    shelfInfo: {}
  }),
  methods: {
    getInfo(id) {
      this.shelfId = id
      if (this.shelfId == 0) {
        return
      }

      let vm = this
      shelf.get(id).then(res => {
        vm.shelfInfo = res
      })
    }
  }
}
</script>
