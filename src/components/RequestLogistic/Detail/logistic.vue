<template>
  <div>
    <p class="text-label mb-1">{{ title }}</p>
    <div class="list-logistic">
      <div v-for="data in items" :key="data.subtitle" class="mb-5">
        <div>
          <p class="d-inline-block text-label mb-2">{{ data.subtitle }}</p>
          <v-icon v-if="data.isOpen" @click.passive="hide(data.type)">mdi-chevron-up</v-icon>
          <v-icon v-else @click.passive="show(data.type)">mdi-chevron-down</v-icon>
        </div>
        <JDSTable
          v-show="data.isOpen"
          :headers="data.headers"
          :items="data.items.data"
          :loading="false"
        >
          <template v-slot:item-prop="{ item, index }">
            <tr :class="{'text-grey': item.status === 'not_approved' && data.type !== 'request'}">
              <td>{{ index + 1 }}</td>
              <td style="max-width: 20rem">{{ item.product_name || '-' }}</td>
              <td>{{ item.brand || '-' }}</td>
              <td>{{ item.quantity || '-' }}</td>
              <td>{{ item.unit || '-' }}</td>
              <td v-if="data.type === 'request'">{{ item.category }}</td>
              <td
                v-if="data.type !== 'request'"
                class="font-weight-bold red--text"
                :class="{ 'green--text': item.status !== 'not_approved' }"
              >
                {{ setStatus(item.status) }}
              </td>
              <td v-if="displayAction(data.type)" :class="{'action-width': isAdminRealization}">
                <JDSButton height="25px" width="75px" @click="updateItem(item, data.type)">
                  {{ $t('label.update') }}
                </JDSButton>
                <slot name="item-prop" :item="item" :type="data.type" />
              </td>
            </tr>
          </template>
        </JDSTable>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
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
    status: {
      type: String,
      default: ''
    },
    isAdminRealization: {
      type: Boolean,
      default: false
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
      this.$emit('update', item, type, this.isAdminRealization)
    },
    hide(type) {
      this.$emit('hide', type)
    },
    show(type) {
      this.$emit('show', type)
    },
    displayAction(type) {
      return (this.status === 'VERIFIED' && type === 'recommendation') || (this.status === 'APPROVED' && type === 'realization')
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
          return this.$t('label.not_available')
        case 'replaced':
          return this.$t('label.replaced')
        case 'not_yet_fulfilled':
          return this.$t('label.not_yet_fulfilled')
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
.text-grey {
  color: #E0E0E0;
}
.action-width {
  width: 12rem;
}
</style>
