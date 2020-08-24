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
            <img class="back-image" width="15px" src="../../static/back_icon.png">
            <span class="back-text">{{ $t('label.back') }}</span>
          </span>
        </div>
        <v-row>
          <v-col cols="7" class="left-side">
            <div class="title">
              <h3>{{ $t('label.tracking_logistic') }} <span class="logistic">{{ $t('label.logistic').toLowerCase() }}</span></h3>
            </div>
            <div class="body-text">
              <p>{{ $t('label.tracking_body') }}</p>
            </div>
            <div class="form">
              <ValidationObserver ref="observer">
                <v-label><b>{{ $t('label.tracking_search') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
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
                    @keyup.enter.native="getDataTracking"
                  />
                </ValidationProvider>
              </ValidationObserver>
            </div>
            <div class="button-action">
              <v-btn class="button-style" min-width="150px" outlined text>{{ $t('label.cancel') }}</v-btn>
              <v-btn class="button-style" min-width="150px" color="success" @click="getDataTracking">{{ $t('label.tracking_cek') }}</v-btn>
            </div>
          </v-col>
          <v-col cols="5">
            <img src="../../static/tracking_logistik_1.png" width="350px">
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="dataTracking" class="main-card-landing-page card-data-tracking" outlined>
        <div class="result">
          <p>{{ $t('label.tracking_count_success') }} <b>{{ dataTracking.total }}</b> {{ $t('label.tracking_result') }}</p>
        </div>
        <v-row>
          <v-col>
            <v-tabs
              v-model="tab"
              background-color="#EEEEEE"
              color="#069550"
              height="60px"
            >
              <v-tab
                v-for="(item, index) in dataTracking.application"
                :key="index"
              >
                {{ item.id }}
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
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-stepper value="1" :alt-labels="true">
              <v-stepper-header>
                <v-stepper-step
                  complete
                  step="1"
                >
                  Permohonan masuk
                </v-stepper-step>

                <v-divider />

                <v-stepper-step
                  complete
                  step="2"
                > Pemeriksaan Administrasi
                </v-stepper-step>

                <v-divider />

                <v-stepper-step
                  complete
                  step="3"
                >
                  Permohonan Disetujui
                </v-stepper-step>

                <v-divider />

                <v-stepper-step
                  complete
                  step="4"
                >
                  Pendistribusian Barang
                </v-stepper-step>

                <v-divider />

                <v-stepper-step
                  complete
                  step="5"
                >
                  Pendistribusian Diterima
                </v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </v-col>
        </v-row>
        <div class="identity text-data-green">
          {{ $t('label.list_logistic_need') }}
        </div>
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
      tab: null,
      listQuery: {
        search: null
      }
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'dataTracking'
    ])
  },
  methods: {
    async getDataTracking() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      await this.$store.dispatch('logistics/getTrackingLogistic', this.listQuery)
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
   font-size: 18px;
   line-height: 26px;
 }
 .card-data-tracking {
   margin-top: -30px;
 }
 .result {
   p {
     font-family: Lato;
     font-size: 18px;
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
    font-size: 32px;
    font-weight: bold;
    line-height: 45px;

    .logistic {
      color: #16A75C
    }
   }
 }
</style>
