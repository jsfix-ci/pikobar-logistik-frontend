<template>
  <div class="detail d-flex flex-column mb-6">
    <h1 class="detail__title">
      {{ $t('label.request_detail') }}
    </h1>
    <IdentitySection
      :key="Object.keys(vaccineRequest).length"
      :identity="vaccineRequest"
    />
    <LetterSection
      :letter="vaccineRequest.letter_number"
    />
    <RequestTableSection />
    <RecommendationTableSection
      v-if="showRecommendation"
      :stage="stage"
      :is-updated.sync="isRecommendationUpdated"
    />
    <RealizationTableSection v-if="showRealization" :stage="stage" />
    <DeliveryPlanTableSection v-if="showDeliveryPlan" />
    <ActionButton
      :stage="stage"
      @confirm="onConfirm"
      @recommend="onRecommendValidation"
    />
    <DialogSection
      :key="showDialog"
      v-model="showDialog"
      :type="dialogType"
      @close="showDialog = false"
      @verify="onVerify"
      @recommend="onRecommend"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IdentitySection from './IdentitySection'
import LetterSection from './LetterSection'
import RequestTableSection from './RequestTableSection'
import RecommendationTableSection from './RecommendationTableSection'
import RealizationTableSection from './RealizationTableSection'
import DeliveryPlanTableSection from './DeliveryPlanTableSection'
import ActionButton from './ActionButton'
import DialogSection from './Dialog'
export default {
  components: {
    IdentitySection,
    LetterSection,
    RequestTableSection,
    RecommendationTableSection,
    RealizationTableSection,
    DeliveryPlanTableSection,
    ActionButton,
    DialogSection
  },
  data() {
    return {
      showDialog: false,
      dialogType: '', // verifConfirmation, success, verifWithNote, verifWithNoteSuccess, recommendConfirmation, recommendSuccess, notUpdated
      isRecommendationUpdated: false,
      isRealizationUpdated: false
    }
  },
  computed: {
    ...mapState('vaccine', [
      'vaccineRequest'
    ]),
    showRecommendation() {
      return this.stage === 'recommendation' ||
        this.stage === 'realization' ||
        this.stage === 'delivery-plan'
    },
    showRealization() {
      return this.stage === 'realization' ||
        this.stage === 'delivery-plan'
    },
    showDeliveryPlan() {
      return this.stage === 'delivery-plan'
    },
    stage() {
      const splittedPath = this.$route.path.split('/')
      return splittedPath[1]
    }
  },
  async mounted() {
    await this.$store.dispatch('vaccine/getVaccineRequestById', this.$route.params.id)
  },
  methods: {
    onConfirm(type) {
      this.dialogType = type
      this.showDialog = true
    },
    async submitForm(payload, dialogSuccessType) {
      const res = await this.$store.dispatch('vaccine/updateVaccineRequestStatus', payload)
      if (res.status === 200 || res.status === 201) {
        this.dialogType = dialogSuccessType
        this.showDialog = true
      }
    },
    onVerify(value) {
      this.showDialog = false
      let payload = {}
      if (value.isVerifWithNote) {
        payload = {
          id: this.$route.params.id,
          status: 'verified',
          vaccine_status_note: value.note,
          note: value.extraNote
        }
      } else {
        payload = {
          id: this.$route.params.id,
          status: 'verified'
        }
      }
      const dialogSuccessType = value.isVerifWithNote ? 'verifWithNoteSuccess' : 'success'
      this.submitForm(payload, dialogSuccessType)
    },
    onRecommendValidation() {
      this.dialogType = this.isRecommendationUpdated ? 'recommendConfirmation' : 'notUpdated'
      this.showDialog = true
    },
    onRecommend() {
      this.showDialog = false
      const payload = {
        id: this.$route.params.id,
        status: 'approved'
      }
      this.submitForm(payload, 'recommendSuccess')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/scss/pages/vaccineDetail.scss";
</style>
