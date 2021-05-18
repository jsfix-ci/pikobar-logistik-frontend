<template>
  <div class="tracking-status-stepper v-stepper-wrapper mt-5">
    <span class="text-title-green">
      {{ $t("label.applicant_status") }}
    </span>
    <v-card
      outlined
    >
      <v-stepper
        value="1"
        vertical
        class="elevation-0"
      >
        <v-stepper-step
          :complete="
            dataDetailLogisticRequest.recommendation_items ?
              dataDetailLogisticRequest.recommendation_items.length !== 0
              : false"
          :edit-icon="'$complete'"
          editable
          step="1"
          class="d-flex flex-row align-start"
        >
          <span class="h1 primary-color">
            {{ $t('label.tracking_step1') }}
          </span>
        </v-stepper-step>
        <v-stepper-content step="1">
          <div class="d-flex flex-column">
            <v-btn
              outlined
              color="green"
              small
              class="stepper-btn"
              @click="showTable1 = !showTable1"
            >
              {{ showTable1 ? $t('label.close_table') : $t('label.show_table') }}
            </v-btn>
            <v-container
              v-if="showTable1"
              fluid
              class="px-0"
            >
              <v-data-table
                :headers="requestHeaders"
                :items="dataDetailLogisticRequest.logistic_request_items"
                :no-data-text="$t('label.no_data')"
                items-per-page="3"
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.product ? item.product.name : '-' }}</td>
                    <td>{{ item.brand || '-' }}</td>
                    <td>{{ numberFormat(item.quantity) || '-' }}</td>
                    <td>{{ item.unit || '-' }}</td>
                    <td>{{ item.product.material_group || '-' }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-container>
          </div>
        </v-stepper-content>
        <v-stepper-step
          :complete="
            dataDetailLogisticRequest.finalization_items ?
              dataDetailLogisticRequest.finalization_items.length !== 0
              : false"
          :edit-icon="'$complete'"
          editable
          step="2"
          class="d-flex flex-row align-start"
        >
          <span class="h1 primary-color">
            {{ $t('label.recommendation') }}
          </span>
        </v-stepper-step>
        <v-stepper-content step="2">
          <div class="d-flex flex-column">
            <v-btn
              outlined
              color="green"
              small
              class="stepper-btn"
              @click="showTable2 = !showTable2"
            >
              {{ showTable2 ? $t('label.close_table') : $t('label.show_table') }}
            </v-btn>
            <v-container
              v-if="showTable2"
              fluid
              class="px-0"
            >
              <v-data-table
                :headers="headers"
                :items="dataDetailLogisticRequest.recommendation_items"
                :no-data-text="$t('label.no_data')"
                items-per-page="3"
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.product_name || '-' }}</td>
                    <td>{{ item.recommendation_quantity || '-' }}</td>
                    <td>{{ item.recommendation_unit_name || '-' }}</td>
                    <td>{{ item.recommendation_status || '-' }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-container>
          </div>
        </v-stepper-content>
        <v-stepper-step
          :complete="isDoneStep2"
          :edit-icon="'$complete'"
          editable
          step="3"
          class="d-flex flex-row align-start"
        >
          <span class="h1 primary-color">
            {{ $t('label.distribution_realization') }}
          </span>
        </v-stepper-step>
        <v-stepper-content step="3">
          <div class="d-flex flex-column">
            <v-btn
              outlined
              color="green"
              small
              class="stepper-btn"
              @click="showTable3 = !showTable3"
            >
              {{ showTable3 ? $t('label.close_table') : $t('label.show_table') }}
            </v-btn>
            <v-container
              v-if="showTable3"
              fluid
              class="px-0"
            >
              <v-data-table
                :headers="headers"
                :items="listLogisticRequest"
                :no-data-text="$t('label.no_data')"
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.final_product_name || '-' }}</td>
                    <td>{{ item.final_quantity || '-' }}</td>
                    <td>{{ item.final_unit || '-' }}</td>
                    <td>{{ item.final_status || '-' }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-container>
          </div>
        </v-stepper-content>
        <v-stepper-step
          :complete="isDoneStep2"
          :edit-icon="'$complete'"
          editable
          step="4"
          class="d-flex flex-row align-start"
        >
          <span class="h1 primary-color">
            {{ $t('label.distributed_items') }}
          </span>
        </v-stepper-step>
        <v-stepper-content step="4">
          <div class="d-flex flex-column">
            <v-tabs
              v-model="tab"
              background-color="#EEEEEE"
              color="#069550"
              height="40px"
              active-class="active-tab"
              hide-slider
            >
              <v-tab
                v-for="(item, index) in listTab"
                :key="`tab-${index}`"
              >
                {{ $t('label.print_mail_location_stock') }}{{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="(item, index) in listTab"
                :key="`tab-item-${index}`"
              >
                <v-btn
                  outlined
                  color="green"
                  small
                  class="address-btn mt-5"
                >
                  {{ $t('label.show_store_address') }}
                  {{ item }}
                </v-btn>
                <div class="px-4 py-2 mt-5 store-cp">
                  <strong>{{ $t('label.contact_person_info') }}</strong>
                  <span class="d-flex flex-row">
                    {{ $t('label.name') }} :
                  </span>
                  <span class="d-flex flex-row">
                    {{ $t('label.mobile_phone_number') }} :
                  </span>
                </div>
                <v-data-table
                  :headers="headers"
                  :items="listLogisticRequest"
                  :no-data-text="$t('label.no_data')"
                  class="mt-5"
                >
                  <template v-slot:item="{ item: logisticItem, index: logisticItemIndex }">
                    <tr>
                      <td>{{ logisticItemIndex + 1 }}</td>
                      <td>{{ logisticItem.final_product_name || '-' }}</td>
                      <td>{{ logisticItem.final_quantity || '-' }}</td>
                      <td>{{ logisticItem.final_unit || '-' }}</td>
                      <td>{{ logisticItem.final_status || '-' }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormatingNumber from '../../helpers/formattingNumber'

export default {
  name: 'TrackingStatus',
  props: {
    listLogisticRequest: {
      type: Array,
      default: null
    },
    idRequest: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      showTable1: false,
      showTable2: false,
      showTable3: false,
      showTable4: false,
      isDoneStep1: false,
      isDoneStep2: false,
      isDoneStep3: false,
      isDoneStep4: false,
      tab: null,
      listTab: ['1', '2', '3'],
      headers: [
        { text: this.$t('label.print_mail_no') },
        { text: this.$t('label.apd_name_spec') },
        { text: this.$t('label.total') },
        { text: this.$t('label.unit') },
        { text: this.$t('label.status') }
      ],
      requestHeaders: [
        { text: this.$t('label.print_mail_no'), class: 'cobain' },
        { text: this.$t('label.apd_name_spec') },
        { text: this.$t('label.description') },
        { text: this.$t('label.total') },
        { text: this.$t('label.unit') },
        { text: this.$t('label.item_type') }
      ]
    }
  },
  computed: {
    ...mapState('logistics', [
      'dataDetailLogisticRequest'
    ])
  },
  created() {
    console.log(this.listLogisticRequest)
    this.getTrackingData()
  },
  methods: {
    numberFormat(value) {
      return new FormatingNumber().formatCurrency(value)
    },
    async getTrackingData() {
      await this.$store.dispatch('logistics/getListDetailLogisticRequest', this.idRequest)
      console.log('halo')
      console.log(this.dataDetailLogisticRequest)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-title-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #219653;
}
.step-name {
  text-align: left;
  margin-left: 35px;
  margin-top: -30px;
}
.stepper-btn {
  text-transform: none;
  max-width: 100px;
}
.address-btn {
  text-transform: none;
  max-width: 180px;
}
.primary-color {
  color: #219653;
}
.cobain span {
  color: #219653 !important;
}
.store-cp {
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  border-color: #1565C0;
  background-color: #E3F2FD;
  max-width: 300px;
}
.active-tab {
  background-color: white;
  border-radius: 6px 6px 0px 0px;
  border-style: solid;
  border-width: 2px;
  border-color: #069550 #069550 white #069550;
}

.v-stepper__content::v-deep {
  padding-top: 0px !important;
  > .v-stepper__wrapper {
    height: auto !important;
  }
}

.v-data-table::v-deep {
  .v-data-table-header {
    background-color: #069550 !important;
    color: white !important;
  }

  table {
    border-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
  }

  tbody {
    background-color: #FAFAFA !important;
  }

  th {
    span {
      color: white !important;
      font-size: 14px;
    }
  }
}
</style>
