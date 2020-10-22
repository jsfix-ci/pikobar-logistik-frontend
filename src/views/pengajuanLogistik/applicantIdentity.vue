<template>
  <v-dialog
    v-model="show"
    width="80%"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <div class="col-sm-12">
          <v-card-text class="headerSection">
            <span><h4><b>{{ $t('route.applicant_form_edit') + ' - ' + $t('label.step_title_2') }}</b></h4></span>
          </v-card-text>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <ValidationProvider v-slot="{ errors }" rules="requiredApplicantName">
                <span><b>{{ $t('label.contact_person') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></span>
                <v-text-field
                  v-model="data.applicant.applicant_name"
                  outlined
                  :error-messages="errors"
                  :placeholder="$t('label.input_full_name')"
                  solo-inverted
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
              >
                <v-label class="title"><b>{{ $t('label.applicant_position') }}</b></v-label>
                <v-text-field
                  v-model="data.applicant.applicants_office"
                  outlined
                  :error-messages="errors"
                  :placeholder="$t('label.applicant_position_placeholder')"
                  solo-inverted
                />
              </ValidationProvider>
              <ValidationProvider>
                <v-label class="title"><b>{{ $t('label.upload_applicant_ktp') }}</b></v-label>
                <v-img v-if="isExists" class="image-style" :src="data.applicant.file" width="400px" @error="errorHandler" />
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
                    small
                    width="180px"
                    height="40px"
                    @click="onButtonClick"
                  >
                    {{ $t('label.upload') }}
                  </v-btn>
                  <v-btn
                    v-if="isUpload"
                    outlined
                    class="btn-delete-mobile-second-step"
                    small
                    width="180px"
                    height="40px"
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
                    small
                    width="180px"
                    height="40px"
                    style="margin-left: 10px;"
                    @click="onButtonClick"
                  >
                    {{ $t('label.reupload') }}
                  </v-btn>
                  <a
                    v-if="isExists"
                    class="margin-10"
                    style="margin-left: 10px;"
                    :href="data.applicant.file"
                    target="_blank"
                  >
                    {{ $t('label.download') }}
                  </a>
                  <v-alert
                    v-if="uploadAlert"
                    type="error"
                  >
                    {{ $t('label.upload_error_message') }}
                  </v-alert>
                </div>
              </ValidationProvider>
            </div>
            <div class="col-sm-6">
              <ValidationProvider
                v-slot="{ errors }"
              >
                <v-label class="title"><b>{{ $t('label.applicant_email') }}</b></v-label>
                <v-text-field
                  v-model="data.applicant.email"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  :placeholder="$t('label.applicant_email_placeholder')"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredApplicantPhoneNumber|isPhoneNumber"
              >
                <v-label class="title"><b>{{ $t('label.applicant_phone_number') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                <v-text-field
                  v-model="data.applicant.primary_phone_number"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  :placeholder="$t('label.applicant_phone_number_placeholder')"
                />
              </ValidationProvider>
            </div>
          </div>
        </div>
        <v-col class="d-flex justify-center">
          <v-btn
            small
            width="180px"
            height="40px"
            class="margin-btn-update-logistic-needs"
            @click="closeDialog"
          >
            {{ $t('label.cancel') }}
          </v-btn>
          <v-btn
            small
            width="180px"
            height="40px"
            color="success"
            class="margin-btn-update-logistic-needs"
            @click="updateForm"
          >
            {{ $t('label.save_update') }}
          </v-btn>
        </v-col>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'

export default {
  name: 'ApplicantIdentity',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    show: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      id: null,
      data: {},
      // Other Params
      isSelecting: false,
      selectedFile: null,
      selectedFileName: '',
      isUpload: false,
      uploadAlert: false,
      isFileValid: false,
      isExists: false,
      url: '',
      defaultIdentity: '',
      noImage: './img/noimage.gif'
    }
  },
  methods: {
    onButtonClick() {
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
      this.url = URL.createObjectURL(this.selectedFile)
      this.data.applicant.file = this.url
      this.isSelecting = false
      this.isUpload = true
      this.uploadAlert = false
      this.selectedFileName = this.selectedFile.name
      this.isUpload = true
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      this.data.dataFile = this.selectedFile
    },
    deleteFile() {
      this.selectedFileName = ''
      this.isUpload = false
      this.data.applicant.file = ''
    },
    errorHandler(url) {
      this.data.applicant.file = this.noImage
      this.$forceUpdate()
    },
    // Default Method
    setData(id, value) {
      this.id = id
      this.data = value
      this.isExists = (this.data.applicant.file !== null)
      this.defaultIdentity = value.applicant.file
    },
    closeDialog() {
      this.$refs.observer.reset()
      EventBus.$emit('hideApplicantIdentity', false)
    },
    async updateForm() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      const queryData = {
        id: this.id,
        applicant_name: this.data.applicant.applicant_name,
        applicants_office: this.data.applicant.applicants_office,
        email: this.data.applicant.email,
        primary_phone_number: this.data.applicant.primary_phone_number,
        dataFile: this.data.dataFile,
        update_type: 2
      }
      const response = await this.$store.dispatch('logistics/updateApplicant', queryData)
      if (response.status === 200) {
        EventBus.$emit('hideAgencyIdentity', true)
      }
    }
  }
}
</script>

<style>
  .title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 22px;
  }
  .sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 17px;
    color: #219653;
  }
  .value-sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    color: #828282;
  }
  .margin-top-min-10-update-logistic-needs {
    margin-top: -10px;
  }
  .margin-top-min-30-update-logistic-needs {
    margin-top: -30px;
  }
  .margin-top-min-20-update-logistic-needs {
    margin-top: -25px;
  }
  .margin-btn-update-logistic-needs {
    margin: 5px;
  }
  .headerSection {
    margin-top: -15px;
    padding-left: -15px;
    border-bottom: 1px solid rgb(214, 214, 214);
  }
</style>
