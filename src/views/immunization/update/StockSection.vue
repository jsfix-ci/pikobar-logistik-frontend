<template>
  <div class="stock d-flex flex-column">
    <span class="stock__title mb-2">{{ $t('label.vaccine_stock') }}</span>
    <span class="stock__subtitle mb-6">(Diupdate pada 18 Februari 2022, 16:03)</span>
    <SearchInput
      v-model="listQuery.material_name"
      placeholder="Masukkan nama barang yang dicari"
      class="mb-6"
      @change="handleSearch"
    />
    <JDSTable
      :headers="headers"
      :items="listMaterial"
    >
      <template v-slot:item-prop="{ item }">
        <tr>
          <td>{{ item.material_id || '-' }}</td>
          <td>{{ item.material_name || '-' }}</td>
          <td>{{ item.agency_name || '-' }}</td>
          <td>{{ item.soh_location_name || '-' }}</td>
        </tr>
      </template>
    </JDSTable>
    <JDSPagination
      :key="totalPage"
      :init-page="listQuery.page"
      :total-page="totalPage"
      :page.sync="listQuery.page"
      @onPrev="fetchData"
      @onNext="fetchData"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JDSTable from '@/components/Base/JDSTable'
import SearchInput from '@/components/Base/SearchInput'
import JDSPagination from '@/components/JDSPagination'
export default {
  components: {
    JDSTable,
    SearchInput,
    JDSPagination
  },
  data() {
    return {
      headers: [
        { text: this.$t('label.apd_id_specification'), sortable: false },
        { text: this.$t('label.apd_name_specification'), sortable: false },
        { text: this.$t('label.remains'), sortable: false },
        { text: this.$t('label.location_stock'), sortable: false }
      ],
      listQuery: {
        page: 1,
        limit: 5,
        material_name: ''
      },
      listMaterial: [],
      totalPage: 0,
      totalData: 0
    }
  },
  computed: {
    ...mapState('vaccine', [
      'allocationMaterials'
    ])
  },
  watch: {
    'listQuery.page'() {
      this.fetchData()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleSearch() {
      this.listQuery.page = 1
      this.fetchData()
    },
    async fetchData() {
      await this.$store.dispatch('vaccine/getStock', this.listQuery)
      this.listMaterial = [...this.allocationMaterials.data]
      this.totalPage = this.allocationMaterials.last_page
      this.totalData = this.allocationMaterials.total
    }
  }
}
</script>

<style lang="scss" scoped>
.stock {
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  border-color: #E0E0E0;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #757575;
  }

  &__subtitle {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #757575;
  }
}
</style>
