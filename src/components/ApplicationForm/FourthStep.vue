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
              v-slot="{ errors }"
              ref="provider"
              name="Surat Permohonan"
              rules="required|size:10000|ext:jpg,png,jpeg,pdf"
            >
              <upload-file
                :suffix-title="$t('label.must_fill')"
                :empty-file="$t('label.not_yet_upload_file')"
                :title="$t('label.applicant_letter_number_upload')"
                note="JPG, JPEG, PNG, PDF up to 10MB"
                accept=".jpg, .jpeg, .png, .pdf"
                :is-upload="isUpload"
                :selected-file-name="selectedFileName"
                @saveImage="saveImage"
              />
              <p v-if="errors.length" class="ma-2 error--text error--message">{{ errors[0] }}</p>
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
      file: null,
      isUpload: false,
      selectedFile: null,
      letterNumber: null,
      selectedFileName: null
    }
  },
  computed: {
    ...mapGetters('logistics', ['logisticRequestType'])
  },
  created() {
    this.reloadData()
  },
  methods: {
    async saveImage(e) {
      this.isUpload = false
      this.file = e.target.files[0]
      this.selectedFileName = this.file.name
      const valid = await this.$refs.provider.validate(this.file)
      if (!valid.valid) return
      this.isUpload = true
      const formData = new FormData()
      formData.append('file', this.file)
      this.applicantLetter.dataFile = this.file
    },
    async reloadData() {
      if (this.applicantLetter.dataFile) {
        this.file = this.applicantLetter.dataFile
        this.selectedFileName = this.file.name
        this.isUpload = true
      } else {
        this.applicantLetter.name = null
        this.applicantLetter.dataFile = null
      }
    },
    async onNext() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
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
