<template>
  <v-container>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <center><v-label class="title"><b>{{ $t('label.applicant_form_header_step_2') }}</b></v-label></center>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredApplicantName"
            >
              <v-label class="title"><b>{{ $t('label.contact_person') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantName"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.input_full_name')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="!isAdmin"
              v-slot="{ errors }"
              rules="requiredApplicantPosition"
            >
              <v-label class="title"><b>{{ $t('label.applicant_position') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPosition"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_position_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
            >
              <v-label class="title"><b>{{ $t('label.applicant_position') }}</b></v-label>
              <v-textarea
                v-model="formIdentityApplicant.applicantPosition"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_position_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="!isAdmin"
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.upload_applicant_ktp') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <br>
              <v-label><i class="text-small-second-step">({{ $t('label.max_file_title') }})</i></v-label>
              <div>
                <v-label v-if="!isUpload">{{ $t('label.not_yet_upload_file') }}</v-label>
                <v-label v-else>{{ selectedFileName }}</v-label>
                <br>
                <input
                  ref="uploader"
                  type="file"
                  class="d-none"
                  accept=".jpg, .jpeg, .png"
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
                  class="margin-10"
                  depressed
                  :outlined="true"
                  :loading="isSelecting"
                  @click="onButtonClick"
                >
                  {{ $t('label.upload') }}
                </v-btn>
                <v-btn
                  v-if="isUpload"
                  outlined
                  class="btn-delete-mobile-second-step"
                  @click="deleteFile"
                >
                  {{ $t('label.delete') }}
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
                  {{ $t('errors.field_must_be_filled_identity_file') }}
                </v-alert>
              </div>
            </ValidationProvider>
            <ValidationProvider
              v-else
            >
              <v-label class="title"><b>{{ $t('label.upload_applicant_ktp') }}</b></v-label>
              <br>
              <v-label><i class="text-small-second-step">({{ $t('label.max_file_title') }})</i></v-label>
              <div>
                <v-label v-if="!isUpload">{{ $t('label.not_yet_upload_file') }}</v-label>
                <v-label v-else>{{ selectedFileName }}</v-label>
                <br>
                <input
                  ref="uploader"
                  type="file"
                  class="d-none"
                  accept=".jpg, .jpeg, .png"
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
                  class="margin-10"
                  depressed
                  :outlined="true"
                  :loading="isSelecting"
                  @click="onButtonClick"
                >
                  {{ $t('label.upload') }}
                </v-btn>
                <v-btn
                  v-if="isUpload"
                  outlined
                  class="btn-delete-mobile-second-step"
                  @click="deleteFile"
                >
                  {{ $t('label.delete') }}
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
              </div>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-if="!isAdmin"
              v-slot="{ errors }"
              rules="requiredApplicantEmail|email"
            >
              <v-label class="title"><b>{{ $t('label.applicant_email') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantEmail"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_email_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
            >
              <v-label class="title"><b>{{ $t('label.applicant_email') }}</b></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantEmail"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_email_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredApplicantPhoneNumber|isPhoneNumber"
            >
              <v-label class="title"><b>{{ $t('label.applicant_phone_number') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPhoneNumber"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_phone_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="!isAdmin"
              v-slot="{ errors }"
              rules="requiredApplicantPhoneNumber|isPhoneNumber"
            >
              <v-label class="title"><b>{{ $t('label.other_applicant_phone_number') }}</b> <i class="text-small-second-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPhoneNumber2"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_phone_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-else
              v-slot="{ errors }"
            >
              <v-label class="title"><b>{{ $t('label.other_applicant_phone_number') }}</b></v-label>
              <v-text-field
                v-model="formIdentityApplicant.applicantPhoneNumber2"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.applicant_phone_number_placeholder')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-col cols="6" sm="6" md="6" class="float-right-second-step">
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

export default {
  name: 'IdentitasPemohon',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    formIdentityApplicant: {
      type: Object,
      default: null
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 2,
      isSelecting: false,
      selectedFile: null,
      selectedFileName: '',
      isUpload: false,
      uploadAlert: false,
      requiredAlert: false,
      isFileValid: false,
      isValid: false
    }
  },
  created() {
    this.reloadData()
  },
  methods: {
    async reloadData() {
      if (this.formIdentityApplicant.dataFile) {
        this.selectedFile = this.formIdentityApplicant.dataFile
        this.selectedFileName = this.selectedFile.name
        this.isUpload = true
        this.requiredAlert = false
      }
    },
    async onNext() {
      this.isValid = true
      this.requiredAlert = false
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.isValid = false
      }
      if (!this.isAdmin && !this.isFileValid) {
        this.requiredAlert = true
        this.isValid = false
      }
      if (!this.isValid) {
        return
      }
      EventBus.$emit('nextStep', this.step)
    },
    onPrev() {
      EventBus.$emit('prevStep', this.step)
    },
    onButtonClick() {
      this.isSelecting = false
      this.uploadAlert = false
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      if (this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/png') {
        if (this.selectedFile.size < 10000000) {
          this.isFileValid = true
        } else {
          this.isFileValid = false
          return
        }
      } else {
        this.isFileValid = false
        return
      }
      this.selectedFileName = this.selectedFile.name
      this.isUpload = true
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      this.formIdentityApplicant.dataFile = this.selectedFile
      this.requiredAlert = false
    },
    deleteFile() {
      this.selectedFileName = ''
      this.formIdentityApplicant.dataFile = null
      this.isUpload = false
      if (!this.isAdmin) this.isFileValid = false
    }
  }
}
</script>
<style>
.text-small-second-step {
  font-size: 13px;
}
.float-right-second-step {
  float: right;
}
@media (max-width: 1199px) and (min-width: 960px) {
}
@media (max-width: 768px) and (min-width: 320px) {
}

@media (max-width: 588px) and (min-width: 320px) {
  .btn-delete-mobile-second-step {
    display: block;
    margin: 10px;
  }
}
</style>
