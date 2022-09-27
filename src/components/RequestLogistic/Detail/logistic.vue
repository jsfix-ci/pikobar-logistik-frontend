<template>
  <div>
    <p class="text-label mb-1">{{ title }}</p>
    <div class="list-logistic">
      <div v-for="data in items" :key="data.subtitle" class="mb-5">
        <p class="text-label mb-1">{{ data.subtitle }}</p>
        <JDSTable
          :headers="data.headers"
          :items="data.items"
        >
          <template v-slot:item-prop="{ item, index }">
            <tr>
              <td>{{ index }}</td>
              <td>{{ item.approved_at ? $moment(item.approved_at).format('D MMMM YYYY') : '-' }}</td>
              <td>{{ item.agency_name || '-' }}</td>
              <td>{{ item.id || '-' }}</td>
              <td>
                <span
                  :class="{
                    'urgency': true,
                    'urgency--red': item.is_urgency || item.is_cito
                  }"
                >
                  {{ item.is_cito ? 'Mendesak' : item.is_urgency ? 'Segera' : 'Biasa' }}
                </span>
              </td>
              <td>{{ item.is_letter_file_final ? 'Final' : 'Draft' }}</td>
              <td>
                <JDSButton inverted height="25px" @click="onDetail(item.id)">
                  {{ $t('label.update') }}
                </JDSButton>
              </td>
            </tr>
          </template>
        </JDSTable>
      </div>
    </div>
  </div>
</template>
<script>
/*
  PR numbering table
  apakah table ada pagination?
  Button bisa update
  tambahkan icon hide and show pada setiap section
  sesuaikan value dari table
  action dibikin dinamis
*/
import JDSTable from '@/components/Base/JDSTable'
import JDSButton from '@/components/Base/JDSButton'
import { getTableRowNumbering } from '@/helpers/tableDisplay'
export default {
  name: 'CardLogistic',
  components: {
    JDSTable,
    JDSButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getTableRowNumbering
  }
}
</script>
<style lang="scss" scoped>
.list-logistic {
  border: 1px solid #E0E0E0;
  padding: 1.2rem 1.2rem;
  border-radius: 0.3rem;
}
.text-label {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: #757575;
}
</style>
