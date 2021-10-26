<template>
  <div>
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
          <tr v-for="(data, index) in tableData" :key="data.id">
            <td>{{ getTableRowNumbering(index) }}</td>
            <td>{{ data.agency_name || '-' }}</td>
            <!-- Loop through the dynamic columns -->
            <td v-for="material in dynamicHeader" :key="material.material_id">
              {{ displayDynamicHeader(material, data.allocation_material_requests) }}
            </td>
            <td>
              {{ data.distribution_plan_date ? $moment(data.distribution_plan_date).format('D MMMM YYYY') : '-' }}
            </td>
            <td>{{ data.additional_information || '-' }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <pagination
      :total="totalPage"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="() => $emit('onNext')"
      class="px-5"
    />
  </div>
</template>

<script>
import DynamicHeader from './DynamicHeader.vue'
import { displayDynamicHeader } from './tableHeader'
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
    },
    dynamicHeader: {
      type: Array,
      default: () => []
    },
    listQuery: {
      type: Object,
      default: () => ({})
    },
    totalPage: {
      type: Number,
      default: 0
    }
  },
  methods: {
    displayDynamicHeader,
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
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
