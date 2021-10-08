<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th
            v-for="header in tableHeader"
            :key="header.label"
            :class="header.class"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="listData.length === 0">
          <td
            colspan="7"
            class="text-center"
          >
            {{ $t('label.no_data') }}
          </td>
        </tr>
        <tr
          v-for="(data, index) in listData"
          v-else
          :key="data.id"
        >
          <td>{{ getTableRowNumbering(index) }}</td>
          <td>{{ data.letter_number }}</td>
          <td>{{ data.allocation_distribution_requests_count }}</td>
          <td>{{ data.allocation_material_requests_total }}</td>
          <td>{{ $moment(data.letter_date).format('D MMMM YYYY') }}</td>
          <td>
            <span
              :class="{
                'status__draft': data.status === 'draft',
                'status__success': data.status === 'success'
              }"
            >
              {{ capitalize(data.status) }}
            </span>
          </td>
          <td class="text-center">
            <v-btn
              text
              small
              color="info"
              @click="toDetail(data)"
            >
              {{ $t('label.detail') }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import tableHeader from './tableHeader'
export default {
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    listQuery: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableHeader
    }
  },
  methods: {
    toDetail(data) {
      this.$router.push(`/allocation/${data.id}`)
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  &__draft {
    background-color: #757575;
    color: white;
    border: 1px solid;
    border-radius: 12px;
    padding: 8px;
  }
  &__success {
    background-color: #16A75C;
    color: white;
    border: 1px solid;
    border-radius: 12px;
    padding: 8px;
  }
}
</style>
