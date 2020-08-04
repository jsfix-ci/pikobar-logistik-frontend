<template>
  <v-container fluid grid-list-xl py-0>
    <div>
      <v-row>
        <v-col>
          <span class="text-title-dashboard">{{ $t('label.dashboard_title') }}</span>
        </v-col>
      </v-row>
      <v-row class="margin-top-min-20-dashboard margin-bot-min-40-dashboard">
        <v-col cols="12" sm="12" md="5">
          <span class="text-last-update-dashboard">{{ $t('label.last_update') }}: {{ dataLogisticRequestSummary.last_update === null ? $t('label.stripe') : $moment(dataLogisticRequestSummary.last_update).format('LLL') }}</span>
        </v-col>
        <v-col cols="12" sm="12" md="7" class="margin-top-min-20-dashboard">
          <date-picker-dashboard
            :date="listQuery.start_date"
            @selected="updateChart"
          />
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col>
          <v-card
            class="mx-auto"
            color="#219653"
          >
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-card-text>
                  <div>
                    <a class="text-card-source-dashboard" :href="baseURL" target="_blank">{{ $t('label.dashboard_title_text') }} ({{ baseURL }})</a>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-card
            class="mx-auto"
            color="#4F4F4F"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-card-source-dashboard">
                  {{ $t('label.total_incoming_request') }}
                </v-list-item-title>
                <v-list-item-title class="value-card-source-dashboard">
                  {{ dataLogisticRequestSummary.total_request | currency }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <!-- <v-col cols="12" sm="12" md="4">
          <v-card
            class="mx-auto"
            color="#219653"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-card-source-dashboard">
                  {{ $t('label.with_pikobar') }}
                </v-list-item-title>
                <v-list-item-title class="value-card-source-dashboard">
                  {{ dataLogisticRequestSummary.total_pikobar | currency }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-card
            class="mx-auto"
            color="#E62929"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-card-source-dashboard">
                  {{ $t('label.with_dinkes_province') }}
                </v-list-item-title>
                <v-list-item-title class="value-card-source-dashboard">
                  {{ dataLogisticRequestSummary.total_dinkesprov | currency }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col> -->
      </v-row>
    </div>
    <div v-if="dataLogisticRequestSummary.total_request > 0">
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <tools-type-chart />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <applicant-instance-chart />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <statistic-appilcant-chart />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'

export default {
  name: 'Dashboard',
  data() {
    return {
      baseURL: process.env.VUE_APP_URL,
      listQuery: {
        start_date: null,
        end_date: null
      }
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'dataLogisticRequestSummary'
    ])
  },
  async mounted() {
    await this.getLogisticRequestSummary()
  },
  methods: {
    async getLogisticRequestSummary() {
      await this.$store.dispatch('logistics/getLogisticRequestSummary', this.listQuery)
    },
    async updateChart(value) {
      this.listQuery.start_date = value.startDate
      this.listQuery.end_date = value.endDate
      await this.getLogisticRequestSummary()
      EventBus.$emit('getCityTotalRequest', this.listQuery)
      EventBus.$emit('getProductTotalRequest', this.listQuery)
      EventBus.$emit('getFaskesTypeTotalRequest', this.listQuery)
    }
  }
}
</script>

<style>
  .text-title-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
  }
  .text-last-update-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #828282;
  }
  .text-card-source-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF !important;
  }
  .value-card-source-dashboard {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 34px;
    display: flex;
    align-items: center;
    color: #FFFFFF !important;
  }
  .margin-top-min-20-dashboard {
    margin-top: -20px;
  }
  .margin-bot-min-40-dashboard {
    margin-bottom: -40px;
  }
</style>
