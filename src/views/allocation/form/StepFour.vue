<template>
  <div class="step-four d-flex flex-column align-center">
    <img height="200" src="../../../static/berhasil.svg">
    <span class="step-four__title my-5">
      {{ $t('label.save_success') }}
    </span>
    <p class="step-four__description text-center">
      {{ $t('label.allocation_loading_done') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.step-four {
  background-image: url('../../../static/allocation_done_background.svg');
  background-position: center bottom;
  min-height: 450px;

  &__title {
    font-size: 20px;
    font-weight: 400;
  }

  &__description {
    max-width: 25%;
  }
}
</style>
