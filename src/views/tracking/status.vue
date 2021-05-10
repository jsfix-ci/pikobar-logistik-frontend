<template>
  <div class="mt-5">
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
          :complete="isDoneStep1"
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
            <v-container fluid>
              <v-data-table
                v-if="showTable1"
                :headers="requestHeaders"
                :items="listLogisticRequest"
                :no-data-text="$t('label.no_data')"
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.need_product_name || '-' }}</td>
                    <td>{{ item.need_description || '-' }}</td>
                    <td>{{ numberFormat(item.need_quantity) || '-' }}</td>
                    <td>{{ item.need_unit_name || '-' }}</td>
                    <td>{{ item.category || '-' }}</td>
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
            <v-container fluid>
              <v-data-table
                v-if="showTable2"
                :headers="headers"
                :items="listLogisticRequest"
                :no-data-text="$t('label.no_data')"
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.recommendation_product_name || '-' }}</td>
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
              @click="showTable2 = !showTable2"
            >
              {{ showTable2 ? $t('label.close_table') : $t('label.show_table') }}
            </v-btn>
            <v-container fluid>
              <v-data-table
                v-if="showTable2"
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
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
import FormatingNumber from '../../helpers/formattingNumber'

export default {
  name: 'TrackingStatus',
  props: {
    listLogisticRequest: {
      type: Array,
      default: null
    },
    status: {
      type: Object,
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
  created() {
    console.log(this.listLogisticRequest)
    console.log(this.status)
  },
  methods: {
    numberFormat(value) {
      return new FormatingNumber().formatCurrency(value)
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
.primary-color {
  color: #219653;
}
.cobain span {
  color: #219653 !important;
}
</style>
