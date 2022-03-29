<template>
  <div class="request d-flex flex-column">
    <span class="request__title mb-6">{{ $t('label.request') }}</span>
    <v-row class="mb-3">
      <v-col cols="12" sm="6">
        <DisabledField label="Nama Barang" value="Sinovac" />
      </v-col>
      <v-col cols="12" sm="6">
        <DisabledField label="Jumlah" value="1000" />
      </v-col>
    </v-row>
    <JDSSelect
      v-model="status"
      :label="$t('label.status')"
      :items="statusOptions"
      :placeholder="$t('label.select_status')"
      hide-details
    />
  </div>
</template>

<script>
import DisabledField from '@/components/Base/DisabledField'
import JDSSelect from '@/components/Base/JDSSelect'
export default {
  components: {
    DisabledField,
    JDSSelect
  },
  data() {
    return {
      statusOptions: ['Disetujui', 'Barang belum tersedia', 'Barang diganti', 'Barang belum bisa dipenuhi'],
      status: ''
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
