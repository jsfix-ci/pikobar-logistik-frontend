<template>
  <div class="d-flex flex-column align-center">
    <tableau-viz
      id="tableauViz"
      :src="url"
      toolbar="bottom"
      hide-tabs
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: process.env.VUE_APP_TABLEAU_VACCINE
    }
  }
}
</script>

<style lang="scss" scoped>
.under-development {
  &__text {
    font-family: 'Lora', sans-serif;
    font-size: 21px;
    color: #069550;
    font-weight: bold;
  }
}
</style>
