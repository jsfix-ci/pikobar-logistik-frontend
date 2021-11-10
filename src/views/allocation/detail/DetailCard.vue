<template>
  <v-card>
    <div class="d-flex flex-row pa-4">
      <v-text-field
        v-model="listQuery.search"
        solo-inverted
        hide-details
        clearable
        :placeholder="$t('label.search_instance_name')"
        prepend-inner-icon="search"
        class="mr-4"
        @change="$emit('search', true)"
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
      :table-data="tableData.data"
      :dynamic-header="dynamicHeader"
      :list-query="listQuery"
      :total-page="tableData.last_page"
      @onNext="() => $emit('search')"
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
    },
    dynamicHeader: {
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
