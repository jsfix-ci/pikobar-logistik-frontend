<template>
  <v-container>
    <div v-if="!isAddAPD">
      <third-step-options :is-admin="isAdmin" @next="onClick" />
      <v-row>
        <v-col cols="12" sm="12" md="4" offset-md="4">
          <v-alert
            v-if="showAlert"
            type="error"
          >
            {{ $t('label.alert_logistic_needs') }}
          </v-alert>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <ValidationObserver ref="observer">
        <v-form
          ref="form"
          lazy-validation
        >
          <v-row
            v-for="(data, index) in logisticNeeds"
            :key="data.id"
          >
            <v-col
              cols="12"
              sm="12"
              md="1"
            >
              <center><v-label class="title"><b>{{ index + 1 }}</b></v-label></center>
              <center><v-icon class="padding-10-third-step" color="red" size="25" @click="deleteData(index)">mdi-delete</v-icon></center>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="3"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredAPDName"
              >
                <v-label class="title"><b>{{ $t('label.apd_name_spec') }}</b></v-label>
                <v-autocomplete
                  v-model="data.apd"
                  :placeholder="$t('label.choose_apd')"
                  :items="listAPD"
                  item-text="name"
                  item-value="id"
                  :error-messages="errors"
                  outlined
                  solo-inverted
                  @change="setUnit(data)"
                />
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="2"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredBrand"
              >
                <v-label class="title"><b>{{ $t('label.description') }}</b></v-label>
                <v-text-field
                  v-model="data.description"
                  :placeholder="$t('label.input_description')"
                  :error-messages="errors"
                  outlined
                  solo-inverted
                />
              </ValidationProvider>
            </v-col>
            <v-col
              cols="4"
              sm="4"
              md="2"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredTotal|notMinus|notDecimal"
              >
                <v-label class="title"><b>{{ $t('label.total') }}</b></v-label>
                <v-text-field
                  v-model="data.total"
                  outlined
                  solo-inverted
                  type="number"
                  :error-messages="errors"
                  @change="setTotalAPD"
                />
              </ValidationProvider>
            </v-col>
            <v-col
              cols="8"
              sm="8"
              md="2"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredUnit"
              >
                <v-label class="title"><b>{{ $t('label.unit') }}</b></v-label>
                <v-autocomplete
                  v-model="data.unitId"
                  :items="data.unitList"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  item-value="unit_id"
                  item-text="unit"
                />
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="2"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredPurpose"
              >
                <v-label class="title"><b>{{ $t('label.purpose') }}</b></v-label>
                <v-text-field
                  v-model="data.purpose"
                  :placeholder="$t('label.input_purpose')"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="3" offset-md="1">
              <v-label>{{ $t('label.logistic_total') }} {{ totalLogistic }}</v-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="2" offset-md="1">
              <center>
                <v-btn
                  color="#2E7D32"
                  outlined
                  @click="addLogistic"
                >{{ $t('label.add_more') }}</v-btn>
              </center>
            </v-col>
            <v-col cols="12" sm="12" md="3" offset-md="1">
              <v-alert
                v-if="showAlert"
                type="error"
              >
                {{ $t('label.alert_logistic_needs') }}
              </v-alert>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
    </div>
    <v-container fluid>
      <v-col cols="6" sm="6" md="6" class="float-right-third-step">
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
        >{{ $t('label.back') }}</v-btn>
      </v-col>
    </v-container>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'
import ThirdStepOptions from './ThirdStepOptions.vue'

export default {
  name: 'KebutuhanLogistik',
  components: {
    ValidationProvider,
    ValidationObserver,
    ThirdStepOptions
  },
  props: {
    logisticNeeds: {
      type: Array,
      default: null
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 3,
      isAddAPD: false,
      urgency: ['Rendah', 'Menengah', 'Tinggi'],
      totalLogistic: 0,
      idAPD: 0,
      idAlkes: 0,
      isValid: false,
      showAlert: false,
      listQueryAPD: {
        user_filter: null,
        category: null
      }
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listAPD', 'listApdUnit', 'logisticRequestType'
    ])
  },
  watch: {
    logisticRequestType(val) {
      this.listQueryAPD.category = val
      this.getListAPD()
    }
  },
  async created() {
    await this.getListAPD()
  },
  methods: {
    async getData(data) {
      await this.getListAPD(data)
    },
    onClick() {
      this.isAddAPD = true
    },
    addLogistic() {
      this.isValid = true
      this.showAlert = false
      this.idAPD = this.idAPD + 1
      this.logisticNeeds.push({
        id: this.idAPD,
        apd: '',
        apdName: '',
        description: '',
        total: 0,
        unitId: '',
        unitName: '',
        purpose: '',
        urgency: ''
      })
    },
    setTotalAPD() {
      this.totalLogistic = 0
      this.logisticNeeds.forEach(element => {
        this.totalLogistic = this.totalLogistic + parseInt(element.total)
      })
    },
    async setUnit(value) {
      value.unitId = ''
      value.unitName = ''
      value.unitList = await this.$store.dispatch('logistics/getListApdUnitMaterialGroup', value.apd)
      value.unitList.forEach(element => {
        element.value = {
          unit_id: element.unit_id,
          unit: element.unit
        }
      })
    },
    deleteData(index) {
      this.logisticNeeds.splice(index, 1)
      this.setTotalAPD()
      if (this.logisticNeeds.length === 0) {
        this.isValid = false
      }
    },
    async getListAPD(param) {
      const idPublicApplicant = 4
      if (param === idPublicApplicant) {
        this.listQueryAPD.user_filter = idPublicApplicant
      }
      await this.$store.dispatch('logistics/getListAPDMaterialGroup', this.listQueryAPD)
      this.listAPD.forEach(element => {
        element.value = {
          id: element.id,
          name: element.name
        }
      })
    },
    async onNext() {
      if (!this.logisticNeeds.length) {
        this.showAlert = true
        return
      }
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      EventBus.$emit('nextStep', this.step)
    },
    onPrev() {
      this.isAddAPD = false
      EventBus.$emit('prevStep', this.step)
    }
  }
}
</script>
<style>
.padding-10-third-step {
  padding: 10px;
}
.float-right-third-step {
  float: right;
}
</style>
