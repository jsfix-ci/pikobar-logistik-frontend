<template>
  <div class="add d-flex flex-column mb-6">
    <span class="add__title">{{ title }}</span>
    <v-row>
      <v-col cols="12" sm="6">
        <FormSection :stage="stage" />
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
import FormSection from './FormSection.vue'
import StockSection from '../update/StockSection.vue'
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    FormSection,
    StockSection,
    JDSButton
  },
  computed: {
    stage() {
      const splittedPath = this.$route.path.split('/')
      return splittedPath[1]
    },
    title() {
      return this.stage === 'recommendation'
        ? this.$t('label.vaccine_recommendation_add')
        : this.$t('label.vaccine_realization_add')
    }
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    onAdd() {
      // @todo: crate onAdd function
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
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
