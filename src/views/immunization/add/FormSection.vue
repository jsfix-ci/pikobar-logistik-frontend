<template>
  <ValidationObserver ref="form" class="add-form d-flex flex-column">
    <span class="add-form__title mb-6">{{ title }}</span>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      :name="$t('label.date')"
    >
      <JDSDatePicker
        v-model="form.recommendation_date"
        :label="$t('label.date')"
        :placeholder="$t('label.input_date')"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        @clear="date = null"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      :name="$t('label.apd_name_spec')"
    >
      <JDSSelect
        v-model="form.recommendation_product_name"
        :label="$t('label.apd_name_spec')"
        :items="isVaccineSupport ? listVaccineSupport : listVaccine"
        item-text="material_name"
        :placeholder="$t('label.apd_name_spec_placeholder')"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        return-object
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required|numeric"
      name="Jumlah Barang"
    >
      <JDSTextField
        v-model="form.recommendation_quantity"
        label="Jumlah Barang"
        placeholder="Tulis jumlah barang"
        suffix="Vial"
        :clearable="false"
        :error-messages="errors"
        :hide-details="errors.length === 0"
      />
    </ValidationProvider>
    <ValidationProvider
      v-if="isVaccineSupport"
      v-slot="{ errors }"
      rules="required"
      name="Deskripsi"
    >
      <JDSTextField
        v-model="form.description"
        label="Deskripsi"
        placeholder="Tulis deskripsi"
        :error-messages="errors"
        :hide-details="errors.length === 0"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      name="Tujuan Penggunaan"
    >
      <JDSSelect
        v-model="form.usage"
        label="Tujuan Penggunaan"
        placeholder="Pilih Tujuan"
        :items="listPurposes"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        class="mb-3"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      :name="$t('label.status')"
    >
      <JDSRadio
        v-model="form.recommendation_status"
        :label="$t('label.status')"
        :items="radioOptions"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        class="mb-3"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="form.recommendation_status === 'other' ? 'required' : ''"
      name="Alasan"
    >
      <JDSTextField
        v-model="form.recommendation_reason"
        label="Alasan"
        placeholder="Tulis alasan instansi memohon perubahan jumlah/logistik vaksin"
        :clearable="false"
        :error-messages="errors"
        :hide-details="errors.length === 0"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      name="File"
    >
      <JDSFileInput
        v-model="form.recommendation_file"
        label="Unggah Permintaan Tambahan"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        @input="(value) => { form.file = value }"
      />
    </ValidationProvider>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import JDSSelect from '@/components/Base/JDSSelect'
import JDSTextField from '@/components/Base/JDSTextField'
import JDSDatePicker from '@/components/Base/JDSDatePicker'
import JDSRadio from '@/components/Base/JDSRadio'
import JDSFileInput from '@/components/Base/JDSFileInput'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    JDSSelect,
    JDSTextField,
    JDSDatePicker,
    JDSRadio,
    JDSFileInput
  },
  props: {
    stage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        vaccine_request_id: this.$route.params.id,
        recommendation_date: '',
        recommendation_product_id: '',
        recommendation_product_name: '',
        recommendation_quantity: '',
        recommendation_status: '',
        recommendation_reason: '',
        recommendation_file: null,
        recommendation_UoM: 'VIAL',
        usage: '',
        description: '',
        category: ''
      },
      radioOptions: [
        {
          text: 'Permohonan mendadak',
          value: 'urgent'
        },
        {
          text: 'Lainnya (jelaskan pada alasan)',
          value: 'other'
        }
      ],
      listPurposes: [
        {
          text: 'DOSIS 1',
          value: 'DOSIS 1'
        },
        {
          text: 'DOSIS 2',
          value: 'DOSIS 2'
        },
        {
          text: 'DOSIS 3',
          value: 'DOSIS 3'
        },
        {
          text: 'LAINNYA',
          value: 'LAINNYA'
        }
      ],
      listVaccine: [],
      listVaccineSupport: []
    }
  },
  computed: {
    title() {
      return this.stage === 'recommendation'
        ? this.$t('label.recommend')
        : this.$t('label.realization')
    },
    isVaccineSupport() {
      return this.$route.query.type === 'vaccineSupport'
    }
  },
  async mounted() {
    const vaccineSupportResponse = await this.$store.dispatch('vaccine/getListMaterial', { matg_id: 'PENUNJANG VAKSIN', is_paginated: 0 })
    this.listVaccineSupport = vaccineSupportResponse.data
    const vaccineResponse = await this.$store.dispatch('vaccine/getListMaterial', { matg_id: 'VAKSIN', is_paginated: 0 })
    this.listVaccine = vaccineResponse.data
  },
  methods: {
    async validate() {
      const isValid = await this.$refs.form.validate()
      this.form.recommendation_product_id = this.form.recommendation_product_name.material_id
      this.form.recommendation_product_name = this.form.recommendation_product_name.material_name
      this.form.category = this.isVaccineSupport ? 'vaccine_support' : 'vaccine'
      if (isValid) this.$emit('update:form', this.form)
      return isValid
    }
  }
}
</script>

<style lang="scss" scoped>
.add-form {
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: #E0E0E0;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #757575;
  }
}
</style>
