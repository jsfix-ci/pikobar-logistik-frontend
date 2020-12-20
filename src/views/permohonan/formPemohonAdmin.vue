<template>
  <div v-if="!isConfirm">
    <v-stepper v-model="step" :alt-labels="true">
      <v-stepper-header>
        <v-stepper-step class="left-margin-form-pemohon-admin" :complete="step > 1" step="1">
          <center>{{ $t('label.step_title_1') }}</center>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="step > 2" step="2">
          <center>{{ $t('label.step_title_2') }}</center>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="step > 3" step="3">
          <center>{{ $t('label.step_title_3') }}</center>
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="step > 4" class="right-margin-form-pemohon-admin" step="4">
          <center>{{ $t('label.step_title_4') }}</center>
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <identitas-instansi-pemohon
            :form-applicant="formApplicant"
            :is-admin="isAdmin"
          />
        </v-stepper-content>
        <v-stepper-content step="2">
          <identitas-pemohon
            :form-identity-applicant="formIdentityApplicant"
            :instance-type="formApplicant.instanceType"
            :is-admin="isAdmin"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <kebutuhan-logistik
            :logistic-needs="logisticNeeds"
          />
        </v-stepper-content>
        <v-stepper-content step="4">
          <surat-permohonan
            :applicant-letter="applicantLetter"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
  <div v-else>
    <tahap-konfirmasi-admin
      :form-applicant="formApplicant"
      :form-identity-applicant="formIdentityApplicant"
      :logistic-needs="logisticNeeds"
      :applicant-letter="applicantLetter"
      :is-admin="isAdmin"
    />
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'FormPermohonanLogistikAdmin',
  data() {
    return {
      step: 1,
      formApplicant: {},
      formIdentityApplicant: {},
      logisticNeeds: [],
      // applicantLetter: null,
      applicantLetter: {},
      isConfirm: false,
      isAdmin: true
    }
  },
  created() {
    EventBus.$on('nextStep', (value) => {
      this.step = value + 1
    })
    EventBus.$on('prevStep', (value) => {
      this.isConfirm = false
      this.step = value - 1
    })
    EventBus.$on('confirmStep', (value) => {
      // this.applicantLetter = value.file
      this.applicantLetter = value
      // this.formApplicant.letterNumber = value.letter
      this.formApplicant.letterNumber = value.name
      this.isConfirm = true
      this.step = 5
    })
  }
}
</script>

<style>
.btn-margin-positive {
  margin: 10px;
  float: right;
}
.btn-mobile {
  display: none;
}
@media (max-width: 1199px) and (min-width: 960px) {
}
@media (max-width: 768px) and (min-width: 320px) {
}

@media (max-width: 588px) and (min-width: 320px) {
  .main-card-form-pemohon {
    margin: 150px 0px -30px 0px;
  }
  .left-margin-form-pemohon-admin {
    margin-left: 0px;
  }
  .right-margin-form-pemohon-admin {
    margin-right: 0px;
  }
  .stepper-margin-form-pemohon {
    margin: -200px -10px 0px -10px;
  }
  .btn-desktop {
    display: none;
  }
  .btn-mobile {
    display: block;
  }
  .left-margin {
    margin-left: 0px;
  }
  .right-margin {
    margin-right: 0px;
  }
  .stepper-margin {
    margin: -200px -10px 0px -10px;
  }
}
</style>
