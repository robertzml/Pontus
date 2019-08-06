<template>
  <div class="about">
    <h1>This is an about page</h1>
    <dx-button :text="text" />
    <dx-check-box :value="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "Hello"
    };
  }
};
</script>
