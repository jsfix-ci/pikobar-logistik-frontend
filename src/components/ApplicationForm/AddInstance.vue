<template>
  <v-dialog
    v-model="show"
    max-width="500"
    :persistent="true"
  >
    <v-card v-if="!isSuccess && !isFail">
      <ValidationObserver ref="observer">
        <v-col>
          <span class="title-dialog-add-instance">{{ $t('label.add_medical_facility') }}</span>
          <br>
          <br>
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredLicenseNumberFacility"
          >
            <v-label class="title"><b>{{ $t('label.license_number_facility') }}</b> <i class="text-small-add-instance">{{ $t('label.must_fill') }}</i></v-label>
            <v-text-field
              v-model="listQuery.nomor_izin_sarana"
              :placeholder="$t('label.license_number_facility_placeholder')"
              :error-messages="errors"
              outlined
            />
          </ValidationProvider>
          <ValidationProvider
            rules=""
          >
            <v-label class="title"><b>{{ $t('label.regis_number') }}</b></v-label>
            <v-text-field
              v-model="listQuery.nomor_registrasi"
              :placeholder="$t('label.regis_number_placeholder')"
              outlined
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredInstanceType"
          >
            <v-label class="title"><b>{{ $t('label.instance_type') }}</b> <i class="text-small-add-instance">{{ $t('label.must_fill') }}</i></v-label>
            <v-select
              v-model="listQuery.id_tipe_faskes"
              :placeholder="$t('label.autocomplete_instance_placeholder')"
              outlined
              :items="faskesTypeList"
              item-text="name"
              item-value="id"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredFaskesName"
          >
            <v-label class="title"><b>{{ $t('label.faskes_name') }}</b> <i class="text-small-add-instance">{{ $t('label.must_fill') }}</i></v-label>
            <v-text-field
              v-model="listQuery.nama_faskes"
              :placeholder="$t('label.input_faskes_name')"
              outlined
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredUpperName"
          >
            <v-label class="title"><b>{{ $t('label.upper_name') }}</b> <i class="text-small-add-instance">{{ $t('label.must_fill') }}</i></v-label>
            <v-text-field
              v-model="listQuery.nama_atasan"
              :placeholder="$t('label.input_upper_name')"
              outlined
              :error-messages="errors"
            />
          </ValidationProvider>
          <v-label class="title"><b>{{ $t('label.faskes_location') }}</b></v-label>
          <v-text-field
            v-model="listQuery.point_latitude_longitude"
            :placeholder="$t('label.input_faskes_location')"
            outlined
          />
          <ValidationProvider>
            <v-label class="title"><b>{{ $t('label.upload_fasyankes_letter_permit') }}</b></v-label>
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
            <br>
            <br>
          </ValidationProvider>
          <div v-if="processRequest">
            <v-btn class="margin-10" outlined text @click="hideDialog">{{ $t('label.cancel') }}</v-btn>
            <v-btn class="margin-10" color="primary" @click="submitData">{{ $t('label.save') }}</v-btn>
          </div>
          <div v-else>
            <v-btn disabled class="margin-10" outlined text @click="hideDialog">{{ $t('label.cancel') }}</v-btn>
            <v-btn disabled class="margin-10" color="primary" @click="submitData">{{ $t('label.save') }}</v-btn>
          </div>
        </v-col>
      </ValidationObserver>
    </v-card>
    <v-card v-else-if="isSuccess">
      <div>
        <v-row>
          <v-img :max-width="100" src="../../static/success_icon.svg" class="img-icon-add-instance" />
        </v-row>
        <v-row>
          <v-col>
            <center><span class="title-dialog-success-add-instance">{{ $t('label.success_dialog') }}</span></center>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <center><span class="text-dialog-success-add-instance">{{ $t('label.success_text_dialog') }}</span></center>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <center>
              <v-btn v-if="isAdmin" color="primary" class="white--text" @click="show = false">
                {{ $t('label.ok') }}
              </v-btn>
              <v-btn v-else color="primary" to="/landing-page" class="white--text">
                {{ $t('label.ok') }}
              </v-btn>
            </center>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <v-card v-else-if="isFail">
      <div>
        <v-row>
          <v-img :max-width="100" src="../../static/fail_icon.svg" class="img-icon-add-instance" />
        </v-row>
        <v-row>
          <v-col>
            <center><span class="title-dialog-success-add-instance">{{ $t('label.fail_dialog') }}</span></center>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <center>
              <span class="text-dialog-success-add-instance">{{ $t('label.fail_text_dialog') }}</span>
              <br>
              <span class="text-dialog-success-add-instance">{{ $t('label.fail_text_dialog_2') }}</span>
            </center>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <center>
              <v-btn color="primary" class="white--text" @click="repeatDialog">{{ $t('label.repeat') }}</v-btn>
            </center>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'

