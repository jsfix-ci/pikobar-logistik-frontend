<template>
  <div class="d-flex flex-row my-4">
    <div class="d-flex flex-column mr-4">
      <span
        v-for="info in listLabel"
        :key="info.id"
        class="mb-2"
      >
        {{ info.label }}
      </span>
    </div>
    <div class="d-flex flex-column detail-info">
      <div
        v-for="data in listValue"
        :key="data.label"
        class="mb-2"
      >
        <a
          v-if="data.isUrl"
          :href="data.label"
          target="_blank"
        >
          :
          <span class="detail-info__url">
            {{ data.label }}
          </span>
        </a>
        <span v-else>: {{ data.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listLabel: {
      type: Array,
      default: () => []
    },
    listValue: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-info {
  color: #219653;
  font-weight: 500;

  &__url {
    text-decoration: underline;
    color: #3E8DCA;
  }
}
</style>
