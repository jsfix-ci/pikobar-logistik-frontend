<template>
  <div class="jds-text-field">
    <span class="jds-text-field jds-text-field__label">
      {{ label }}
    </span>
    <span v-if="subLabel" class="jds-text-field jds-text-field__sub-label">
      {{ subLabel }}
    </span>
    <v-text-field
      :value="typeof value === 'number' ? currency(value) : value"
      :clearable="clearable"
      :placeholder="placeholder"
      :hide-details="hideDetails"
      :disabled="disabled"
      :suffix="suffix"
      :error="error"
      :error-messages="errorMessages"
      solo
      class="mt-2"
      @input="$emit('input', $event)"
      @change="$emit('change')"
    />
  </div>
</template>

<script>
import { currency } from '@/helpers/tableDisplay'
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    subLabel: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    errorMessages: {
      type: Array,
      default: () => []
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    currency
  }
}
</script>

<style lang="scss" scoped>
.jds-text-field {
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;

  &__label {
    font-size: 15px;
    color: #424242;
  }

  &__sub-label {
    font-size: 13px;
    color: #616161;
  }
}

.theme--light.v-text-field--solo::v-deep {
  .v-input__slot {
    background: #FAFAFA !important;
    border-radius: 8px;
    min-height: 38px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #424242;
  }

  input::placeholder {
    color: #757575;
  }
}
.theme--light.v-list::v-deep {
  .v-list-item__title {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #424242;
  }
}
</style>
