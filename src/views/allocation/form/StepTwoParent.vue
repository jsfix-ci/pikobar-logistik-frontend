<template>
  <div class="d-flex flex-row align-center">
    <!-- @todo: replace options props with real data and confirm model name with BE -->
    <DropdownInput
      v-model="instance.agency_type"
      :label="$t('label.instance_type')"
      :options="listFaskesType"
      :placeholder="'Pilih Jenis Instansi'"
      item-text="name"
      class="mr-3"
      @select="onInstanceTypeSelected(instance)"
    />
    <!-- @todo: replace options props with real data -->
    <DropdownInput
      v-model="instance.agency_id"
      :label="$t('label.instance_name')"
      :options="instance.listAgency"
      :placeholder="'Pilih Instansi'"
      item-text="nama_faskes"
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
import { mapState } from 'vuex'
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
  },
  computed: {
    ...mapState('faskesType', [
      'listFaskesType'
    ])
  },
  async mounted() {
    await this.$store.dispatch('faskesType/getListFaskesType')
  },
  methods: {
    async onInstanceTypeSelected(instance) {
      if (instance.agency_id) instance.agency_id = null
      const params = {
        id_tipe_faskes: instance.agency_type,
        is_paginated: 1
      }
      const res = await this.$store.dispatch('faskes/getListFaskes', params)
      instance.listAgency = [...res.data]
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
