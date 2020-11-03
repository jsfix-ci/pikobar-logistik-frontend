<template>
  <v-dialog
    v-model="show"
    width="40%"
    :persistent="true"
  >
    <v-card>
      <div class="col-sm-12">
        <v-card-text class="headerSection">
          <span><h4><b>{{ $t('label.completeness_header') }}</b></h4></span>
        </v-card-text>
      </div>
      <div v-if="data" class="col-sm-12 contentDialog">
        <v-card-text>
          <span>{{ $t('label.not_complete_description') + data.id + ':' }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant.applicant_name" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_name') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.agency_name" class="contentMargin">
          <span>{{ $t('label.not_complete_agency_name') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.location_address" class="contentMargin">
          <span>{{ $t('label.not_complete_agency_address') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant.primary_phone_number" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_primary_phone_number') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant.secondary_phone_number" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_secondary_phone_number') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant.letter" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_letter') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant.file" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_file') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <hr>
      </div>
      <v-col class="d-flex justify-center">
        <v-btn
          small
          width="180px"
          height="40px"
          class="margin-btn-update-logistic-needs"
          @click="closeDialog"
        >
          {{ $t('label.back') }}
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'CompletenessDetail',
  props: {
    show: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      data: {
        agency_name: null,
        location_address: null,
        applicant: {
          applicant_name: null,
          letter: null,
          file: null,
          primary_phone_number: null
        }
      }
    }
  },
  methods: {
    // Default Method
    setData(id, value) {
      this.data = value
    },
    closeDialog() {
      EventBus.$emit('hideCompletenessDetail', false)
    }
  }
}
</script>

<style>
  .contentDialog {
    margin-top: -50px;
  }
  .contentMargin {
    margin-top: -20px;
  }
</style>
