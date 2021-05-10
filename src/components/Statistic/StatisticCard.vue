<template>
  <div>
    <div class="d-flex flex-column stat-card pa-4" :style="cardColor">
      <strong class="mb-3 title">{{ title }}</strong>
      <span class="h1 font-weight-bold mb-0">{{ value }}</span>
      <strong class="title">{{ unit }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticCard',
  props: {
    title: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    unit: {
      type: String,
      default: null
    },
    mainColor: {
      type: String,
      default: null
    },
    backgroundColor: {
      type: String,
      default: null
    }
  },
  computed: {
    cardColor() {
      return {
        'border-color': this.mainColor,
        'color': this.mainColor,
        'background-color': this.backgroundColor
      }
    }
  }
}
</script>

<style scoped>
.stat-card {
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;
}
</style>
