<template>
  <v-dialog
    v-model="show"
    max-width="550"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-col>
          <span class="title-update-logistic-needs">{{ $t('label.outgoing_mail_upload') }}</span>
        </v-col>
        <v-col>
          <p class="sub-title-update-logistic-needs">{{ $t('route.outgoing_mail') }}</p>
          <span class="value-sub-title-update-logistic-needs">{{ $t('label.outgoing_mail_number_form') }} <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></span>
          <ValidationProvider
            v-slot="{ errors }"
            rules="letterNumber"
          >
            <v-text-field
              v-model="data.letter_number"
              outlined
              solo-inverted
              :error-messages="errors"
            />
          </ValidationProvider>
          <v-col>
            <v-label class="title"><strong>{{ $t('route.outgoing_mail') }}</strong> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
            <br>
            <v-label><i class="text-small-second-step">({{ $t('label.max_type_file_upload_letter') }})</i></v-label>
            <v-row class="mt-1">
              <v-col cols="3" sm="6" md="3">
                <img v-if="!isUpload" height="100" src="../../static/upload_no_dokumen.svg">
                <img v-if="isUpload" height="100" src="../../static/upload_dokumen.svg">
              </v-col>
              <v-col>
                <v-row class="mt-1">
                  <v-label v-if="!isUpload">{{ $t('label.not_yet_upload_file') }}</v-label>
                  <v-label v-if="isUpload">{{ selectedFileName }}</v-label>
                </v-row>
                <br>
                <v-row class="mt-1">
                  <input
                    ref="uploader"
                    type="file"
                    class="d-none"
                    accept=".pdf, .jpg, .jpeg, .png"
                    @change="onFileChanged"
                  >
                  <v-btn
                    v-if="!isUpload && processRequest"
                    color="#2E7D32"
                    outlined
                    @click="onButtonClick"
                  >
                    {{ $t('label.upload') }}
                  </v-btn>
                  <v-btn
                    v-if="isUpload && processRequest"
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
                    {{ $t('label.not_yet_upload_file') }}
                  </v-alert>
                  <v-alert
                    v-if="uploadFileMaxSizeAlert"
                    type="error"
                  >
                    {{ $t('label.upload_letter_error_message') }}
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
        </v-col>
        <hr class="margin-top-min-10-update-logistic-needs">
        <v-col class="margin-top-min-10-update-logistic-needs">
          <v-row>
            <v-col>
              <v-btn v-if="processRequest" outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
              <v-btn v-else disabled outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
            </v-col>
            <v-col>
              <v-btn v-if="processRequest" small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.upload') }}</v-btn>
              <v-btn v-else disabled small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.upload') }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'UploadLetter',
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
      outgoingLetter: {
        type: File,
        default: null
      },
      isSuccess: false,
      isFail: false,
      data: {
        id: null,
        letter_number: null
      },
      // Upload Parameter
      isUpload: false,
      selectedFile: null,
      selectedFileName: '',
      uploadAlert: false,
      uploadFileMaxSizeAlert: false,
      letterNumber: null,
      processRequest: true
    }
  },
  computed: {
    ...mapGetters('letter', [
      'applicationLetter'
    ])
  },
  methods: {
    async setDialog(data) {
      this.data.id = data.id
      this.data.letter_number = data.letter_number
    },
    onButtonClick() {
      this.isSelecting = false
      this.isUpload = false
      this.uploadAlert = false
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.isFileValid = true
      this.uploadFileMaxSizeAlert = false
      this.selectedFile = e.target.files[0]
      this.selectedFileName = this.selectedFile.name
      this.outgoingLetter = this.selectedFile
      if (this.selectedFile.size > 10000000) {
        this.isFileValid = false
        this.uploadFileMaxSizeAlert = true
        return
      }
      this.isUpload = true
      this.uploadAlert = !this.isUpload
    },
    async submitData() {
      this.processRequest = false
      const valid = await this.$refs.observer.validate()
      this.uploadAlert = !this.isUpload
      this.selectedFileName = this.outgoingLetter.name
      if (!valid || !this.isUpload) {
        this.processRequest = true
        this.uploadFileMaxSizeAlert = false
        return
      }
      const formUploadOutgoingMail = new FormData()
      formUploadOutgoingMail.append('id', this.data.id)
      formUploadOutgoingMail.append('letter_number', this.data.letter_number)
      formUploadOutgoingMail.append('file', this.outgoingLetter)
      const response = await this.$store.dispatch('letter/uploadOutgoingMail', formUploadOutgoingMail)
      if (response.status === 200) {
        this.hideDialog(true)
      } else {
        this.isFail = true
      }
      this.processRequest = true
    },
    hideDialog(value) {
      this.$refs.observer.reset()
      EventBus.$emit('dialogUploadHide', value)
      this.reset()
    },
    reset() {
      this.data = {
        id: null,
        letter_number: null
      }
      this.isUpload = false
      this.selectedFile = null
      this.selectedFileName = ''
      this.uploadAlert = false
      this.letterNumber = null
    },
    checkFileValid() {
      return this.isFileValid
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
    line-height: 19px;
    color: #219653;
  }
  .sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #219653;
  }
  .value-sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #4F4F4F;
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
  .text-small-first-step {
    font-size: 13px;
    font-weight: normal;
  }
  .add_more {
    display: block;
    float: right;
  }
  .total_applicant {
    margin-top: 10px;
  }
  .letter_number {
    margin: 15px 0;
    font-weight: normal;
    font-size: 15px;
  }
</style>
