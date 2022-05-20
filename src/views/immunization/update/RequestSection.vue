<template>
  <div class="request d-flex flex-column">
    <span class="request__title mb-6">{{ $t('label.request') }}</span>
    <v-row class="mb-3">
      <v-col cols="12" sm="6">
        <DisabledField label="Nama Barang" :value="data.product_name || '-'" />
      </v-col>
      <v-col cols="12" sm="6">
        <DisabledField label="Jumlah" :value="`${data.quantity || '-'} ${data.unit || '-'}`" />
      </v-col>
    </v-row>
    <ValidationObserver v-if="stage === 'recommendation'" ref="form">
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        :name="$t('label.status')"
      >
        <JDSSelect
          v-model="status"
          :label="$t('label.status')"
          :items="statusOptions"
          :placeholder="$t('label.select_status')"
          :error-messages="errors"
          :hide-details="errors.length === 0"
          @change="$emit('update:statusChange', status)"
        />
      </ValidationProvider>
    </ValidationObserver>
    <DisabledField v-else label="Status" :value="data.product_status || '-'" />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import DisabledField from '@/components/Base/DisabledField'
import JDSSelect from '@/components/Base/JDSSelect'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    DisabledField,
    JDSSelect
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    stage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      statusOptions: [
        {
          text: 'Disetujui',
          value: 'approved'
        },
        {
          text: 'Barang Diganti',
          value: 'replaced'
        }
        // TEMPORARILY HIDDEN
        // {
        //   text: 'Barang belum tersedia',
        //   value: 'not_available'
        // },
        // {
        //   text: 'Barang belum bisa dipenuhi',
        //   value: 'not_yet_fulfilled'
        // }
      ],
      status: ''
    }
  },
  watch: {
    /**
     * autofill status dropdown when product_status !== null
     */
    data(val) {
      if (val.product_status) {
        this.status = val.product_status
        this.$emit('update:statusChange', this.status)
      }
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
.request {
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
