<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{ $t('label.goods_receipt_report_list') }}</span>
      </v-card-title>
      <hr class="mt-5 thin">
      <v-card-title>
        <span class="font-weight-bold">{{ $t('label.goods_receipt_report_table') }}</span>
      </v-card-title>
      <hr class="thin">
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.applicant_code').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.contact_person').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.goods_type').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.total').toUpperCase() + ' ' + $t('label.goods').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.request_date').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.date').toUpperCase() + ' ' + $t('label.received').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.received_by').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.status').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in listAcceptanceReport" :key="data.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>#{{ data.id }}</td>
                  <td>{{ data.applicant.applicant_name }}</td>
                  <td class="text-center">{{ data.type_item_count + ' ' + $t('label.type') }}</td>
                  <td class="text-center">{{ currency(data.total_qty) }}</td>
                  <td>{{ $moment(data.created_at).format('D MMMM YYYY') }}</td>
                  <td v-if="data.acceptance_report">{{ $moment(data.acceptance_report.date).format('D MMMM YYYY') }}</td>
                  <td v-else>-</td>
                  <td v-if="data.acceptance_report">{{ data.acceptance_report.fullname }}</td>
                  <td v-else>-</td>
                  <td v-if="data.acceptance_report" class="green--text">Sudah Lapor</td>
                  <td v-else class="orange--text">Belum Lapor</td>
                  <td><v-btn text small color="info" @click="toDetail(data)">{{ $t('label.detail') }}</v-btn></td>
                </tr>
                <tr v-if="listAcceptanceReport.length === 0">
                  <td colspan="10" class="text-center">{{ $t('label.no_data') }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalListAcceptanceReport"
      :total-data="totalDataAcceptanceReport"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FileSaver from 'file-saver'
import EventBus from '@/utils/eventBus'
import FormatingNumber from '../../../helpers/formattingNumber'

export default {
  name: 'GoodsReceiptReportList',
  data() {
    return {
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        sort: '',
        city_code: '',
        verification_status: '',
        agency_name: '',
        start_date: null,
        end_date: null,
        is_reference: null,
        completeness: null,
        is_urgency: null,
        finalized_by: null
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
      applicantOrigin: [
        {
          text: this.$t('label.dinkes_province'),
          value: 'dinkes_provinsi'
        },
        {
          text: this.$t('label.pikobar'),
          value: 'pikobar'
        }
      ],
      referenceFaskes: [
        {
          text: this.$t('label.is_reference'),
          value: 1
        },
        {
          text: this.$t('label.is_not_reference'),
          value: 0
        }
      ],
      completeStatus: [
        {
          text: this.$t('label.not_complete'),
          value: 0
        },
        {
          text: this.$t('label.completed'),
          value: 1
        }
      ],
      urgencyStatus: [
        {
          text: this.$t('label.emergency'),
          value: 1
        },
        {
          text: this.$t('label.not_urgency'),
          value: 0
        }
      ],
      finalizedStatus: [
        {
          text: this.$t('label.not_done_yet'),
          value: 0
        },
        {
          text: this.$t('label.done'),
          value: 1
        }
      ],
      date: null,
      showFilter: false,
      isVerified: false,
      isApproved: false,
      showcompletenessDetail: false,
      showreferenceDetail: false
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listAcceptanceReport',
      'totalListAcceptanceReport',
      'totalDataAcceptanceReport'
    ]),
    ...mapGetters('faskesType', [
      'faskesTypeList'
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
    } else if (this.$route.name === 'approved') {
      this.listQuery.verification_status = 'verified'
      this.listQuery.approval_status = 'approved'
      this.isApproved = true
    }
    await this.$store.dispatch('faskesType/getListFaskesType')
    this.getLogisticRequestList()
    EventBus.$on('hideCompletenessDetail', (value) => {
      this.showcompletenessDetail = false
    })
    EventBus.$on('hideReferenceDetail', (value) => {
      this.showreferenceDetail = false
    })
  },
  methods: {
    async changeDate(value) {
      this.listQuery.start_date = value.startDate
      this.listQuery.end_date = value.endDate
      await this.getLogisticRequestList()
    },
    async getLogisticRequestList() {
      await this.$store.dispatch('logistics/getListGoodsReceiptReport', this.listQuery)
      this.listAcceptanceReport.forEach(element => {
        if (element.master_faskes) {
          element.is_reference = element.master_faskes.is_reference
        }
      })
    },
    async handleSearch() {
      this.listQuery.page = 1
      await this.getLogisticRequestList()
    },
    async onNext() {
      await this.getLogisticRequestList()
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    onSelectDistrictCity(value) {
      this.listQuery.city_code = value ? value.kemendagri_kabupaten_kode : ''
      this.handleSearch()
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
    currency(value) {
      const formattingNumber = new FormatingNumber()
      return formattingNumber.formatCurrency(value)
    }
  }
}
</script>
