<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <span class="table-title">{{ title }}</span>
      </v-card-text>
      <hr class="thin">
      <search-filter
        :list-query.sync="listQuery"
        :district-city="districtCity"
        :disabled-district="disabledDistrict"
        @change-date="changeDate"
        @handle-search="handleSearch"
        @selected-district-city="onSelectDistrictCity"
        @export-data="exportData"
      />
      <data-table
        :items="listVaccineRequest"
        :is-approved="isApproved"
        :is-rejected="isRejected"
        :is-verified="isVerified"
        :list-query="listQuery"
        :loading="loading"
        @to-detail="toDetail"
        @reference-detail="referenceDetail"
        @completeness-detail="completenessDetail"
      />
    </v-card>
    <pagination
      :total="totalListVaccineRequest"
      :total-data="totalDataVaccineRequest"
      :page="listQuery.page"
      :limit.sync="listQuery.limit"
      @update:page="onListQueryPageUpdated"
    />
    <completenessDetail
      ref="completenessDetailForm"
      :show="showcompletenessDetail"
    />
    <referenceDetail
      ref="referenceDetailForm"
      :show="showreferenceDetail"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FileSaver from 'file-saver'
import EventBus from '@/utils/eventBus'
import completenessDetail from '@/views/pengajuanLogistik/completenessDetail'
import referenceDetail from '@/views/pengajuanLogistik/referenceDetail'
import SearchFilter from './searchFilter.vue'
import DataTable from './dataTable.vue'

export default {
  name: 'ListRequestVaccine',
  components: {
    completenessDetail,
    referenceDetail,
    SearchFilter,
    DataTable
  },
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data() {
    const faskesType = parseInt(this.$route.query?.faskes_type)
    const isReference = parseInt(this.$route.query?.is_reference)
    const completeness = parseInt(this.$route.query?.completeness)
    const isUrgency = parseInt(this.$route.query?.is_urgency)
    const finalizedBy = parseInt(this.$route.query?.finalized_by)
    return {
      listQuery: {
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 10),
        sort: this.$route.query?.sort || '',
        city_code: this.$route.query?.city_code || '',
        verification_status: this.$route.query?.verification_status || '',
        agency_name: this.$route.query?.agency_name || '',
        start_date: this.$route.query?.start_date || null,
        end_date: this.$route.query?.end_date || null,
        is_reference: Number.isNaN(isReference) ? null : isReference,
        completeness: Number.isNaN(completeness) ? null : completeness,
        is_urgency: Number.isNaN(isUrgency) ? null : isUrgency,
        finalized_by: Number.isNaN(finalizedBy) ? null : finalizedBy,
        faskes_type: Number.isNaN(faskesType) ? null : faskesType,
        source_data: this.$route.query?.source_data || null
      },
      status: [
        {
          text: this.$t('label.verified'),
          value: this.$t('label.verified_value')
        },
        {
          text: this.$t('label.not_verified'),
          value: this.$t('label.not_verified_value')
        }
      ],
      date: null,
      loading: false,
      isVerified: false,
      isApproved: false,
      isRejected: false,
      showcompletenessDetail: false,
      showreferenceDetail: false,
      disabledDistrict: false,
      districtCity: null
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listLogisticRequest',
      'totalListLogisticRequest',
      'totalDataLogisticRequest',
      'listVaccineRequest',
      'totalListVaccineRequest',
      'totalDataVaccineRequest'
    ]),
    ...mapState('user', [
      'roles',
      'district_user', // district code
      'district_name'
    ])
  },
  async created() {
    if (this.$route.name === 'verified') {
      this.isVerified = true
      this.listQuery.verification_status = 'verified'
      this.listQuery.approval_status = 'not_approved'
    } else if (this.$route.name === 'notVerified') {
      this.listQuery.verification_status = 'not_verified'
    } else if (this.$route.name === 'rejected') {
      this.listQuery.is_rejected = 1
      this.isRejected = true
    } else if (this.$route.name === 'realized' || this.$route.name === 'not_yet_realized') {
      this.listQuery.verification_status = 'verified'
      this.listQuery.approval_status = 'approved'
      this.isApproved = true
      this.listQuery.finalized_by = this.$route.name === 'realized' ? 1 : 0
    }
    await this.$store.dispatch('faskesType/getListFaskesType')
    if (this.roles[0] === 'dinkeskota') this.lockDistrictFilter()
    this.getLogisticRequestList()
    EventBus.$on('hideCompletenessDetail', (value) => {
      this.showcompletenessDetail = false
    })
    EventBus.$on('hideReferenceDetail', (value) => {
      this.showreferenceDetail = false
    })
    if (this.$route.query?.city_code && this.$route.query?.city_name) {
      this.districtCity = {
        kemendagri_kabupaten_kode: this.$route.query?.city_code,
        kemendagri_kabupaten_nama: this.$route.query?.city_name
      }
    }
  },
  methods: {
    async changeDate(value) {
      this.listQuery.start_date = value.startDate
      this.listQuery.end_date = value.endDate
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    async getLogisticRequestList() {
      this.loading = true
      await this.$store.dispatch('logistics/getListVaccineRequest', this.listQuery)
      this.listVaccineRequest.forEach(element => {
        if (element.master_faskes) {
          element.is_reference = element.master_faskes.is_reference
        }
      })
      this.loading = false
    },
    async handleSearch() {
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    onListQueryPageUpdated(newPage) {
      this.listQuery.page = newPage
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    onSelectDistrictCity(value) {
      this.listQuery.city_code = value ? value.kemendagri_kabupaten_kode : ''
      this.listQuery.page = 1
      if (!value) {
        this.$router.replace({
          query: {
            ...this.filterQuery(this.listQuery)
          }
        })
      } else {
        this.$router.replace({
          query: {
            ...this.filterQuery(this.listQuery),
            city_name: value.kemendagri_kabupaten_nama
          }
        })
      }
    },
    toDetail(data) {
      this.$router.push(`/alat-kesehatan/detail/${data.id}`)
    },
    async exportData() {
      const response = await this.$store.dispatch('logistics/logisticRequestExportData', this.listQuery)
      const fileName = `${this.$t('label.export_file_name')}-${this.$moment(Date.now()).format('YYYY-MM-DD-h:mm:ss')}.xlsx`
      await FileSaver.saveAs(response, fileName)
    },
    completenessDetail(data) {
      this.$refs.completenessDetailForm.setData(data.id, data)
      this.showcompletenessDetail = true
    },
    referenceDetail(data) {
      this.$refs.referenceDetailForm.setData(data.id, data)
      this.showreferenceDetail = true
    },
    lockDistrictFilter() {
      this.disabledDistrict = true
      this.districtCity = {
        kemendagri_kabupaten_kode: this.district_user,
        kemendagri_kabupaten_nama: this.district_name
      }
      this.listQuery.city_code = this.districtCity.kemendagri_kabupaten_kode
    },
    filterQuery(oldQuery) {
      const newQuery = { ...oldQuery }
      Object.keys(newQuery).forEach(key => {
        const shouldBeDeleted = newQuery[key] === null ||
          newQuery[key] === undefined ||
          newQuery[key] === '' ||
          key === 'approval_status' ||
          key === 'is_rejected' ||
          key === 'verification_status'
        if (shouldBeDeleted) {
          delete newQuery[key]
        }
      })
      return newQuery
    }
  }
}
</script>
