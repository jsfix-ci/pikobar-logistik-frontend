<template>
  <div class="d-flex flex-row align-center">
    <!-- @todo: replace options props with real data and confirm model name with BE -->
    <DropdownInput
      v-model="instance.agency_type"
      :label="$t('label.instance_type')"
      :options="['satu', 'dua']"
      :placeholder="'Pilih Jenis Instansi'"
      class="mr-3"
    />
    <!-- @todo: replace options props with real data -->
    <DropdownInput
      v-model="instance.agency_id"
      :label="$t('label.instance_name')"
      :options="['satu', 'dua']"
      :placeholder="'Pilih Instansi'"
      class="mr-3"
    />
    <v-btn
      large
      depressed
      class="detail-btn mr-5"
      @click="instance.isExtended = !instance.isExtended"
    >
      {{ instance.isExtended ? $t('label.close') : $t('label.show_items') }}
    </v-btn>
    <v-icon
      v-if="arrayLength-1 === index"
      color="green"
      class="mr-3"
      @click="$emit('addParent')"
    >
      mdi-plus-circle
    </v-icon>
    <v-icon
      v-if="arrayLength > 1"
      color="red"
      class="mr-3"
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
    instance: {
      type: Object,
      default: () => ({})
    },
    arrayLength: {
      type: Number,
      default: null
    },
    index: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-btn {
  background-color: white !important;
  color: #27AE60;
  border: 1px solid #27AE60;
  border-radius: 8px;
  font-size: 14px;
  text-transform: none !important;
}
</style>
