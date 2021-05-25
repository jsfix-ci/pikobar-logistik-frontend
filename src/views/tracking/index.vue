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
              <v-col class="margin-left-20" cols="2">
                <img height="40" src="../../static/logistik_logo_lingkar.svg">
              </v-col>
              <v-col cols="10">
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
        <div class="back">
          <span>
            <a href="#/landing-page">
              <img class="back-image" width="15px" src="../../static/back_icon.png">
            </a>
            <span class="back-text">{{ $t('label.back') }}</span>
          </span>
        </div>
        <div class="d-flex flex-row tracking-header pa-6 justify-space-between">
          <div class="d-flex flex-column" :class="{ 'item-header': $vuetify.breakpoint.lgAndUp }">
            <strong class="title">
              {{ $t('label.tracking_logistic') }}
              <span class="logistic">{{ $t('label.logistic').toLowerCase() }}</span>
            </strong>
            <p class="body-text mt-5">{{ $t('label.tracking_body') }}</p>
          </div>
          <img
            v-if="$vuetify.breakpoint.lgAndUp"
            class="mr-10"
            src="../../static/tracking_logistik_1.png"
            width="350px"
          >
        </div>
        <div class="form mt-10" :class="{ 'item-header': $vuetify.breakpoint.lgAndUp }">
          <v-form ref="form">
            <ValidationObserver ref="observer">
              <v-label>
                <b>{{ $t('label.tracking_search') }}</b>
                <i class="text-small-first-step">{{ $t('label.must_fill') }}</i>
              </v-label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredTrackingField"
              >
                <v-text-field
                  v-model="listQuery.search"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  :placeholder="$t('label.tracking_search_placeholder')"
                  @keyup.enter.native="getDataTracking(1)"
                />
              </ValidationProvider>
              <div
                class="button-action"
                :class="{
                  'd-flex flex-column': $vuetify.breakpoint.xsOnly
                }"
              >
                <v-btn
                  v-if="clicked && dataTracking.application.length > 0"
                  class="button-style"
                  min-width="150px"
                  outlined
                  text
                  :class="{
                    'mb-4 full-width': $vuetify.breakpoint.xsOnly
                  }"
                  @click="resetData"
                >
                  {{ $t('label.cancel') }}
                </v-btn>
                <v-btn
                  class="button-style"
                  min-width="150px"
                  color="success"
                  :class="{
                    'full-width': $vuetify.breakpoint.xsOnly
                  }"
                  @click="getDataTracking(1)"
                >
                  {{ $t('label.track_now') }}
                </v-btn>
              </div>
            </ValidationObserver>
          </v-form>
        </div>
      </v-card>
      <v-card v-if="clicked && dataTracking.application.length > 0" class="main-card-landing-page card-data-tracking" outlined>
        <div class="result">
          <p>{{ $t('label.tracking_count_success') }} <b>{{ dataTracking.total }}</b> {{ $t('label.tracking_result') }}</p>
        </div>
        <v-row>
          <v-col>
            <v-tabs
              v-model="tab"
              background-color="#EEEEEE"
              color="#069550"
              height="45px"
              active-class="active-tab"
              hide-slider
            >
              <v-tab
                v-for="(item, index) in dataTracking.application"
                :key="index"
              >
                {{ $t('label.tracking_id') }}{{ item.id }}
              </v-tab>
              <v-tab-item
                v-for="(item, index) in dataTracking.application"
                :key="index"
              >
                <div class="identity text-data-green">
                  {{ $t('label.step_title_2') }}
                </div>
                <v-card
                  class="mx-auto"
                  outlined
                >
                  <v-row>
                    <v-col class="margin-20" cols="12" sm="6" md="6">
                      <v-row class="margin-top-min-15">
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.instance_type') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.master_faskes_type.name }}
                          </v-label>
                        </v-col>
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.contact_person') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.applicant.applicant_name }}
                          </v-label>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.instance_name') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.agency_name }}
                          </v-label>
                        </v-col>
                        <v-col>
                          <span class="text-title-green">
                            {{ $t('label.applicant_position_identity') }}
                          </span>
                          <br>
                          <v-label>
                            {{ item.applicant.applicants_office }}
                          </v-label>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col class="margin-20" cols="12" sm="4" md="4">
                      <span class="text-title-green">
                        {{ $t('label.full_address') }}
                      </span>
                      <br>
                      <v-label>
                        {{ item.location_address }}
                      </v-label>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row>
                  <v-col cols="12">
                    <v-card v-if="item.tracking.verification.is_reject || item.tracking.approval.is_reject" class="tracking-status-reject tracking-reject-reason">
                      <div class="tracking-status-reject-note">
                        <p class="reject-reason-title">{{ $t('label.tracking_reason_reject') }}</p>
                        <p class="reject-reason-data">{{ item.tracking.reject_note }}</p>
                      </div>
                    </v-card>
                    <TrackingStatus
                      :key="item.id"
                      :id-request="item.id"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-else-if="clicked && dataTracking.application.length === 0" class="main-card-landing-page card-data-tracking" outlined>
        <center>
          <img src="../../static/tracking_not_found.png" width="350px">
          <div class="not-found-title">{{ $t('label.tracking_not_found_title') }}</div>
          <div class="not-found-text">{{ $t('label.tracking_not_found_text') }}</div>
        </center>
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
      <!-- End Mobile Footer -->
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'
import TrackingStatus from './status'

export default {
  name: 'LandingPage',
  components: {
    ValidationProvider,
    ValidationObserver,
    TrackingStatus
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
      itemStatus: this.$t('label.not_approved')
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'dataTracking'
    ])
  },
  methods: {
    async getDataTracking(page) {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }

      this.listQueryTable.page = page ?? this.listQueryTable.page
      await this.$store.dispatch('logistics/getTrackingLogistic', this.listQuery)
      this.clicked = true
    },
    changeStatus(value) {
      let status = this.$t('label.not_approved')
      switch (value) {
        case 'approved':
          status = this.$t('label.approved')
          break
        case 'not_delivered':
          status = this.$t('label.not_delivered')
          break
        case 'delivered':
          status = this.$t('label.delivered')
          break
        case 'not_available':
          status = this.$t('label.not_available')
          break
        case 'replaced':
          status = this.$t('label.replaced')
          break
        case 'not_yet_fulfilled':
          status = this.$t('label.not_yet_fulfilled')
          break
        default:
          status = this.$t('label.not_approved')
          break
      }
      return status
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
   text-transform: none !important;
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
   font-size: 16px;
   line-height: 26px;
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
   font-family: Lora !important;
   font-size: 32px !important;
   font-weight: bold !important;
   line-height: 45px !important;
   .logistic {
     color: #16A75C
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
 .active-tab {
  background-color: white;
  border-radius: 6px 6px 0px 0px;
  border-style: solid;
  border-width: 2px;
  border-color: #069550 #069550 white #069550;
}
.tracking-header {
  background-color: #FFF9E1;
  border-radius: 16px;
}
.item-header {
  width: 50%;
}
.full-width {
  width: 100% !important;
}
</style>
