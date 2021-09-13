<template>
  <v-card outlined>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
            <th class="text-left">{{ $t('label.apd_name_specification') }}</th>
            <th class="text-left">{{ $t('label.description') }}</th>
            <th class="text-left">{{ $t('label.total') }}</th>
            <th class="text-left">{{ $t('label.unit') }}</th>
            <th class="text-left">{{ $t('label.purpose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="logisticNeeds.length === 0">
            <td class="text-center-data-confirmation" :colspan="7">{{ $t('label.no_data') }}</td>
          </tr>
          <tr v-for="(item, index) in dataShow" v-else :key="item.index">
            <td>{{ getTableRowNumbering(index) }}</td>
            <td>{{ item.unitList[0].name }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.unitList[0].unit }}</td>
            <td>{{ item.purpose }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>
<script>
export default {
  name: 'ListLogistic',
  props: {
    logisticNeeds: {
      type: Array,
      default: null
    },
    dataShow: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 3
      }
    }
  },
  methods: {
    getTableRowNumbering(index) {
      return ((parseInt(this.listQuery.page) - 1) * parseInt(this.listQuery.limit)) + (parseInt(index) + 1)
    }
  }
}
</script>
