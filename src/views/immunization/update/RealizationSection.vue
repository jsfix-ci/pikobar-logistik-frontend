<template>
  <ValidationObserver ref="form" class="realization d-flex flex-column">
    <span class="realization__title mb-6">{{ $t('label.realization') }}</span>
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
      :name="$t('label.status')"
    >
      <JDSRadio
        v-model="status"
        :label="$t('label.status')"
        :items="radioOptions"
        :error-messages="errors"
        :hide-details="errors.length === 0"
        class="mb-3"
        @change="$emit('update:status', status)"
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
        @change="$emit('update:quantity', quantity)"
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
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    JDSSelect,
    JDSTextField,
    JDSDatePicker,
    JDSRadio
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    itemList: {
      type: Array,
      default: () => []
    },
    recommendation: {
      type: Object,
      default: () => ({})
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
      date: '',
      status: '',
      radioOptions: [
        {
          text: 'Disetujui',
          value: 'approved'
        },
        {
          text: 'Barang Diganti',
          value: 'replaced'
        }
      ]
    }
  },
  computed: {
    unitDisplay() {
      return this.name ? this.name.UoM : this.unit ?? 'Vial'
    }
  },
  watch: {
    recommendation(val) {
      this.date = this.$moment(val.updated_at).format('YYYY-MM-DD')
      this.quantity = val.quantity
      this.$emit('update:date', this.date)
      this.$emit('update:quantity', this.quantity)
    },
    itemList(val) {
      this.name = val.find((item) => {
        return item.material_id === this.recommendation.product_id
      })
      this.$emit('update:name', this.name)
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
.realization {
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
