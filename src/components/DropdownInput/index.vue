<template>
  <div>
    <span class="dropdown__label">
      {{ label }}
    </span>
    <v-select
      :items="options"
      :label="placeholder"
      outlined
      solo
      @select="$emit('select')"
    />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  &__label {
    font-weight: 500;
  }
}
</style>
