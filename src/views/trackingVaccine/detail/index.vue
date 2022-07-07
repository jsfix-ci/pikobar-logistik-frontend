<template>
  <div
    :class="{
      'tracking': true,
      'px-4': $vuetify.breakpoint.smAndDown
    }"
  >
    <div>
      <VaccineHeader />
      <TrackingHeader />
      <h1 class="tracking__title mb-6">Overview</h1>
      <ProgressTracker />
    </div>
    <VaccineFooter />
  </div>
</template>

<script>
import VaccineHeader from '@/components/requestVaccine/Header'
import VaccineFooter from '@/components/requestVaccine/Footer'
import TrackingHeader from '../TrackingHeader'
import ProgressTracker from './ProgressTracker.vue'
export default {
  components: {
    VaccineHeader,
    VaccineFooter,
    TrackingHeader,
    ProgressTracker
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/scss/pages/vaccineTracking.scss";
</style>
