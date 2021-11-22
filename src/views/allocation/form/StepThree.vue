<template>
  <div class="d-flex flex-column">
    <DetailInfo
      :list-label="infoLabelList"
      :list-value="infoValueList"
    />
    <StepThreeDetail
      :list-instance="allocationForm.instance_list"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import infoLabelList from '../detail/infoLabel'
import DetailInfo from '../detail/DetailInfo.vue'
import StepThreeDetail from './StepThreeDetail.vue'
export default {
  components: {
    DetailInfo,
    StepThreeDetail
  },
  data() {
    return {
      infoLabelList,
      infoValueList: []
    }
  },
  computed: {
    ...mapState('allocation', [
      'allocationForm'
    ])
  },
  watch: {
    allocationForm: {
      deep: true,
      handler: function() {
        this.infoValueList = [
          {
            label: this.allocationForm?.letter_number
          },
          {
            label: this.$moment(this.allocationForm?.letter_date).format('DD MMMM YYYY')
          },
          {
            label: this.allocationForm?.applicant_name
          },
          {
            label: this.allocationForm?.applicant_position
          },
          {
            label: this.allocationForm?.applicant_agency_id
          },
          {
            label: this.allocationForm?.applicant_agency_name
          },
          {
            label: this.allocationForm?.distribution_description
          },
          {
            label: this.allocationForm?.letter_url,
            isUrl: true
          }
        ]
      }
    }
  }
}
</script>
