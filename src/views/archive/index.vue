<template>
  <div class="archive">
    <h1 class="archive__title">{{ $t('label.archive') }}</h1>

    <!-- search section -->
    <SearchInput v-model="listQuery.search" placeholder="Masukkan nama instansi atau id permohonan" class="mb-6" @change="handleSearch" />

    <!-- filter section -->
    <div class="d-flex flex-wrap mb-8">
      <date-picker-dashboard
        :label="$t('label.requested_date')"
        :placeholder="$t('label.input_date')"
        :initial-start-date="listQuery.start_date"
        :initial-end-date="listQuery.end_date"
        jds-style
        @selected="changeDate"
      />
      <JDSSelect
        v-model="listQuery.is_letter_file_final"
        :label="$t('label.mail_status')"
        :items="mailOptions"
        :placeholder="$t('label.select_mail_status')"
        hide-details
        class="mx-6"
        @change="handleSearch"
      />
      <JDSSelect
        v-model="listQuery.verification_status"
        :label="$t('label.verification_status')"
        :items="verificationOptions"
        :placeholder="$t('label.select_verification_status')"
        hide-details
        class="mr-6"
        @change="handleSearch"
      />
      <!-- TEMPORARILY HIDDEN
      <JDSSelect
        v-model="listQuery.warrant"
        :label="$t('label.warrant')"
        :items="warrantOptions"
        :placeholder="$t('label.select_warrant_status')"
        hide-details
        class="mr-6"
      /> -->
      <JDSSelect
        v-model="listQuery.status"
        :label="$t('label.follow_up_status')"
        :items="stageOptions"
        :placeholder="$t('label.select_follow_up_status')"
        hide-details
        @change="handleSearch"
      />
    </div>

    <!-- table section -->
    <div class="archive__table">
      <h2 class="archive__subtitle">{{ $t('label.archive_list') }}</h2>
      <JDSTable
        :headers="headers"
        :items="listRequest"
        @onSort="onSort"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ getTableRowNumbering(index, listQuery.page, listQuery.limit) }}</td>
            <td>{{ item.delivery_plan_date ? $moment(item.delivery_plan_date).format('D MMMM YYYY') : '-' }}</td>
            <td>{{ item.id || '-' }}</td>
            <td>{{ item.agency_name || '-' }}</td>
            <td>{{ item.is_letter_file_final ? 'Final' : 'Draft' }}</td>
            <td>{{ statusDisplay(item) }}</td>
            <td>{{ stageDisplay(item) }}</td>
            <!-- TEMPORARILY HIDDEN
            <td>
              <JDSButton inverted height="25px" @click="onDetail(item.id)">
                {{ $t('label.detail') }}
              </JDSButton>
            </td> -->
          </tr>
        </template>
      </JDSTable>
      <pagination
        :total="totalPage"
        :total-data="totalData"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="fetchData"
        :page-sizes="[5, 10]"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTableRowNumbering, filterQuery } from '@/helpers/tableDisplay'
