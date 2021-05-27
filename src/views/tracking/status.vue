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
          :complete="isStepTwoActive"
          :edit-icon="'$complete'"
          step="1"
          class="d-flex flex-row align-center active"
        >
          <div class="d-flex flex-row align-center">
            <span class="active-step">
              {{ $t('label.tracking_step1') }}
            </span>
            <strong v-if="!isStepTwoActive" class="step-status">
              {{ lastStepStatus }}
            </strong>
          </div>
        </v-stepper-step>
        <v-stepper-content
          step="1"
          :class="{
            'green-border': isStepTwoActive
          }"
        >
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
                :items="listRequest"
                :no-data-text="$t('label.no_data')"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ getTableRowNumbering(listQueryRequest, index) }}</td>
                    <td>{{ item.product_name || '-' }}</td>
                    <td>{{ item.description || '-' }}</td>
                    <td>{{ numberFormat(item.quantity) || '-' }}</td>
                    <td>{{ item.unit_name || '-' }}</td>
                    <td>{{ item.material_group || '-' }}</td>
                  </tr>
                </template>
              </v-data-table>
              <pagination
                :total="totalPageRequest"
                :total-data="totalDataRequest"
                :page.sync="listQueryRequest.page"
                :limit.sync="listQueryRequest.limit"
                :on-next="onNextRequest"
                :page-sizes="trackingPageSize"
              />
            </v-container>
          </div>
        </v-stepper-content>
        <v-stepper-step
          :complete="isStepThreeActive"
          :edit-icon="'$complete'"
          step="2"
          class="d-flex flex-row align-center"
          :class="{ 'active': isStepTwoActive }"
        >
          <div class="d-flex flex-row align-center">
            <span
              :class="{
                'non-active-step': !isStepTwoActive,
                'active-step': isStepTwoActive,
              }"
            >
              {{ $t('label.recommendation') }}
            </span>
            <strong v-if="isStepTwoActive && !isStepThreeActive" class="step-status">
              {{ lastStepStatus }}
            </strong>
          </div>
        </v-stepper-step>
        <v-stepper-content
          step="2"
          :class="{
            'green-border': isStepThreeActive
          }"
        >
          <div v-if="isStepTwoActive" class="d-flex flex-column">
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
                :items="listRecommendation"
                :no-data-text="$t('label.no_data')"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ getTableRowNumbering(listQueryRecommendation, index) }}</td>
                    <td>{{ item.product_name || '-' }}</td>
                    <td>{{ item.quantity || '-' }}</td>
                    <td>{{ item.unit_name || '-' }}</td>
                    <td>{{ item.status || '-' }}</td>
                  </tr>
                </template>
              </v-data-table>
              <pagination
                :total="totalPageRecommendation"
                :total-data="totalDataRecommendation"
                :page.sync="listQueryRecommendation.page"
                :limit.sync="listQueryRecommendation.limit"
                :on-next="onNextRecommendation"
                :page-sizes="trackingPageSize"
              />
            </v-container>
          </div>
        </v-stepper-content>
        <v-stepper-step
          :complete="isStepFourActive"
          :edit-icon="'$complete'"
          step="3"
          class="d-flex flex-row align-start"
          :class="{ 'active': isStepThreeActive }"
        >
          <div class="d-flex flex-row align-center">
            <span
              :class="{
                'non-active-step': !isStepThreeActive,
                'active-step': isStepThreeActive,
              }"
            >
              {{ $t('label.distribution_realization') }}
            </span>
            <strong v-if="isStepThreeActive && !isStepFourActive" class="step-status">
              {{ lastStepStatus }}
            </strong>
          </div>
        </v-stepper-step>
        <v-stepper-content
          step="3"
          :class="{
            'green-border': isStepFourActive
          }"
        >
          <div v-if="isStepThreeActive" class="d-flex flex-column">
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
                :items="listRealization"
                :no-data-text="$t('label.no_data')"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ getTableRowNumbering(listQueryRealization, index) }}</td>
                    <td>{{ item.product_name || '-' }}</td>
                    <td>{{ item.quantity || '-' }}</td>
                    <td>{{ item.unit_name || '-' }}</td>
                    <td>{{ item.status || '-' }}</td>
                  </tr>
                </template>
              </v-data-table>
              <pagination
                :total="totalPageRealization"
                :total-data="totalDataRealization"
                :page.sync="listQueryRealization.page"
                :limit.sync="listQueryRealization.limit"
                :on-next="onNextRealization"
                :page-sizes="trackingPageSize"
              />
            </v-container>
          </div>
        </v-stepper-content>
        <v-stepper-step
          :edit-icon="'$complete'"
          step="4"
          class="d-flex flex-row align-start"
          :class="{ 'active': isStepFourActive }"
        >
          <span
            :class="{
              'non-active-step': !isStepFourActive,
              'active-step': isStepFourActive,
            }"
          >
            {{ $t('label.distributed_items') }}
          </span>
        </v-stepper-step>
        <v-stepper-content step="4">
          <div v-if="isStepFourActive" class="d-flex flex-column">
            <v-tabs
              v-model="tab"
              background-color="#EEEEEE"
              color="#069550"
              height="40px"
              active-class="active-tab"
              hide-slider
            >
              <v-tab
                v-for="(item, index) in listWarehouse"
                :key="`tab-${index}`"
                @click="getDistributionStep(idRequest, item.lo_id)"
              >
                {{ item.whs_name }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="(item, index) in listWarehouse"
                :key="`tab-item-${index}`"
              >
                <v-btn
                  outlined
                  color="green"
                  small
                  class="address-btn mt-5"
                  :href="item.map_url"
                  target="_blank"
                >
                  {{ $t('label.show_store_address') }}
                </v-btn>
                <div class="px-4 py-2 mt-5 store-cp">
                  <strong>{{ $t('label.contact_person_info') }}</strong>
                  <span class="d-flex flex-row">
                    {{ $t('label.name') }} : {{ item.pic_name || '-' }}
                  </span>
                  <span class="d-flex flex-row">
                    {{ $t('label.mobile_phone_number') }} : {{ item.pic_handphone || '-' }}
                  </span>
                </div>
                <v-data-table
                  :headers="headers"
                  :items="listDistribution"
                  :no-data-text="$t('label.no_data')"
                  class="mt-5"
                  hide-default-footer
                >
                  <template v-slot:item="{ item: distributionItem, index: distributionItemIndex }">
                    <tr>
                      <td>{{ getTableRowNumbering(listQueryDistribution, distributionItemIndex) }}</td>
                      <td>{{ distributionItem.material_name || '-' }}</td>
                      <td>{{ distributionItem.lo_qty || '-' }}</td>
                      <td>{{ distributionItem.UoM || '-' }}</td>
                      <td
                        :class="{
                          'item-new': distributionItem.lo_proses_stt ? distributionItem.lo_proses_stt === 'NEW' : false,
                          'item-booked': distributionItem.lo_proses_stt ? distributionItem.lo_proses_stt === 'BOOKED' : false,
                          'item-do': distributionItem.lo_proses_stt ? distributionItem.lo_proses_stt === 'DO' : false,
                          'item-intransit': distributionItem.lo_proses_stt ? distributionItem.lo_proses_stt === 'INTRANSIT' : false
                        }"
                      >
                        {{ capitalize(distributionItem.lo_proses_stt) || '-' }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <pagination
                  :total="totalPageDistribution"
                  :total-data="totalDataDistribution"
                  :page.sync="listQueryDistribution.page"
                  :limit.sync="listQueryDistribution.limit"
                  :on-next="onNextDistribution"
                  :page-sizes="trackingPageSize"
                />
                <v-alert
                  outlined
                  text
                  type="info"
                >
                  {{ $t('label.tracking_info_1') }}
                  <strong>{{ $t('label.tracking_info_2') }}</strong>
                  {{ $t('label.tracking_info_3') }}
                </v-alert>
              </v-tab-item>
            </v-tabs-items>
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
    idRequest: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      showTable1: true,
      showTable2: false,
      showTable3: false,
      showTable4: false,
      tab: null,
      loId: null,
      trackingPageSize: [3, 5, 10],
      lastStepStatus: null,
      headers: [
        { text: this.$t('label.print_mail_no') },
        { text: this.$t('label.apd_name_spec') },
        { text: this.$t('label.total') },
        { text: this.$t('label.unit') },
        { text: this.$t('label.status') }
      ],
      requestHeaders: [
        { text: this.$t('label.print_mail_no') },
        { text: this.$t('label.apd_name_spec') },
        { text: this.$t('label.description') },
        { text: this.$t('label.total') },
        { text: this.$t('label.unit') },
        { text: this.$t('label.item_type') }
      ],
      listQueryRequest: {
        page: 1,
        limit: 3
      },
      listQueryRecommendation: {
        page: 1,
        limit: 3
      },
      listQueryRealization: {
        page: 1,
        limit: 3
      },
      listQueryDistribution: {
        page: 1,
        limit: 3
      },
      listRequest: [],
      totalPageRequest: 0,
      totalDataRequest: 0,
      listRecommendation: [],
      totalPageRecommendation: 0,
      totalDataRecommendation: 0,
      listRealization: [],
      totalPageRealization: 0,
      totalDataRealization: 0,
      listWarehouse: [],
      listDistribution: [],
      totalPageDistribution: 0,
      totalDataDistribution: 0
    }
  },
  computed: {
    isStepTwoActive() {
      return this.listRecommendation
        ? this.listRecommendation.length !== 0
        : false
    },
    isStepThreeActive() {
      return this.listRealization
        ? this.listRealization.length !== 0
        : false
    },
    isStepFourActive() {
      return this.listWarehouse
        ? this.listWarehouse.length !== 0
        : false
    }
  },
  created() {
    this.getRequestStep(this.idRequest)
    this.getRecommendationStep(this.idRequest)
    this.getRealizationStep(this.idRequest)
    this.getWarehouseList(this.idRequest)
  },
  methods: {
    numberFormat(value) {
      return new FormatingNumber().formatCurrency(value)
    },
    getTableRowNumbering(listQuery, index) {
      return ((listQuery.page - 1) * listQuery.limit + index + 1)
    },
    async getRequestStep(id) {
      this.listQueryRequest.id = id
      const { items, status } = await this.$store.dispatch('tracking/getTrackingLogisticRequest', this.listQueryRequest)
      this.listRequest = items.data
      this.totalPageRequest = items.last_page
      this.totalDataRequest = items.total
      this.lastStepStatus = status
    },
    async getRecommendationStep(id) {
      this.listQueryRecommendation.id = id
      const { items } = await this.$store.dispatch('tracking/getTrackingLogisticRecommendation', this.listQueryRecommendation)
      this.listRecommendation = items.data
      this.totalPageRecommendation = items.last_page
      this.totalDataRecommendation = items.total
    },
    async getRealizationStep(id) {
      this.listQueryRealization.id = id
      const { items } = await this.$store.dispatch('tracking/getTrackingLogisticRealization', this.listQueryRealization)
      this.listRealization = items.data
      this.totalPageRealization = items.last_page
      this.totalDataRealization = items.total
    },
    async getWarehouseList(id) {
      const res = await this.$store.dispatch('tracking/getTrackingLogisticWarehouse', { id: id })
      this.listWarehouse = res
      if (this.listWarehouse[0]) this.getDistributionStep(id, this.listWarehouse[0].lo_id)
    },
    async getDistributionStep(id, loId) {
      this.loId = loId
      this.listQueryDistribution.id = id
      this.listQueryDistribution.loId = loId
      const { data, last_page, total } = await this.$store.dispatch('tracking/getTrackingLogisticDistribution', this.listQueryDistribution)
      this.listDistribution = data
      this.totalPageDistribution = last_page
      this.totalDataDistribution = total
    },
    async onNextRequest() {
      await this.getRequestStep(this.idRequest)
    },
    async onNextRecommendation() {
      await this.getRecommendationStep(this.idRequest)
    },
    async onNextRealization() {
      await this.getRealizationStep(this.idRequest)
    },
    async onNextDistribution() {
      await this.getDistributionStep(this.idRequest, this.loId)
    },
    capitalize(word) {
      return word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : null
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
.store-cp {
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  border-color: #1565C0;
  background-color: #E3F2FD;
  max-width: 475px;
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

.v-stepper__step.active::v-deep {
  > .v-stepper__step__step {
    background: #069550 !important;
  }
}

.v-data-table::v-deep {
  .v-data-table-header {
    background-color: #27ae60 !important;
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

.green-border {
  border-left: 2px solid rgb(39, 174, 96) !important;
}

.active-step {
  font-weight: 500;
  color: #008444;
  font-size: 21px;
}

.non-active-step {
  font-weight: 500;
  color: #9E9E9E;
  font-size: 21px;
}

.step-status {
  background-color: #FFA600;
  border-radius: 42px;
  color: white;
  padding: 10px 16px 10px 16px !important;
  margin-left: 14px !important;
}

.item-new {
  color: #1E88E5;
}

.item-booked {
  color: #FF9500;
}

.item-do {
  color: #691B9A;
}

.item-intransit {
  color: #008444;
}

.v-alert::v-deep {
  .v-alert__content {
    color: #212121;
  }
}
</style>
