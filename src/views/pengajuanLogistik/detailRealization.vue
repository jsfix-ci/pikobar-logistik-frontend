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
      <CardIdentity :items="item" />
    </div>

    <!-- Logistic request -->
    <div class="mt-5">
      <CardLogistic
        title="Daftar Kebutuhan Logistik"
        :items="logistic"
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
    updateLetter
  },
  data() {
    return {
      data,
      updateLetterForm: false,
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
        { text: 'Status', sortable: false }
      ],
      headersRealization: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: 'Nama Barang', sortable: false },
        { text: 'Deskripsi', sortable: false },
        { text: 'Jumlah', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Status', sortable: false }
        // { text: 'Aksi', sortable: false }
      ],
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
          subtitle: 'Permohonan Masuk',
          headers: this.headersRequest,
          items: this.listLogisticNeeds
        },
        {
          subtitle: 'Realisasi Salur',
          headers: this.headersRealization,
          items: this.listRealization
        },
        {
          subtitle: 'Rekomendasi Salur',
          headers: this.headersRecommendation,
          items: this.listRealization
        }
        // {
        //   subtitle: 'Realisasi Salur',
        //   headers: this.headersRealization,
        //   items: this.listRequest
        // }
      ]
    },
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
  },
  mounted() {
    // this.$store.dispatch('vaccine/getListVaccineRequest', this.listQuery)
    this.getDetail()
    this.getLogisticRequest()
  },
  methods: {
    formatDatetime,
    updateLetter() {
      this.$refs.dialogUpdateLetterForm.setData(this.detailLogisticRequest.letter.agency_id, this.detailLogisticRequest)
      this.updateLetterForm = true
    },
    onReturnValidation() {
      console.log('terpanggil return')
    },
    async onRealizeValidation() {
      console.log('terpanggil')
    },
    async getDetail() {
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
      this.identity_terbaru.push({
        title: 'Identitas Instansi',
        data: [
          {
            title: 'Jenis Instansi',
            value: res.data.agency.agency_type_name
          },
          {
            title: 'Nomor Telepon',
            value: res.data.agency.phone_number
          },
          {
            title: 'Kelurahan',
            value: res.data.agency.village_name
          },
          {
            title: 'Nama Instansi',
            value: res.data.agency.agency_name
          },
          {
            title: 'Kota/Kab.',
            value: res.data.agency.city_name
          },
          {
            title: 'Alamat lengkap',
            value: res.data.agency.address
          },
          {
            title: 'Tipe Instansi',
            value: res.data.agency.is_reference === 1 ? 'RS Rujukan' : 'RS Bukan Rujukan'
          },
          {
            title: 'Kecamatan',
            value: res.data.agency.district_name
          },
          {
            title: 'Status Rujukan',
            value: res.data.agency.is_reference === 1 ? 'Rujukan' : 'Bukan Rujukan'
          }
        ]
      },
      {
        title: 'Identitas Pemohon',
        data: [
          {
            title: 'Nama Pemohon',
            value: res.data.applicant.applicant_name
          },
          {
            title: 'Email Pemohon',
            value: res.data.applicant.email
          },
          {
            type: this.setTypeFile(res.data.applicant.file),
            title: 'KTP/Kartu Pegawai/Surat Tugas',
            value: res.data.applicant.file
          },
          {
            title: 'Jabatan Pemohon',
            value: res.data.applicant.applicants_office
          },
          {
            title: 'Nomor Handphone Pemohon',
            value: res.data.applicant.primary_phone_number
          },
          {
            title: 'Nomor Handphone Pengganti',
            value: res.data.applicant.secondary_phone_number
          }
        ]
      })
    },
    setStatusLabel(payload) {
      switch (payload) {
        case 'APPROVED':
          return this.$t('label.approved')
        case 'not_delivered':
          return this.$t('label.not_delivered')
        case 'delivered':
          return this.$t('label.delivered')
        case 'not_available':
          return this.$t('label.not_available')
        default: 'Status tidak terdefinisikan'
      }
    },
    setTypeFile(payload) {
      return payload.split('.').pop() === 'pdf' ? 'link' : 'image'
    },
    async getLogisticRequest() {
      await this.$store.dispatch('logistics/getListDetailLogisticNeeds', this.listQuery)
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
