<template>
  <div class="recommendation d-flex flex-column">
    <span class="recommendation__title mb-6">{{ $t('label.recommend') }}</span>
    <ValidationObserver v-if="stage === 'recommendation'" ref="form">
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        :name="$t('label.date')"
      >
        <JDSDatePicker
          v-model="date"
          :label="$t('label.date')"
          :placeholder="$t('label.input_date')"
          :error-messages="errors"
          :hide-details="errors.length === 0"
          @clear="date = null"
          @change="$emit('update:date', date)"
        />
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        :name="$t('label.apd_name_spec')"
      >
        <JDSSelect
          v-model="name"
          :label="$t('label.apd_name_spec')"
          :items="itemList"
          item-text="material_name"
          return-object
          :placeholder="$t('label.apd_name_spec_placeholder')"
          :error-messages="errors"
          :hide-details="errors.length === 0"
          class="mb-3"
          @change="$emit('update:name', name)"
        />
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        rules="required|numeric"
        name="Jumlah Barang"
      >
        <JDSTextField
          v-model="quantity"
          label="Jumlah Barang"
          placeholder="Tulis jumlah barang"
          :suffix="unitDisplay"
          :clearable="false"
          :error-messages="errors"
          :hide-details="errors.length === 0"
          class="mb-3"
          @change="$emit('update:quantity', quantity)"
        />
      </ValidationProvider>
      <JDSTextField
        v-model="note"
        label="Catatan"
        placeholder="Tulis catatan"
        hide-details
        @change="$emit('update:note', note)"
      />
    </ValidationObserver>
    <div v-else>
      <DisabledField label="Nama Barang" :value="data.product_name || '-'" />
      <v-row class="mt-3">
        <v-col cols="12" sm="6">
          <DisabledField label="Jumlah" :value="`${data.quantity || '-'} ${data.unit || '-'}`" />
        </v-col>
        <v-col cols="12" sm="6">
          <DisabledField label="Tanggal" :value="$moment(data.updated_at).format('D MMMM YYYY') || '-'" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import JDSSelect from '@/components/Base/JDSSelect'
import JDSTextField from '@/components/Base/JDSTextField'
import JDSDatePicker from '@/components/Base/JDSDatePicker'
import DisabledField from '@/components/Base/DisabledField'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    JDSSelect,
    JDSTextField,
    JDSDatePicker,
    DisabledField
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    stage: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default: () => []
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      quantity: '',
      note: '',
      date: ''
    }
  },
  computed: {
    unitDisplay() {
      return this.name ? this.name.UoM : this.unit ?? 'Vial'
    }
  },
  methods: {
    async validate() {
      const isValid = await this.$refs.form.validate()
      return isValid
    }
  }
}
</script>

<style lang="scss" scoped>
.recommendation {
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
