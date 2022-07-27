<template>
  <div
    :class="{
      'disabled-field': true,
      'disabled-field--info': info
    }"
  >
    <slot name="prepend" />
    <div class="d-flex flex-column">
      <span
        :class="{
          'disabled-field__label': true,
          'disabled-field__label--info': info
        }"
      >
        {{ label }}
      </span>
      <div v-if="Array.isArray(value)">
        <ul>
          <li v-for="item in value" :key="item" class="disabled-field__value mb-1">
            {{ item }}
          </li>
        </ul>
      </div>
      <span
        v-else
        :class="{
          'disabled-field__value': true,
          'disabled-field__value--info': info
        }"
      >
        {{ value }}
      </span>
    </div>
    <slot name="append" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    info: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

.disabled-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #FAFAFA;
  border-color: #E0E0E0;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  padding: 8px 16px;

  &--info {
    background: #E3F2FD;
    border-color: #42A5F5;
  }

  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
    margin-bottom: 8px;

    &--info {
      color: #1E88E5;
    }
  }

  &__value {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #424242 !important;

    &--info {
      color: #0D47A1 !important;
    }
  }
}
</style>
