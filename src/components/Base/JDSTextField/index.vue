<template>
  <div class="jds-text-field">
    <span class="jds-text-field__label">
      {{ label }}
    </span>
    <v-text-field
      :value="value"
      :clearable="clearable"
      :placeholder="placeholder"
      :hide-details="hideDetails"
      :suffix="suffix"
      :error="error"
      :error-messages="errorMessages"
      solo
      @input="$emit('input', $event)"
      @change="$emit('change')"
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
    label: {
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
  }
}
</script>

<style lang="scss" scoped>
.jds-text-field {
  display: flex;
  flex-direction: column;

  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
    margin-bottom: 8px;
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
