<template>
  <div class="recommendation d-flex flex-column">
    <span class="recommendation__title mb-6">{{ $t('label.recommend') }}</span>
    <JDSDatePicker
      v-model="date"
      :label="$t('label.date')"
      :placeholder="$t('label.input_date')"
      hide-details
      @clear="date = null"
    />
    <JDSSelect
      v-model="name"
      :label="$t('label.apd_name_spec')"
      :items="[1,2,3]"
      :placeholder="$t('label.apd_name_spec_placeholder')"
      hide-details
      class="mb-3"
    />
    <JDSTextField
      v-model="total"
      label="Jumlah Barang"
      placeholder="Tulis jumlah barang"
      suffix="Vial"
      :clearable="false"
      hide-details
      class="mb-3"
    />
    <JDSTextField
      v-model="note"
      label="Catatan"
      placeholder="Tulis catatan"
      hide-details
    />
  </div>
</template>

<script>
import JDSSelect from '@/components/Base/JDSSelect'
import JDSTextField from '@/components/Base/JDSTextField'
import JDSDatePicker from '@/components/Base/JDSDatePicker'
export default {
  components: {
    JDSSelect,
    JDSTextField,
    JDSDatePicker
  },
  data() {
    return {
      name: '',
      total: '',
      note: '',
      date: ''
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
