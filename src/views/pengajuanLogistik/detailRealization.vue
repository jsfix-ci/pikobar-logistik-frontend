<template>
  <div class="container mb-10">
    <!-- Detail title -->
    <div class="table-title mb-8">
      {{ 'Detail Realisasi' }}
    </div>
    <!-- Detail info -->
    <DetailInfo :items="info_terbaru" />

    <div class="mt-10 d-flex flex-row flex-wrap" style="min-width: 100%;">
      <!-- Request Urgency -->
      <CardStatus
        v-for="(item, index) in status_terbaru"
        :key="item.type"
        :type="item.type"
        :title="item.title"
        :content="item.content"
        :strong="item.strong"
        :button-label="item.button_label"
        :class="{ 'ml-auto': index === 1 }"
        @change-urgency="urgencyChange(detailLogisticRequest.applicant.id, !detailLogisticRequest.is_urgency)"
        @restore-status="restoreStatus(detailLogisticRequest.applicant.agency_id)"
      />
      <!-- <CardStatus /> -->
    </div>
    <!-- Letter -->
    <!--
      Done,
      refactor
      event bus?
    -->
    <div class="mt-5">
      <CardLetter
        title="Surat Permohonan"
        :letter="detailLogisticRequest.letter"
        @update="updateLetter"
      />
    </div>

    <!-- Instance -->
    <div v-for="item in identity_terbaru" :key="item.title" class="mt-5">
      <CardIdentity
        :items="item"
        @update-agency="showAgencyIdentityDialog"
        @update-applicant="showApplicantIdentityDialog"
        @hide="hideIdentity"
        @show="showIdentity"
      />
    </div>

    <!-- Logistic request -->
    <div class="mt-5">
      <CardLogistic
        title="Daftar Kebutuhan Logistik"
        :items="logisticItems"
        :status="detailLogisticRequest.status"
        @update="updateItem"
        @hide="hide"
        @show="show"
      />
    </div>
    <!-- Footer -->
    <div>
      <ActionButton
        :stage="'realization'"
        @realize="onRealizeValidation"
        @return="onReturnValidation"
      />
    </div>
    <updateLetter ref="dialogUpdateLetterForm" :show="updateLetterForm" />
    <dialogUrgency ref="dialogUrgencyForm" :show="showUrgencyForm" />
    <dialogReturn ref="dialogReturnForm" :show="showReturnForm" />
    <agencyIdentity ref="agencyIdentityForm" :show="showAgencyIdentity" />
    <applicantIdentity ref="dialogApplicantIdentityForm" :show="showApplicantIdentity" />
    <updateKebutuhanLogistik ref="updateForm" :show="showForm" />
  </div>
