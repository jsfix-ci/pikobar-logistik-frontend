<template>
  <div>
    <div v-for="item in items" :key="item.title" class="detail-info">
      <span class="text-label detail-info__label detail-info__text--gray">{{ item.title }}</span>
      <span class="mr-1">:</span>
      <span class="ml-1 text-label detail-info__text--green">{{ item.value }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailInfo',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    status: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-info {
  display: flex;
  flex-direction: row;
  background: transparent;
  max-width: 30rem;

  &__label {
    width: 10rem;
  }

  &__text {

    &--green {
      color: #1FB767;
    }

    &--gray {
      color: #757575;
    }
  }
}

.text-label {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
}
</style>
