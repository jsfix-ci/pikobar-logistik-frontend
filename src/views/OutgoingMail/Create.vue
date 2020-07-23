<template>
  <v-dialog
    v-model="show"
    max-width="550"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-col>
          <span class="title-update-logistic-needs">{{ $t('label.outgoing_mail_add') }}</span>
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
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <span class="value-sub-title-update-logistic-needs">{{ $t('label.outgoing_mail_date') }} <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></span>
          <date-picker-input
            :value="data.letter_date"
            @selected="changeDate"
          />
        </v-col>
        <hr class="margin-top-min-10-update-logistic-needs">
        <v-col>
          <p class="sub-title-update-logistic-needs mb-10">{{ $t('label.applicant_letter') }}</p>
          <div v-for="(applicant, index) in applicantLetter" :key="index" class="mt-n5">
            <span class="value-sub-title-update-logistic-needs"><span class="pr-1">{{ index + 1 }}.</span> {{ $t('label.applicant_letter_number') }}</span>
            <v-row>
              <v-col cols="10" class="ml-5">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="requiredStatus"
                >
                  <v-select
                    v-model="applicant.applicant_id"
                    solo
                    :placeholder="$t('label.applicant_letter_number')"
                    :error-messages="errors"
                    :items="status"
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="1">
                <center><v-icon class="padding-10-third-step" color="red" size="25" @click="deleteApplicant(index)">mdi-delete</v-icon></center>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <v-row class="margin-top-min-30-update-logistic-needs">
            <v-col class="total_applicant">
              <p> {{ $t('label.total_applicant') }} <span class="pl-1"> <b> {{ applicantLetter.length }} {{ $t('route.applicant_medical_tools_title') }} </b></span></p>
            </v-col>
            <v-col>
              <v-btn class="ma-2 add_more" width="130px" height="40px" small outlined color="success" @click="addApplicant">{{ $t('label.add_more') }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <hr class="margin-top-min-10-update-logistic-needs">
        <v-col class="margin-top-min-10-update-logistic-needs">
          <v-row>
            <v-col>
              <v-btn outlined small width="150px" height="50px" @click="hideDialog">{{ $t('label.cancel') }}</v-btn>
            </v-col>
            <v-col>
              <v-btn outlined small width="150px" height="50px" color="success" @click="submitData(true)">{{ $t('label.outgoing_mail_print') }}</v-btn>
            </v-col>
            <v-col>
              <v-btn small width="150px" height="50px" color="success" @click="submitData(true)">{{ $t('label.add') }}</v-btn>
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
  name: 'CreateLetter',
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
      item: {},
      updateName: false,
      isCreate: false,
      isUpdate: false,
      dialog: false,
      date: null,
      agency_id: null,
      labelDate: this.$t('label.input_date'),
      applicantLetter: [{
        applicant_id: null
      }],
      status: [
        {
          text: this.$t('label.approved_item'),
          value: 'approved'
        },
        {
          text: this.$t('label.not_available'),
          value: 'not_available'
        },
        {
          text: this.$t('label.replaced'),
          value: 'replaced'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listAPD', 'listApdUnit'
    ])
  },
  async created() {
  },
  methods: {
    addApplicant() {
      this.applicantLetter.push({
        applicant_id: null
      })
    },
    deleteApplicant(index) {
      this.applicantLetter.splice(index, 1)
    },
    setDialog(type, data, value) {
      this.isCreate = type
      this.updateName = type
      if (type === false) {
        this.data = {}
        this.item = data
        this.data = data
        this.setUnit(value)
      } else if (type === true) {
        this.agency_id = data
        this.data = {}
      } else {
        this.isCreate = true
        this.updateName = true
        this.isUpdate = true
        this.data = data
        this.setUnit(data.product_id)
      }
    },
    async submitData(value) {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      if (this.isUpdate) {
        await this.$store.dispatch('logistics/updateLogisticNeedsAdmin', this.data)
      } else {
        if (value === true) {
          this.data.agency_id = this.agency_id
          await this.$store.dispatch('logistics/postUpdateLogisticNeedsAdmin', this.data)
        } else {
          this.data.need_id = this.item.id
          this.data.product_id = this.data.product_id || this.item.product_id
          this.data.agency_id = this.item.agency_id
          delete this.data.id
          await this.$store.dispatch('logistics/postUpdateLogisticNeeds', this.data)
        }
      }
      window.location.reload()
    },
    hideDialog() {
      this.$refs.observer.reset()
      window.location.reload()
      EventBus.$emit('dialogHide', false)
    },
    handleSelectedDate(value) {
      this.$emit('selected', value)
    },
    changeDate(value) {
      this.data.realization_date = value
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
</style>
