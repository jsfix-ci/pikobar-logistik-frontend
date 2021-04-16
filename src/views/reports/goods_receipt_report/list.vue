<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{ $t('label.goods_receipt_report_list') }}</span>
      </v-card-title>
      <hr class="mt-5 thin">
      <v-card-title>
        <span class="font-weight-bold">{{ $t('label.goods_receipt_report_list') }}</span>
      </v-card-title>
      <hr class="thin">
      <v-card-text>
        <v-row class="margin-top-bot-min-20-list-pengajuan-logistik justify-space-between">
          <v-col cols="12" sm="4" md="4">
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
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-btn
              class="primary"
              large
              max-width="100px"
              @click="showFilter = !showFilter"
            >
              {{ $t('label.filter') }}
              <v-icon v-if="!showFilter" right>mdi-chevron-right</v-icon>
              <v-icon v-else right>mdi-chevron-down</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="showFilter" class="mx-0">
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
            <v-label class="title">{{ $t('label.date') + ' ' + $t('label.received') }}</v-label>
            <date-picker-dashboard
              :date="listQuery.start_date"
              @selected="changeDate"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <hr class="thin">
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-uppercase">{{ $t('label.number') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.applicant_code') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.contact_person') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.goods_type') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.total') + ' ' + $t('label.goods') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.request_date') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.date') + ' ' + $t('label.received') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.received_by') }}</th>
                  <th class="text-left text-uppercase">{{ $t('label.status') }}</th>
                  <th class="text-center text-uppercase">{{ $t('label.action') }}</th>
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
      statusOption: [
        { value: 1, label: 'Sudah Lapor' },
        { value: 0, label: 'Belum Lapor' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        search: null,
        status: null
      },
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
    await this.$store.dispatch('faskesType/getListFaskesType')
    this.getAcceptanceReportList()
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
      await this.getAcceptanceReportList()
    },
    async getAcceptanceReportList() {
      await this.$store.dispatch('logistics/getListGoodsReceiptReport', this.listQuery)
      this.listAcceptanceReport.forEach(element => {
        if (element.master_faskes) {
          element.is_reference = element.master_faskes.is_reference
        }
      })
    },
    async handleSearch() {
      this.listQuery.page = 1
      await this.getAcceptanceReportList()
    },
    async onNext() {
      await this.getAcceptanceReportList()
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    onSelectDistrictCity(value) {
      this.listQuery.city_code = value ? value.kemendagri_kabupaten_kode : ''
      this.handleSearch()
    },
    toDetail(data) {
      this.$router.push(`/reports/goods_receipt_report/${data.id}`)
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
