<template>
  <v-card class="mx-auto" outlined>
    <v-row>
      <v-col cols="7" class="margin-20">
        <v-row class="margin-top-min-15">
          <v-col>
            <span class="main-color-data-confirmation">{{ $t('label.contact_person') }}</span>
            <br>
            <v-label>{{ formIdentityApplicant.applicantName }}</v-label>
          </v-col>
          <v-col>
            <span class="main-color-data-confirmation">{{ $t('label.capital_email') }}</span>
            <br>
            <v-label>{{ formIdentityApplicant.applicantEmail }}</v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="main-color-data-confirmation">{{ $t('label.applicant_position_identity') }}</span>
            <br>
            <v-label>{{ formIdentityApplicant.applicantPosition }}</v-label>
          </v-col>
          <v-col>
            <span class="main-color-data-confirmation">{{ $t('label.applicant_phone') }}</span>
            <br>
            <v-label>{{ formIdentityApplicant.applicantPhoneNumber }}</v-label>
          </v-col>
        </v-row>
        <v-row>
          <v-col offset-md="6" offset-sm="6">
            <span class="main-color-data-confirmation">{{ $t('label.applicant_phone_sub') }}</span>
            <br>
            <v-label>{{ formIdentityApplicant.applicantPhoneNumber2 }}</v-label>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" class="margin-20">
        <span class="main-color-data-confirmation">{{ $t('label.applicant_ktp') }}</span>
        <br>
        <img class="image-style-data-confirmation" :src="url">
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'ApplicantIdentity',
  props: {
    formIdentityApplicant: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      url: null
    }
  },
  mounted() {
    this.url = URL.createObjectURL(this.formIdentityApplicant.dataFile)
  }
}
</script>
