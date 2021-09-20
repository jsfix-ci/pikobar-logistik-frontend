<template>
  <div class="background-landing-page">
    <!-- header parent -->
    <div class="full-landing-page main-page-data-confirmation">
      <!-- header desktop -->
      <header-landing-page />

    </div>
    <div class="negative-landing-page main-page-data-confirmation">
      <v-card class="main-card-data-confirmation" outlined>
        <!-- loading -->
        <div v-if="isLoading" class="mt-n5">
          <loading-page />
        </div>

        <!-- loading done -->
        <div v-else-if="isDone" class="mt-n5">
          <success-request />
        </div>

        <div v-else>
          <!-- header card 'Konfirmasi Data' -->
          <div class="data-confirmation-text">{{ $t('label.confirm_data') }}</div>
          <hr>

          <!-- identitas instansi -->
          <div class="main-color-data-confirmation">{{ $t('label.instance_identity') }}</div>
          <instance-identity :form-applicant="formApplicant" />

          <!-- Identitas pemohon -->
          <div class="main-color-data-confirmation">{{ $t('label.step_title_2') }}</div>
          <applicant-identity :form-identity-applicant="formIdentityApplicant" />

          <!-- Surat pemohon -->
          <div class="main-color-data-confirmation">{{ $t('label.step_title_4') }}</div>
          <letter-applicant :form-applicant="formApplicant" :applicant-letter="applicantLetter" />

          <!-- Detail kondisi faskes -->
          <div v-if="formApplicant.instanceType <= 3">
            <div class="main-color-data-confirmation">Detail Kondisi Fasilitas Kesehatan</div>
            <faskes-status :applicant-letter="applicantLetter" />
          </div>

          <!-- tabel daftar kebutuhan -->
          <div class="main-color-data-confirmation">{{ $t('label.list_logistic_need') }}</div>
          <list-logistic :logistic-needs="logisticNeeds" :data-show="dataShow" />
          <v-pagination
            v-model="listQuery.page"
            :length="total"
            :total-visible="3"
            @input="onNext"
          />
          <v-row justify="end">
            <v-btn class="ml-5 white--text" min-width="140px" color="success" outlined @click="onPrev()">{{ $t('label.back') }}</v-btn>
            <v-btn class="ml-5 white--text" min-width="140px" color="success" @click="submitData">{{ $t('label.save') }}</v-btn>
          </v-row>
        </div>
      </v-card>
    </div>
    <!-- mobile layout -->
    <div class="full-landing-page main-page-mobile-data-confirmation">
      <!-- header mobile -->
      <div class="header-landing-page-mobile">
        <v-row>
          <v-col cols="8">
            <v-row>
              <v-col class="margin-left-20" cols="2">
                <img height="40" src="@/static/logistik_logo_lingkar.svg">
              </v-col>
              <v-col cols="6">
                <div class="title-page-landing-page-mobile margin-left-title-mobile-landing-page">
                  {{ $t('label.logistic') }} <br>
                  {{ $t('label.medical_tools') }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row class="float-right-landing-page">
              <a :href="$t('label.link_tutorial')" target="_blank" class="margin-icon-talk-mobile-landing-page"><v-icon color="white" size="25">{{ $t('label.icon_help') }}</v-icon></a>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="main-page-mobile-data-confirmation bg-mobile-data-confirmation">
      <div v-if="isLoading" class="mt-n12">
        <!-- loading mobile -->
        <v-row align="center" justify="center">
          <img height="200" src="@/static/mengirim.svg">
        </v-row>
        <v-row align="center" justify="center" class="margin-wait-data-confirmation text-center-data-confirmation">
          {{ $t('label.wait') }}
        </v-row>
        <v-row class="text-center mr-1 ml-1 mt-3">{{ $t('label.loading_step_one') + $t('label.loading_step_two') }}</v-row>
      </div>
      <div v-else-if="isDone" class="mt-n12">
        <!-- loading success mobile -->
        <v-row align="center" justify="center">
          <img height="200" src="@/static/berhasil.svg">
        </v-row>
        <v-row align="center" justify="center">
          <div class="save-style-data-confirmation text-center-data-confirmation">{{ $t('label.save_success') }}</div>
        </v-row>
        <v-row class="text-center mr-1 ml-1 mt-5">{{ $t('label.loading_done_one') }}</v-row>
        <v-row class="text-center mr-1 ml-1 mt-3">{{ $t('label.loading_done_two') }}</v-row>
        <br>
        <v-row align="center" justify="center" class="mt-3">
          <v-btn href="/#/landing-page">{{ $t('label.back') }}</v-btn>
        </v-row>
      </div>
      <div v-else>
        <v-row class="margin-top-min-50-data-confirmation">
          <v-col class="ml-1 mr-1">
            <v-label class="title"><b>{{ $t('label.confirm_data') }}</b></v-label>
          </v-col>
        </v-row>
        <hr>
        <!-- identitas instansi mobile -->
        <div class="mr-1 ml-1">
          <div class="main-color-data-confirmation">{{ $t('label.instance_identity') }}</div>
          <v-card class="mx-auto" outlined>
            <v-col>
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.instance_type') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.instanceTypeName }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.city_district') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.cityNameId.name }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.instance_name') }}</b></span>
                  <br>
                  <v-label v-if="formApplicant.instanceEtc">{{ formApplicant.instanceEtc }}</v-label>
                  <v-label v-else>{{ formApplicant.instanceName }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.select_sub_district_full_name') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.districtNameId.name }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.number_phone') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.instancePhoneNumber }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.village') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.villageNameId.name }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.full_address') }}</b></span>
                  <br>
                  <v-label>{{ formApplicant.fullAddress }}</v-label>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
          <!-- <instance-identity :form-applicant="formApplicant" /> -->
        </div>
        <br>
        <!-- Identitas pemohon mobile-->
        <div class="mr-1 ml-1">
          <div class="main-color-data-confirmation">{{ $t('label.step_title_2') }}</div>
          <v-card class="mx-auto" outlined>
            <v-col>
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.contact_person') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantName }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_position_identity') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPosition }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.email') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantEmail }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_phone') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPhoneNumber }}</v-label>
                </v-col>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_phone_sub') }}</b></span>
                  <br>
                  <v-label>{{ formIdentityApplicant.applicantPhoneNumber2 }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="text-caption green--text"><b>{{ $t('label.applicant_ktp') }}</b></span>
                  <br>
                  <img class="image-style-data-confirmation" :src="url">
                </v-col>
              </v-row>
            </v-col>
          </v-card>
          <!-- <applicant-identity :form-identity-applicant="formIdentityApplicant" /> -->
        </div>
        <!-- Surat pemohon mobile -->
        <div class="mr-1 ml-1">
          <div class="main-color-data-confirmation">{{ $t('label.step_title_4') }}</div>
          <v-card class="mx-auto" outlined>
            <v-row class="mr-1 ml-1">
              <v-col cols="8" sm="8">
                <span>{{ letterName }}</span>
              </v-col>
              <v-col cols="4" sm="4">
                <v-btn :href="urlLetter" x-small target="_blank">{{ $t('label.download') }}</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <!-- Detail kondisi faskes mobile -->
        <div v-if="formApplicant.instanceType <= 3" class="mr-1 ml-1">
          <div class="main-color-data-confirmation">Detail Kondisi Fasilitas Kesehatan</div>
          <v-card class="mx-auto" outlined>
            <v-col>
              <v-row class="margin-top-min-15">
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Pasien COVID-19 yang ditangani</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_covid_patients || '-' }} Orang
                  </v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Tempat Tidur</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_bedroom || '-' }} Tempat Tidur
                  </v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Ruang Isolasi</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_isolation_room || '-' }} Ruangan
                  </v-label>
                </v-col>
                <v-col>
                  <span class="main-color-data-confirmation">Jumlah Tenaga Kesehatan</span>
                  <br>
                  <v-label>
                    {{ applicantLetter.total_health_worker || '-' }} Orang
                  </v-label>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </div>
        <div class="mr-1 ml-1">
          <!-- tabel daftar kebutuhan -->
          <div class="main-color-data-confirmation">{{ $t('label.list_logistic_need') }}</div>
          <list-logistic :logistic-needs="logisticNeeds" :data-show="dataShow" />
          <v-pagination
            v-model="listQuery.page"
            :length="total"
            :total-visible="3"
            @input="onNext"
          />
        </div>
        <hr>
        <v-row>
          <v-col cols="5" sm="5">
            <v-btn class="ml-5 white--text" min-width="140px" color="success" outlined @click="onPrev()">{{ $t('label.back') }}</v-btn>
          </v-col>
          <v-col cols="5" sm="5">
            <v-btn class="ml-5 white--text" min-width="140px" color="success" @click="submitData">{{ $t('label.save') }}</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '@/utils/eventBus'