</template>
<script>
import DetailInfo from '@/components/RequestLogistic/Detail/info.vue'
import CardStatus from '@/components/RequestLogistic/Detail/status.vue'
import CardLetter from '@/components/RequestLogistic/Detail/letter.vue'
import CardIdentity from '@/components/RequestLogistic/Detail/identity.vue'
import CardLogistic from '@/components/RequestLogistic/Detail/logistic.vue'
import { data } from '@/components/RequestLogistic/Detail/response.js'
import ActionButton from '@/views/immunization/detail/ActionButton'
import updateLetter from '@/views/pengajuanLogistik/updateLetter'
import dialogUrgency from '@/views/pengajuanLogistik/dialogUrgency'
import dialogReturn from '@/views/pengajuanLogistik/dialogReturn'
import agencyIdentity from './agencyIdentity'
import applicantIdentity from './applicantIdentity'
import updateKebutuhanLogistik from './update'
import { mapState, mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'
import { formatDatetime } from '@/utils/parseDatetime'
export default {
  name: 'DetailRealization',
  components: {
    DetailInfo,
    CardStatus,
    CardLetter,
    CardIdentity,
    CardLogistic,
    ActionButton,
    updateLetter,
    dialogUrgency,
    dialogReturn,
    agencyIdentity,
    applicantIdentity,
    updateKebutuhanLogistik
  },
  data() {
    return {
      data,
      isRequestOpen: true,
      isRecommendationOpen: true,
      isRealizationOpen: false,
      isIdentityApplicantOpen: false,
      isCreate: false,
      showForm: false,
      showReturnForm: false,
      showUrgencyForm: false,
      updateLetterForm: false,
      showAgencyIdentity: false,
      showApplicantIdentity: false,
      itemsRequest: [],
      itemsRecommendation: [],
      itemsRealization: [],
      logisticItems: [],
      listQuery: {},
      headersRequest: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: 'Nama Barang', sortable: false },
        { text: 'Deskripsi', sortable: false },
        { text: 'Jumlah', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Jenis Barang', sortable: false }
      ],
      headersRecommendation: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: 'Nama Barang', sortable: false },
        { text: 'Deskripsi', sortable: false },
        { text: 'Jumlah', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Status', sortable: false },
        { text: 'Aksi', sortable: false }
      ],
      headersRealization: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: 'Nama Barang', sortable: false },
        { text: 'Deskripsi', sortable: false },
        { text: 'Jumlah', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Status', sortable: false },
        { text: 'Aksi', sortable: false }
      ],
      // Ini perbaiki nanti
      dataUrgencyConfirmation: {
        id: null,
        agency_name: '-',
        applicant: {
          application_letter_number: '-',
          applicant_name: '-'
        }
      },
      info_terbaru: [],
      status_terbaru: [],
      identity_terbaru: []
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'detailLogisticRequest',
      'listLogisticNeeds',
      'totalLogisticNeeds',
      'listRealization',
      'totalListRealization',
      'totalDataRealization',
      'listStock'
    ]),
    ...mapState('vaccine', {
      listRequest: 'dataListVaccineRequest',
      totalPage: 'totalListVaccineRequest',
      totalData: 'totalDataVaccineRequest'
    }),
    logistic() {
      return [
        {
          type: 'request',
          subtitle: 'Permohonan Masuk',
          headers: this.headersRequest,
          items: this.itemsRequest,
          isOpen: true
        },
        {
          type: 'recommendation',
          subtitle: 'Rekomendasi Salur',
          headers: this.headersRecommendation,
          items: this.itemsRecommendation,
          isOpen: true
        },
        {
          type: 'realization',
          subtitle: 'Realisasi Salur',
          headers: this.headersRealization,
          items: this.itemsRealization,
          isOpen: true
        }
      ]
    },
    // filteredLogisticItems() {
    //   // if (this.detailLogisticRequest.status === 'NOT_VERIFIED') {
    //   //   return this.logistic.filter((el) => el.type === 'request')
    //   // } else if (this.detailLogisticRequest.status === 'VERIFIED') {
    //   //   return this.logistic.filter((el) => el.type !== 'realization')
    //   // } else {
    //   //   return this.logistic
    //   // }

    //   if (this.detailLogisticRequest.status === 'NOT_VERIFIED') {
    //     return this.logisticItems.filter((el) => el.type === 'request')
    //   } else if (this.detailLogisticRequest.status === 'VERIFIED') {
    //     return this.logisticItems.filter((el) => el.type !== 'realization')
    //   } else {
    //     return this.logisticItems
    //   }
    // },
    letterUrl() {
      return this.detailLogisticRequest?.letter?.letter ?? '-'
    },
    letterName() {
      return this.detailLogisticRequest?.applicant?.application_letter_number || '-'
    }
  },
  async created() {
    this.listQuery.agency_id = this.$route.params.id
    EventBus.$on('hideUpdateLetter', (value) => {
      this.updateLetterForm = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('dialogUrgencyConfirmation', (value) => {
      this.showUrgencyForm = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('dialogReturnConfirmation', (value) => {
      this.showReturnForm = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('hideAgencyIdentity', (value) => {
      this.showAgencyIdentity = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('hideApplicantIdentity', (value) => {
      this.showApplicantIdentity = false
      if (value) {
        this.getDetail()
      }
    })
    EventBus.$on('dialogHide', (value) => {
      this.showForm = value
      this.getLogisticRequest()
    })
  },
  mounted() {
    this.getDetail()
    this.getLogisticRequest()
  },
  methods: {
    formatDatetime,
    showApplicantIdentityDialog() {
      this.$refs.dialogApplicantIdentityForm.setData(this.detailLogisticRequest.agency.id, this.detailLogisticRequest)
      this.showApplicantIdentity = true
    },
    showAgencyIdentityDialog() {
      this.$refs.agencyIdentityForm.setData(this.detailLogisticRequest.agency.id, this.detailLogisticRequest)
      this.showAgencyIdentity = true
    },
    restoreStatus(id) {
      this.showReturnForm = true
      this.dataReturnConfirmation = this.detailLogisticRequest
      this.$refs.dialogReturnForm.setData(id, this.dataReturnConfirmation)
    },
    urgencyChange(id, value) {
      this.showUrgencyForm = true
      this.dataUrgencyConfirmation = this.detailLogisticRequest
      this.$refs.dialogUrgencyForm.setData(id, Number(value), this.dataUrgencyConfirmation)
    },
    updateLetter() {
      this.$refs.dialogUpdateLetterForm.setData(this.detailLogisticRequest.letter.agency_id, this.detailLogisticRequest)
      this.updateLetterForm = true
    },
    async getDetail() {
      this.info_terbaru = []
      this.status_terbaru = []
      this.identity_terbaru = []
      const res = await this.$store.dispatch('logistics/getListDetailLogisticRequestUpdate', this.$route.params.id)
      if (!res.data) {
        this.$router.push('/dashboard')
        return
      }
      // Info
      this.info_terbaru.push({
        title: 'Tanggal Pengajuan',
        value: this.formatDatetime(this.detailLogisticRequest?.created_at, 'DD MMMM YYYY')
      },
      {
        title: 'Status',
        value: this.setStatusLabel(this.detailLogisticRequest?.status)
      },
      {
        title: 'Disetujui oleh',
        value: this.detailLogisticRequest?.info.approved_by || '-'
      },
      {
        title: 'Nomor ID',
        value: this.detailLogisticRequest?.info.id || '-'
      })
      // Status
      if (res.data.is_urgency) {
        this.status_terbaru.push({
          type: 'urgent',
          title: 'Urgensi Permohonan',
          content: 'Permohonan ini adalah',
          strong: 'Permohonan Darurat',
          button_label: 'DARURAT!'
        })
      } else {
        this.status_terbaru.push({
          type: 'regular',
          title: 'Urgensi Permohonan',
          content: 'Tandai permohonan sebagai darurat',
          strong: 'darurat',
          button_label: 'TANDAI DARURAT'
        })
      }

      this.status_terbaru.push({
        type: 'status-request',
        title: 'Status Permohonan',
        content: 'Permohonan ini berada pada tahapan',
        strong: this.setStatusLabel(res.data.status),
        button_label: 'KEMBALIKAN KE STATUS SEBELUMNYA'
      })

      // identitas instansi
      this.setDataIdentity()
    },
    setDataIdentity() {
      this.identity_terbaru = [{
        title: 'Identitas Instansi',
        isOpen: true,
        data: [
          {
            title: 'Jenis Instansi',
            value: this.detailLogisticRequest.agency.agency_type_name
          },
          {
            title: 'Nomor Telepon',
            value: this.detailLogisticRequest.agency.phone_number
          },
          {
            title: 'Kelurahan',
            value: this.detailLogisticRequest.agency.village_name
          },
          {
            title: 'Nama Instansi',
            value: this.detailLogisticRequest.agency.agency_name
          },
          {
            title: 'Kota/Kab.',
            value: this.detailLogisticRequest.agency.city_name
          },
          {
            title: 'Alamat lengkap',
            value: this.detailLogisticRequest.agency.address
          },
          {
            title: 'Tipe Instansi',
            value: this.detailLogisticRequest.agency.is_reference === 1 ? 'RS Rujukan' : 'RS Bukan Rujukan'
          },
          {
            title: 'Kecamatan',
            value: this.detailLogisticRequest.agency.district_name
          },
          {
            title: 'Status Rujukan',
            value: this.detailLogisticRequest.agency.is_reference === 1 ? 'Rujukan' : 'Bukan Rujukan'
          }
        ]
      },
      {
        title: 'Identitas Pemohon',
        isOpen: this.isIdentityApplicantOpen,
        data: [
          {
            title: 'Nama Pemohon',
            value: this.detailLogisticRequest.applicant.applicant_name
          },
          {
            title: 'Email Pemohon',
            value: this.detailLogisticRequest.applicant.email
          },
          {
            type: this.setTypeFile(this.detailLogisticRequest.applicant.file),
            title: 'KTP/Kartu Pegawai/Surat Tugas',
            value: this.detailLogisticRequest.applicant.file
          },
          {
            title: 'Jabatan Pemohon',
            value: this.detailLogisticRequest.applicant.applicants_office
          },
          {
            title: 'Nomor Handphone Pemohon',
            value: this.detailLogisticRequest.applicant.primary_phone_number
          },
          {
            title: 'Nomor Handphone Pengganti',
            value: this.detailLogisticRequest.applicant.secondary_phone_number
          }
        ]
      }]
    },
    setStatusLabel(payload) {
      switch (payload) {
        case 'NOT_VERIFIED':
          return this.$t('label.not_verified')
        case 'VERIFIED':
          return this.$t('label.verified')
        case 'APPROVED':
          return this.$t('label.approved')
        case 'FINALIZED':
          return this.$t('label.finalized')
        case 'VERIFICATION_REJECTED':
          return this.$t('label.verification_rejected')
        case 'APPROVAL_REJECTED':
          return this.$t('label.approval_rejected')
        default: 'Status tidak terdefinisikan'
      }
    },
    setTypeFile(payload) {
      return payload.split('.').pop() === 'pdf' ? 'link' : 'image'
    },
    async getLogisticRequest() {
      const res = await this.$store.dispatch('logistics/getListDetailLogisticNeedsNew', this.listQuery)
      // Ini perlu di refactor
      this.itemsRequest = res.data[0]
      this.itemsRecommendation = res.data[1]
      this.itemsRealization = res.data[2]
      this.setLogisticItem()
    },
    setLogisticItem() {
      let filteredHeaderRecommendation = null
      if (this.detailLogisticRequest.status === 'VERIFIED') {
        filteredHeaderRecommendation = this.headersRecommendation
      } else {
        filteredHeaderRecommendation = this.headersRecommendation.filter(el => el.text !== 'Aksi')
      }
      const dataLogistic = [
        {
          type: 'request',
          subtitle: 'Permohonan Masuk',
          headers: this.headersRequest,
          items: this.itemsRequest,
          isOpen: this.isRequestOpen
        },
        {
          type: 'recommendation',
          subtitle: 'Rekomendasi Salur',
          headers: filteredHeaderRecommendation,
          items: this.itemsRecommendation,
          isOpen: this.isRecommendationOpen
        },
        {
          type: 'realization',
          subtitle: 'Realisasi Salur',
          headers: this.headersRealization,
          items: this.itemsRealization,
          isOpen: this.isRealizationOpen
        }
      ]
      if (this.detailLogisticRequest.status === 'NOT_VERIFIED') {
        this.logisticItems = dataLogistic.filter((el) => el.type === 'request')
      } else if (this.detailLogisticRequest.status === 'VERIFIED') {
        this.logisticItems = dataLogistic.filter((el) => el.type !== 'realization')
      } else {
        this.logisticItems = dataLogistic
      }
    },
    hide(type) {
      if (type === 'request') {
        this.isRequestOpen = false
      } else if (type === 'recommendation') {
        this.isRecommendationOpen = false
      } else {
        this.isRealizationOpen = false
      }
      this.setLogisticItem()
    },
    show(type) {
      if (type === 'request') {
        this.isRequestOpen = true
      } else if (type === 'recommendation') {
        this.isRecommendationOpen = true
      } else {
        this.isRealizationOpen = true
      }
      this.setLogisticItem()
    },
    updateItem(item, type) {
      this.showForm = true
      this.$refs.updateForm.setDataUpdateItem(item, type, this.detailLogisticRequest)
    },
    hideIdentity() {
      console.log('terpanggil guys')
      this.isIdentityApplicantOpen = false
      this.setDataIdentity()
    },
    showIdentity() {
      console.log('terpanggil show di detail')
      this.isIdentityApplicantOpen = true
      this.setDataIdentity()
    },
    onReturnValidation() {
      console.log('terpanggil return')
    },
    onRealizeValidation() {
      console.log('terpanggil')
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: transparent;
}
.table-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #424242;
}
.text-label {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: #757575;
}
// hapus dari sini
</style>
