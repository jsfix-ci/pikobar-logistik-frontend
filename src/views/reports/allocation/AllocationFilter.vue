<template>
  <v-card-text>
    <div class="margin-top-bot-min-20-list-pengajuan-logistik justify-space-between d-flex flex-row">
      <div>
        <v-card
          outlined
          class="card-search"
        >
          <v-text-field
            v-model="listQuery.search"
            solo-inverted
            flat
            hide-details
            :placeholder="$t('label.search_data')"
            prepend-inner-icon="search"
            @change="handleSearch"
          />
        </v-card>
      </div>
      <div>
        <v-btn
          class="filter-button"
          large
          depressed
          max-width="100px"
          @click="showFilter = !showFilter"
        >
          <span class="filter-button__text">{{ $t('label.filter') }}</span>
          <v-icon v-if="!showFilter" right>mdi-chevron-right</v-icon>
          <v-icon v-else right>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </div>
    <v-row v-if="showFilter" class="mx-0 mt-3">
      <v-col cols="12" sm="2" class="px-0">
        <v-label class="title">{{ $t('label.status') }}</v-label>
        <v-select
          v-model="listQuery.status"
          :items="statusOption"
          solo
          item-text="label"
          item-value="value"
          :clearable="true"
          :placeholder="$t('label.select_status')"
          @change="handleSearch"
        />
      </v-col>
      <v-col cols="12" sm="3" :class="{'px-0': $vuetify.breakpoint.xsOnly}">
        <v-label class="title">{{ $t('label.request_date') }}</v-label>
        <date-picker-dashboard
          :initial-start-date="listQuery.start_date"
          :initial-end-date="listQuery.end_date"
          @selected="changeDate"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  props: {
    listQuery: {
      type: Object,
      default: () => {}
    },
    changeDate: {
      type: Function,
      default: null
    },
    handleSearch: {
      type: Function,
      default: null
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      statusOption: [
        { value: 1, label: 'Success' },
        { value: 0, label: 'Draft' }
      ],
      showFilter: this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-button {
  background-color: white !important;
  color: #27AE60;
  border: 1px solid #27AE60;
  border-radius: 8px;
  font-size: 14px;

  &__text {
    text-transform: none !important;
  }
}
</style>
