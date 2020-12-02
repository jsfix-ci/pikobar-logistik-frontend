<template>
  <v-container>
    <v-row>
      <center><v-label>{{ $t('label.applicant_letter_title') }}</v-label></center>
    </v-row>
    <br><br>
    <div style="padding: 15px;">
      <v-row>
        <v-label><b>{{ $t('label.applicant_letter_note') }}</b></v-label>
      </v-row>
      <v-row>
        <v-label>{{ $t('label.applicant_letter_note_description') }}</v-label>
      </v-row>
      <v-row>
        <v-label>{{ $t('label.applicant_letter_note_point_1') }}</v-label>
      </v-row>
      <v-row>
        <v-label>{{ $t('label.applicant_letter_note_point_2') }}</v-label>
      </v-row>
      <v-row>
        <v-label>{{ $t('label.applicant_letter_note_point_3') }}</v-label>
      </v-row>
    </div>
    <br>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredApplicantLetterNumber"
            >
              <v-label class="title"><b>{{ $t('label.applicant_letter_number') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="letterNumber"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_letter_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row class="mt-n8">
          <v-col cols="12" sm="12" md="12">
            <v-label class="title"><b>{{ $t('label.applicant_letter_number_upload') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
            <br>
            <v-row>
              <v-col cols="2" sm="6" md="2">
                <img v-if="!isUpload" height="100" src="../../static/upload_no_dokumen.svg">
                <img v-if="isUpload" height="100" src="../../static/upload_dokumen.svg">
              </v-col>
              <v-col cols="2" sm="6" md="3">
                <v-row>
                  <v-label v-if="!isUpload">{{ $t('label.not_yet_upload_file') }}</v-label>
                  <v-label v-if="isUpload">{{ selectedFileName }}</v-label>
                </v-row>
                <br>
                <v-row>
                  <input
                    ref="uploader"
                    type="file"
                    class="d-none"
                    accept=".pdf, .jpg, .jpeg, .png"
                    @change="onFileChanged"
                  >
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
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <ValidationProvider
            rules="required"
          >
            <v-text-field
              v-model="selectedFileName"
              disabled
              class="d-none"
            />
          </ValidationProvider>
        </v-row>
        <v-container fluid>
          <div class="btn-desktop">
            <v-col cols="6" sm="6" md="6" class="float-right-fourth-step">
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
          </div>
          <div class="btn-mobile">
            <v-col cols="12" sm="12" md="6" class="float-right-fourth-step">
              <v-btn
                class="btn-margin-positive"
                color="primary"
                @click="onNext"
              >{{ $t('label.next') }}</v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="float-right-fourth-step">
              <v-btn
                class="btn-margin-positive"
                outlined
                text
                @click="onPrev"
              >{{ $t('label.cancel') }}</v-btn>
            </v-col>
          </div>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'

export default {
  name: 'SuratPermohonan',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    applicantLetter: {
      type: File,
      default: null
    }
  },
  data() {
    return {
      step: 4,
      isUpload: false,
      selectedFile: null,
      selectedFileName: '',
      uploadAlert: false,
      letterNumber: null
    }
  },
  methods: {
    onButtonClick() {
      this.isSelecting = false
      this.isUpload = true
      this.uploadAlert = false
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      this.selectedFileName = this.selectedFile.name
      this.isUpload = true
      this.applicantLetter = e.target.files[0]
      return this.applicantLetter
    },
    async onNext() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.uploadAlert = true
        return
      }
      EventBus.$emit('confirmStep', { file: this.applicantLetter, letter: this.letterNumber })
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
