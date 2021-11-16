<template>
  <div>
    <label>
      <span class="dropdown__label">
        {{ label }}
      </span>
      <i v-if="required">{{ $t('label.should_be_filled') }}</i>
    </label>
    <v-select
      :items="options"
      :label="placeholder"
      :value="value"
      :item-text="itemText"
      :item-value="itemValue"
      :disabled="disabled"
      :error-messages="errorMessages"
      outlined
      solo
      :return-object="isReturnObject"
      @input="$emit('input', $event)"
      @change="$emit('select')"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
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
    },
    errorMessages: {
      type: Array,
      default: () => []
    },
    required: {
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
