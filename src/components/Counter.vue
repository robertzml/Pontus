<template>
  <div>{{ count }}</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Counter',

  data: () => ({
    count: 0
  })
})
</script>
