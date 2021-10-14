<template>
  <v-card>
    <div class="d-flex flex-row pa-4">
      <v-text-field
        v-model="listQuery.search"
        solo-inverted
        hide-details
        :placeholder="$t('label.search_data')"
        prepend-inner-icon="search"
        class="mr-4"
        @change="$emit('search')"
      />
      <v-btn
        large
        depressed
        class="detail-card__download"
        color="primary"
      >
        <v-icon
          color="white"
          class="mr-3"
        >
          mdi-download
        </v-icon>
        <span>{{ $t('label.download_data') }}</span>
      </v-btn>
    </div>
    <AllocationTableDetail
      :table-header="tableHeader"
      :table-data="tableData"
    />
  </v-card>
</template>

<script>
import AllocationTableDetail from '../AllocationTableDetail.vue'
export default {
  components: {
    AllocationTableDetail
  },
  props: {
    listQuery: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Object,
      default: () => ({})
    },
    tableHeader: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-card {
  &__download {
    text-transform: none;
    color: none;
  }
}
</style>
