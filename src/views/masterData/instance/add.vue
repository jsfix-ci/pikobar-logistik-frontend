<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="primary--text">
          {{ $t('label.add_instance') }}
        </v-card-title>
        <v-card-text>
          <ValidationObserver ref="observer">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              :name="$t('label.instance_name')"
            >
              <v-label class="title"><b>{{ $t('label.instance_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="form.name"
                placeholder="Nama instansi"
                :error-messages="errors"
                outlined
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isPhoneNumber"
              :name="$t('label.instance_phone_number')"
            >
              <v-label class="title"><b>{{ $t('label.instance_phone_number') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-text-field
                v-model="form.phoneNumber"
                outlined
                :error-messages="errors"
                :placeholder="$t('label.phone_number')"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              :name="$t('label.city_name')"
            >
              <v-label class="title"><b>{{ $t('label.city_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="form.cityNameId"
                outlined
                :error-messages="errors"
                :items="applicantListCity"
                :placeholder="$t('label.autocomplete_city_placeholder')"
                @change="getListDistrict"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              :name="$t('label.district_name')"
            >
              <v-label class="title"><b>{{ $t('label.district_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="form.districtNameId"
                outlined
                :error-messages="errors"
                :items="applicantListDistrict"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
                @change="getListVillage"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              :name="$t('label.village_name')"
            >
              <v-label class="title"><b>{{ $t('label.village_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="form.villageNameId"
                outlined
                :error-messages="errors"
                :items="applicantListVillage"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              :name="$t('label.full_address')"
            >
              <v-label class="title"><b>{{ $t('label.full_address') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-textarea
                v-model="form.fullAddress"
                outlined
                :height="100"
                :no-resize="true"
                :error-messages="errors"
                :placeholder="$t('label.example_full_address')"
              />
            </ValidationProvider>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <div class="mx-auto">
            <v-btn
              class="mx-2"
              outlined
              @click="close()"
            >
              {{ $t('label.cancel') }}
            </v-btn>
            <v-btn
              class="mx-2"
              color="primary"
              :loading="loading"
              @click="submit()"
            >
              {{ $t('label.add') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <success-alert
      :is-open="isSuccess || isFailed"
      :image="isSuccess ? imageSuccess : imageFailed"
      :title="isSuccess ? $t('label.success_dialog') : $t('label.fail_dialog')"
      :text="isSuccess ? $t('label.success_text_dialog') : $t('label.fail_text_dialog')"
      :failed-text="isFailed ? $t('label.fail_text_dialog_2') : null"
      :text-button="isSuccess ? $t('label.ok') : $t('label.repeat')"
      @close-alert="closeAlert"
    />
  </v-row>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'
import SuccessAlert from './successAlert.vue'
export default {
  name: 'AddInstance',
  components: {
    ValidationProvider,
    ValidationObserver,
    SuccessAlert
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      loading: false,
      isFailed: false,
      isSuccess: false,
      imageSuccess: require('@/static/success_icon.svg'),
      imageFailed: require('@/static/fail_icon.svg')
    }
  },
  computed: {
    ...mapGetters('region', [
      'applicantListCity',
      'applicantListDistrict',
      'applicantListVillage'
    ])
  },
  async created() {
    await this.getListCity()
  },
  methods: {
    close() {
      this.$emit('close-dialog')
    },
    closeAlert() {
      this.isFailed = false
      this.isSuccess = false
    },
    async submit() {
      this.loading = true
      const valid = await this.$refs.observer.validate()
      if (!valid) return
      const formInstance = new FormData()
      formInstance.append('instance_name', this.form.name)
      const response = await this.$store.dispatch('logistics/postAddInstance', formInstance)
      if (response.status === 200) {
        this.isSuccess = true
      } else {
        this.isFailed = true
      }
      this.loading = false
    },
    async getListCity() {
      await this.$store.dispatch('region/getApplicantFormListCity')
      this.applicantListCity.forEach(element => {
        element.value = {
          id: element.kemendagri_kabupaten_kode,
          name: element.kemendagri_kabupaten_nama
        }
        element.text = element.kemendagri_kabupaten_nama
      })
    },
    async getListDistrict() {
      await this.$store.dispatch('region/getApplicantFormListDistrict', { city_code: this.form.cityNameId.id })
      this.applicantListDistrict.forEach(element => {
        element.value = {
          id: element.kemendagri_kecamatan_kode,
          name: element.kemendagri_kecamatan_nama
        }
        element.text = element.kemendagri_kecamatan_nama
      })
    },
    async getListVillage() {
      await this.$store.dispatch('region/getApplicantFormListVillage', { subdistrict_code: this.form.districtNameId.id, area_type: 'village' })
      this.applicantListVillage.forEach(element => {
        element.value = {
          id: element.kemendagri_desa_kode,
          name: element.kemendagri_desa_nama
        }
        element.text = element.kemendagri_desa_nama
      })
    }
  }
}
</script>
