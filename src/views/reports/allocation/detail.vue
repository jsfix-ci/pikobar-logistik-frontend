<template>
  <div class="d-flex flex-column">
    <span class="detail__title">{{ $t('label.allocation_detail') }}</span>
    <div class="d-flex flex-row my-4">
      <div class="d-flex flex-column mr-4">
        <span class="mb-2">{{ $t('label.allocation_outgoing_letter_number') }} :</span>
        <span>{{ $t('label.allocation_official_letter_number') }} :</span>
      </div>
      <div class="d-flex flex-column detail__letter-info">
        <span class="mb-2">SK/034/dinkes/03/2020</span>
        <span>SK/034/dinkes/03/2020</span>
      </div>
    </div>
    <DetailCard />
  </div>
</template>

<script>
import DetailCard from './DetailCard.vue'
export default {
  components: {
    DetailCard
  }
}
</script>

<style lang="scss" scoped>
.detail {
  &__title {
    font-family: "Product Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    color: black;
  }

  &__letter-info {
    color: #219653;
    font-weight: 500;
  }
}
</style>
