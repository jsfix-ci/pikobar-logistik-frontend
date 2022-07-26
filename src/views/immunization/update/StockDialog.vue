<template>
  <v-dialog
    v-model="value"
    max-width="500px"
    @click:outside="$emit('close')"
  >
    <div class="stock">
      <div class="d-flex flex-row justify-space-between align-center mb-6">
        <span class="stock__title">
          Info Stok Terkini
        </span>
        <v-icon
          right
          dark
          color="#757575"
          @click="$emit('close')"
        >
          mdi-close
        </v-icon>
      </div>
      <DisabledField
        label="Stok di Gudang"
        :value="vaccineItemStock.warehouse || '-'"
        class="mb-4"
      />
      <DisabledField
        label="Realisasi"
        :value="vaccineItemStock.approved || '-'"
        class="mb-4"
      />
      <DisabledField
        label="Perintah Pengeluaran Barang"
        :value="vaccineItemStock.finalized || '-'"
        class="mb-4"
      />
      <DisabledField
        label="Stok saat ini"
        :value="vaccineItemStock.current_stock || '-'"
        info
        class="mb-4"
      />
    </div>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import DisabledField from '@/components/Base/DisabledField'
export default {
  components: {
    DisabledField
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('vaccine', [
      'vaccineItemStock'
    ])
  }
}
</script>

<style lang="scss" scoped>
.stock {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #757575;
  }
}
</style>
