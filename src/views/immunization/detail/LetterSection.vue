<template>
  <div class="d-flex flex-column">
    <!-- Section Title -->
    <div class="d-flex flex-row align-center my-6">
      <span class="letter__section-title">{{ $t('label.applicant_letter') }}</span>
      <img
        src="/img/icons/arrow-down.svg"
        alt="arrow-down"
        height="18px"
        :class="{
          'letter__arrow': true,
          'letter__arrow--right': !showContent
        }"
        @click="onClick"
      >
    </div>

    <!-- Letter Field -->
    <DisabledField
      v-model="letter"
      :label="$t('label.letter_number')"
      :class="{
        'mb-8': showContent,
        'd-none': !showContent
      }"
    >
      <template #append>
        <JDSButton class="ml-6" height="38px" :href="link" target="_blank">
          {{ $t('label.download') }}
        </JDSButton>
      </template>
    </DisabledField>
  </div>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
import DisabledField from '@/components/Base/DisabledField'
export default {
  components: {
    DisabledField,
    JDSButton
  },
  props: {
    letter: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showContent: false
    }
  },
  methods: {
    onClick() {
      this.showContent = !this.showContent
    }
  }
}
</script>

<style lang="scss" scoped>
.letter {
  &__section-title {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #BDBDBD;
    margin-right: 15px;
  }

  &__arrow {
    &--right {
       transform: rotate(270deg);
     }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
