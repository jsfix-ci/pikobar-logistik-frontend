<template>
  <div class="add d-flex flex-column mb-6">
    <span class="add__title">{{ title }}</span>
    <v-row>
      <v-col cols="12" sm="6">
        <FormSection ref="form" :stage="stage" :form.sync="form" />
        <div class="d-flex flex-row justify-space-between mt-6">
          <JDSButton inverted height="42px" width="48%" @click="onCancel()">
            {{ $t('label.cancel') }}
          </JDSButton>
          <JDSButton height="42px" width="48%" @click="onAdd()">
            {{ $t('label.adding') }}
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
  data() {
    return {
      form: {}
    }
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
    async onAdd() {
      const isValid = await this.$refs.form.validate()
      if (!isValid) {
        return
      }

      // convert into form data
      const formData = new FormData()
      for (var key in this.form) {
        formData.append(key, this.form[key])
      }

      // POST
      const res = await this.$store.dispatch('vaccine/createVaccineProductRequest', formData)
      if (res.status === 200 || res.status === 201) {
        // @todo: add dialog success
        this.$router.go(-1)
      }
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
