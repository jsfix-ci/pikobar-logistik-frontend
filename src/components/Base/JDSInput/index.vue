<template>
  <div class="d-flex flex-column">
    <span v-if="!disabled" class="jds-input__label">
      {{ label }}
    </span>
    <v-text-field
      :value="value"
      hide-details
      :label="labelDisplay"
      :disabled="disabled"
      :placeholder="placeholder"
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
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    labelDisplay() {
      return this.disabled ? this.label : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.v-input::v-deep {
  border-color: #E0E0E0 !important;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  padding: 16px 16px 0 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 500;

  .v-input__slot {
    background: #FAFAFA !important;
    min-height: 38px !important;
  }

  .v-input__slot::before, .v-input__slot::after {
    display: none;
  }

  .v-label {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #757575;
    margin-bottom: 8px;
  }
}

.theme--light.v-input--is-disabled::v-deep input {
  color: #424242;
}

.jds-input {
  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
    padding-bottom: 8px;
  }
}
</style>
