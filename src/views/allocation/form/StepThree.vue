<template>
  <div class="d-flex flex-column">
    <span class="step-three__title">
      {{ $t('label.detail_logistic_allocation_info') }}
    </span>
    <!-- @todo: add more props in AllocationTableDetail component -->
    <AllocationTableDetail
      :table-header="tableHeader"
      :table-data="allocationForm.instance_list"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AllocationTableDetail from '../AllocationTableDetail.vue'
import listHeader from '../detail/tableHeader'
export default {
  components: {
    AllocationTableDetail
  },
  data() {
    return {
      listHeader,
      tableHeader: [],
      tableData: {
        allocation_distribution_requests: [],
        allocation_material_requests: []
      }
    }
  },
  computed: {
    ...mapState('allocation', [
      'allocationForm'
    ])
  },
  created() {
    this.tableHeader = [...this.listHeader]
  }
}
</script>

<style lang="scss" scoped>
.step-three {
  &__title {
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
