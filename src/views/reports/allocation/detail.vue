<template>
  <div class="d-flex flex-column">
    <span class="detail__title">{{ $t('label.allocation_detail') }}</span>
    <div class="d-flex flex-row my-4">
      <div class="d-flex flex-column mr-4">
        <span
          v-for="info in infoLabelList"
          :key="info.id"
          class="mb-2"
        >
          {{ info.label }}
        </span>
      </div>
      <div class="d-flex flex-column detail__letter-info">
        <div
          v-for="data in infoValueList"
          :key="data.label"
          class="mb-2"
        >
          <a
            v-if="data.isUrl"
            :href="data.label"
            target="_blank"
          >
            :
            <span class="detail__letter-info__url">
              {{ data.label }}
            </span>
          </a>
          <span v-else>: {{ data.label }}</span>
        </div>
      </div>
    </div>
    <DetailCard
      :list-query="listQuery"
      :table-data="detailAllocation"
      @search="handleSearch"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import infoLabelList from './detailInfoLabel'
import DetailCard from './DetailCard.vue'
export default {
  components: {
    DetailCard
  },
  data() {
    return {
      infoLabelList,
      infoValueList: [],
      listQuery: {
        search: null
      }
    }
  },
  computed: {
    ...mapState('allocation', [
      'detailAllocation'
    ])
  },
  async created() {
    await this.$store.dispatch('allocation/getDetailAllocation', this.$route.params.id)
    this.infoValueList = [
      {
        label: this.detailAllocation.letter_number
      },
      {
        label: this.detailAllocation.letter_date
      },
      {
        label: this.detailAllocation.applicant_name
      },
      {
        label: this.detailAllocation.applicant_position
      },
      {
        label: this.detailAllocation.applicant_agency_id
      },
      {
        label: this.detailAllocation.applicant_agency_name
      },
      {
        label: this.detailAllocation.description
      },
      {
        label: this.detailAllocation.letter_url,
        isUrl: true
      }
    ]
  },
  methods: {
    handleSearch() {
      console.log('search')
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

  &__letter-info {
    color: #219653;
    font-weight: 500;

    &__url {
      text-decoration: underline;
      color: #3E8DCA;
    }
  }
}
</style>
