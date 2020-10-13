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
          <v-card-title class="title ml-0 mb-3 black--text title-chart">
            {{ $t("label.applicant_instance") }}
          </v-card-title>
          <div class="disclaimer">{{ $t('label.dashboard_disclaimer_instance') }}</div>
          <div class="total-title space-text">{{ $t('label.dashboard_total_instance_request') }}</div>
          <span class="total-data space-text">{{ faskesTopRequest ? currency(faskesTopRequest.total_agency) : '-' }}</span> <span class="total-prefix">{{ $t('label.instance') }}</span>
          <div class="instance-max space-text" style="padding-top: 15px; margin-right: -120px">{{ $t('label.dashboard_total_request_instance_max') }}</div>
          <div class="instance-name space-text">{{ faskesTopRequest ? faskesTopRequest.total_max.name : '-' }}</div>
          <span class="instance-max-data space-text">{{ faskesTopRequest ? currency(faskesTopRequest.total_max.total) : '-' }}</span> <span class="instance-max-prefix">{{ $t('route.applicant_medical_tools_title') }}</span>
        </v-col>
        <v-col cols="7" class="chart-data">
          <v-card-text>
            <chart-doughnut
              v-if="loaded"
              ref="pieChart"
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
import { mapGetters } from 'vuex'
import FormatingNumber from '../../helpers/formattingNumber'
import EventBus from '@/utils/eventBus'

export default {
  name: 'ApplicantInstanceChart',
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
      chartData: {
        labels: ['', '', '', '', ''],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              '#FF0606',
              '#1AAFE6',
              '#27AE60',
              '#F36464',
              '#F4A60B'
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
      },
      listQuery: {
        start_date: null,
        end_date: null
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
      'dataFaskesTypeTotalRequest',
      'faskesTopRequest'
    ])
  },
  created() {
    EventBus.$on('getFaskesTypeTotalRequest', (value) => {
      this.listQuery.start_date = value.start_date
      this.listQuery.end_date = value.end_date
      this.getFaskesTypeTotalRequest()
    })
  },
  async mounted() {
    await this.getFaskesTypeTotalRequest()
  },
  methods: {
    async getFaskesTypeTotalRequest() {
      this.loaded = false
      this.index = 0
      this.chartData.labels = ['', '', '', '', '']
      this.chartData.datasets[0].data = [0, 0, 0, 0, 0]
      await this.$store.dispatch('logistics/getFaskesTypeTopRequest', this.listQuery)
      await this.$store.dispatch('logistics/getFaskesTypeTotalRequest', this.listQuery)
      this.dataFaskesTypeTotalRequest.forEach(element => {
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
  .margin-auto {
    margin: auto;
  }
  .chart-data {
    margin-top: 5rem;
  }
  .titel-chart {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
    color: #212121;
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
