<template>
  <div class="disabled-field">
    <span class="disabled-field__label">
      {{ label }}
    </span>
    <span class="disabled-field__value">
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

.disabled-field {
  display: flex;
  flex-direction: column;
  background: #FAFAFA;
  border-color: #E0E0E0;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  padding: 16px;

  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
    margin-bottom: 8px;
  }

  &__value {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #424242;
  }
}
</style>