export default {
  name: 'FormAddInstance',
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
      listQuery: {},
      isSuccess: false,
      isFail: false,
      isSelecting: false,
      selectedFile: null,
      selectedFileName: '',
      isUpload: false,
      uploadAlert: false,
      isFileValid: false,
      isAdmin: false,
      processRequest: true
    }
  },
  computed: {
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ])
  },
  async created() {
    await this.setShowDialog()
    this.isAdmin = false
  },
  methods: {
    async submitData() {
      this.processRequest = false
      const valid = await this.$refs.observer.validate()
      if (!valid || !this.isFileValid) {
        this.uploadAlert = true
        return
      }
      const formInstance = new FormData()
      formInstance.append('id_tipe_faskes', this.listQuery.id_tipe_faskes)
      formInstance.append('nama_atasan', this.listQuery.nama_atasan)
      formInstance.append('nama_faskes', this.listQuery.nama_faskes)
      formInstance.append('nomor_izin_sarana', this.listQuery.nomor_izin_sarana)
      formInstance.append('nomor_registrasi', this.listQuery.nomor_registrasi)
      formInstance.append('permit_file', this.listQuery.permit_file)
      const response = await this.$store.dispatch('logistics/postAddFaskes', formInstance)
      if (response.status === 200) {
        this.isSuccess = true
      } else {
        this.isFail = true
      }
      this.processRequest = true
    },
    hideDialog() {
      this.resetDialog()
      EventBus.$emit('dialogHide', false)
    },
    resetDefaultValue() {
      this.listQuery = {}
      this.isSuccess = false
      this.isFail = false
      this.isSelecting = false
      this.selectedFile = null
      this.selectedFileName = ''
      this.isUpload = false
      this.uploadAlert = false
      this.isFileValid = false
    },
    resetDialog() {
      this.resetDefaultValue()
      this.listQuery.id_tipe_faskes = 1
      this.listQuery.nama_atasan = '-'
      this.listQuery.nama_faskes = '-'
      this.listQuery.nomor_izin_sarana = '-'
      this.listQuery.nomor_registrasi = '-'
      this.listQuery.permit_file = '-'
    },
    async setShowDialog(isAdmin) {
      this.isAdmin = isAdmin
      this.resetDefaultValue()
      this.listQuery.id_tipe_faskes = null
      this.listQuery.nama_atasan = null
      this.listQuery.nama_faskes = null
      this.listQuery.nomor_izin_sarana = null
      this.listQuery.nomor_registrasi = null
      this.listQuery.permit_file = null
    },
    repeatDialog() {
      this.isSuccess = false
      this.isFail = false
    },
    onButtonClick() {
      this.isSelecting = false
      this.isUpload = true
      this.uploadAlert = false
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      if (this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/jpg' || this.selectedFile.type === 'image/png') {
        if (this.selectedFile.size <= 10000000) {
          this.isFileValid = true
          this.uploadAlert = false
        } else {
          this.isFileValid = false
          this.uploadAlert = true
          return
        }
      } else {
        this.isFileValid = false
        return
      }
      this.selectedFileName = this.selectedFile.name
      this.isUpload = true
      this.listQuery.permit_file = this.selectedFile
    },
    deleteFile() {
      this.selectedFileName = ''
      this.isUpload = false
    }
  }
}
</script>

<style>
.title-dialog-add-instance {
  margin-top: 20px;
  color: #219653 !important;
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
}
.text-small-add-instance {
  font-size: 13px;
}
.title-dialog-success-add-instance {
  font-family: 'Product Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 0.05em;
}
.text-dialog-success-add-instance {
  font-family: 'Product Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.05em;
}
.img-icon-add-instance {
  margin: 5% 40% 5% 40%;
}
</style>