import HeaderLandingPage from '@/layout/Header/HeaderLandingPage.vue'

export default {
  name: 'TahapKonfirmasi',
  components: { HeaderLandingPage },
  props: {
    formApplicant: {
      type: Object,
      default: null
    },
    formIdentityApplicant: {
      type: Object,
      default: null
    },
    logisticNeeds: {
      type: Array,
      default: null
    },
    applicantLetter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      step: 5,
      dataShow: [],
      listQuery: {
        page: 1,
        limit: 3
      },
      total: 0,
      url: null,
      urlLetter: null,
      letterName: '',
      isLoading: false,
      isDone: false
    }
  },
  mounted() {
    this.letterName = this.applicantLetter.name
    this.url = URL.createObjectURL(this.formIdentityApplicant.dataFile)
    this.urlLetter = URL.createObjectURL(this.applicantLetter.dataFile)
    this.total = Math.ceil(this.logisticNeeds.length / 3)
    if (this.total === 1) {
      for (let index = 0; index < this.logisticNeeds.length; index++) {
        this.dataShow.push(this.logisticNeeds[index])
      }
    } else {
      for (let index = 0; index < 3; index++) {
        this.dataShow.push(this.logisticNeeds[index])
      }
    }
  },
  methods: {
    getTableRowNumbering(index) {
      return ((parseInt(this.listQuery.page) - 1) * parseInt(this.listQuery.limit)) + (parseInt(index) + 1)
    },
    onNext() {
      this.dataShow = []
      const x = (this.listQuery.page - 1) * 3
      for (let index = x; index < this.logisticNeeds.length; index++) {
        if (this.dataShow.length > 2) {
          return
        } else {
          this.dataShow.push(this.logisticNeeds[index])
        }
      }
    },
    onPrev() {
      EventBus.$emit('prevStep', this.step)
    },
    async submitData() {
      this.isLoading = true
      const dataLogistics = []
      this.logisticNeeds.forEach(element => {
        dataLogistics.push({
          usage: element.purpose,
          priority: element.urgency,
          product_id: element.apd,
          brand: element.brand,
          quantity: element.total,
          unit: element.unitId
        })
      })

      const formData = new FormData()
      formData.append('logistic_request', JSON.stringify(dataLogistics))
      formData.append('agency_type', this.formApplicant.instanceType)
      if (this.formApplicant.instanceEtc) {
        formData.append('agency_name', this.formApplicant.instanceEtc)
      } else {
        formData.append('agency_name', this.formApplicant.instanceName)
        formData.append('master_faskes_id', this.formApplicant.instance)
      }
      if (this.formApplicant.instancePhoneNumber != null) {
        formData.append('phone_number', this.formApplicant.instancePhoneNumber)
      }
      formData.append('location_district_code', this.formApplicant.cityNameId.id)
      formData.append('location_subdistrict_code', this.formApplicant.districtNameId.id)
      formData.append('location_village_code', this.formApplicant.villageNameId.id)
      formData.append('location_address', this.formApplicant.fullAddress)
      formData.append('applicant_name', this.formIdentityApplicant.applicantName)
      formData.append('applicants_office', this.formIdentityApplicant.applicantPosition)
      formData.append('email', this.formIdentityApplicant.applicantEmail)
      formData.append('primary_phone_number', this.formIdentityApplicant.applicantPhoneNumber)
      formData.append('secondary_phone_number', this.formIdentityApplicant.applicantPhoneNumber2)
      formData.append('letter_file', this.applicantLetter.dataFile)
      formData.append('application_letter_number', this.formApplicant.letterNumber)
      formData.append('total_covid_patients', this.applicantLetter.total_covid_patients ?? 0)
      formData.append('total_isolation_room', this.applicantLetter.total_isolation_room ?? 0)
      formData.append('total_bedroom', this.applicantLetter.total_bedroom ?? 0)
      formData.append('total_health_worker', this.applicantLetter.total_health_worker ?? 0)
      formData.append('applicant_file', this.formIdentityApplicant.dataFile)
      formData.append('source_data', 'pikobar')
      formData.append('url', location.host + '/#')
      const response = await this.$store.dispatch('logistics/postApplicantForm', formData)
      if (response.status === 200) {
        this.isDone = true
      } else {
        this.isDone = false
      }
      this.isLoading = false
    },
    onDone() {
      this.isDone = false
    },
    onLoading() {
      this.isDone = true
      this.isLoading = false
    },
    refreshPage() {
      window.location.reload()
    }
  }
}
</script>
<style>
  .main-card-data-confirmation {
    padding: 30px;
    margin: 10px 120px 30px 120px;
  }
  .data-confirmation-text {
    font-size: 20px;
    font-weight: bold;
  }
  .main-color-data-confirmation {
    color: #27ae60;
    font-weight: bold;
    margin-top: 20px !important;
  }
  .image-style-data-confirmation {
    max-width: 100%;
    max-height: 500px;
  }
  .main-page-data-confirmation {
    display: block;
  }
  .main-page-mobile-data-confirmation {
    display: none;
  }
  .margin-top-min-50-data-confirmation {
    margin-top: -50px;
  }
  .margin-20-data-confirmation {
    margin: 20px;
  }
  .margin-instance-mobile-data-confirmation {
    margin: -20px 20px 0px 20px
  }
  .margin-wait-data-confirmation {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .save-style-data-confirmation {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .text-center-data-confirmation {
    text-align: center;
  }
  .title-page-data-confirmation {
    padding: 5px 20px;
    font-size: 22px;
    color: white;
    line-height: 29px;
  }
  .confirmation-text {
    text-align: center;
    padding-left: 75px;
    padding-right: 75px;
  }
@media (max-width: 1199px) and (min-width: 960px) {
}
@media (max-width: 768px) and (min-width: 320px) {
}

@media (max-width: 588px) and (min-width: 320px) {
  .main-page-mobile-data-confirmation {
    display: block;
  }
  .main-page-data-confirmation {
    display: none;
  }
  .bg-mobile-data-confirmation {
    background-color: white !important;
  }
}
</style>
