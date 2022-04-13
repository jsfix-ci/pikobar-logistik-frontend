<template>
  <div class="recommendation">
    <h1 class="recommendation__title">{{ $t('label.recommend') }}</h1>

    <!-- search section -->
    <div class="d-flex flex-row mb-10">
      <SearchInput v-model="listQuery.search" @change="handleSearch" />
      <JDSButton class="ml-6" height="38px" @click="onDownload">
        {{ $t('label.download_excel') }}
        <v-icon class="ml-2">mdi-cloud-download-outline</v-icon>
      </JDSButton>
    </div>

    <!-- table section -->
    <div class="recommendation__table">
      <h2 class="recommendation__subtitle">{{ $t('label.vaccine_request_list') }}</h2>
      <JDSTable
        :headers="headers"
        :items="listRequest"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ getTableRowNumbering(index, listQuery.page, listQuery.limit) }}</td>
            <td>{{ item.verified_at ? $moment(item.verified_at).format('D MMMM YYYY') : '-' }}</td>
            <td>{{ item.created_at ? $moment(item.created_at).format('D MMMM YYYY') : '-' }}</td>
            <td>{{ item.agency_name || '-' }}</td>
            <td>
              <span
                :class="{
                  'urgency': true,
                  'urgency--red': item.is_urgency
                }"
              >
                {{ item.is_urgency ? 'Segera' : 'Biasa' }}
              </span>
            </td>
            <td>{{ item.letter_number || '-' }}</td>
            <td>{{ item.is_completed ? 'Final' : 'Draft' }}</td>
            <td>{{ statusDisplay(item) }}</td>
            <td>
              <JDSButton inverted height="25px" @click="onDetail(item.id)">
                {{ $t('label.detail') }}
              </JDSButton>
            </td>
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
import JDSButton from '@/components/Base/JDSButton'
import SearchInput from '@/components/Base/SearchInput'
export default {
  components: {
    JDSTable,
    JDSButton,
    SearchInput
  },
  data() {
    return {
      headers: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.verification_date'), sortable: false },
        { text: this.$t('label.requested_date'), sortable: false },
        { text: this.$t('label.agency_name'), sortable: false },
        { text: this.$t('label.print_mail_nature'), sortable: false },
        { text: this.$t('label.applicant_letter_number'), sortable: false },
        { text: this.$t('label.status'), sortable: false },
        { text: `${this.$t('label.status')} ${this.$t('label.verification')}`, sortable: false },
        { text: this.$t('label.action'), sortable: false }
      ],
      listQuery: {
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 5),
        sort: this.$route.query?.sort || '',
        search: this.$route.query?.search || '',
        status: 'verified'
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
    onDownload() {
      // @todo: create onDownload function
    },
    onDetail(id) {
      this.$router.push(`/recommendation/detail/${id}`)
    },
    statusDisplay(item) {
      return item.note ? this.$t('label.accepted_with_note') : this.$t(`label.${item.status}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.recommendation {
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
