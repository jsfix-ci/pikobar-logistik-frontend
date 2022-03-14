<template>
  <v-text-field
    :value="value"
    solo-inverted
    flat
    hide-details
    outlined
    :placeholder="$t('label.search_placeholder')"
    @input="$emit('input', $event)"
    @change="$emit('change')"
  >
    <template v-slot:prepend-inner>
      <v-icon color="#BDBDBD">
        mdi-magnify
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.v-input::v-deep {
  border-color: #E0E0E0 !important;
  border-radius: 8px;

  .v-input__slot {
    background: #FAFAFA !important;
    min-height: 38px !important;
  }

  .v-input__control {
    max-height: 38px !important;
  }
}
.v-text-field--outlined::v-deep fieldset {
  border-color: #E0E0E0;
}
</style>
