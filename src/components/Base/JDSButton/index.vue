<template>
  <v-btn
    depressed
    :height="height"
    min-width="0px"
    :class="{
      'jds-button py-4 px-6': true,
      'green-dark white--text': !inverted,
      'jds-button__inverted green-dark--text': inverted
    }"
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    inverted: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="scss" scoped>
.jds-button {
  text-transform: none;
  letter-spacing: 0;
  font-family: 'Lato', serif;
  font-weight: 700;
  font-size: 14px;
  height: auto;

  &__inverted {
    border-color: #069550;
    border-style: solid;
    border-width: 1px;
    background: transparent !important;
  }
}
</style>
