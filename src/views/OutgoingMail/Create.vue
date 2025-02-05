<template>
  <v-dialog
    v-model="show"
    max-width="550"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-col>
          <span v-if="type === 'update'" class="title-update-logistic-needs">{{ $t('label.outgoing_mail_update_application') }}</span>
          <span v-else-if="type === 'add'" class="title-update-logistic-needs">{{ $t('label.outgoing_mail_add_application') }}</span>
          <span v-else class="title-update-logistic-needs">{{ $t('label.outgoing_mail_add') }}</span>
        </v-col>
        <v-col v-if="type === 'create'">
          <p class="sub-title-update-logistic-needs">{{ $t('route.outgoing_mail') }}</p>
          <span class="value-sub-title-update-logistic-needs">{{ $t('label.outgoing_mail_name') }} <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></span>
          <ValidationProvider
            v-slot="{ errors }"
            rules="letterName"
          >
            <v-text-field
              v-model="data.letter_name"
              outlined
              solo-inverted
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-col>
        <v-col v-if="type === 'create'" class="margin-top-min-30-update-logistic-needs">
          <span class="value-sub-title-update-logistic-needs">{{ $t('label.outgoing_mail_number_form') }}</span>
          <ValidationProvider>
            <v-text-field
              v-model="data.letter_number"
              outlined
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
        <v-col v-if="type === 'create'" class="margin-top-min-30-update-logistic-needs">
          <span class="value-sub-title-update-logistic-needs">{{ $t('label.outgoing_mail_date') }} <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></span>
          <date-picker-input
            :value="data.letter_date"
            @selected="changeDate"
          />
        </v-col>
        <hr v-if="type === 'create'" class="margin-top-min-10-update-logistic-needs">
        <v-col v-if="type !== 'create'">
          <div class="value-sub-title-update-logistic-needs"> {{ $t('label.outgoing_mail_number_form') }} </div>
          <div class="sub-title-update-logistic-needs letter_number"> {{ dataSource ? dataSource.letter_number : '-' }} </div>
        </v-col>
        <v-col v-if="type !== 'update'">
          <p class="sub-title-update-logistic-needs mb-10">{{ $t('label.applicant_letter') }}</p>
          <div v-for="(applicant, index) in letter_request" :key="index" class="mt-n5">
            <span class="value-sub-title-update-logistic-needs"><span class="pr-1">{{ index + 1 }}.</span> {{ $t('label.applicant_letter_number') }}</span>
            <v-row>
              <v-col cols="10" class="ml-5">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="requiredApplicantLetterNumber"
                >
                  <v-autocomplete
                    v-model="applicant.applicant_id"
                    outlined
                    solo-inverted
                    :placeholder="$t('label.applicant_letter_number')"
                    :error-messages="errors"
                    :no-data-text="$t('label.no_data')"
                    :item-value="'id'"
                    item-text="application_letter_number"
                    :items="applicationLetter"
                  />
                </ValidationProvider>
              </v-col>
              <v-col v-if="letter_request.length > 1" cols="1">
                <center><v-icon class="padding-10-third-step" color="red" size="25" @click="deleteApplicant(index)">mdi-delete</v-icon></center>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col v-if="type === 'update'">
          <p class="sub-title-update-logistic-needs mb-10">{{ $t('label.applicant_letter') }}</p>
          <div class="mt-n5">
            <span class="value-sub-title-update-logistic-needs">{{ $t('label.applicant_letter_number') }}</span>
            <v-row>
              <v-col cols="10" class="ml-5">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="requiredApplicantLetterNumber"
                >
                  <v-autocomplete
                    v-model="item.applicant_id"
                    outlined
                    solo-inverted
                    :placeholder="$t('label.applicant_letter_number')"
                    :error-messages="errors"
                    item-value="id"
                    item-text="application_letter_number"
                    :items="applicationLetter"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col v-if="type !== 'update'" class="margin-top-min-30-update-logistic-needs">
          <v-row class="margin-top-min-30-update-logistic-needs">
            <v-col class="total_applicant">
              <p> {{ $t('label.total_applicant') }} <span class="pl-1"> <b> {{ letter_request.length }} {{ $t('route.applicant_medical_tools_title') }} </b></span></p>
            </v-col>
          </v-row>
        </v-col>
        <hr class="margin-top-min-10-update-logistic-needs">
        <v-col v-if="type === 'create'" class="margin-top-min-10-update-logistic-needs">
          <v-row>
            <v-col>
              <v-btn v-if="processRequest" outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
              <v-btn v-else disabled outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
            </v-col>
            <v-col>
              <v-btn v-if="processRequest" small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.add') }}</v-btn>
              <v-btn v-else disabled small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.add') }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else-if="type === 'update'" class="margin-top-min-10-update-logistic-needs">
          <v-row>
            <v-col>
              <v-btn v-if="processRequest" outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
              <v-btn v-else disabled outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
            </v-col>
            <v-col>
              <v-btn v-if="processRequest" small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.save_update') }}</v-btn>
              <v-btn v-else disabled small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.save_update') }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else class="margin-top-min-10-update-logistic-needs">
          <v-row>
            <v-col>
              <v-btn v-if="processRequest" outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
              <v-btn v-else disabled outlined small width="150px" height="50px" style="float: right" @click="hideDialog(false)">{{ $t('label.cancel') }}</v-btn>
            </v-col>
            <v-col>
              <v-btn v-if="processRequest" small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.add') }}</v-btn>
              <v-btn v-else disabled small width="150px" height="50px" color="success" @click="submitData()">{{ $t('label.add') }}</v-btn>
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
    },
    dataSource: {
      type: Object,
      default: null
    },
    dataUpdate: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'create'
    }
  },
  data() {
    return {
      data: {
        letter_name: null,
        letter_number: null,
        letter_date: null,
        letter_request: null
      },
      letter_request: [{
        'applicant_id': null
      }],
      item: [{
        'applicant_id': null
      }],
      updateName: false,
      isCreate: false,
      isUpdate: false,
      dialog: false,
      date: null,
      agency_id: null,
      labelDate: this.$t('label.input_date'),
      listQuery: {
        request_letter_id: null
      },
      processRequest: true
    }
  },
  computed: {
    ...mapGetters('letter', [
      'applicationLetter'
    ])
  },
  async created() {
    await this.getApplicationLetter()
  },
  methods: {
    async getApplicationLetter(value) {
      this.listQuery.request_letter_id = value
      await this.$store.dispatch('letter/getApplicationLetter', this.listQuery)
      this.letter_request.forEach(element => {
        element.value = {
          id: element.id,
          application_letter_number: element.application_letter_number
        }
      })
    },
    addApplicant() {
      this.letter_request.push({
        'applicant_id': null
      })
    },
    deleteApplicant(index) {
      this.letter_request.splice(index, 1)
    },
    async setDialog(value) {
      this.item = value
      await this.getApplicationLetter(value ? value.applicant_id : null)
    },
    async submitData() {
      this.processRequest = false
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.processRequest = true
        return
      }
      this.data.letter_request = JSON.stringify(this.letter_request)
      if (this.type === 'create') {
        const response = await this.$store.dispatch('letter/postOutgoingMail', this.data)
        if (response.status === 200) {
          this.hideDialog(true)
        }
      } else if (this.type === 'add') {
        this.data.outgoing_letter_id = this.dataSource.id
        const response = await this.$store.dispatch('letter/postOutgoingMailApplication', this.data)
        if (response.status === 200) {
          this.hideDialog(true)
        }
      } else if (this.type === 'update') {
        const dataUpdate = {
          id: this.item.id,
          applicant_id: this.item.applicant_id
        }
        const response = await this.$store.dispatch('letter/updateApplicationLetter', dataUpdate)
        if (response.status === 200) {
          this.hideDialog(true)
        }
      }
      this.processRequest = true
    },
    hideDialog(value) {
      this.$refs.observer.reset()
      this.reset()
      EventBus.$emit('createDialogHide', value)
    },
    handleSelectedDate(value) {
      this.$emit('selected', value)
    },
    changeDate(value) {
      this.data.letter_date = value
    },
    reset() {
      this.$refs.observer.reset()
      this.data = {
        letter_name: null,
        letter_number: null,
        letter_date: null,
        letter_request: null
      }
      this.letter_request = [{
        'applicant_id': null
      }]
      this.item = [{
        'applicant_id': null
      }]
      this.updateName = false
      this.isCreate = false
      this.isUpdate = false
      this.dialog = false
      this.date = null
      this.agency_id = null
      this.labelDate = this.$t('label.input_date')
      this.listQuery = {
        request_letter_id: null
      }
      this.processRequest = true
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
