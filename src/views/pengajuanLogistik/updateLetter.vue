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
            <span><h4><b>{{ $t('route.applicant_form_edit') + ' - ' + $t('label.applicant_letter') }}</b></h4></span>
          </v-card-text>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <ValidationProvider v-slot="{ errors }" rules="requiredApplicantLetterNumber">
                <span><b>{{ $t('label.applicant_letter_number') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></span>
                <v-text-field
                  v-model="queryUpdateData.application_letter_number"
                  outlined
                  :error-messages="errors"
                  :placeholder="$t('label.applicant_letter_number_placeholder')"
                  solo-inverted
                  class="col-sm-6"
                />
              </ValidationProvider>
            </div>
            <div class="col-sm-12" style="margin-top:-40px;">
              <v-label class="title"><b>{{ $t('label.applicant_letter_number_upload') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <br>
              <v-row>
                <v-col cols="2" sm="6" md="2">
                  <img v-if="!isUpload && !isLetterExists" height="100" src="../../static/upload_no_dokumen.svg">
                  <img v-if="isUpload || isLetterExists" height="100" src="../../static/upload_dokumen.svg">
                </v-col>
                <v-col cols="3" sm="7" md="4">
                  <v-row>
                    <v-label v-if="!isUpload && !isLetterExists">{{ $t('label.not_yet_upload_file') }}</v-label>
                    <v-label v-if="isUpload || isLetterExists">{{ selectedFileName }}</v-label>
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
                    <a :href="defaultFile" target="_blank" class="blue--text btn-download">{{ $t('label.download_letter') }}</a>
                    <v-alert
                      v-if="uploadAlert"
                      type="error"
                    >
                      {{ $t('label.not_yet_upload_file') }}
                    </v-alert>
                    <v-alert
                      v-if="uploadFileMaxSizeAlert"
                      type="error"
                    >
                      {{ $t('label.upload_error_message') }}
                    </v-alert>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
        <v-col class="d-flex justify-center">
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            small
            width="180px"
            height="40px"
            class="margin-btn-update-logistic-needs"
            @click="closeDialog"
          >
            {{ $t('label.cancel') }}
          </v-btn>
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            small
            width="180px"
            height="40px"
            color="success"
            class="margin-btn-update-logistic-needs"
            @click="updateForm"
          >
            {{ $t('label.save_update') }}
          </v-btn>
          <v-dialog
            v-model="isLoading"
            hide-overlay
            persistent
            width="300"
          >
            <v-card
              color="primary"
              dark
            >
              <v-card-text>
                {{ $t('label.loading') }}
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                />
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'

export default {
  name: 'UpdateLetter',
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
      queryUpdateData: {
        id: null,
        agency_id: null,
        applicant_id: null,
        application_letter_number: null,
        update_type: 3
      },
      // Other Params
      isSelecting: false,
      selectedFile: null,
      selectedFileName: '',
      isUpload: false,
      uploadAlert: false,
      uploadFileMaxSizeAlert: false,
      isFileValid: false,
      isExists: false,
      url: '',
      defaultFile: '',
      noImage: './img/noimage.gif',
      isLetterExists: false,
      isLoading: false
    }
  },
  methods: {
    onButtonClick() {
      this.$refs.uploader.click()
      this.uploadAlert = false
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      this.isFileValid = true
      if (this.selectedFile.size >= 10000000) {
        this.isFileValid = false
        this.uploadFileMaxSizeAlert = true
        return
      }
      this.url = URL.createObjectURL(this.selectedFile)
      this.queryUpdateData.urlFile = this.url
      this.isSelecting = false
      this.selectedFileName = this.selectedFile.name
      this.uploadFileMaxSizeAlert = false
      this.isFileValid = false
      this.isUpload = true
      this.uploadAlert = !this.isUpload
    },
    deleteFile() {
      this.selectedFileName = ''
      this.isUpload = false
      this.queryUpdateData.urlFile = this.defaultFile
      this.queryUpdateData.dataFile = null
    },
    errorHandler(url) {
      this.queryUpdateData.urlFile = this.noImage
      this.$forceUpdate()
      this.isExists = false
    },
    // Default Method
    setData(id, value) {
      console.log('id', id)
      console.log('data', value)
      this.resetDialog()
      this.id = id
      this.defaultFile = value.letter.letter
      this.queryUpdateData = {
        id: value.letter.id,
        agency_id: value.letter.agency_id,
        applicant_id: value.letter.applicant_id,
        application_letter_number: value.letter.application_letter_number,
        update_type: 3
      }
      this.selectedFileName = value.letter.application_letter_number + '.pdf'
      if (value.letter !== null) this.isLetterExists = true
    },
    closeDialog() {
      this.$refs.observer.reset()
      this.resetDialog()
      EventBus.$emit('hideUpdateLetter', false)
    },
    resetDialog() {
      this.id = null
      this.data = {}
      this.queryUpdateData = {
        id: null,
        application_letter_number: null,
        update_type: 3
      }
      // Other Params
      this.isSelecting = false
      this.selectedFile = null
      this.selectedFileName = ''
      this.isUpload = false
      this.uploadAlert = false
      this.uploadFileMaxSizeAlert = false
      this.isFileValid = false
      this.isExists = false
      this.url = ''
      this.defaultFile = ''
      this.noImage = './img/noimage.gif'
      this.isLetterExists = false
    },
    async updateForm() {
      this.isLoading = true
      const valid = await this.$refs.observer.validate()
      this.uploadAlert = !this.isUpload && !this.isLetterExists
      if (!valid || (!this.isUpload && !this.isLetterExists)) {
        this.processRequest = true
        this.uploadFileMaxSizeAlert = false
        return
      }
      const formData = new FormData()
      formData.append('letter_file', this.selectedFile)
      formData.append('id', this.queryUpdateData.id)
      formData.append('agency_id', this.queryUpdateData.agency_id)
      formData.append('applicant_id', this.queryUpdateData.applicant_id)
      formData.append('application_letter_number', this.queryUpdateData.application_letter_number)
      formData.append('update_type', this.queryUpdateData.update_type)
      const response = await this.$store.dispatch('logistics/updateApplicantLetter', formData)
      if (response.status === 200) {
        EventBus.$emit('hideUpdateLetter', true)
      }
      this.isLoading = false
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
  .image-style {
    max-width: 100%;
    max-height: 500px;
  }
  .btn-download {
    margin-top: 15px;
    margin-left: 20px;
  }
</style>
