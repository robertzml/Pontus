<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-toolbar dense>
        <v-toolbar-title>库存管理</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text @click.stop="refresh">刷新</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 md12>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'StoreIndex',
  data: () => ({}),
  methods: {
    refresh() {}
  }
}
</script>
