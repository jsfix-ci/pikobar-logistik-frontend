<template>
  <div>
    <span class="dropdown__label">
      {{ label }}
    </span>
    <v-select
      :items="options"
      :label="placeholder"
      :value="value"
      :item-text="displayName"
      item-value="id"
      outlined
      solo
      @input="$emit('input', $event)"
      @change="$emit('select')"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
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
    },
    displayName: {
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
