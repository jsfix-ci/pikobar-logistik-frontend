<template>
  <div class="stock">
    <StockSection public-user />
  </div>
</template>

<script>
import StockSection from '../immunization/update/StockSection.vue'
export default {
  components: {
    StockSection
  }
}
</script>

<style lang="scss" scoped>
.stock {
  background-color: white;
}
</style>
