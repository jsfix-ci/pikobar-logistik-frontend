<template>
  <div class="jds-dropdown">
    <span class="jds-dropdown__label">
      {{ label }}
    </span>
    <v-select
      :value="value"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :clearable="clearable"
      :placeholder="placeholder"
      :hide-details="hideDetails"
      append-icon="mdi-chevron-down"
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
    items: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.jds-dropdown {
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
