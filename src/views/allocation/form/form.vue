<template>
  <v-card outlined>
    <v-stepper v-model="stepModel" alt-labels>
      <v-stepper-header>
        <template v-for="(step, index) in stepHeader">
          <v-stepper-step
            :key="step.step"
            :complete="stepModel > step.step"
            :step="step.step"
          >
            <span class="text-center">
              {{ step.label }}
            </span>
          </v-stepper-step>
          <v-divider
            v-if="(index + 1) !== stepHeader.length"
            :key="step.label"
          />
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content
          v-for="step in stepHeader"
          :key="step.step"
          :step="step.step"
        >
          <StepOne
            v-if="step.step === 1"
            ref="firstStep"
            :form="allocationForm"
          />
          <StepTwo
            v-if="step.step === 2"
            ref="secondStep"
            :form="allocationForm"
          />
          <StepThree
            v-if="step.step === 3"
          />
          <StepFour
            v-if="step.step === 4"
          />
        </v-stepper-content>
      </v-stepper-items>
      <div v-if="stepModel !== 4" class="d-flex flex-row justify-end mr-8 mb-5">
        <v-btn
          large
          depressed
          class="form-btn__cancel mr-2"
          @click="onCancel"
        >
          {{ stepModel === 1 ? $t('label.cancel') : $t('label.back') }}
        </v-btn>
        <v-btn
          large
          depressed
          class="form-btn__next"
          @click="onNext"
        >
          {{ stepModel !== 3 ? $t('label.next') : $t('label.save') }}
        </v-btn>
      </div>
      <div v-else class="text-center mb-5">
        <v-btn
          large
          depressed
          class="form-btn__next"
          @click="onDone"
        >
          {{ $t('label.done') }}
        </v-btn>
      </div>
    </v-stepper>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import stepHeader from './stepHeader'
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import StepThree from './StepThree.vue'
import StepFour from './StepFour.vue'
export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour
  },
  data() {
    return {
      stepHeader,
      stepModel: 1
    }
  },
  computed: {
    ...mapState('allocation', [
      'allocationForm'
    ])
  },
  methods: {
    async onNext() {
      if (this.stepModel === 1) {
        const isValid = await this.$refs.firstStep[0].validate()
        if (isValid) this.stepModel++
      } else if (this.stepModel === 2) {
        const isValid = await this.$refs.secondStep[0].validate()
        if (isValid) this.stepModel++
      } else if (this.stepModel === 3) {
        for (let i = 0; i < this.allocationForm.instance_list.length; i++) {
          const instance = this.allocationForm.instance_list[i]
          delete instance.listAgency
        }
        const res = await this.$store.dispatch('allocation/postAllocationForm', this.allocationForm)
        if (res.status === 200) {
          this.stepModel++
        }
      }
    },
    onCancel() {
      this.stepModel === 1 ? this.$router.go(-1) : this.stepModel--
    },
    onDone() {
      this.$router.push(`/allocation/list`)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-btn {
  &__next {
    text-transform: none;
    font-size: 16px;
    letter-spacing: 0.05rem;
    background-color: #27AE60 !important;
    color: white;
    width: 170px;
  }
  &__cancel {
    text-transform: none;
    font-size: 16px;
    letter-spacing: 0.05rem;
    background-color: white !important;
    color: #BDBDBD;
    width: 170px;
    border: 1px #E0E0E0 solid;
    border-radius: 8px;
  }
}
</style>
