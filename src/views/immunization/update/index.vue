<template>
  <div class="update d-flex flex-column mb-6">
    <span class="update__title">{{ $t('label.vaccine_recommendation_update') }}</span>
    <v-row>
      <v-col cols="12" sm="6">
        <RequestSection class="mb-6" />
        <RecommendationSection />
        <div class="d-flex flex-row justify-space-between mt-6">
          <JDSButton inverted height="42px" width="48%" @click="onCancel()">
            {{ $t('label.cancel') }}
          </JDSButton>
          <JDSButton height="42px" width="48%" @click="onUpdate()">
            {{ $t('label.update') }}
          </JDSButton>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RequestSection from './RequestSection.vue'
import RecommendationSection from './RecommendationSection.vue'
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    RequestSection,
    RecommendationSection,
    JDSButton
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    onUpdate() {
      // @todo: crate onUpdate function
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