import { mailOptions, warrantOptions, stageOptions, verificationOptions } from './dropdown'
import JDSTable from '@/components/Base/JDSTable'
import JDSSelect from '@/components/Base/JDSSelect'
// import JDSButton from '@/components/Base/JDSButton'
import SearchInput from '@/components/Base/SearchInput'
export default {
  components: {
    JDSTable,
    // JDSButton,
    JDSSelect,
    SearchInput
  },
  data() {
    return {
      mailOptions,
      warrantOptions,
      stageOptions,
      verificationOptions,
      headers: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.delivery_plan_date'), value: 'delivery_plan_date' },
        { text: this.$t('label.request_id'), value: 'id' },
        { text: this.$t('label.agency_name'), value: 'agency_name' },
        { text: this.$t('label.mail_status'), value: 'is_letter_file_final' },
        { text: this.$t('label.verification_status'), value: 'verification_status' },
        // TEMPORARILY HIDDEN
        // { text: this.$t('label.warrant'), sortable: false },
        { text: this.$t('label.follow_up_status'), value: 'status_rank' }
        // TEMPORARILY HIDDEN
        // { text: this.$t('label.action'), sortable: false }
      ],
      listQuery: {
        page_type: 'archive',
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 5),
        sort: this.$route.query?.sort || '',
        search: this.$route.query?.search || '',
        date: '',
        start_date: this.$route.query?.start_date || null,
        end_date: this.$route.query?.end_date || null,
        is_letter_file_final: this.$route.query?.is_letter_file_final ? parseInt(this.$route.query?.is_letter_file_final) : null,
        verification_status: this.$route.query?.verification_status || '',
        warrant: '',
        status: this.$route.query?.status || '',
        sort_by: '',
        order_by: 'asc'
      }
    }
  },
  computed: {
    ...mapState('vaccine', {
      listRequest: 'dataListVaccineRequest',
      totalPage: 'totalListVaccineRequest',
      totalData: 'totalDataVaccineRequest'
    })
  },
  mounted() {
    this.$store.dispatch('vaccine/getListVaccineRequest', this.listQuery)
  },
  methods: {
    getTableRowNumbering,
    filterQuery,
    async fetchData(isSorting = false) {
      await this.$store.dispatch('vaccine/getListVaccineRequest', this.listQuery)
      if (!isSorting) {
        this.$router.replace({
          query: {
            ...this.filterQuery(this.listQuery)
          }
        })
      }
    },
    async handleSearch(isSorting = false) {
      this.listQuery.page = 1
      await this.fetchData(isSorting)
    },
    onDetail(id) {
      // @todo: create onDetail function
      // this.$router.push(`/archive/detail/${id}`)
    },
    statusDisplay(item) {
      if ((item.note || item.vaccine_request_status_notes.length > 0) && item.status !== 'rejected') {
        return this.$t('label.accepted_with_note')
      } else if (item.status === 'not_verified') {
        return this.$t('status.not_verified')
      } else {
        return 'Terverifikasi'
      }
    },
    stageDisplay(item) {
      switch (item.status) {
        case 'not_verified':
          return this.$t('label.dashboard_unverified')
        case 'rejected':
          return this.$t('label.dashboard_rejected')
        case 'verified':
          return this.$t('label.recommend')
        case 'approved':
          return this.$t('label.realization')
        case 'finalized':
          return this.$t('label.release_order')
        case 'integrated':
          return 'Menunggu konfirmasi'
        case 'booked':
          return 'Barang sedang di Packing'
        case 'do':
          return 'Siap Berangkat'
        case 'intransit':
          return 'Sedang dalam perjalanan'
        case 'delivered':
          return 'Barang sudah sampai tujuan'
        default:
          return '-'
      }
    },
    changeDate(value) {
      this.listQuery.start_date = value.startDate
      this.listQuery.end_date = value.endDate
      this.handleSearch()
    },
    onSort(val) {
      this.listQuery.sort_by === val.sortBy[0] ? this.switchOrderBy() : this.listQuery.order_by = 'asc'
      if (val.sortBy.length > 0) {
        this.listQuery.sort_by = val.sortBy[0]
      } else {
        this.listQuery.sort_by = ''
        this.listQuery.order_by = 'asc'
      }
      this.handleSearch(true)
    },
    switchOrderBy() {
      this.listQuery.order_by = this.listQuery.order_by === 'asc' ? 'desc' : 'asc'
    }
  }
}
</script>
<style lang="scss" scoped>
.archive {
  background: white;
  height: 100%;
  padding: 16px 24px;
  border-radius: 8px;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #424242;
    margin-bottom: 32px;
  }

  &__table {
    padding: 24px;
    border-style: solid;
    border-color: #E0E0E0;
    border-width: 1px;
    border-radius: 8px;
  }

  &__subtitle {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #757575;
    margin-bottom: 24px;
  }
}
.urgency {
  padding: 2px;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  color: #424242;
  border-color: #424242;

  &--red {
    color: #EF5350;
    border-color: #EF5350;
  }
}
</style>
