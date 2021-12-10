<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="chart mx-auto"
      outlined
    >
      <v-row>
        <v-col cols="5">
          <v-card-title class="title ml-0 mb-3 black--text title-chart" style="margin-right: -100px">
            {{ $t("label.tools_type_title") }}
          </v-card-title>
          <div class="disclaimer">{{ $t('label.dashboard_disclaimer_logistic') }}</div>
          <div class="total-title space-text">{{ $t('label.dashboard_total_logistic_request') }}</div>
          <span class="total-data space-text">{{ productTopRequest ? currency(productTopRequest.total_items) : '-' }}</span> <span class="total-prefix">{{ $t('label.goods') }}</span>
          <div class="instance-max space-text" style="padding-top: 15px; margin-right: -120px">{{ $t('label.dashboard_request_max') }}</div>
          <div class="instance-name space-text">{{ productTopRequest ? productTopRequest.total_max.name : '-' }}</div>
          <span class="instance-max-data space-text">{{ productTopRequest ? currency(productTopRequest.total_max.total) : '-' }}</span> <span class="instance-max-prefix">{{ $t('label.pcs') }}</span>
        </v-col>
        <v-col cols="7" class="chart-data">
          <v-card-text>
            <chart-doughnut
              v-if="loaded"
              ref="doughnutChart"
              :chart-data="chartData"
              :styles="chartStyles"
              :options="chartOptions"
            />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FormatingNumber from '../../helpers/formattingNumber'
import EventBus from '@/utils/eventBus'

export default {
  name: 'ToolsTypeChart',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      loading: false,
      loaded: false,
      index: 0,
      listQuery: {
        limit: 10,
        sort: 'desc',
        start_date: null,
        end_date: null,
        city_code: null
      },
      chartData: {
        labels: ['', '', '', '', '', '', '', '', '', ''],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              '#FF0606',
              '#27AE60',
              '#F4A60B',
              '#F36464',
              '#1AAFE6',
              '#F5D77A',
              '#F01BDB',
              '#6FCF97',
              '#2F80ED',
              '#DBFF00'
            ]
          }
        ]
      },
      chartOptions: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10
          },
          reverse: true
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              return data['labels'][tooltipItem[0]['index']]
            },
            label: (tooltipItem, data) => {
              const formattingNumber = new FormatingNumber()
              const dataset = data.datasets[tooltipItem.datasetIndex]
              const total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                return previousValue + currentValue
              })
              const currentValue = dataset.data[tooltipItem.index]
              const percentage = Math.floor((currentValue / total) * 100)
              return `${this.$t('label.request_number')} : ${formattingNumber.currency(data['datasets'][0]['data'][tooltipItem['index']])} (${percentage}%)`
            }
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    }
  },
  computed: {
    chartStyles() {
      return {
        height: '100%',
        position: 'relative'
      }
    },
    ...mapGetters('logistics', [
      'dataProductTotalRequest',
      'productTopRequest'
    ]),
    ...mapState('user', [
      'district_user',
      'roles'
    ])
  },
  created() {
    EventBus.$on('getProductTotalRequest', (value) => {
      this.listQuery.start_date = value.start_date
      this.listQuery.end_date = value.end_date
      this.getProductTotalRequest()
    })
  },
  async mounted() {
    if (this.roles[0] === 'dinkeskota') this.listQuery.city_code = this.district_user
    await this.getProductTotalRequest()
  },
  methods: {
    async getProductTotalRequest() {
      this.loaded = false
      this.index = 0
      this.chartData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.chartData.labels = ['', '', '', '', '', '', '', '', '', '']
      await this.$store.dispatch('logistics/getProductTopRequest', this.listQuery)
      await this.$store.dispatch('logistics/getProductTotalRequest', this.listQuery)
      this.dataProductTotalRequest.forEach(element => {
        this.chartData.labels[this.index] = element.name
        this.chartData.datasets[0].data[this.index] = element.total_request
        this.index += 1
      })
      this.loaded = true
    },
    currency(value) {
      const formattingNumber = new FormatingNumber()
      return formattingNumber.formatCurrency(value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .title-chart {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
    color: #212121;
  }
  .chart-data {
    margin-top: 5rem;
  }
  .total-title {
    margin-top: 1rem;
    font-family: Lato;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    color: #424242;
  }
  .total-data {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 45px;
    color: #49148C;
  }
  .total-prefix {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    color: #49148C;
  }
  .instance-max {
    font-family: Lato;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    color: #424242;
  }
  .instance-name {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    color: #069550;
  }
  .instance-max-data {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 45px;
    color: #069550;
  }
  .instance-max-prefix {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 19px;
    color: #069550;
  }
  .in-full {
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 23px;
    color: #1E88E5;
  }
  .space-text {
    padding-left: 16px;
    padding-top: 5px;
  }
  .disclaimer {
    padding-left: 16px;
    margin-top: -30px;
    font-size: 80%;
    color: #828282;
    margin-right: -300px;
  }
</style>
