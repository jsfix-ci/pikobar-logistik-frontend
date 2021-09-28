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
    <v-simple-table class="mt-8">
      <template v-slot:default>
        <thead class="detail-card__header">
          <tr>
            <th
              v-for="header in tableHeader"
              :key="header.id"
              class="detail-card__header__cell"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in tableData.allocation_distribution_requests" :key="data.id">
            <td>{{ data.agency_name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import tableHeader from './detailTableHeader'
export default {
  props: {
    listQuery: {
      type: Object,
      default: () => ({})
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableHeader
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

  &__header {
    background-color: #069550 !important;

    &__cell {
      color: white !important;
      font-size: 14px !important;
    }
  }
}
</style>
