<template>
  <v-card outlined>
    <v-row class="ml-2">
      <v-col cols="1" md="1">
        <span class="main-color-data-confirmation">#</span>
      </v-col>
      <v-col cols="3" md="3">
        <span class="main-color-data-confirmation">{{ $t('label.letter_number') }}</span>
      </v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col cols="1" md="1">
        <span>1</span>
      </v-col>
      <v-col cols="3" md="3">
        <span class="grey--text">{{ formApplicant.letterNumber }}</span>
      </v-col>
      <v-col cols="4" md="4">
        <a :href="urlLetter" target="_blank" class="blue--text"><u>{{ applicantLetter.name }}</u></a>
      </v-col>
      <v-col>
        <span class="main-color-data-confirmation">{{ $t('label.download') }}</span>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'LetterApplicant',
  props: {
    formApplicant: {
      type: Object,
      default: null
    },
    applicantLetter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      urlLetter: null
    }
  },
  mounted() {
    this.urlLetter = URL.createObjectURL(this.applicantLetter.dataFile)
  }
}
</script>
