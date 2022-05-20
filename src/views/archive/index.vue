<template>
  <div class="archive">
    <h1 class="archive__title">{{ $t('label.archive') }}</h1>

    <!-- search section -->
    <SearchInput v-model="listQuery.search" placeholder="Masukkan nama instansi" class="mb-10" @change="handleSearch" />

    <!-- table section -->
    <div class="archive__table">
      <h2 class="archive__subtitle">{{ $t('label.archive_list') }}</h2>
      <JDSTable
        :headers="headers"
        :items="listRequest"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ getTableRowNumbering(index, listQuery.page, listQuery.limit) }}</td>
            <td>{{ item.delivery_plan_date ? $moment(item.delivery_plan_date).format('D MMMM YYYY') : '-' }}</td>
            <td>{{ item.id || '-' }}</td>
            <td>{{ item.agency_name || '-' }}</td>
            <td>{{ item.is_letter_file_final ? 'Final' : 'Draft' }}</td>
            <td>{{ statusDisplay(item) }}</td>
            <td>{{ item.letter_number || '-' }}</td>
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
import JDSTable from '@/components/Base/JDSTable'
// import JDSButton from '@/components/Base/JDSButton'
import SearchInput from '@/components/Base/SearchInput'
export default {
  components: {
    JDSTable,
    // JDSButton,
    SearchInput
  },
  data() {
    return {
      headers: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.delivery_plan_date'), sortable: false },
        { text: this.$t('label.request_id'), sortable: false },
        { text: this.$t('label.agency_name'), sortable: false },
        { text: this.$t('label.mail_status'), sortable: false },
        { text: this.$t('label.verification_status'), sortable: false },
        { text: this.$t('label.warrant'), sortable: false },
        { text: this.$t('label.follow_up_status'), sortable: false }
        // TEMPORARILY HIDDEN
        // { text: this.$t('label.action'), sortable: false }
      ],
      listQuery: {
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 5),
        sort: this.$route.query?.sort || '',
        search: this.$route.query?.search || ''
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
    async fetchData() {
      await this.$store.dispatch('vaccine/getListVaccineRequest', this.listQuery)
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    handleSearch() {
      this.listQuery.page = 1
      this.fetchData()
    },
    onDetail(id) {
      // @todo: create onDetail function
      // this.$router.push(`/archive/detail/${id}`)
    },
    statusDisplay(item) {
      return item.note || item.vaccine_request_status_notes.length > 0
        ? this.$t('label.accepted_with_note')
        : this.$t(`label.${item.status}`)
    },
    stageDisplay(item) {
      switch (item.status) {
        case 'not_verified':
          return this.$t('label.dashboard_unverified')
        case 'verified':
          return this.$t('label.recommend')
        case 'approved':
          return this.$t('label.realization')
        case 'finalized':
          return this.$t('label.release_order')
        default:
          return '-'
      }
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
