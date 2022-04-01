<template>
  <div class="d-flex flex-column mt-8">
    <!-- Section Title -->
    <div class="d-flex flex-row align-center mb-6">
      <span class="detail-table__section-title">
        {{ `${$t('label.realization')} (${$t('label.pharmacy')})` }}
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
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ index + 1 }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.product_name || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.quantity || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.unit || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.usage || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.note || '-' }}</td>
            <td>
              <span
                :class="{
                  'detail-table__status': true,
                  'detail-table__status--green': !notUpdated(item),
                  'detail-table__status--red': notUpdated(item)
                }"
              >
                {{ item.product_status ? item.product_status : 'Belum Diupdate' }}
              </span>
            </td>
            <td v-if="stage === 'realization'">
              <JDSButton inverted height="25px" @click="onUpdate(item.id)">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <JDSButton
        v-if="stage === 'realization'"
        inverted
        height="25px"
        class="mt-6"
        @click="onAddVaccine()"
      >
        {{ $t('label.add_vaccine_realization') }}
      </JDSButton>
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
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ index + 1 }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.product_name || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.description || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.quantity || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.unit || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.usage || '-' }}</td>
            <td :class="{ 'detail-table__not-update': notUpdated(item) }">{{ item.note || '-' }}</td>
            <td>
              <span
                :class="{
                  'detail-table__status': true,
                  'detail-table__status--green': !notUpdated(item),
                  'detail-table__status--red': notUpdated(item)
                }"
              >
                {{ item.product_status ? item.product_status : 'Belum Diupdate' }}
              </span>
            </td>
            <td v-if="stage === 'realization'">
              <JDSButton inverted height="25px" @click="onUpdate(item.id)">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <JDSButton
        v-if="stage === 'realization'"
        inverted
        height="25px"
        class="mt-6"
        @click="onAddVaccineSupport()"
      >
        {{ $t('label.add_vaccine_support_realization') }}
      </JDSButton>
    </div>

    <!-- Form Input -->
    <JDSDatePicker
      v-if="stage === 'realization'"
      v-model="date"
      :label="$t('label.delivery_plan_date')"
      :placeholder="$t('label.input_date')"
      hide-details
      @clear="date = null"
    />
    <!-- @todo: change with real data -->
    <DisabledField
      v-else
      label="Tanggal Rencana Kirim"
      value="18 Februari 2022"
      class="mt-8"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JDSTable from '@/components/Base/JDSTable'
import JDSButton from '@/components/Base/JDSButton'
import JDSDatePicker from '@/components/Base/JDSDatePicker'
import DisabledField from '@/components/Base/DisabledField'
export default {
  components: {
    JDSTable,
    JDSButton,
    JDSDatePicker,
    DisabledField
  },
  props: {
    stage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listVaccine: [],
      listVaccineSupport: [],
      date: null,
      vaccineHeaders: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.print_mail_material_name'), sortable: false },
        { text: this.$t('label.total'), sortable: false },
        { text: this.$t('label.unit'), sortable: false },
        { text: this.$t('label.purpose'), sortable: false },
        { text: this.$t('label.note'), sortable: false },
        { text: this.$t('label.status'), sortable: false }
      ],
      vaccineSupportHeaders: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.print_mail_material_name'), sortable: false },
        { text: this.$t('label.description'), sortable: false },
        { text: this.$t('label.total'), sortable: false },
        { text: this.$t('label.unit'), sortable: false },
        { text: this.$t('label.purpose'), sortable: false },
        { text: this.$t('label.note'), sortable: false },
        { text: this.$t('label.status'), sortable: false }
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
    if (this.stage === 'realization') {
      this.vaccineHeaders.push({ text: this.$t('label.action'), sortable: false })
      this.vaccineSupportHeaders.push({ text: this.$t('label.action'), sortable: false })
    }
  },
  methods: {
    onClick() {
      // @todo: create onClick function
    },
    onUpdate(id) {
      this.$router.push(`/realization/update/${id}`)
    },
    onAddVaccine() {
      // @todo: create onAddVaccine function
    },
    onAddVaccineSupport() {
      // @todo: create onAddVaccineSupport function
    },
    notUpdated(item) {
      return item.product_status === null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/scss/pages/vaccineDetail.scss";
</style>
