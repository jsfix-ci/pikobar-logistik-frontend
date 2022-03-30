<template>
  <div class="jds-radio">
    <span class="jds-radio__label">
      {{ label }}
    </span>
    <v-radio-group
      :value="value"
      :hide-details="hideDetails"
      @input="$emit('input', $event)"
      @change="$emit('change')"
    >
      <v-radio
        v-for="item in items"
        :key="item[itemText]"
        :label="item[itemText]"
        :value="item[itemValue]"
        color="#069550"
      />
    </v-radio-group>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.jds-radio {
  display: flex;
  flex-direction: column;

  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
  }
}
.v-input--selection-controls::v-deep {
  margin-top: 8px;

  .theme--light.v-label {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
  }
}
</style>
