<template>
  <v-data-table
    :items="items"
    :no-data-text="$t('label.no_data')"
    :loading="loading"
    :loading-text="loadingText"
    :options.sync="options"
    mobile-breakpoint="0"
    hide-default-footer
  >
    <template v-slot:item="{ item, index }">
      <slot name="item-prop" :item="item" :index="index" />
    </template>

    <template v-slot:header>
      <thead>
        <tr>
          <th
            v-for="item in headers"
            :key="item.value"
            class="v-data-table-header"
            @click="item.sortable === undefined || item.sortable ? onSort(item.value) : ''"
          >
            <div class="d-flex flex-row justify-space-between align-center">
              {{ item.text }}
              <img
                v-if="item.sortable === undefined || item.sortable"
                width="16"
                height="16"
                alt="sort"
                class="v-data-table-header__sort"
                :src="sortIcon(item)"
              >
            </div>
          </th>
        </tr>
      </thead>
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
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: 'Sedang memuat data'
    }
  },
  data() {
    return {
      options: {}
    }
  },
  mounted() {
    if (this.items.length === 0) {
      const emptyDataColumn = document.getElementsByClassName('v-data-table__empty-wrapper')[0].children[0]
      emptyDataColumn.setAttribute('colspan', this.headers.length)
    }
  },
  methods: {
    onSort(column) {
      if (this.options.sortBy[0] === column) {
        if (this.options.sortDesc[0]) {
          this.options.sortDesc.splice(0, 1)
          this.options.sortBy.splice(0, 1)
        } else {
          this.options.sortDesc[0] = true
        }
      } else {
        this.options.sortBy = []
        this.options.sortDesc = []
        this.options.sortBy.push(column)
        this.options.sortDesc.push(false)
      }
      this.$emit('onSort', this.options)
    },
    sortIcon(item) {
      if (item.value === this.options.sortBy[0]) {
        return this.options.sortDesc[0] ? '/img/icons/descending.svg' : '/img/icons/ascending.svg'
      } else {
        return '/img/icons/sortable.svg'
      }
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
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;

    &__sort:hover {
      cursor: pointer;
    }
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
