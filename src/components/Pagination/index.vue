<template>
  <v-row v-if="total > 0" justify="space-between">
    <v-col cols="12" md="2" sm="2">
      <v-select
        v-model="pageSize"
        :items="pageSizes"
        filled
        solo
        label="Baris"
        @change="changePageSize"
      />
    </v-col>
    <v-col>
      <div style="float: right;padding-bottom: 40px;">
        <v-pagination
          v-model="currentPage"
          :length="total"
          :total-visible="6"
          @input="onNext"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30]
      }
    },
    onNext: {
      type: Function,
      default: null
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    changePageSize(value) {
      this.pageSize = value
      this.currentPage = 1
      this.onNext()
    }
  }
}
</script>
