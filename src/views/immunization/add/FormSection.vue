<template>
  <div class="add-form d-flex flex-column">
    <span class="add-form__title mb-6">{{ title }}</span>
    <JDSDatePicker
      v-model="form.date"
      :label="$t('label.date')"
      :placeholder="$t('label.input_date')"
      hide-details
      @clear="date = null"
    />
    <JDSSelect
      v-model="form.name"
      :label="$t('label.apd_name_spec')"
      :items="[1,2,3]"
      :placeholder="$t('label.apd_name_spec_placeholder')"
      hide-details
    />
    <JDSTextField
      v-model="form.total"
      label="Jumlah Barang"
      placeholder="Tulis jumlah barang"
      suffix="Vial"
      :clearable="false"
      hide-details
    />
    <JDSTextField
      v-if="isVaccineSupport"
      v-model="form.description"
      label="Deskripsi"
      placeholder="Tulis deskripsi"
      hide-details
    />
    <JDSSelect
      v-model="form.usage"
      label="Tujuan Penggunaan"
      :items="[1,2,3]"
      placeholder="Pilih Tujuan"
      hide-details
      class="mb-3"
    />
    <JDSRadio
      v-model="form.status"
      :label="$t('label.status')"
      :items="radioOptions"
      hide-details
      class="mb-3"
    />
    <JDSTextField
      v-model="form.reason"
      label="Alasan"
      placeholder="Tulis alasan instansi memohon perubahan jumlah/logistik vaksin"
      :clearable="false"
      hide-details
    />
    <JDSFileInput
      label="Unggah Permintaan Tambahan"
      @input="(value) => { form.file = value }"
    />
  </div>
</template>

<script>
import JDSSelect from '@/components/Base/JDSSelect'
import JDSTextField from '@/components/Base/JDSTextField'
import JDSDatePicker from '@/components/Base/JDSDatePicker'
import JDSRadio from '@/components/Base/JDSRadio'
import JDSFileInput from '@/components/Base/JDSFileInput'
export default {
  components: {
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
        date: '',
        name: '',
        total: '',
        usage: '',
        note: '',
        description: '',
        status: '',
        reason: '',
        file: null
      },
      radioOptions: [ // @todo: change value to BE needs
        {
          text: 'Permohonan mendadak',
          value: 'Permohonan mendadak'
        },
        {
          text: 'Lainnya (jelaskan pada alasan)',
          value: 'Lainnya (jelaskan pada alasan)'
        }
      ]
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
