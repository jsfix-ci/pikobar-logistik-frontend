<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{ $t('label.allocation_list') }}</span>
      </v-card-title>
      <statistic-card
        :title="$t('label.allocation_statistic')"
        :value="currency(totalAllocation)"
        :unit="$t('label.allocation')"
        :main-color="'#2f9e5f'"
        :background-color="'#f2f7f4'"
        class="d-flex pa-4"
        :class="{
          'mr-5': $vuetify.breakpoint.mdAndUp,
          'mb-5': $vuetify.breakpoint.smAndDown
        }"
      />
      <hr class="mt-5 thin">
      <v-card-title class="d-flex justify-space-between">
        <span class="font-weight-bold">{{ $t('label.allocation_table') }}</span>
        <v-btn
          large
          depressed
          class="add-allocation"
          color="primary"
          @click="createAllocation"
        >
          <v-icon
            color="white"
            class="mr-3"
          >
            mdi-plus
          </v-icon>
          <span>{{ $t('label.create_allocation') }}</span>
        </v-btn>
      </v-card-title>
      <hr class="thin">
      <AllocationFilter
        :show="showFilter"
        :list-query="listQuery"
        :handle-search="handleSearch"
        :change-date="changeDate"
      />
      <hr class="thin">
      <AllocationTable
        :list-data="listAllocation"
        :list-query="listQuery"
      />
    </v-card>
    <pagination
      :total="totalListAllocationPage || 0"
      :total-data="totalListAllocation"
      :page="listQuery.page"
      :limit.sync="listQuery.limit"
      @update:page="onListQueryPageUpdated"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import FormatingNumber from '../../../helpers/formattingNumber'
import AllocationTable from './AllocationTable.vue'
import AllocationFilter from './AllocationFilter.vue'
export default {
  name: 'AllocationList',
  components: {
    AllocationTable,
    AllocationFilter
  },
  data() {
    const status = parseInt(this.$route.query?.status)
    return {
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 10),
        search: this.$route.query?.search || null,
        status: Number.isNaN(status) ? null : status,
        start_date: this.$route.query?.start_date || null,
        end_date: this.$route.query?.end_date || null
      },
      listQueryStatistic: {
        city_code: null
      },
      showFilter: true,
      isApproved: false
    }
  },
  computed: {
    ...mapState('allocation', [
      'listAllocation',
      'totalListAllocation',
      'totalListAllocationPage',
      'totalAllocation'
    ])
  },
  async created() {
    await this.$store.dispatch('allocation/getAllocationStatistic')
    await this.$store.dispatch('allocation/getListAllocation', this.listQuery)
  },
  methods: {
    async changeDate(value) {
      this.listQuery.start_date = value.startDate
      this.listQuery.end_date = value.endDate
      await this.handleSearch()
    },
    async handleSearch() {
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
      await this.$store.dispatch('allocation/getListAllocation', this.listQuery)
    },
    referenceDetail(data) {
      this.$refs.referenceDetailForm.setData(data.id, data)
      this.showreferenceDetail = true
    },
    currency(value) {
      const formattingNumber = new FormatingNumber()
      return formattingNumber.formatCurrency(value)
    },
    onListQueryPageUpdated(newPage) {
      this.listQuery.page = newPage
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    filterQuery(oldQuery) {
      const newQuery = { ...oldQuery }
      Object.keys(newQuery).forEach(key => {
        const shouldBeDeleted = newQuery[key] === null ||
          newQuery[key] === undefined ||
          newQuery[key] === ''
        if (shouldBeDeleted) {
          delete newQuery[key]
        }
      })
      return newQuery
    },
    createAllocation() {
      this.$router.push(`/reports/allocation/create-allocation`)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-allocation {
  text-transform: none;
  color: none;
  font-size: 14px;
}
</style>
