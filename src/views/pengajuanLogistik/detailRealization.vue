<template>
  <div class="container mb-10">
    <!-- Detail title -->
    <div class="table-title mb-8">
      {{ 'Detail Realisasi' }}
    </div>
    <!-- Detail info -->
    <DetailInfo :items="data.info" />

    <div class="mt-10 d-flex flex-row flex-wrap" style="min-width: 100%;">
      <!-- Request Urgency -->
      <!-- type ada 3: urgent, regular, status-request -->
      <CardStatus
        v-for="(item, index) in data.status"
        :key="item.type"
        :type="item.type"
        :title="item.title"
        :content="item.content"
        :strong="item.strong"
        :button-label="item.button_label"
        :class="{ 'ml-auto': index === 1 }"
      />
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
        :letter="letterUrl"
        :name="letterName"
      />
    </div>
    <!-- Instance -->
    <div class="mt-5">
      <CardIdentity :items="data.instance" />
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
      headers: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: 'Nama Barang', sortable: false },
        { text: 'Deskripsi', sortable: false },
        { text: 'Jumlah', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Satuan', sortable: false },
        { text: 'Aksi', sortable: false }
      ]
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
          headers: this.headers,
          items: this.listRequest
        },
        {
          subtitle: 'Rekomendasi Salur',
          headers: this.headers,
          items: this.listRequest
        }
      ]
    },
    letterUrl() {
      return this.detailLogisticRequest?.letter?.letter ?? '-'
    },
    letterName() {
      return this.detailLogisticRequest?.applicant?.application_letter_number || '-'
    }
  },
  created() {
    EventBus.$on('hideUpdateLetter', (value) => {
      this.updateLetterForm = false
      if (value) {
        this.getDetail()
      }
    })
  },
  mounted() {
    this.$store.dispatch('vaccine/getListVaccineRequest', this.listQuery)
    this.getDetail()
  },
  methods: {
    updateLetter() {
      this.$refs.dialogUpdateLetterForm.setData(this.detailLogisticRequest.id, this.detailLogisticRequest)
      this.updateLetterForm = true
    },
    onReturnValidation() {
      console.log('terpanggil return')
    },
    async onRealizeValidation() {
      console.log('terpanggil')
    },
    async getDetail() {
      const res = await this.$store.dispatch('logistics/getListDetailLogisticRequest', this.$route.params.id)
      if (!res.data) {
        this.$router.push('/dashboard')
        return
      }
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
