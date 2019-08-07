<template>
  <v-layout wrap>
    <v-flex xs12 md12 pa-1 mb-1>
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
          <v-btn text>Click</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12 pa-1 mb-2>
      <v-card dark color="primary">
        <v-card-text class="px-0">12</v-card-text>
      </v-card>
    </v-flex>
    <v-flex v-for="i in 2" :key="`6${i}`" xs6 pa-1 mb-2>
      <v-card dark color="secondary">
        <v-card-text class="px-0">6</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "customer",
  data() {
    return {
      select: "Programming",
      items: ["Programming", "Design", "Vue", "Vuetify"]
    };
  }
};
</script>
