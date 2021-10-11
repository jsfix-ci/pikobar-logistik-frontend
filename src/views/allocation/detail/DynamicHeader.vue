<template>
  <div class="d-flex flex-column">
    <span class="content px-4">
      {{ header.materialId }}
    </span>
    <span class="content px-4">
      {{ header.label }}
    </span>
    <span class="px-4">
      {{ $t('label.total_2') }} : {{ header.total }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  border-bottom: 1px solid white;
}
</style>
