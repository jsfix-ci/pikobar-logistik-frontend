<template>
  <div class="update d-flex flex-column mb-6">
    <span class="update__title">{{ title }}</span>
    <v-row>
      <v-col cols="12" sm="6">
        <RequestSection
          ref="request"
          :data="requestData"
          :stage="stage"
          :status-change.sync="recommendationForm.recommendation_status"
          class="mb-6"
        />
        <RecommendationSection
          ref="recommendation"
          :data="recommendationData"
          :stage="stage"
          :item-list="listItem"
          :date.sync="recommendationForm.recommendation_date"
          :name.sync="recommendationForm.recommendation_product_name"
          :quantity.sync="recommendationForm.recommendation_quantity"
          :note.sync="recommendationForm.recommendation_note"
          class="mb-6"
        />
        <RealizationSection
          v-if="stage === 'realization'"
          ref="realization"
          :data="realizationData"
          :stage="stage"
          :item-list="listItem"
          :date.sync="realizationForm.finalized_date"
          :name.sync="realizationForm.finalized_product_name"
          :quantity.sync="realizationForm.finalized_quantity"
          :status.sync="realizationForm.finalized_status"
        />
        <div class="d-flex flex-row justify-space-between mt-6">
          <JDSButton inverted height="42px" width="48%" @click="onCancel()">
            {{ $t('label.cancel') }}
          </JDSButton>
          <JDSButton height="42px" width="48%" @click="onUpdate()">
            {{ $t('label.update') }}
          </JDSButton>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <StockSection />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RequestSection from './RequestSection.vue'
import RecommendationSection from './RecommendationSection.vue'
import RealizationSection from './RealizationSection.vue'
import StockSection from './StockSection.vue'
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    RequestSection,
    RecommendationSection,
    RealizationSection,
    StockSection,
    JDSButton
  },
  data() {
    return {
      requestData: {},
      recommendationData: {},
      realizationData: {},
      listVaccine: [],
      listVaccineSupport: [],
      recommendationForm: {
        id: this.$route.params.id,
        recommendation_product_id: '',
        recommendation_date: '',
        recommendation_product_name: '',
        recommendation_quantity: 0,
        recommendation_UoM: 'VIAL',
        recommendation_status: '',
        recommendation_note: ''
      },
      realizationForm: {
        id: this.$route.params.id,
        finalized_product_id: '',
        finalized_date: '',
        finalized_product_name: '',
        finalized_quantity: 0,
        finalized_UoM: 'VIAL',
        finalized_status: ''
      }
    }
  },
  computed: {
    stage() {
      const splittedPath = this.$route.path.split('/')
      return splittedPath[1]
    },
    title() {
      return this.stage === 'recommendation'
        ? this.$t('label.vaccine_recommendation_update')
        : this.$t('label.vaccine_realization_update')
    },
    isVaccineSupport() {
      return this.$route.query.type === 'vaccineSupport'
    },
    listItem() {
      return this.isVaccineSupport ? this.listVaccineSupport : this.listVaccine
    }
  },
  async mounted() {
    const res = await this.$store.dispatch('vaccine/getItemVaccineProductRequest', this.$route.params.id)
    this.requestData = {
      ...res.data.request,
      product_status: res.data.recommendation.product_status
    }
    this.recommendationData = res.data.recommendation
    this.realizationData = res.data.finalization

    const vaccineSupportResponse = await this.$store.dispatch('vaccine/getListMaterial', { matg_id: 'PENUNJANG VAKSIN', is_paginated: 0 })
    this.listVaccineSupport = vaccineSupportResponse.data
    const vaccineResponse = await this.$store.dispatch('vaccine/getListMaterial', { matg_id: 'VAKSIN', is_paginated: 0 })
    this.listVaccine = vaccineResponse.data
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    async onUpdate() {
      let isValid
      if (this.stage === 'recommendation') {
        isValid = await this.$refs.request.validate()
        isValid = await this.$refs.recommendation.validate()
      } else {
        isValid = await this.$refs.realization.validate()
      }
      if (!isValid) {
        return
      }
      let payload
      if (this.stage === 'recommendation') {
        payload = this.recommendationForm
        payload.recommendation_product_id = this.recommendationForm.recommendation_product_name.material_id
        payload.recommendation_product_name = this.recommendationForm.recommendation_product_name.material_name
      } else {
        payload = this.realizationForm
        payload.finalized_product_id = this.realizationForm.finalized_product_name.material_id
        payload.finalized_product_name = this.realizationForm.finalized_product_name.material_name
      }
      const res = await this.$store.dispatch('vaccine/updateVaccineProductRequest', payload)
      if (res.status === 200 || res.status === 201) {
        // @todo: add dialog success
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.update {
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
