<template>
  <div class="d-flex flex-column">
    <!-- Section Title -->
    <div class="d-flex flex-row align-center mb-6">
      <span class="detail-table__section-title">
        {{ `${$t('label.realization')} (${$t('label.pharmacy')})` }}
      </span>
      <img
        src="/img/icons/arrow-down.svg"
        alt="arrow-down"
        height="18px"
        :class="{
          'detail-table__arrow': true,
          'detail-table__arrow--right': !showContent
        }"
        @click="onClick"
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
              <JDSButton inverted height="25px" @click="onUpdate(item.id, false)">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <!-- TEMPORARILY HIDDEN -->
      <!-- <JDSButton
        v-if="stage === 'realization'"
        inverted
        height="25px"
        class="mt-6"
        @click="onAddMore(false)"
      >
        {{ $t('label.add_vaccine_realization') }}
      </JDSButton> -->
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
              <JDSButton inverted height="25px" @click="onUpdate(item.id, true)">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <!-- TEMPORARILY HIDDEN -->
      <!-- <JDSButton
        v-if="stage === 'realization'"
        inverted
        height="25px"
        class="mt-6"
        @click="onAddMore(true)"
      >
        {{ $t('label.add_vaccine_support_realization') }}
      </JDSButton> -->
    </div>

    <!-- Form Input -->
    <div
      :class="{
        'd-block mb-6': showContent,
        'd-none': !showContent
      }"
    >
      <JDSDatePicker
        v-if="stage === 'realization'"
        v-model="date"
        :label="$t('label.delivery_plan_date')"
        :placeholder="$t('label.input_date')"
        :error="!isValid"
        :hide-details="isValid"
        :error-messages="['Harap isi Tanggal Rencana Kirim']"
        class="mt-8"
        @clear="date = null"
      />
      <DisabledField
        v-else
        label="Tanggal Rencana Kirim"
        :value="deliveryDate ? $moment(deliveryDate).format('D MMMM YYYY') : '-'"
        class="mt-8"
      />
    </div>
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
      date: null,
      isValid: true,
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
  watch: {
    date(val) {
      this.validate()
      this.$emit('update:deliveryPlanDate', val)
    }
  },
  async mounted() {
    this.listVaccine = await this.$store.dispatch(
      'vaccine/getVaccineProductRequests',
      {
        vaccine_request_id: this.$route.params.id,
        category: 'vaccine',
        status: 'finalization',
        is_paginated: 0
      }
    )
    this.listVaccineSupport = await this.$store.dispatch(
      'vaccine/getVaccineProductRequests',
      {
        vaccine_request_id: this.$route.params.id,
        category: 'vaccine_support',
        status: 'finalization',
        is_paginated: 0
      }
    )
    if (this.stage === 'realization') {
      this.showContent = true
      this.vaccineHeaders.push({ text: this.$t('label.action'), sortable: false })
      this.vaccineSupportHeaders.push({ text: this.$t('label.action'), sortable: false })
    }
    this.checkUpdate()
  },
  methods: {
    onClick() {
      this.showContent = !this.showContent
    },
    onUpdate(id, isVaccineSupport) {
      const type = isVaccineSupport ? 'vaccineSupport' : 'vaccine'
      this.$router.push(`/realization/update/${id}?type=${type}`)
    },
    onAddMore(isVaccineSupport) {
      const type = isVaccineSupport ? 'vaccineSupport' : 'vaccine'
      this.$router.push(`/realization/add/${this.$route.params.id}?type=${type}`)
    },
    notUpdated(item) {
      return item.product_status === null
    },
    /**
     * iterate through listVaccine and listVaccineSupport
     * to check if any item's product_status still null
     */
    checkUpdate() {
      let isUpdate = true

      // iterate through listVaccine
      let i = 0
      while (isUpdate && i < this.listVaccine.length) {
        if (this.listVaccine[i].product_status === null) {
          isUpdate = false
        }
        i++
      }

      // iterate through listVaccineSupport
      i = 0
      while (isUpdate && i < this.listVaccineSupport.length) {
        if (this.listVaccineSupport[i].product_status === null) {
          isUpdate = false
        }
        i++
      }

      this.$emit('update:isUpdated', isUpdate)
    },
    validate() {
      this.isValid = this.date !== null
      return this.isValid
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/scss/pages/vaccineDetail.scss";
</style>
