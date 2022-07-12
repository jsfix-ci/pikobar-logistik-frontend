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
      :link="vaccineRequest.letter_file_url"
    />
    <RequestTableSection :stage="stage" />
    <RecommendationTableSection
      v-if="showRecommendation"
      :stage="stage"
      :is-updated.sync="isRecommendationUpdated"
    />
    <RealizationTableSection
      v-if="showRealization"
      ref="realizationSection"
      :stage="stage"
      :delivery-date="vaccineRequest.delivery_plan_date"
      :is-updated.sync="isRealizationUpdated"
      :delivery-plan-date.sync="deliveryPlanDate"
    />
    <DeliveryPlanTableSection
      v-if="showDeliveryPlan"
      :stage="stage"
      :delivery-date="vaccineRequest.delivery_plan_date"
    />
    <ActionButton
      :stage="stage"
      @confirm="onConfirm"
      @recommend="onRecommendValidation"
      @realize="onRealizeValidation"
      @deliver="onDeliverValidation"
    />
    <DialogSection
      :key="showDialog"
      v-model="showDialog"
      :type="dialogType"
      :instance-lead="instanceLead"
      @close="showDialog = false"
      @verify="onVerify"
      @recommend="onRecommend"
      @realize="onRealize"
      @deliver="onDeliver"
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
      dialogType: '', // verifConfirmation, success, verifWithNote, verifWithNoteSuccess, recommendConfirmation, recommendSuccess, notUpdated, realizeConfirmation, realizeSuccess, deliverConfirmation, deliverSuccess, deliveryLoading
      isRecommendationUpdated: false,
      isRealizationUpdated: false,
      deliveryPlanDate: null,
      instanceLead: ''
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
        if (dialogSuccessType === 'recommendSuccess') {
          await this.getInstanceLead('realization')
        } else if (dialogSuccessType === 'realizeSuccess') {
          await this.getInstanceLead('delivery_plan')
        }
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
    async onRecommendValidation() {
      await this.getInstanceLead('recommendation')
      this.dialogType = this.isRecommendationUpdated ? 'recommendConfirmation' : 'notUpdated'
      this.showDialog = true
    },
    async onRealizeValidation() {
      const isValid = this.$refs.realizationSection.validate()
      if (!isValid) {
        return
      }
      await this.getInstanceLead('realization')
      this.dialogType = this.isRealizationUpdated ? 'realizeConfirmation' : 'notUpdated'
      this.showDialog = true
    },
    onDeliverValidation() {
      this.dialogType = 'deliverConfirmation'
      this.showDialog = true
    },
    onRecommend() {
      this.showDialog = false
      const payload = {
        id: this.$route.params.id,
        status: 'approved'
      }
      this.submitForm(payload, 'recommendSuccess')
    },
    onRealize() {
      this.showDialog = false
      const payload = {
        id: this.$route.params.id,
        status: 'finalized',
        delivery_plan_date: this.deliveryPlanDate
      }
      this.submitForm(payload, 'realizeSuccess')
    },
    onDeliver() {
      this.dialogType = 'deliveryLoading'
      const payload = {
        id: this.$route.params.id,
        status: 'integrated'
      }
      this.submitForm(payload, 'deliverSuccess')
    },
    async getInstanceLead(phase) {
      const res = await this.$store.dispatch('vaccine/getInstanceLead', { phase })
      if (res.status === 200 || res.status === 201) {
        this.instanceLead = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/scss/pages/vaccineDetail.scss";
</style>
