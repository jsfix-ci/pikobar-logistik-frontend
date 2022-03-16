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
    <TableSection />
    <ActionButton />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IdentitySection from './IdentitySection'
import LetterSection from './LetterSection'
import TableSection from './TableSection'
import ActionButton from './ActionButton'
export default {
  components: {
    IdentitySection,
    LetterSection,
    TableSection,
    ActionButton
  },
  data() {
    return {
      stage: ''
    }
  },
  computed: {
    ...mapState('vaccine', [
      'vaccineRequest'
    ])
  },
  async mounted() {
    await this.$store.dispatch('vaccine/getVaccineRequestById', this.$route.params.id)
    this.getStages()
  },
  methods: {
    getStages() {
      const splittedPath = this.$route.path.split('/')
      this.stage = splittedPath[1]
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
