<template>
  <v-simple-table class="mt-8">
    <template v-slot:default>
      <thead class="allocation-table-detail__header">
        <tr>
          <th
            v-for="header in tableHeader"
            :key="header.label"
            class="allocation-table-detail__header__cell text-center"
            :class="{ 'px-0': header.isDynamic }"
          >
            <DynamicHeader
              v-if="header.isDynamic"
              :header="header"
            />
            <span v-else>
              {{ header.label }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in tableData.allocation_distribution_requests" :key="data.id">
          <td>{{ index + 1 }}</td>
          <td>{{ data.agency_name || '-' }}</td>
          <!-- Loop through the dynamic columns -->
          <td v-for="material in tableData.allocation_material_requests" :key="material.material_id">
            {{ displayDynamicColumn(material, data.allocation_material_requests) }}
          </td>
          <td>
            {{ data.distribution_plan_date ? $moment(data.distribution_plan_date).format('D MMMM YYYY') : '-' }}
          </td>
          <td>{{ data.additional_information || '-' }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import DynamicHeader from './DynamicHeader.vue'
export default {
  components: {
    DynamicHeader
  },
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    displayDynamicColumn(obj, array) {
      // Find obj in array using material_id
      const result = array.find(item => {
        return item.material_id === obj.material_id
      })
      return result ? result.qty : '-'
    }
  }
}
</script>

<style lang="scss" scoped>
.allocation-table-detail {
  &__header {
    background-color: #069550;

    &__cell {
      color: white !important;
      font-size: 14px !important;
      border: 1px solid white;
    }
  }
}
</style>
