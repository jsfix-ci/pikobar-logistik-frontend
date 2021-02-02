<template>
  <v-row v-if="total > 0" justify="space-between" class="mt-auto pb-6">
    <v-col cols="12" md="1" sm="1">
      <v-select
        v-model="pageSize"
        class="text-body-2"
        :items="pageSizes"
        filled
        solo
        dense
        label="Baris"
        @change="changePageSize"
      />
    </v-col>
    <v-col>
      <div class="float-right mr-n2">
        <v-pagination
          v-model="currentPage"
          :length="currentTotal"
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
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
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
    currentTotal: {
      get() {
        return this.total
      },
      set(val) {
        this.$emit('update:total', val)
      }
    },
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
    setPagination(total, page, limit) {
      this.currentPage = page
      this.pageSize = limit
      this.currentTotal = total
      console.log(total + ' ' + page + ' ' + limit)
      console.log(this.currentTotal + ' ' + this.currentPage + ' ' + this.pageSize)
    },
    changePageSize(value) {
      console.log('changePageSize', value)
      this.pageSize = value
      this.currentPage = 1
      this.onNext()
    }
  }
}
</script>
