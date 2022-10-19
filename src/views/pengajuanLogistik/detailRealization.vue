<template>
  <div class="container mb-10">
    <!-- Detail title -->
    <div class="table-title mb-4">
      {{ detailTitle }}
    </div>
    <!-- Need Refactor -->
    <v-card
      v-if="detailLogisticRequest.status === 'NOT_VERIFIED'"
      class="mx-auto mb-4"
      color="#219653"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span class="text-wrap" style="color: white">{{ $t('label.verify_text_alert_1') }}<b>{{ $t('label.verify_text_alert_2') }}</b> {{ $t('label.verify_text_alert_3') }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
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
        :length="status_terbaru.length"
        :button-label="item.button_label"
        :class="{ 'ml-auto': index === 1 }"
        @change-urgency="urgencyChange(detailLogisticRequest.applicant.id, !detailLogisticRequest.is_urgency)"
        @restore-status="restoreStatus(detailLogisticRequest.applicant.agency_id)"
      />
    </div>
    <!-- Letter -->
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
    <div v-if="detailLogisticRequest.status !== 'NOT_VERIFIED'" class="mt-5">
      <CardLogistic
        title="Daftar Barang Rekomendasi Salur Lainnya"
        :items="logisticItemsRealization"
        :status="detailLogisticRequest.status"
        @update="updateItem"
        @hide="hideAdminRealization"
        @show="showAdminRealization"
      >
        <template v-slot:item-prop="{ item }">
          <span class="mx-1">
            <JDSButton inverted danger height="25px" width="75px" @click="deleteRealization(item)">
              <span>{{ 'Hapus' }}</span>
            </JDSButton>
          </span>
        </template>
        <div class="d-flex justify-end ml-auto mt-7">
          <JDSButton inverted height="42px" @click="addRealizationAdmin()">
            <v-icon left dark>mdi-archive-plus-outline</v-icon>
            <span>{{ 'Tambah Barang' }}</span>
          </JDSButton>
        </div>
      </CardLogistic>
    </div>
    <!-- Footer -->
    <div>
      <ActionButton
        :stage="detailLogisticRequest.status"
        @verif-confirmation="submitVerification"
        @recommend="submitRecommendation"
        @realize="submitRealization"
        @reject-approval="showDialogReject = true"
        @reject-verification="showDialogReject = true"
      />
    </div>
    <DialogDelete
      :dialog="dialogDelete"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialogDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`logistics/deleteRealization`"
    />
    <rejectKebutuhanLogistik
      :show="showDialogReject"
      :item="detailLogisticRequest"
      :total="itemsRequest.total"
      @submitReject="rejectData"
    />
    <updateKebutuhanLogistik ref="updateForm" :show="showForm" />
    <dialogReturn ref="dialogReturnForm" :show="showReturnForm" />
    <dialogUrgency ref="dialogUrgencyForm" :show="showUrgencyForm" />
    <updateLetter ref="dialogUpdateLetterForm" :show="updateLetterForm" />
    <agencyIdentity ref="agencyIdentityForm" :show="showAgencyIdentity" />
    <applicantIdentity ref="dialogApplicantIdentityForm" :show="showApplicantIdentity" />
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import { mapState, mapGetters } from 'vuex'
import agencyIdentity from './agencyIdentity'
import updateKebutuhanLogistik from './update'
import rejectKebutuhanLogistik from './reject'
import applicantIdentity from './applicantIdentity'
import JDSButton from '@/components/Base/JDSButton'
import DialogDelete from '@/components/DialogDelete'
import { formatDatetime } from '@/utils/parseDatetime'
import updateLetter from '@/views/pengajuanLogistik/updateLetter'
import dialogReturn from '@/views/pengajuanLogistik/dialogReturn'
import dialogUrgency from '@/views/pengajuanLogistik/dialogUrgency'
import DetailInfo from '@/components/RequestLogistic/Detail/info.vue'
import CardStatus from '@/components/RequestLogistic/Detail/status.vue'
import CardLetter from '@/components/RequestLogistic/Detail/letter.vue'
import CardIdentity from '@/components/RequestLogistic/Detail/identity.vue'
import CardLogistic from '@/components/RequestLogistic/Detail/logistic.vue'
import ActionButton from '@/components/RequestLogistic/Detail/ActionButton.vue'
export default {
  name: 'DetailRealization',
  components: {
    DialogDelete,
    JDSButton,
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
    updateKebutuhanLogistik,
    rejectKebutuhanLogistik
  },
  data() {
    return {
      showDialogReject: false,
      detailTitle: null,
      dataDelete: null,
      isRequestOpen: false,
      isRealizationOpen: false,
      isRecommendationOpen: false,
      isIdentityApplicantOpen: false,
      isAdminRealizationOpen: false,
      isAdminRecommendationOpen: false,
      isCreate: false,
      showForm: false,
      dialogDelete: false,
      showReturnForm: false,
      showUrgencyForm: false,
      updateLetterForm: false,
      showAgencyIdentity: false,
      showApplicantIdentity: false,
      itemsRequest: [],
      itemsRecommendation: [],
      itemsRealization: [],
      logisticItems: [],
      itemsRecommendationAdmin: [],
      itemsRealizationAdmin: [],
      logisticItemsRealization: [],
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
    letterUrl() {
      return this.detailLogisticRequest?.letter?.letter ?? '-'
    },
    letterName() {
      return this.detailLogisticRequest?.applicant?.application_letter_number || '-'
    }
  },
  async created() {
    await this.getDetail()
    await this.setDefaultDisplayTable(this.detailLogisticRequest.status)
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
      this.getLogisticAdditionalRealization()
    })
    EventBus.$on('dialogHideReject', (value) => {
      this.showDialogReject = value
    })
  },
  methods: {
    formatDatetime,
    async submitRealization() {
      try {
        const formData = new FormData()
        formData.append('agency_id', this.detailLogisticRequest.agency.id)
        formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
        formData.append('approval_status', 'approved')
        formData.append('url', location.host + '/#')
        await this.$store.dispatch('logistics/postFinalStatus', formData)
        await this.getDetail()
      } catch (err) {
        return err
      }
    },
    async submitRecommendation() {
      try {
        const formData = new FormData()
        formData.append('agency_id', this.detailLogisticRequest.agency.id)
        formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
        formData.append('approval_status', 'approved')
        formData.append('url', location.host + '/#')
        await this.$store.dispatch('logistics/postApprovalStatus', formData)
        await this.getDetail()
      } catch (err) {
        return err
      }
    },
    async submitVerification() {
      try {
        const formData = new FormData()
        formData.append('agency_id', this.detailLogisticRequest.agency.id)
        formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
        formData.append('verification_status', 'verified')
        formData.append('url', location.host + '/#')
        await this.$store.dispatch('logistics/postVerificationStatus', formData)
        await this.getDetail()
      } catch (err) {
        return err
      }
    },
    rejectData(value) {
      const formData = new FormData()
      this.showDialogReject = false
      formData.append('agency_id', this.detailLogisticRequest.agency.id)
      formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
      if (this.detailLogisticRequest.status === 'VERIFIED') {
        formData.append('approval_status', 'rejected')
        formData.append('approval_note', value)
        this.postRejectApproval(formData)
      } else {
        formData.append('verification_status', 'rejected')
        formData.append('note', value)
        this.postReject(formData)
      }
    },
    async postRejectApproval(formData) {
      await this.$store.dispatch('logistics/postApprovalStatus', formData)
      await this.getDetail()
    },
    async postReject(formData) {
      await this.$store.dispatch('logistics/postVerificationStatus', formData)
      await this.getDetail()
    },
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

      if (this.detailLogisticRequest.status !== 'NOT_VERIFIED') {
        this.status_terbaru.push({
          type: 'status-request',
          title: 'Status Permohonan',
          content: 'Permohonan ini berada pada tahapan',
          strong: this.setStatusLabel(res.data.status),
          button_label: 'KEMBALIKAN KE STATUS SEBELUMNYA'
        })
      }

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
    async deleteRealization(item) {
      this.dialogDelete = true
      this.dataDelete = await item
    },
    async getLogisticAdditionalRealization() {
      const res = await this.$store.dispatch('logistics/getLogisticAdditionalRealization', this.listQuery)
      this.itemsRecommendationAdmin = res.data[0]
      this.itemsRealizationAdmin = res.data[1]
      this.setLogisticRealizationAdmin()
    },
    setLogisticRealizationAdmin() {
      let filteredHeaderRecommendation = null
      if (this.detailLogisticRequest.status === 'VERIFIED') {
        filteredHeaderRecommendation = this.headersRecommendation
      } else {
        filteredHeaderRecommendation = this.headersRecommendation.filter(el => el.text !== 'Aksi')
      }
      const dataLogistic = [
        {
          type: 'recommendation',
          subtitle: 'Rekomendasi Salur Lainnya',
          headers: filteredHeaderRecommendation,
          items: this.itemsRecommendationAdmin,
          isOpen: this.isAdminRecommendationOpen
        },
        {
          type: 'realization',
          subtitle: 'Realisasi Salur Lainnya',
          headers: this.headersRealization,
          items: this.itemsRealizationAdmin,
          isOpen: this.isAdminRealizationOpen
        }
      ]
      if (this.detailLogisticRequest.status === 'VERIFIED') {
        this.logisticItemsRealization = dataLogistic.filter((el) => el.type !== 'realization')
      } else {
        this.logisticItemsRealization = dataLogistic
      }
    },
    async getLogisticRequest() {
      const res = await this.$store.dispatch('logistics/getListDetailLogisticNeedsNew', this.listQuery)
      // Ini perlu di refactor
      this.itemsRequest = res.data[0]
      this.itemsRecommendation = res.data[1]
      this.itemsRealization = res.data[2]
      this.setLogisticItem()
    },
    setDefaultDisplayTable(status) {
      switch (status) {
        case 'NOT_VERIFIED':
        case 'VERIFICATION_REJECTED':
          this.isRequestOpen = true
          this.detailTitle = 'Detail Administrasi'
          break
        case 'VERIFIED':
        case 'APPROVAL_REJECTED':
          this.isRequestOpen = false
          this.isRecommendationOpen = true
          this.isAdminRecommendationOpen = true
          this.detailTitle = 'Detail Rekomendasi'
          break
        case 'APPROVED':
        case 'FINALIZED':
          this.isRealizationOpen = true
          this.isAdminRealizationOpen = true
          this.isRequestOpen = false
          this.isRecommendationOpen = false
          this.isAdminRecommendationOpen = false
          this.detailTitle = 'Detail Realisasi'
          break
        default: null
      }
      this.getLogisticRequest()
      this.getLogisticAdditionalRealization()
    },
    // function ini dibikin modular
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
    hideAdminRealization(type) {
      if (type === 'recommendation') {
        this.isAdminRecommendationOpen = false
      } else {
        this.isAdminRealizationOpen = false
      }
      this.setLogisticRealizationAdmin()
    },
    showAdminRealization(type) {
      if (type === 'recommendation') {
        this.isAdminRecommendationOpen = true
      } else {
        this.isAdminRealizationOpen = true
      }
      this.setLogisticRealizationAdmin()
    },
    hide(type) {
      if (type === 'request') {
        this.isRequestOpen = false
      } else if (type === 'recommendation') {
        this.isRecommendationOpen = this.isAdminRecommendationOpen = false
      } else {
        this.isRealizationOpen = this.isAdminRealizationOpen = false
      }
      this.setLogisticItem()
      this.setLogisticRealizationAdmin()
    },
    show(type) {
      if (type === 'request') {
        this.isRequestOpen = true
      } else if (type === 'recommendation') {
        this.isRecommendationOpen = this.isAdminRecommendationOpen = true
      } else {
        this.isRealizationOpen = this.isAdminRealizationOpen = true
      }
      this.setLogisticItem()
      this.setLogisticRealizationAdmin()
    },
    updateItem(item, type, isAdminRealization) {
      this.showForm = true
      this.$refs.updateForm.setDataUpdateItem(item, type, isAdminRealization, this.detailLogisticRequest)
    },
    addRealizationAdmin() {
      this.showForm = true
      this.$refs.updateForm.setDataAddRealizationAdmin(this.detailLogisticRequest)
    },
    hideIdentity() {
      this.isIdentityApplicantOpen = false
      this.setDataIdentity()
    },
    showIdentity() {
      this.isIdentityApplicantOpen = true
      this.setDataIdentity()
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
</style>
