<template>
  <div class="d-flex flex-column">
    <!-- Section Title -->
    <div class="detail-table__section" @click="onClick">
      <span class="detail-table__section-title">
        {{ `${$t('label.release_order')} (${$t('label.task_force')})` }}
      </span>
      <img
        src="/img/icons/arrow-down.svg"
        alt="arrow-down"
        height="18px"
        :class="{
          'detail-table__arrow': true,
          'detail-table__arrow--right': !showContent
        }"
      >
    </div>

    <!-- Vaccine -->
    <div
      :class="{
        'detail-table__table-container d-flex flex-column': showContent,
        'd-none': !showContent
      }"
    >
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
    <div
      :class="{
        'detail-table__table-container d-flex flex-column mt-6': showContent,
        'd-none': !showContent
      }"
    >
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

    <DisabledField
      label="Tanggal Rencana Kirim"
      :value="deliveryDate ? $moment(deliveryDate).format('D MMMM YYYY') : '-'"
      :class="{
        'my-6': showContent,
        'd-none': !showContent
      }"
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
  props: {
    stage: {
      type: String,
      default: ''
    },
    deliveryDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showContent: false,
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
        status: 'delivery_plan',
        is_paginated: 0
      }
    )
    this.listVaccineSupport = await this.$store.dispatch(
      'vaccine/getVaccineProductRequests',
      {
        vaccine_request_id: this.$route.params.id,
        category: 'vaccine_support',
        status: 'delivery_plan',
        is_paginated: 0
      }
    )
    if (this.stage === 'delivery-plan') { this.showContent = true }
  },
  methods: {
    onClick() {
      this.showContent = !this.showContent
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/scss/pages/vaccineDetail.scss";
</style>
