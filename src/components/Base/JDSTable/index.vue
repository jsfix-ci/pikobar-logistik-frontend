<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :no-data-text="$t('label.no_data')"
    mobile-breakpoint="0"
    hide-default-footer
  >
    <template v-slot:item="{ item, index }">
      <slot name="item-prop" :item="item" :index="index" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.v-data-table::v-deep {
  .v-data-table__wrapper {
    border-radius: 8px;
  }

  .v-data-table-header {
    background-color: #069550 !important;
    color: white !important;
  }

  table {
    border-radius: 8px;
  }

  tbody {
    background-color: #FFFFFF !important;
  }

  th {
    span {
      color: white !important;
      font-size: 14px;
      font-family: 'Roboto', sans-serif;
      font-weight: 700;
    }
  }

  td {
    font-family: 'Roboto', sans-serif;
    font-size: 14px !important;
  }
}
</style>
