<template>
  <v-row v-if="total > 0" class="pb-6 mt-1">
    <v-col>
      <v-row>
        <v-col v-if="totalData" cols="6">
          <v-text-field
            :value="'Total Data: ' + totalData"
            outlined
            filled
            solo
            dense
            readonly
          />
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            outlined
            filled
            solo
            dense
            label="Baris"
            @change="changePageSize"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="8" class="mr-n2">
      <v-row>
        <v-col>
          <v-pagination
            v-model="currentPage"
            :length="total"
            :total-visible="6"
            class="float-right"
            @input="onNext"
          />
        </v-col>
      </v-row>
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
    totalData: {
      type: Number,
      default: null
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
      if (this.onNext !== null) this.onNext()
    }
  }
}
</script>
