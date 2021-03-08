<template>
  <div>
    <v-card outlined>
      <div>
        <v-row class="mt-5 ml-5 mr-5 mb-5">
          <v-col>
            <img src="../../../static/logistic_acceptance_report.png" width="90%">
          </v-col>
          <v-col class="mt-10">
            <div class="font-product-sans-landing-page card-feature-landing-page mb-5 font-weight-bold text-center">
              {{ $t('label.logistic_acceptance_report_title') }}
            </div>
            <p class="font-text card-text-landing-page text-center">{{ $t('label.logistic_acceptance_report_description') }}</p>
            <p class="font-text card-text-landing-page text-center">{{ $t('label.goods_receipt_report_description') }}</p>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'GoodsReceiptReportList'
}
</script>
