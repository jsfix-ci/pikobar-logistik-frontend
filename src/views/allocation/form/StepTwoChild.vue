<template>
  <div class="d-flex flex-row ml-10 align-center">
    <DropdownInput
      v-for="field in fieldList"
      :key="field.label"
      v-model="material[field.model]"
      :label="field.label"
      :options="optionsList[field.options]"
      :placeholder="field.placeholder"
      class="mr-3"
    />
    <div class="d-flex flex-column">
      <span class="purpose-label">
        {{ $t('label.purpose') }}
      </span>
      <v-text-field
        v-model="material['additional_information']"
        :label="$t('label.input_purpose')"
        class="align-self-center"
        outlined
        solo-inverted
      />
    </div>
    <v-icon
      v-if="arrayLength-1 === index"
      color="green"
      class="ml-3"
      @click="$emit('addChild')"
    >
      mdi-plus-circle
    </v-icon>
    <v-icon
      v-if="arrayLength > 1"
      color="red"
      class="mx-3"
      @click="$emit('delete', index)"
    >
      mdi-delete-circle
    </v-icon>
  </div>
</template>

<script>
import DropdownInput from '../../../components/DropdownInput'
export default {
  components: {
    DropdownInput
  },
  props: {
    value: {
      type: String,
      default: null
    },
    fieldList: {
      type: Array,
      default: () => []
    },
    optionsList: {
      type: Object,
      default: () => ({})
    },
    material: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: null
    },
    arrayLength: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.purpose-label {
  font-weight: 500;
}
</style>
