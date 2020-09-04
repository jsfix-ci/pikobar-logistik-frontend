<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-row>
      <v-col cols="12">
        <chart-doughnut
          v-if="loaded"
          ref="pieChart"
          :chart-data="chartData"
          :styles="chartStyles"
          :options="chartOptions"
        />
      </v-col>
    </v-row>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'

export default {
  name: 'SummaryChart',
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
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#FF0606',
              '#1A4373',
              '#27AE60'
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
      'dataLogisticRequestSummary'
    ])
  },
  created() {
    EventBus.$on('getLogisticRequestSummary', (value) => {
      this.listQuery.start_date = value.start_date
      this.listQuery.end_date = value.end_date
      this.getLogisticRequestSummary()
    })
  },
  async mounted() {
    await this.getLogisticRequestSummary()
  },
  methods: {
    async getLogisticRequestSummary() {
      this.loaded = false
      this.index = 0
      await this.$store.dispatch('logistics/getLogisticRequestSummary', this.listQuery)
      this.chartData.labels.push('Ditolak')
      this.chartData.datasets[0].data.push(this.dataLogisticRequestSummary.total_rejected)
      this.chartData.labels.push('Diverifikasi')
      this.chartData.datasets[0].data.push(this.dataLogisticRequestSummary.total_verified)
      this.chartData.labels.push('Disetujui')
      this.chartData.datasets[0].data.push(this.dataLogisticRequestSummary.total_approved)
      this.loaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .margin-auto {
    margin: auto;
  }
  .chart-data {
    margin-top: 2.5rem;
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
</style>
