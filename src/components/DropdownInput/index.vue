<template>
  <div>
    <span class="dropdown__label">
      {{ label }}
    </span>
    <v-select
      :items="options"
      :label="placeholder"
      :value="value"
      outlined
      solo
      :return-object="isReturnObject"
      :item-text="itemText"
      :item-value="itemValue"
      :disabled="disabled"
      @input="$emit('input', $event)"
      @select="$emit('select')"
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
    itemText: {
      type: String,
      default: 'label'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isReturnObject: {
      type: Boolean,
      default: false
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
