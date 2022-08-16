<template>
  <div class="emoticon-rating">
    <span class="emoticon-rating__title">
      Bagaimana aplikasinya?
    </span>
    <div class="emoticon-rating__input">
      <div
        v-for="rate in rateList"
        :key="rate.value"
        :class="{
          'emoticon-rating__item': true,
          'mr-2': rate.value !== rateList.length
        }"
        @click="onClick(rate.value)"
      >
        <img
          :src="ratingEmotDisplay(rate.value)"
          :alt="`rating-${rate.value}`"
          height="72px"
        >
        <span>
          {{ rate.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratingValue: null,
      rateList: [
        {
          value: 1,
          label: 'Sangat Tidak \n Puas'
        },
        {
          value: 2,
          label: 'Tidak Puas'
        },
        {
          value: 3,
          label: 'Biasa Saja'
        },
        {
          value: 4,
          label: 'Puas'
        },
        {
          value: 5,
          label: 'Puas Sekali'
        }
      ]
    }
  },
  methods: {
    onClick(val) {
      this.ratingValue = val
    },
    ratingEmotDisplay(val) {
      let emotDisplay = val
      if (this.ratingValue === val) { emotDisplay += '_active' }
      return `/img/icons/rating/rating_${emotDisplay}.svg`
    }
  }
}
</script>

<style lang="scss" scoped>
.emoticon-rating {
  display: flex;
  flex-direction: column;
  text-align: center;
  background: #FAFAFA;
  padding: 20px;
  color: #757575;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: #E0E0E0;
  margin-top: 40px;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 16px;
  }

  &__input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    color: #424242;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
