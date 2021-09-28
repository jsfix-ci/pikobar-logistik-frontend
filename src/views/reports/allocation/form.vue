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
            {{ step.label }}
          </v-stepper-step>
          <v-divider
            v-if="(index + 1) !== stepHeader.length"
            :key="step.step"
          />
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content
          v-for="step in stepHeader"
          :key="step.step"
          :step="step.step"
        >
          <StepOne v-if="step.step === 1" />
          <StepTwo v-if="step.step === 2" />
        </v-stepper-content>
      </v-stepper-items>
      <v-btn
        large
        depressed
        max-width="100px"
        @click="stepModel--"
      >
        Back
      </v-btn>
      <v-btn
        large
        depressed
        max-width="100px"
        @click="stepModel++"
      >
        Next
      </v-btn>
    </v-stepper>
  </v-card>
</template>

<script>
import stepHeader from './stepHeader'
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
export default {
  components: {
    StepOne,
    StepTwo
  },
  data() {
    return {
      stepHeader,
      stepModel: 1
    }
  }
}
</script>

<style>

</style>
