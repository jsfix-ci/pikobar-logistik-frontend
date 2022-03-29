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
            <td>{{ index + 1 }}</td>
            <td>{{ item.product_name || '-' }}</td>
            <td>{{ item.quantity || '-' }}</td>
            <td>{{ item.unit || '-' }}</td>
            <td>{{ item.usage || '-' }}</td>
            <td>{{ item.note || '-' }}</td>
            <td>
              <JDSButton inverted height="25px" @click="onUpdate()">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <JDSButton
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
            <td>{{ index + 1 }}</td>
            <td>{{ item.product_name || '-' }}</td>
            <td>{{ item.description || '-' }}</td>
            <td>{{ item.quantity || '-' }}</td>
            <td>{{ item.unit || '-' }}</td>
            <td>{{ item.usage || '-' }}</td>
            <td>{{ item.note || '-' }}</td>
            <td>
              <JDSButton inverted height="25px" @click="onUpdate()">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <JDSButton
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
      v-model="date"
      :label="$t('label.delivery_plan_date')"
      :placeholder="$t('label.input_date')"
      hide-details
      class="mt-8"
      @clear="date = null"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JDSTable from '@/components/Base/JDSTable'
import JDSButton from '@/components/Base/JDSButton'
import JDSDatePicker from '@/components/Base/JDSDatePicker'
export default {
  components: {
    JDSTable,
    JDSButton,
    JDSDatePicker
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
        { text: this.$t('label.action'), sortable: false }
      ],
      vaccineSupportHeaders: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.print_mail_material_name'), sortable: false },
        { text: this.$t('label.description'), sortable: false },
        { text: this.$t('label.total'), sortable: false },
        { text: this.$t('label.unit'), sortable: false },
        { text: this.$t('label.purpose'), sortable: false },
        { text: this.$t('label.note'), sortable: false },
        { text: this.$t('label.action'), sortable: false }
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
    },
    onUpdate() {
      // @todo: create onUpdate function
    },
    onAddVaccine() {
      // @todo: create onAddVaccine function
    },
    onAddVaccineSupport() {
      // @todo: create onAddVaccineSupport function
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

  &__input {
    &__label {
      font-family: 'Lato', sans-serif;
      font-size: 15px;
      color: #424242;
      margin-top: 32px;
    }
  }
}
.theme--light.v-text-field--solo-inverted > .v-input__control > .v-input__slot {
  background: #FAFAFA !important;
}
</style>
