<template>
  <div class="d-flex flex-column mt-8">
    <!-- Section Title -->
    <div class="d-flex flex-row align-center mb-6">
      <span class="detail-table__section-title">
        {{ `${$t('label.recommend')} (${$t('label.immunization')})` }}
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
            <td v-if="stage === 'recommendation'">
              <JDSButton inverted height="25px" @click="onUpdate(item.id)">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <JDSButton
        v-if="stage === 'recommendation'"
        inverted
        height="25px"
        class="mt-6"
        @click="onAddVaccine()"
      >
        {{ $t('label.add_vaccine_recommendation') }}
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
                  'detail-table__status--green': item.product_status,
                  'detail-table__status--red': notUpdated(item)
                }"
              >
                {{ item.product_status ? item.product_status : 'Belum Diupdate' }}
              </span>
            </td>
            <td v-if="stage === 'recommendation'">
              <JDSButton inverted height="25px" @click="onUpdate(item.id)">
                {{ $t('label.update') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <JDSButton
        v-if="stage === 'recommendation'"
        inverted
        height="25px"
        class="mt-6"
        @click="onAddVaccineSupport()"
      >
        {{ $t('label.add_vaccine_support_recommendation') }}
      </JDSButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JDSTable from '@/components/Base/JDSTable'
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSTable,
    JDSButton
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
        status: 'recommendation'
      }
    )
    this.listVaccineSupport = await this.$store.dispatch(
      'vaccine/getVaccineProductRequests',
      {
        vaccine_request_id: this.$route.params.id,
        category: 'vaccine_support',
        status: 'recommendation'
      }
    )
    if (this.stage === 'recommendation') {
      this.vaccineHeaders.push({ text: this.$t('label.action'), sortable: false })
      this.vaccineSupportHeaders.push({ text: this.$t('label.action'), sortable: false })
    }
  },
  methods: {
    onClick() {
      // @todo: create onClick function
    },
    onUpdate(id) {
      this.$router.push(`/recommendation/update/${id}`)
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

  &__status {
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    padding: 3px;

    &--green {
      border-color: #069550;
      color: #069550;
    }

    &--red {
      border-color: #EF5350;
      color: #EF5350;
    }
  }

  &__not-update {
    color: #BDBDBD;
  }
}
</style>
