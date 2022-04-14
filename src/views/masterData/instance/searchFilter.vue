<template>
  <v-row>
    <v-col cols="12" sm="2">
      <v-select
        v-model="listQuery.sort"
        :items="sortOption"
        solo
        item-text="label"
        item-value="value"
        :clearable="true"
        :placeholder="$t('label.sort')"
        @change="handleSearch"
      />
    </v-col>
    <v-col cols="12" sm="5">
      <v-text-field
        v-model="listQuery.search"
        solo
        :placeholder="$t('label.search_instance_name')"
        prepend-inner-icon="search"
        @change="handleSearch"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'SearchFilterInstance',
  props: {
    listQuery: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ]
    }
  },
  methods: {
    handleSearch(value) {
      this.$emit('handle-search', value)
    }
  }
}
</script>
