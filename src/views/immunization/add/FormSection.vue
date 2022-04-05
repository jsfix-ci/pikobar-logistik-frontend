<template>
  <ValidationObserver ref="form" class="add-form d-flex flex-column">
    <span class="add-form__title mb-6">{{ title }}</span>
    <ValidationProvider
      v-slot="{ errors }"
      rules="required"
      :name="$t('label.date')"
    >
      <JDSDatePicker
        v-model="form.date"
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
        v-model="form.name"
        :label="$t('label.apd_name_spec')"
        :items="isVaccineSupport ? listVaccineSupport : listVaccine"
        item-text="name"
        item-value="id"
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
        v-model="form.total"
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
        :items="form.name.purposes"
        item-text="name"
        item-value="id"
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
        v-model="form.status"
        :label="$t('label.status')"
        :items="radioOptions"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        class="mb-3"
      />
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="form.status === 'Lainnya (jelaskan pada alasan)' ? 'required' : ''"
      name="Alasan"
    >
      <JDSTextField
        v-model="form.reason"
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
        v-model="form.file"
        label="Unggah Permintaan Tambahan"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        @input="(value) => { form.file = value }"
      />
    </ValidationProvider>
  </ValidationObserver>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState('logistics', [
      'listVaccine',
      'listVaccineSupport'
    ]),
    title() {
      return this.stage === 'recommendation'
        ? this.$t('label.recommend')
        : this.$t('label.realization')
    },
    isVaccineSupport() {
      return this.$route.query.type === 'vaccineSupport'
    }
  },
  mounted() {
    const category = this.isVaccineSupport ? 'vaccine_support' : 'vaccine'
    this.$store.dispatch('logistics/getListVaccineAndSupport', { category })
  },
  methods: {
    async validate() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return
      }
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
