<template>
  <v-dialog
    :value="value"
    max-width="500px"
    :persistent="persistent"
    @click:outside="$emit('input', false)"
  >
    <div class="confirmation-dialog">
      <img
        v-if="content.image"
        :src="content.image"
        alt="dialog-image"
        width="320"
        height="187"
      >
      <span class="confirmation-dialog__title" style="white-space:pre-wrap;">
        {{ content.title }}
      </span>
      <span v-if="content.subtitle" class="confirmation-dialog__subtitle" style="white-space:pre-wrap;">
        {{ content.subtitle }}
      </span>
      <div class="d-flex flex-row justify-space-between mt-10" style="width: 100%">
        <JDSButton
          v-if="content.buttonLeft"
          :inverted="content.buttonLeft.isInverted"
          height="42px"
          :width="content.buttonRight ? '200px' : '420px'"
          @click="content.buttonLeft.onClick"
        >
          {{ content.buttonLeft.label }}
        </JDSButton>
        <JDSButton
          v-if="content.buttonRight"
          :inverted="content.buttonRight.isInverted"
          height="42px"
          :width="content.buttonLeft ? '200px' : '420px'"
          @click="content.buttonRight.onClick"
        >
          {{ content.buttonRight.label }}
        </JDSButton>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSButton
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    },
    content: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.confirmation-dialog {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #424242;
    text-align: center;
    margin-top: 40px;
  }

  &__subtitle {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #757575;
    text-align: center;
  }

  &__note {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #424242;
    line-height: 16px;
  }
}
</style>
