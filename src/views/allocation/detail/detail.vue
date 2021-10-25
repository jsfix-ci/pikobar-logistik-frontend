<template>
  <div class="d-flex flex-column">
    <span class="detail__title">
      {{ $t('label.allocation_detail') }}
    </span>
    <DetailInfo
      :list-label="infoLabelList"
      :list-value="infoValueList"
    />
    <DetailCard
      :list-query="listQuery"
      :table-data="detailAllocationData"
      :table-header="tableHeader"
      :dynamic-header="detailAllocationInfo.allocation_material_requests"
      @search="handleSearch"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import infoLabelList from './infoLabel'
import listHeader from './tableHeader'
import FormattingNumber from '../../../helpers/formattingNumber'
import DetailInfo from './DetailInfo.vue'
import DetailCard from './DetailCard.vue'
export default {
  components: {
    DetailInfo,
    DetailCard
  },
  data() {
    return {
      infoLabelList,
      listHeader,
      tableHeader: [],
      infoValueList: [],
      listQuery: {
        search: null
      }
    }
  },
  computed: {
    ...mapState('allocation', [
      'detailAllocationInfo',
      'detailAllocationData'
    ])
  },
  async created() {
    this.tableHeader.push(...this.listHeader)
    await this.$store.dispatch('allocation/getDetailAllocationInfo', this.$route.params.id)
    await this.handleSearch()
    this.assignDetailInfo()
    this.createTableHeader()
  },
  methods: {
    async handleSearch() {
      await this.$store.dispatch('allocation/getDetailAllocationData', this.listQuery)
    },
    assignDetailInfo() {
      this.infoValueList = [
        {
          label: this.detailAllocationInfo.letter_number
        },
        {
          label: this.detailAllocationInfo.letter_date
        },
        {
          label: this.detailAllocationInfo.applicant_name
        },
        {
          label: this.detailAllocationInfo.applicant_position
        },
        {
          label: this.detailAllocationInfo.applicant_agency_id
        },
        {
          label: this.detailAllocationInfo.applicant_agency_name
        },
        {
          label: this.detailAllocationInfo.distribution_description
        },
        {
          label: this.detailAllocationInfo.letter_url,
          isUrl: true
        }
      ]
    },
    createTableHeader() {
      const dynamicHeader = []
      for (let i = 0; i < this.detailAllocationInfo.allocation_material_requests.length; i++) {
        const header = this.detailAllocationInfo.allocation_material_requests[i]
        dynamicHeader.push({
          materialId: header.material_id,
          label: header.material_name,
          total: this.formattingNumber(header.total_qty),
          isDynamic: true
        })
      }
      this.tableHeader.splice.apply(this.tableHeader, [2, 0].concat(dynamicHeader))
    },
    formattingNumber(value) {
      const format = new FormattingNumber()
      return format.formatCurrency(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  &__title {
    font-family: "Product Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    color: black;
  }
}
</style>
