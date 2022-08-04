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
        @change="onItemSelected"
        @clear="onClear"
      />
    </ValidationProvider>
    <JDSTextField
      v-model="currentStock"
      label="Stok Terkini"
      placeholder="Stok terkini"
      :suffix="unitDisplay"
      :clearable="false"
      disabled
      hide-details
    />
    <span class="realization__stock" @click="$emit('showStock')">
      Detail Info Stok
    </span>
    <ValidationProvider
      v-slot="{ errors }"
      :rules="quantityValidation"
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
        class="mt-6"
        @change="$emit('update:quantity', quantity)"
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
    ...mapState('vaccine', [
      'vaccineItemStock'
    ]),
    unitDisplay() {
      return this.name ? this.name.UoM : this.unit ?? 'Vial'
    },
    currentStock() {
      return this.vaccineItemStock.current_stock || '-'
    },
    quantityValidation() {
      return `required|numeric|maxValue:${this.currentStock}`
    }
  },
  watch: {
    /**
     * autofill form based on recommendation data
     */
    recommendation(val) {
      if (this.data.product_status) {
        this.date = this.$moment(this.data.finalized_date).format('YYYY-MM-DD')
        this.quantity = this.data.quantity
      } else {
        this.date = this.$moment(val.recommendation_date).format('YYYY-MM-DD')
        this.quantity = val.quantity
      }
      this.$emit('update:date', this.date)
      this.$emit('update:quantity', this.quantity)
    },
    /**
     * autofill product name dropdown based on recommendation data
     */
    itemList(val) {
      this.name = val.find((item) => {
        return this.data.product_status
          ? item.material_id === this.data.product_id
          : item.material_id === this.recommendation.product_id
      })
      this.$emit('update:name', this.name)
    }
  },
  methods: {
    async validate() {
      const isValid = await this.$refs.form.validate()
      return isValid
    },
    onItemSelected() {
      const params = {
        id: this.name.material_id,
        vaccine_request_id: this.data.vaccine_request_id
      }
      this.$store.dispatch('vaccine/getStockItem', params)
      this.$emit('update:name', this.name)
    },
    onClear() {
      this.$store.dispatch('vaccine/clearStockItem')
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

  &__stock {
    font-size: 13px;
    text-decoration: underline;
    color: #1E88E5;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
