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
    <RecommendationTableSection v-if="showRecommendation" :stage="stage" />
    <RealizationTableSection v-if="showRealization" />
    <ActionButton :stage="stage" @confirm="onConfirm" />
    <DialogSection
      :key="showDialog"
      v-model="showDialog"
      :type="dialogType"
      @close="showDialog = false"
      @verify="onVerify"
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
import ActionButton from './ActionButton'
import DialogSection from './Dialog'
export default {
  components: {
    IdentitySection,
    LetterSection,
    RequestTableSection,
    RecommendationTableSection,
    RealizationTableSection,
    ActionButton,
    DialogSection
  },
  data() {
    return {
      stage: '',
      showDialog: false,
      dialogType: '' // verifConfirmation, success, verifWithNote, verifWithNoteSuccess
    }
  },
  computed: {
    ...mapState('vaccine', [
      'vaccineRequest'
    ]),
    showRecommendation() {
      return this.stage === 'recommendation' || this.stage === 'realization'
    },
    showRealization() {
      return this.stage === 'realization'
    }
  },
  async mounted() {
    await this.$store.dispatch('vaccine/getVaccineRequestById', this.$route.params.id)
    this.getStages()
  },
  methods: {
    getStages() {
      const splittedPath = this.$route.path.split('/')
      this.stage = splittedPath[1]
    },
    onConfirm(type) {
      this.dialogType = type
      this.showDialog = true
    },
    async onVerify(value) {
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
      const res = await this.$store.dispatch('vaccine/updateVaccineRequestStatus', payload)
      if (res.status === 200 || res.status === 201) {
        this.dialogType = value.isVerifWithNote ? 'verifWithNoteSuccess' : 'success'
        this.showDialog = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background: white;
  padding: 16px;
  border-radius: 8px;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #424242;
    margin-bottom: 32px;
  }
}
</style>
