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
      <!-- Header mobile -->
      <div class="header-landing-page-mobile">
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col class="margin-left-20 margin-top-15" cols="2">
                <img height="40" src="../../static/logistik_logo_lingkar.svg">
              </v-col>
              <v-col cols="6">
                <div class="title-page-landing-page-mobile margin-left-title-mobile-landing-page">
                  {{ $t('label.logistics_medical_device') }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row class="float-right-landing-page mobile-space-icon-help">
              <a :href="$t('label.link_tutorial')" target="_blank" class="margin-icon-help-mobile-landing-page"><img height="25" src="../../static/icon_book-outline.png"></a>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <!-- End header mobile -->
    </div>
    <div class="negative-landing-page">
      <v-card class="main-card-landing-page" outlined>
        <div class="text-card-main">
          <v-row align="center">
            <v-col cols="2" md="2" />
            <v-col cols="8" md="8">
              <div class="font-product-sans-landing-page card-title-landing-page ml-10 mb-5 font-weight-bold text-center">
                {{ $t('label.landing_page_logistic_title') }} <span class="title-logistic">{{ $t('label.logistic_lowercase') }}</span> <span>{{ $t('label.landing_page_here') }}</span>
              </div>
              <p class="ml-10 font-text card-text-landing-page text-center">{{ $t('label.landing_page_text') }}</p>
              <div class="text-center">
                <v-btn class="ml-10 white--text" min-width="140px" color="#16A75C" @click="goApplicant">{{ $t('label.start') }}</v-btn>
              </div>
            </v-col>
            <v-col cols="2" md="2" />
          </v-row>
          <v-row align="center">
            <v-col cols="12" md="12">
              <div class="center">
                <img src="../../static/home_logistik_2.png">
              </div>
            </v-col>
          </v-row>
        </div>
        <!-- Mobile logistic -->
        <div class="text-card-main-mobile logistic-need-part">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <div class="font-product-sans-landing-page card-title-landing-page mb-5 font-weight-bold text-center">
                {{ $t('label.landing_page_logistic_title') }} <span class="title-logistic">{{ $t('label.logistic_lowercase') }}</span> <span>{{ $t('label.landing_page_here') }}</span>
              </div>
              <p class="text-center font-text card-text-landing-page card-text-layout">{{ $t('label.landing_page_text') }}</p>
              <center><v-btn class="white--text" min-width="140px" color="#16A75C" @click="goApplicant">{{ $t('label.start') }}</v-btn></center>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" style="margin-left: -100px">
              <div class="center">
                <img src="../../static/home_logistik_2.png" width="350px">
              </div>
            </v-col>
          </v-row>
        </div>
        <!-- End of Mobile -->
        <v-row class="text-card-main">
          <v-col>
            <img style="margin-left: -20px" src="../../static/bgFlat_kotak.png">
          </v-col>
        </v-row>
        <div>
          <v-row align="center">
            <v-col cols="12" md="2" />
            <v-col cols="12" md="8">
              <div class="font-product-sans-landing-page card-title-landing-page mb-5 font-weight-bold text-center">
                {{ $t('label.landing_page_first_title') }} <span class="title-logistic">{{ $t('label.feature') }}</span> <span>{{ $t('label.landing_page_last_title') }}</span>
              </div>
              <p class="font-text card-text-landing-page text-center">{{ $t('label.landing_page_feature_description') }}</p>
            </v-col>
            <v-col cols="12" md="2" />
          </v-row>
        </div>
        <div>
          <v-row>
            <v-col class="shadow-box">
              <img src="../../static/logistic_acceptance_report.png" width="100%">
              <div class="font-product-sans-landing-page card-feature-landing-page mb-5 font-weight-bold text-center">
                {{ $t('label.logistic_acceptance_report_title') }}
              </div>
              <p class="font-text card-text-landing-page text-center">{{ $t('label.logistic_acceptance_report_description') }}</p>
              <div class="text-center">
                <v-btn class="white--text" min-width="140px" color="#16A75C" href="#/acceptance-report">
                  {{ $t('label.logistic_acceptance_report_button') }} <img class="button-icon" src="../../static/linkicon.png">
                </v-btn>
              </div>
            </v-col>
            <v-col class="shadow-box">
              <img src="../../static/logistic_usability_report.png" width="100%">
              <div class="font-product-sans-landing-page card-feature-landing-page mb-5 font-weight-bold text-center">
                {{ $t('label.logistic_usability_report_title') }}
              </div>
              <p class="font-text card-text-landing-page text-center">{{ $t('label.logistic_usability_report_description') }}</p>
              <div class="text-center">
                <v-btn class="white--text" min-width="140px" color="#16A75C" href="http://bit.ly/LaporPenggunaanLogistik">
                  {{ $t('label.logistic_acceptance_report_button') }} <img class="button-icon" src="../../static/linkicon.png">
                </v-btn>
              </div>
            </v-col>
            <v-col class="shadow-box">
              <img src="../../static/tracking_logistik_1.png" width="100%">
              <div class="font-product-sans-landing-page card-feature-landing-page mb-5 font-weight-bold text-center">
                {{ $t('label.logistic_tracking_title') }}
              </div>
              <p class="font-text card-text-landing-page text-center">{{ $t('label.landing_page_text_tracking') }}</p>
              <div class="text-center">
                <v-btn class="white--text" min-width="140px" color="#16A75C" href="#/tracking">
                  {{ $t('label.landing_page_tracking_title') }} <img class="button-icon" src="../../static/linkicon.png">
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="text-card-main">
          <v-row>
            <v-col>
              <img style="float: right; margin-right: -20px" src="../../static/bgFlat_lingkar.png">
            </v-col>
          </v-row>
        </div>
        <div class="text-card-main">
          <v-row>
            <v-col cols="5" md="5">
              <img src="../../static/group.png">
            </v-col>
            <v-col cols="7" md="7">
              <div class="ml-10 font-product-sans-landing-page card-title-landing-page mb-5 font-weight-bold">
                {{ $t('label.landing_page_alur_title') }} <span class="title-logistic">{{ $t('label.logistic_lowercase') }}.</span>
              </div>
              <p class="ml-10 font-text card-text-landing-page">{{ $t('label.landing_page_text_alur') }}</p>
              <a href="https://bit.ly/alurpermohonanlogistik" target="_blank" rel="noopener noreferrer">
                <v-btn class="ml-10 white--text" min-width="140px" color="#16A75C">{{ $t('label.landing_page_alur_button') }}
                  <img class="button-icon" src="../../static/linkicon.png">
                </v-btn>
              </a>
            </v-col>
          </v-row>
        </div>
        <!-- Mobile Alur Part -->
        <div class="text-card-main-mobile">
          <v-row>
            <v-col sm="12" cols="12">
              <div class="font-product-sans-landing-page card-title-landing-page mb-5 font-weight-bold text-center">
                {{ $t('label.landing_page_alur_title') }} <span class="title-logistic">{{ $t('label.logistic_lowercase') }}.</span>
              </div>
              <p class="font-text card-text-landing-page text-center card-text-layout">{{ $t('label.landing_page_text_alur') }}</p>
              <center>
                <a href="https://bit.ly/alurpermohonanlogistik" target="_blank" rel="noopener noreferrer">
                  <v-btn class="white--text" min-width="140px" color="#16A75C">{{ $t('label.landing_page_alur_button') }}
                    <img class="button-icon" src="../../static/linkicon.png">
                  </v-btn>
                </a>
              </center>
            </v-col>
            <v-col sm="12" cols="12">
              <center>
                <img src="../../static/group.png" width="350px">
              </center>
            </v-col>
          </v-row>
        </div>
        <!-- End -->
      </v-card>
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
      </div>
      <!-- Mobile Footer -->
      <div class="text-card-main-mobile">
        <v-row>
          <v-col>
            <img class="footer-logo-mobile" src="../../static/jds-logo.png">
            <div class="copyright-mobile">
              <p>
                <span>{{ $t('label.copyright') }}</span>
                <span> &copy; </span>
                <span>{{ $t('label.year') }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="490"
    >
      <v-card>
        <v-card-title class="headline">{{ $t('label.warning') }}</v-card-title>

        <v-card-text>
          <span>{{ $t('label.warning_text') }} </span>
          <span><b>{{ $t('label.warning_contact') }}</b></span>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            {{ $t('label.ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="applicantDialog"
      max-width="550"
    >
      <v-card>
        <v-card-title class="headline">{{ $t('label.attention').toUpperCase() }}</v-card-title>

        <v-card-text>
          <span class="popup-body">{{ $t('label.applicant_popup_warning') }} </span>
          <span class="popup-body">{{ $t('label.applicant_popup_warning_verification') }}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <div class="center-button">
            <v-btn color="error darken-1 margin-right-20 margin-button" min-width="140px" @click="applicantDialog = false">
              {{ $t('label.cancel') }}
            </v-btn>
            <v-btn color="white--text green darken-1" min-width="140px" @click="goForm">
              {{ $t('label.apply_now') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      dialog: false,
      applicantDialog: false
    }
  },
  methods: {
    openPopup() {
      this.dialog = true
    },
    goApplicant() {
      this.applicantDialog = true
    },
    goForm() {
      this.$router.push('/form-pemohon')
    }
  }
}
</script>

<style lang="scss" scope>
  .margin-top-15 {
    margin-top: 15px;
  }
  .shadow-box {
    box-shadow: 0px 0px 15px 5px #d8d8d8;
    border-radius: 10px;
    margin: 5px;
  }
</style>
