<template>
  <div class="d-flex flex-row align-center">
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      :name="$t('label.instance_type')"
    >
      <DropdownInput
        v-model="instance.agency_type"
        :label="$t('label.instance_type')"
        :options="listFaskesType"
        :placeholder="'Pilih Jenis Instansi'"
        :error-messages="errors"
        item-text="name"
        class="mr-3"
        @select="onInstanceTypeSelected(instance)"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      :name="$t('label.instance_name')"
    >
      <DropdownInput
        :key="instance.agency_type"
        v-model="instance.agency_id"
        :label="$t('label.instance_name')"
        :options="instance.listAgency"
        :placeholder="'Pilih Instansi'"
        :disabled="instance.agency_type === ''"
        :is-return-object="true"
        :error-messages="errors"
        item-text="nama_faskes"
        class="mr-3"
        @input="(item) => onAgencySelected(instance, item)"
      />
    </ValidationProvider>
    <div class="d-flex flex-column mr-3">
      <span class="input-label">
        {{ $t('label.planned_delivery_date') }}
      </span>
      <date-picker
        v-model="instance.delivery_date"
        rule="required"
        @selected="(value) => instance.delivery_date = value"
      />
    </div>
    <div class="d-flex flex-column mr-3">
      <span class="input-label">
        {{ $t('label.note') }}
      </span>
      <v-text-field
        v-model="instance.additional_information"
        :label="$t('label.input_note')"
        class="align-self-center"
        outlined
        solo-inverted
      />
    </div>
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
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
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
      const params = {
        id_tipe_faskes: instance.agency_type,
        is_paginated: 0
      }
      const res = await this.$store.dispatch('faskes/getListFaskes', params)
      if (instance.agency_id) {
        instance.agency_id = null
        instance.agency_name = null
      }
      instance.listAgency = [...res.data]
    },
    onAgencySelected(instance, item) {
      instance.agency_id = item.id
      instance.agency_name = item.nama_faskes
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
.input-label {
  font-weight: 500;
}
</style>
