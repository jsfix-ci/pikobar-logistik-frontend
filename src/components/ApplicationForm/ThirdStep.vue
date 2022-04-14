<template>
  <div class="mx-10">
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <span
          v-if="isVaccineContent"
          class="h4 font-weight-bold ml-16 mb-6"
        >
          {{ $t('label.vaccine') }}
        </span>

        <!-- Item Input List -->
        <div
          v-for="(data, index) in logisticNeeds"
          :key="index"
        >
          <ThirdStepItem
            :key="logisticNeeds.length"
            :index="index"
            :input-data="data"
            :is-vaccine="isVaccineContent"
            :hide-description="isVaccineContent"
            class="ma-0"
            @change="(updateData) => onRequestChange(index, updateData)"
            @delete="deleteData"
            @onTotalChange="setTotalAPD"
          />
        </div>

        <!-- Total Display -->
        <v-row v-if="!isVaccineContent" class="mx-16">
          <v-col cols="12" sm="12" md="3" class="pl-0">
            <v-label>
              {{ $t('label.logistic_total') }}
              {{ totalLogistic }}
            </v-label>
          </v-col>
        </v-row>

        <!-- Add More Button -->
        <v-row class="mx-16">
          <v-col cols="12" sm="12" md="2" class="pl-0">
            <center>
              <v-btn
                color="#2E7D32"
                outlined
                @click="addLogistic"
              >
                {{ $t('label.add_more') }}
              </v-btn>
            </center>
          </v-col>
          <v-col cols="12" sm="12" md="3">
            <v-alert
              v-if="showAlert"
              type="error"
            >
              {{ $t('label.alert_logistic_needs') }}
            </v-alert>
          </v-col>
        </v-row>

        <!-- Add Vaccine Support Alert -->
        <v-alert
          v-if="isVaccineContent"
          dense
          text
          type="info"
          class="mx-16 my-5"
        >
          {{ $t('label.add_vaccine_supporter_message') }}
        </v-alert>
        <hr v-if="isVaccineContent">
        <VaccineSupporterInput
          v-if="isVaccineContent"
          :vaccine-support-list.sync="vaccineSupportList"
        />
      </v-form>
    </ValidationObserver>

    <!-- Navigation Button -->
    <v-container fluid>
      <v-col cols="6" sm="6" md="6" class="float-right-third-step">
        <v-btn
          class="btn-margin-positive"
          color="primary"
          @click="onNext"
        >
          {{ $t('label.next') }}
        </v-btn>
        <v-btn
          class="btn-margin-positive"
          outlined
          text
          @click="onPrev"
        >
          {{ $t('label.back') }}
        </v-btn>
      </v-col>
    </v-container>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'
import ThirdStepItem from './ThirdStepItem.vue'
import VaccineSupporterInput from './VaccineSupporterInput.vue'

export default {
  name: 'KebutuhanLogistik',
  components: {
    ValidationObserver,
    ThirdStepItem,
    VaccineSupporterInput
  },
  props: {
    logisticNeeds: {
      type: Array,
      default: () => []
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
      },
      vaccineSupportList: []
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listAPD',
      'listApdUnit'
    ]),
    isVaccineContent() {
      return this.$route.query.type === 'vaksin'
    }
  },
  watch: {
    vaccineSupportList(val) {
      this.$emit('update:vaccineSupportList', val)
    }
  },
  async created() {
    this.listQueryAPD.category = this.$route.query.type
    this.isVaccineContent ? await this.getListVaccineAndSupport() : await this.getListAPD()
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
        unitList: [],
        purposeList: [],
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
    getListVaccineAndSupport() {
      this.$store.dispatch('logistics/getListVaccineAndSupport', { category: 'vaccine' })
      this.$store.dispatch('logistics/getListVaccineAndSupport', { category: 'vaccine_support' })
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
    },
    onRequestChange(index, data) {
      this.logisticNeeds[index] = { ...data }
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
