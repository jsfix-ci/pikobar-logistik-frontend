<template>
  <v-container>
    <v-row>
      <v-alert v-if="formApplicant.instanceType <= 3" icon="mdi-alert-circle" text outlined type="info">Untuk memudahkan proses rekomendasi logistik yang diajukan oleh pemohon. Permohonan dari Fasyankes (Rumah Sakit, Klinik, Puskesmas) harap melengkapi data berikut:</v-alert>
      <center v-else><v-label class="title"><b>{{ $t('label.applicant_form_header_step_2') }}</b></v-label></center>
      <br>
    </v-row>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
        class="mt-5"
      >
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredApplicantLetterNumber"
            >
              <v-label class="title"><b>{{ $t('label.applicant_letter_number') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.name"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_letter_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.applicant_letter_number_upload') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <br>
              <v-row class="mt-1">
                <v-col sm="12" md="3">
                  <img v-if="!isUpload" height="100" src="../../static/upload_no_dokumen.svg">
                  <img v-if="isUpload" height="100" src="../../static/upload_dokumen.svg">
                </v-col>
                <v-col sm="12" md="9">
                  <v-row class="mr-1 ml-1">
                    <v-label v-if="!isUpload">{{ $t('label.not_yet_upload_file') }}</v-label>
                    <v-label v-if="isUpload">{{ selectedFileName }}</v-label>
                  </v-row>
                  <br>
                  <v-row class="mr-1 ml-1 mt-1">
                    <input
                      ref="uploader"
                      type="file"
                      class="d-none"
                      accept=".jpg, .jpeg, .png, .pdf"
                      @change="onFileChanged"
                    >
                    <v-text-field
                      v-model="selectedFileName"
                      disabled
                      class="d-none"
                    />
                    <v-btn
                      v-if="!isUpload"
                      color="#2E7D32"
                      outlined
                      @click="onButtonClick"
                    >
                      {{ $t('label.upload') }}
                    </v-btn>
                    <v-btn
                      v-if="isUpload"
                      color="#2E7D32"
                      class="margin-10"
                      depressed
                      :outlined="true"
                      :loading="isSelecting"
                      @click="onButtonClick"
                    >
                      {{ $t('label.reupload') }}
                    </v-btn>
                    <v-alert
                      v-if="uploadAlert"
                      type="error"
                    >
                      {{ $t('label.upload_error_message') }}
                    </v-alert>
                    <v-alert
                      v-if="requiredAlert"
                      type="error"
                    >
                      {{ $t('errors.field_must_be_filled_applicant_file') }}
                    </v-alert>
                  </v-row>
                </v-col>
              </v-row>
            </ValidationProvider>
          </v-col>
          <v-col v-if="formApplicant.instanceType <= 3 && logisticRequestType === 'alkes'" cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredCovidPatientTotal"
            >
              <v-label class="title"><b>Jumlah Pasien COVID-19 yang ditangani</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_covid_patients"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah pasien"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredIsolationRoomTotal"
            >
              <v-label class="title"><b>Jumlah ruang isolasi</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_isolation_room"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah ruang isolasi"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredBedroomTotal"
            >
              <v-label class="title"><b>Jumlah ruang tidur</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_bedroom"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah ruang tidur"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredHealthWorkerTotal"
            >
              <v-label class="title"><b>Jumlah tenaga kesehatan yang menangani</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="applicantLetter.total_health_worker"
                outlined
                :error-messages="errors"
                placeholder="Masukkan jumlah tenaga kesehatan"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-col cols="12" sm="12" md="6" class="float-right-fourth-step">
            <v-btn
              class="btn-margin-positive"
              color="primary"
              @click="onNext"
            >{{ $t('label.next') }}</v-btn>
            <v-btn
              class="btn-margin-positive"
              outlined
              text
              @click="onPrev"
            >{{ $t('label.cancel') }}</v-btn>
          </v-col>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'SuratPermohonan',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    formApplicant: {
      type: Object,
      default: null
    },
    applicantLetter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      step: 4,
      isSelecting: false,
      isUpload: false,
      selectedFile: null,
      selectedFileName: '',
      uploadAlert: false,
      letterNumber: null,
      requiredAlert: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters('logistics', ['logisticRequestType'])
  },
  created() {
    this.reloadData()
  },
  methods: {
    async reloadData() {
      if (this.applicantLetter.dataFile) {
        this.selectedFile = this.applicantLetter.dataFile
        this.selectedFileName = this.selectedFile.name
        this.isUpload = true
        this.requiredAlert = false
      } else {
        this.applicantLetter.name = null
        this.applicantLetter.dataFile = null
      }
    },
    onButtonClick() {
      this.isSelecting = false
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      if (this.selectedFile.size < 10000000) {
        this.isFileValid = true
      } else {
        this.isFileValid = false
        return
      }
      this.selectedFileName = this.selectedFile.name
      this.isUpload = true
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      this.applicantLetter.dataFile = this.selectedFile
      this.requiredAlert = false
    },
    async onNext() {
      this.isValid = true
      this.requiredAlert = false
      if (!this.isUpload) {
        this.requiredAlert = true
        this.isValid = false
      }
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.isValid = false
      }
      if (!this.isValid) {
        return
      }
      EventBus.$emit('confirmStep', this.applicantLetter)
    },
    onPrev() {
      this.isAddAPD = false
      EventBus.$emit('prevStep', this.step)
    }
  }
}
</script>
<style>
.float-right-fourth-step {
  float: right;
}
@media (max-width: 1199px) and (min-width: 960px) {
}
@media (max-width: 768px) and (min-width: 320px) {
}

@media (max-width: 588px) and (min-width: 320px) {
}
</style>
