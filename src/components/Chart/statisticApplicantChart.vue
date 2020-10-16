<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="mx-auto"
      outlined
    >
      <v-card-title class="title-bar-chart-dashboard">
        {{ $t("label.statistic_alkes_title") }}
      </v-card-title>
      <div class="disclaimer">{{ $t('label.dahsboard_disclaimer_kabkota') }}</div>
      <v-card-text>
        <div class="chartAreaWrapper">
          <chart-bar-horizontal
            v-if="loaded"
            ref="horizontalBarChart"
            :chart-data="chartData"
            :styles="chartStyles"
            :options="chartOptions"
            class="walking-speed-chart"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex'
import FormatingNumber from '../../helpers/formattingNumber'
import EventBus from '@/utils/eventBus'

export default {
  name: 'StatisticApplicantChart',
  data() {
    return {
      loading: false,
      loaded: false,
      index: 0,
      color: '#56CCF2',
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: [],
            data: [8, 10]
          }
        ]
      },
      chartOptions: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 10
          },
          reverse: true
        },
        tooltips: {
          displayColors: false,
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (tooltipItem, data) => {
              return data['labels'][tooltipItem[0]['index']]
            },
            label: (tooltipItem, data) => {
              const formattingNumber = new FormatingNumber()
              let percentage = 0
              if (data['datasets'][0]['data'][tooltipItem['index']] !== 0) {
                const dataset = data.datasets[tooltipItem.datasetIndex]
                const total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                  return previousValue + currentValue
                })
                const currentValue = dataset.data[tooltipItem.index]
                percentage = Math.floor((currentValue / total) * 100)
              }
              return `${this.$t('label.request_number')} : ${formattingNumber.currency(data['datasets'][0]['data'][tooltipItem['index']])} (${percentage}%)`
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      listQuery: {
        sort: 'desc',
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
      'dataCityTotalRequest'
    ])
  },
  created() {
    EventBus.$on('getCityTotalRequest', (value) => {
      this.listQuery.start_date = value.start_date
      this.listQuery.end_date = value.end_date
      this.getCityTotalRequest()
    })
  },
  async mounted() {
    await this.getCityTotalRequest()
  },
  methods: {
    async getCityTotalRequest() {
      this.loaded = false
      this.color = '#1FB767'
      await this.$store.dispatch('logistics/getCityTotalRequest', this.listQuery)
      this.index = 0
      this.dataCityTotalRequest.forEach(element => {
        this.chartData.labels[this.index] = element.kemendagri_kabupaten_nama
        this.chartData.datasets[0].data[this.index] = element.agency_count
        this.chartData.datasets[0].backgroundColor[this.index] = this.color
        this.index += 1
      })
      this.loaded = true
    },
    shadeColor(color, percent) {
      let R = parseInt(color.substring(1, 3), 16)
      let G = parseInt(color.substring(3, 5), 16)
      let B = parseInt(color.substring(5, 7), 16)

      R = parseInt(R * (100 + percent) / 100)
      G = parseInt(G * (100 + percent) / 100)
      B = parseInt(B * (100 + percent) / 100)

      R = (R < 255) ? R : 255
      G = (G < 255) ? G : 255
      B = (B < 255) ? B : 255

      const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16))
      const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16))
      const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16))

      return `#${RR}${GG}${BB}`
    },
    currency(value) {
      const formattingNumber = new FormatingNumber()
      return formattingNumber.formatCurrency(value)
    }
  }
}
</script>

<style>
  .title-bar-chart-dashboard {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 28px;
  }
  .chartAreaWrapper {
    height: 375px;
  }
  .walking-speed-chart{
    height: 1700px;
    overflow-y: scroll;
  }
  .disclaimer {
    padding-left: 16px;
    margin-top: -15px;
    font-size: 80%;
    color: #828282;
    margin-right: -300px;
  }
</style>
