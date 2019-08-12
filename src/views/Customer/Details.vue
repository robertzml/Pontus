<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="cyan">客户信息</v-card-title>
        <v-card-text>
          I'm card text
          <v-combobox v-model="select" :items="items" label="Select a favorite activity or create a new one"></v-combobox>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CustomerDetails',
  data: () => ({})
}
</script>