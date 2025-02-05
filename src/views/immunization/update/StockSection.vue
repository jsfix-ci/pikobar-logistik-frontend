<template>
  <div class="stock d-flex flex-column">
    <div class="d-flex flex-row justify-space-between align-center mb-6">
      <div class="d-flex flex-column">
        <span class="stock__title mb-2">{{ $t('label.vaccine_stock') }}</span>
        <span class="stock__subtitle">(Diupdate pada {{ updatedTime }})</span>
      </div>
      <JDSButton v-if="showDistrictStock" height="38px" :href="linkGDrive" target="_blank">
        Cek Stock Vaksin Kota/Kab
      </JDSButton>
    </div>
    <SearchInput
      v-model="listQuery.material_name"
      placeholder="Masukkan nama barang yang dicari"
      class="mb-6"
      @change="handleSearch"
    />
    <JDSTable
      :headers="headers"
      :items="listMaterial"
      :loading="loading"
    >
      <template v-slot:item-prop="{ item }">
        <tr>
          <td>{{ item.material_id || '-' }}</td>
          <td>{{ item.material_name || '-' }}</td>
          <td>{{ `${currency(item.current_stock) || '-'} ${item.UoM || '-'}` }}</td>
          <td v-if="!publicUser">{{ item.soh_location_name || '-' }}</td>
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
import FormatingNumber from '@/helpers/formattingNumber'
import JDSTable from '@/components/Base/JDSTable'
import SearchInput from '@/components/Base/SearchInput'
import JDSPagination from '@/components/JDSPagination'
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSTable,
    SearchInput,
    JDSPagination,
    JDSButton
  },
  props: {
    publicUser: {
      type: Boolean,
      default: false
    },
    stage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headers: [
        { text: this.$t('label.apd_id_specification'), sortable: false },
        { text: this.$t('label.apd_name_specification'), sortable: false },
        { text: this.$t('label.remains'), sortable: false }
      ],
      listQuery: {
        page: 1,
        limit: 5,
        material_name: ''
      },
      listMaterial: [],
      totalPage: 0,
      totalData: 0,
      updatedTime: null,
      loading: false,
      linkGDrive: 'https://docs.google.com/spreadsheets/d/14eWNVivIB3kmZv_sBiWVULdVDHzr440RaFdtkO7CwUw/edit?usp=sharing'
    }
  },
  computed: {
    ...mapState('vaccine', [
      'allocationMaterials'
    ]),
    showDistrictStock() {
      return this.stage === 'recommendation' || this.stage === 'realization'
    }
  },
  watch: {
    'listQuery.page'() {
      this.fetchData()
    }
  },
  mounted() {
    this.listQuery.material_name = ''
    this.fetchData()
    this.updatedTime = `${this.$moment().subtract(15, 'minutes').format('D MMMM YYYY, HH:mm')}`
    if (!this.publicUser) { this.headers.push({ text: this.$t('label.location_stock'), sortable: false }) }
  },
  methods: {
    handleSearch() {
      this.listQuery.page = 1
      this.fetchData()
    },
    async fetchData() {
      this.loading = true
      await this.$store.dispatch('vaccine/getStock', this.listQuery)
      this.listMaterial = [...this.allocationMaterials.data]
      this.totalPage = this.allocationMaterials.last_page
      this.totalData = this.allocationMaterials.total
      this.loading = false
    },
    currency(value) {
      const formattingNumber = new FormatingNumber()
      return formattingNumber.formatCurrency(value)
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
