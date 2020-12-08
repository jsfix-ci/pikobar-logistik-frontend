<template>
  <div class="background-landing-page">
    <div class="full-landing-page">
      <div class="header-landing-page">
        <v-row align="center">
          <v-col cols="12" md="9" xs="12">
            <v-row>
              <img height="40" src="../../static/logistik_logo_lingkar.svg">
              <div class="title-page-landing-page">{{ $t('label.logistics_medical_device') }}</div>
            </v-row>
          </v-col>
          <v-col cols="12" md="3" xs="12" style="padding-top: 20px">
            <v-row class="float-right-landing-page">
              <a :href="$t('label.link_tutorial')" target="_blank"><div class="tutorial-class pusat-bantuan-landing-page landing-page-guide">{{ $t('label.tutorial') }} </div></a>
              <a :href="$t('label.link_tutorial')" target="_blank"><img height="25" src="../../static/icon_book-outline.png"></a>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="negative-landing-page">
      <v-card class="main-card-landing-page" outlined>
        <div class="back">
          <span>
            <a href="#/landing-page">
              <img class="back-image" width="15px" src="../../static/back_icon.png">
            </a>
            <span class="back-text">{{ $t('label.back') }}</span>
          </span>
        </div>
        <v-row class="bg-yellow-pastel">
          <v-col sm="12" md="8" class="left-side">
            <div class="title">
              <h3>{{ $t('label.form') }} <span class="logistic">{{ $t('label.logistic_acceptance_report_header').toLowerCase() }}</span> {{ $t('label.logistik_covid') }}</h3>
            </div>
            <div class="body-text">
              <p>{{ $t('label.logistic_acceptance_report_subheader') }}</p>
            </div>
          </v-col>
          <v-col sm="12" md="4">
            <img src="../../static/logistic_acceptance_report.png" class="display-image-right">
          </v-col>
        </v-row>
        <v-row>
          <div class="form mt-10 col-sm-6 offset-md-3">
            <v-form ref="form">
              <ValidationObserver ref="observer">
                <v-label><b>{{ $t('label.applicant_code') }}</b></v-label>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="requiredApplicantCode"
                >
                  <v-text-field
                    v-model="listQuery.search"
                    outlined
                    solo-inverted
                    :error-messages="errors"
                    :placeholder="$t('label.applicant_code_placeholder')"
                    @keyup.enter.native="findApplicantCode"
                  />
                </ValidationProvider>
                <div class="button-action">
                  <div class="body-text">
                    <p>Kode permohonan logistik dapat ditemukan di email pada saat selesai melakukan permohonan di Pikobar pada laman <a href="#/landing-page">{{ landingPage }}</a></p>
                  </div>
                  <v-btn class="button-style" min-width="150px" color="success" @click="findApplicantCode">{{ $t('label.tracking_cek') + ' ' + $t('label.applicant_code') }} <img src="../../static/arrow-right.png" alt=""></v-btn>
                </div>
              </ValidationObserver>
            </v-form>
          </div>
        </v-row>
      </v-card>
      <!-- footer -->
      <div class="text-card-main">
        <v-row style="margin-top: -20px">
          <v-col cols="6" md="6">
            <img class="landing-page-logo-jds" src="../../static/jds-logo.png">
          </v-col>
          <v-col cols="6" md="6">
            <div class="copyright">
              <p>
                <span>{{ $t('label.copyright') }}</span>
                <span> &copy; </span>
                <span>{{ $t('label.year') }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div> <!-- end footer -->
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'LandingPage',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      id: null,
      tab: null,
      clicked: false,
      listQuery: {
        search: null
      },
      listQueryTable: {
        page: 1,
        limit: 3
      },
      landingPage: location.host + '/#/landing-page'
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'dataTracking',
      'listLogisticRequest',
      'totalListLogisticRequest',
      'totalDataLogisticRequest'
    ])
  },
  methods: {
    async findApplicantCode() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      await this.$store.dispatch('logistics/getTrackingLogistic', this.listQuery)
      if (this.dataTracking.application.length > 0) this.getTrackingLogisticNeedList(this.dataTracking.application[0].id)
      this.clicked = true
    },
    async getTrackingLogisticNeedList(id) {
      this.id = id
      this.listQueryTable.id = id
      await this.$store.dispatch('logistics/getTrackingLogisticNeedList', this.listQueryTable)
    },
    changeStatus(value) {
      switch (value) {
        case 'approved':
          return this.$t('label.approved')
        case 'not_delivered':
          return this.$t('label.not_delivered')
        case 'delivered':
          return this.$t('label.delivered')
        case 'not_available':
          return this.$t('label.not_available')
        case 'replaced':
          return this.$t('label.replaced')
        default:
          return this.$t('label.not_approved')
      }
    },
    async onNext() {
      await this.getTrackingLogisticNeedList(this.id)
    },
    getTableRowNumbering(index) {
      return ((parseInt(this.listQueryTable.page) - 1) * parseInt(this.listQueryTable.limit)) + (parseInt(index) + 1)
    },
    async resetData() {
      this.$refs.form.reset()
      this.clicked = false
    }
  }
}
</script>
<style lang="scss" scoped>
 .main-card-landing-page {
   padding: 50px;
 }
 .left-side {
   padding-right: 100px;
 }
 .button-style {
   margin-right: 20px;
 }
 .back {
   margin-bottom: 30px;
 }
 .back-text {
   margin-left: 30px;
   margin-bottom: 40px;
   font-family: Lato;
   font-size: 16px;
 }
 .body-text {
   font-family: Lato;
   font-size: 13px;
   line-height: 21px;
 }
 .card-data-tracking {
   margin-top: -30px;
 }
 .result {
   p {
     font-family: Lato;
     font-size: 16px;
   }
 }
 .identity {
   margin: 20px 0;
 }
 .text-data-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 17px;
  color: #219653;
}
.text-title-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #219653;
}
 .title {
   h3 {
    font-family: Lora;
    font-size: 28px;
    font-weight: bold;
    line-height: 45px;

    .logistic {
      color: #16A75C
    }
   }
 }
 .color-step {
   color: white;
 }
 .tracking-status {
   background: #16A75C;
 }
 .tracking-status-reject {
   background: #EF5350;
 }
 .tracking-status-text {
   color: white;
   margin: 20px;
   width: 500px;
   padding-left: 35px;
   padding-bottom: 20px;
 }
 .tracking-status-reject-note {
    color: white;
    margin: 20px;
    padding-left: 5rem;
    padding-left: 2rem;
 }
 .tracking-step-first {
   margin-left: -60rem;
 }
 .tracking-step {
   color: white;
   padding-top: 80px
 }
 .tracking-divider {
   background: white;
   margin-top: 90px !important;
 }
 .tracking-step-error {
   color: #D50000 !important;
 }
 .step-name {
   text-align: left;
   margin-left: 35px;
   margin-top: -30px;
 }
 .not-found-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 34px;
    color: #020814;
 }
 .not-found-text {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    color: #414D5C;
 }
 .total-data-title {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    color: #757575;
 }
 .total-data {
    font-weight: bold;
    color: #4F4F4F;
 }
 .pagination {
    display: block;
    float: right !important;
 }
 .reject-reason-title {
   font-size: 16px;
   line-height: 26px;
 }
 .reject-reason-data {
   font-size: 14px;
   line-height: 26px;
   margin-top: -1rem;
 }
 .tracking-reject-reason {
   margin-top: .5rem;
 }
.bg-yellow-pastel {
    background-color:#FFF9E1;
    border-radius: 16px;
}
.display-image-right {
  width: 282.7px;
  margin-top: 4rem;
  margin-left: 1rem;
}
</style>
