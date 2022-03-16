<template>
  <div class="d-flex flex-column">
    <!-- Section Title -->
    <div class="d-flex flex-row align-center mb-6">
      <span class="detail-table__section-title">
        {{ `${$t('label.request')} (${$t('label.immunization')})` }}
      </span>
      <img
        src="/img/icons/arrow-down.svg"
        alt="arrow-down"
        height="18px"
        @click="onClick"
      >
    </div>

    <!-- Vaccine -->
    <div class="detail-table__table-container d-flex flex-column">
      <span class="detail-table__table-container__title">
        {{ $t('label.vaccine') }}
      </span>
      <JDSTable
        :headers="headers"
        :items="listVaccine"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.vaccine_product.name || '-' }}</td>
            <td>{{ item.quantity || '-' }}</td>
            <td>{{ item.unit || '-' }}</td>
            <td>{{ item.usage || '-' }}</td>
            <td>{{ item.note || '-' }}</td>
          </tr>
        </template>
      </JDSTable>
    </div>

    <!-- Vaccine Support -->
    <div class="detail-table__table-container d-flex flex-column mt-6">
      <span class="detail-table__table-container__title">
        {{ $t('label.logistic_vaccine_supporter') }}
      </span>
      <JDSTable
        :headers="headers"
        :items="listVaccineSupport"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.vaccine_product.name || '-' }}</td>
            <td>{{ item.quantity || '-' }}</td>
            <td>{{ item.unit || '-' }}</td>
            <td>{{ item.usage || '-' }}</td>
            <td>{{ item.note || '-' }}</td>
          </tr>
        </template>
      </JDSTable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JDSTable from '@/components/Base/JDSTable'
export default {
  components: {
    JDSTable
  },
  data() {
    return {
      listVaccine: [],
      listVaccineSupport: [],
      headers: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.print_mail_material_name'), sortable: false },
        { text: this.$t('label.total'), sortable: false },
        { text: this.$t('label.unit'), sortable: false },
        { text: this.$t('label.purpose'), sortable: false },
        { text: this.$t('label.note'), sortable: false }
      ]
    }
  },
  computed: {
    ...mapState('vaccine', [
      'vaccineProductRequests'
    ])
  },
  async mounted() {
    await this.$store.dispatch('vaccine/getVaccineProductRequests', { vaccine_request_id: this.$route.params.id })
    this.mapVaccineItem()
  },
  methods: {
    mapVaccineItem() {
      this.vaccineProductRequests.forEach(item => {
        item.category === 'vaccine'
          ? this.listVaccine.push(item)
          : this.listVaccineSupport.push(item)
      })
    },
    onClick() {
      // @todo: create onClick function
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-table {
  &__section-title {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #BDBDBD;
    margin-right: 15px;
  }

  &__table-container {
    border-style: solid;
    border-color: #E0E0E0;
    border-width: 1px;
    border-radius: 8px;
    padding: 24px;

    &__title {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #757575;
      margin-bottom: 24px;
    }
  }
}
</style>
