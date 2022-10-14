<template>
  <div>
    <p class="text-label mb-1">{{ title }}</p>
    <div class="list-logistic">
      <div v-for="data in items" :key="data.subtitle" class="mb-5">
        <div>
          <p class="d-inline-block text-label mb-2">{{ data.subtitle }}</p>
          <v-icon v-if="data.isOpen">mdi-chevron-up</v-icon>
          <v-icon v-else>mdi-chevron-down</v-icon>
        </div>
        <JDSTable
          v-show="data.isOpen"
          :headers="data.headers"
          :items="data.items.data"
          :loading="false"
        >
          <template v-slot:item-prop="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ item.product_name || '-' }}</td>
              <td>{{ item.brand || '-' }}</td>
              <td>{{ item.quantity || '-' }}</td>
              <td>{{ item.unit || '-' }}</td>
              <td v-if="data.type === 'request'">{{ item.category }}</td>
              <td
                v-if="data.type === 'recommendation'"
                class="font-weight-bold red--text"
                :class="{ 'green--text': item.status !== 'not_approved' }"
              >
                {{ setStatus(item.status) }}
              </td>
              <td v-if="data.type !== 'request'">
                <JDSButton inverted height="25px" @click="updateItem(item, data.type)">
                  {{ $t('label.update') }}
                </JDSButton>
              </td>
            </tr>
          </template>
        </JDSTable>
        <!-- <v-pagination
          v-model="page"
          :length="6"
          :total-visible="3"
        /> -->
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
    },
    dataTable: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      page: 2
    }
  },
  methods: {
    getTableRowNumbering,
    updateItem(item, type) {
      this.$emit('update', item, type)
    },
    setStatus(status) {
      switch (status) {
        case 'approved':
          return this.$t('label.approved')
        case 'not_delivered':
          return this.$t('label.not_delivered')
        case 'delivered':
          return this.$t('label.delivered')
        case 'not_available':
          return this.$t('label.not_available') // tidak akan ngisi nama barang
        case 'replaced':
          return this.$t('label.replaced')
        case 'not_yet_fulfilled':
          return this.$t('label.not_yet_fulfilled') // tidak akan ngisi nama barang
        default:
          return this.$t('label.not_approved')
      }
    }
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
