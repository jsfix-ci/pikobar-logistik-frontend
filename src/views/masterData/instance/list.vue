<template>
  <div>
    <search-filter-instance
      :list-query="listQuery"
      @handle-search="handleSearch"
    />
    <data-table-instance
      :headers="headers"
      :items="faskesList"
      :list-query="listQuery"
    />
    <pagination
      :total="totalList"
      :total-data="totalData"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchFilterInstance from './searchFilter.vue'
import DataTableInstance from './dataTable.vue'
export default {
  name: 'ListOtherInstance',
  components: {
    DataTableInstance,
    SearchFilterInstance
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('label.number').toUpperCase(),
          align: 'start',
          sortable: false,
          value: 'numbering_item',
          width: 75
        },
        { text: this.$t('label.instance_name').toUpperCase(),
          value: 'nama_faskes',
          width: 300
        },
        { text: this.$t('label.city_district').toUpperCase(),
          value: 'village.kemendagri_kabupaten_nama',
          width: 300
        },
        { text: this.$t('label.number_phone').toUpperCase(),
          value: 'nomor_telepon',
          width: 300
        },
        { text: this.$t('label.action').toUpperCase(),
          value: 'actions',
          align: 'center'
        }
      ],
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        sort: null,
        search: null,
        is_faskes: 0,
        nama_faskes: null
      }
    }
  },
  computed: {
    ...mapGetters('faskes', [
      'faskesList',
      'totalList',
      'totalData'
    ])
  },
  watch: {
    'listQuery.search': {
      handler: function(value) {
        if (value.length >= 3 || value.length === 0) {
          this.listQuery.page = 1
          this.listQuery.nama_faskes = value
          this.handleSearch()
        }
      },
      immediate: true
    }
  },
  created() {
    this.getListFaskes()
  },
  methods: {
    async getListFaskes() {
      await this.$store.dispatch('faskes/getListFaskes', this.listQuery)
    },
    async handleSearch() {
      await this.getListFaskes()
    },
    async onNext() {
      await this.getListFaskes()
    }
  }
}
</script>
