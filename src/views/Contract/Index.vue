<template>
  <v-row dense>
    <v-col cols="12" class="pt-0">
      <v-toolbar dense>
        <v-toolbar-title>合同管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-col>

    <v-col cols="12"> </v-col>

    <v-col cols="12">
      <v-navigation-drawer v-model="drawer" fixed right temporary width="650"> </v-navigation-drawer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * 合同页面视图
 */
@Component
export default class ContractIndex extends Vue {
  drawer = false

  refresh(): void {
    console.log('refresh')
  }
}
</script>
