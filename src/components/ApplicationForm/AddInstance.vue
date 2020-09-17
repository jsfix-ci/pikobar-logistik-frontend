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
          <div>
            <v-btn class="margin-10" outlined @click="hideDialog">{{ $t('label.cancel') }}</v-btn>
            <v-btn class="margin-10" color="success" @click="submitData">{{ $t('label.save') }}</v-btn>
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
              <v-btn color="primary" to="/landing-page" class="white--text">
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
              <v-btn color="primary" to="/landing-page" class="white--text">
                {{ $t('label.repeat') }}
              </v-btn>
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
      isFail: false
    }
  },
  computed: {
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ])
  },
  async created() {
    await this.$store.dispatch('faskesType/getListFaskesType')
  },
  methods: {
    async submitData() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      const response = await this.$store.dispatch('logistics/postAddFaskes', this.listQuery)
      if (response.status === 200) {
        this.isSuccess = true
      } else {
        this.isFail = true
      }
    },
    hideDialog() {
      EventBus.$emit('dialogHide', false)
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
