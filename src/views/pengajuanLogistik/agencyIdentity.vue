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
            <span><h4><b>{{ $t('route.applicant_form_edit') + ' - ' + $t('label.step_title_1') }}</b></h4></span>
          </v-card-text>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <ValidationProvider v-slot="{ errors }" rules="requiredInstanceType">
                <span><b>{{ $t('label.instance_type') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></span>
                <v-autocomplete
                  v-model="queryUpdateData.agency_type"
                  :items="faskesTypeList"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  item-value="id"
                  item-text="name"
                  :placeholder="$t('label.autocomplete_instance_placeholder')"
                  @change="onSelectFaskesType"
                />
              </ValidationProvider>
              <ValidationProvider
                v-if="!isEtc"
                v-slot="{ errors }"
                rules="requiredInstanceName"
              >
                <v-label class="title"><b>{{ $t('label.instance_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                <v-autocomplete
                  v-model="queryUpdateData.master_faskes_id"
                  :items="faskesList"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  item-value="id"
                  item-text="nama_faskes"
                  :placeholder="instanceNamePlaceholder"
                  @input.native="querySearchFaskes"
                  @change="onSelectFaskes"
                />
              </ValidationProvider>
              <ValidationProvider
                v-else
                v-slot="{ errors }"
                rules="requiredInstanceName"
              >
                <v-label class="title"><b>{{ $t('label.instance_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                <v-text-field
                  v-model="queryUpdateData.agency_name"
                  outlined
                  :error-messages="errors"
                  :placeholder="instanceNamePlaceholder"
                  solo-inverted
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="isPhoneNumber"
              >
                <v-label class="title"><b>{{ $t('label.instance_phone_number') }}</b></v-label>
                <v-text-field
                  v-model="queryUpdateData.phone_number"
                  outlined
                  :error-messages="errors"
                  :placeholder="$t('label.example_phone_number')"
                  solo-inverted
                />
              </ValidationProvider>
            </div>
            <div class="col-sm-6">
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredCityName"
              >
                <v-label class="title"><b>{{ $t('label.city_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                <v-autocomplete
                  v-model="queryUpdateData.location_district_code"
                  :items="applicantListCity"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  item-value="kemendagri_kabupaten_kode"
                  item-text="kemendagri_kabupaten_nama"
                  :placeholder="$t('label.autocomplete_city_placeholder')"
                  @change="getListDistrict"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredDistrictName"
              >
                <v-label class="title"><b>{{ $t('label.district_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                <v-autocomplete
                  v-model="queryUpdateData.location_subdistrict_code"
                  :items="applicantListDistrict"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  item-value="kemendagri_kecamatan_kode"
                  item-text="kemendagri_kecamatan_nama"
                  :placeholder="$t('label.autocomplete_capital_placeholder')"
                  @change="getListVillage"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredVillageName"
              >
                <v-label class="title"><b>{{ $t('label.village_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                <v-autocomplete
                  v-model="queryUpdateData.location_village_code"
                  :items="applicantListVillage"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  item-value="kemendagri_desa_kode"
                  item-text="kemendagri_desa_nama"
                  :placeholder="$t('label.autocomplete_capital_placeholder')"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
              >
                <v-label class="title"><b>{{ $t('label.full_address') }}</b></v-label>
                <v-textarea
                  v-model="queryUpdateData.location_address"
                  outlined
                  :height="100"
                  :no-resize="true"
                  :error-messages="errors"
                  :placeholder="$t('label.example_full_address')"
                  solo-inverted
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
import { mapGetters } from 'vuex'

export default {
  name: 'AgencyIdentity',
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
      data: {},
      agency_type: null,
      nameFaskes: '',
      listQueryFaskes: {
        nama_faskes: null,
        id_tipe_faskes: null
      },
      showForm: false,
      isEtc: false,
      instanceNamePlaceholder: this.$t('label.example_instance_name'),
      id: null,
      queryUpdateData: {
        id: null,
        applicant_id: null,
        master_faskes_id: null,
        agency_name: null,
        phone_number: null,
        location_district_code: null,
        location_subdistrict_code: null,
        location_village_code: null,
        location_address: null,
        agency_type: null,
        update_type: 1
      }
    }
  },
  computed: {
    ...mapGetters('region', [
      'applicantListCity',
      'applicantListDistrict',
      'applicantListVillage'
    ]),
    ...mapGetters('faskes', [
      'faskesList',
      'faskesDetail'
    ]),
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ])
  },
  methods: {
    async getListCity() {
      await this.$store.dispatch('region/getApplicantFormListCity')
    },
    async getListDistrict(id) {
      await this.$store.dispatch('region/getApplicantFormListDistrict', { city_code: id, area_type: 'subdistricts' })
    },
    async getListVillage(id) {
      await this.$store.dispatch('region/getApplicantFormListVillage', { subdistrict_code: id, area_type: 'village' })
    },
    async onSelectFaskesType(id) {
      this.listQueryFaskes.id_tipe_faskes = id
      this.listQueryFaskes.nama_faskes = ''
      if (id === this.agency_type) {
        this.listQueryFaskes.nama_faskes = this.queryUpdateData.agency_name
      }
      this.isEtc = false
      if (id === 4 || id === 5) {
        this.isEtc = true
      }
      this.onChangeInstanceNamePlaceholder(id)
      await this.getListFaskes()
    },
    onChangeInstanceNamePlaceholder(value) {
      switch (value) {
        case 1:
          this.instanceNamePlaceholder = this.$t('label.example_instance_name')
          break
        case 2:
          this.instanceNamePlaceholder = this.$t('label.example_instance_second')
          break
        case 3:
          this.instanceNamePlaceholder = this.$t('label.example_instance_three')
          break
        case 4:
          this.instanceNamePlaceholder = this.$t('label.example_instance_last')
          break
        case 5:
          this.instanceNamePlaceholder = this.$t('label.example_instance_last')
          break
        default:
          this.instanceNamePlaceholder = this.$t('label.example_instance_name')
      }
    },
    async getListFaskes() {
      await this.$store.dispatch('faskes/getListFaskes', this.listQueryFaskes)
    },
    async querySearchFaskes(event) {
      this.listQueryFaskes.nama_faskes = event.target.value
      await this.getListFaskes()
    },
    async onSelectFaskes(id) {
      if (id) {
        await this.$store.dispatch('faskes/getDetailFaskes', id)
      }
    },
    // Default Method
    setData(id, value) {
      this.$store.dispatch('faskesType/getListFaskesType')
      this.getListCity()
      this.id = id
      this.agency_type = parseInt(value.agency_type)
      this.queryUpdateData = {
        id: value.id,
        applicant_id: value.applicant.id,
        master_faskes_id: value.master_faskes_id,
        agency_name: value.agency_name,
        phone_number: value.phone_number,
        location_district_code: value.location_district_code,
        location_subdistrict_code: value.location_subdistrict_code,
        location_village_code: value.location_village_code,
        location_address: value.location_address,
        agency_type: parseInt(value.agency_type),
        update_type: 1
      }
      this.onSelectFaskesType(this.queryUpdateData.agency_type)
      this.getListDistrict(this.queryUpdateData.location_district_code)
      this.getListVillage(this.queryUpdateData.location_subdistrict_code)
    },
    closeDialog() {
      this.$refs.observer.reset()
      EventBus.$emit('hideAgencyIdentity', false)
    },
    async updateForm() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      const response = await this.$store.dispatch('logistics/updateApplicant', this.queryUpdateData)
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
