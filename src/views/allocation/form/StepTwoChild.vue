<template>
  <div class="d-flex flex-row ml-10 align-center">
    <ValidationProvider
      v-for="field in fieldList"
      :key="field.label"
      v-slot="{ errors }"
      :rules="field.rules"
      :name="field.label"
    >
      <DropdownInput
        v-model="material[field.model]"
        :label="field.label"
        :options="optionsList[field.options]"
        :placeholder="field.placeholder"
        :item-text="field.itemText"
        :item-value="field.itemValue"
        :is-return-object="field.isReturnObject"
        :error-messages="errors"
        class="mr-3"
        @input="(item) => onChildSelected(material, field, item)"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      :name="$t('label.item_count')"
      class="d-flex flex-column mr-3"
    >
      <span class="input-label">
        {{ $t('label.item_count') }}
      </span>
      <v-text-field
        v-model.number="material.qty"
        :placeholder="$t('label.input_total')"
        class="align-self-center"
        outlined
        solo-inverted
        type="number"
        :rules="[numberRule]"
        :error-messages="errors"
      />
    </ValidationProvider>
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
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    DropdownInput,
    ValidationProvider
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
  },
  methods: {
    onChildSelected(material, field, item) {
      if (field.isReturnObject) { // material dropdown
        material.material_id = item.material_id
        material.material_name = item.material_name
        material.matg_id = item.matg_id
        material.UoM = item.UoM
      } else {
        material[field.model] = item
      }
    },
    numberRule(val) {
      if (typeof val !== 'number') return this.$t('errors.number_only')
      if (val <= 0) return this.$t('errors.not_minus')
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.input-label {
  font-weight: 500;
}
</style>
