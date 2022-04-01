<template>
  <div class="d-flex flex-column mt-8">
    <!-- Section Title -->
    <div class="d-flex flex-row align-center mb-6">
      <span class="detail-table__section-title">
        {{ `${$t('label.delivery_plan')} (${$t('label.logistic_post')})` }}
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
        :headers="vaccineHeaders"
        :items="listVaccine"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.product_name || '-' }}</td>
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
        :headers="vaccineSupportHeaders"
        :items="listVaccineSupport"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.product_name || '-' }}</td>
            <td>{{ item.description || '-' }}</td>
            <td>{{ item.quantity || '-' }}</td>
            <td>{{ item.unit || '-' }}</td>
            <td>{{ item.usage || '-' }}</td>
            <td>{{ item.note || '-' }}</td>
          </tr>
        </template>
      </JDSTable>
    </div>

    <!-- @todo: change with real data -->
    <DisabledField
      label="Tanggal Rencana Kirim"
      value="18 Februari 2022"
      class="mt-8"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JDSTable from '@/components/Base/JDSTable'
import DisabledField from '@/components/Base/DisabledField'
export default {
  components: {
    JDSTable,
    DisabledField
  },
  data() {
    return {
      listVaccine: [],
      listVaccineSupport: [],
      vaccineHeaders: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.print_mail_material_name'), sortable: false },
        { text: this.$t('label.total'), sortable: false },
        { text: this.$t('label.unit'), sortable: false },
        { text: this.$t('label.purpose'), sortable: false },
        { text: this.$t('label.note'), sortable: false }
      ],
      vaccineSupportHeaders: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.print_mail_material_name'), sortable: false },
        { text: this.$t('label.description'), sortable: false },
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
    this.listVaccine = await this.$store.dispatch(
      'vaccine/getVaccineProductRequests',
      {
        vaccine_request_id: this.$route.params.id,
        category: 'vaccine',
        status: 'finalization'
      }
    )
    this.listVaccineSupport = await this.$store.dispatch(
      'vaccine/getVaccineProductRequests',
      {
        vaccine_request_id: this.$route.params.id,
        category: 'vaccine_support',
        status: 'finalization'
      }
    )
  },
  methods: {
    onClick() {
      // @todo: create onClick function
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/scss/pages/vaccineDetail.scss";
</style>
