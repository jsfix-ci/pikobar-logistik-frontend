<template>
  <v-dialog
    v-model="show"
    width="40%"
    :persistent="true"
  >
    <v-card>
      <div class="col-sm-12">
        <v-card-text class="headerSection headerMargin">
          <span><h4><b>{{ $t('label.completeness_header') }}</b></h4></span>
        </v-card-text>
      </div>
      <div class="col-sm-12">
        <v-card-text>
          <span>{{ $t('label.not_complete_description') + data.id + ':' }}</span>
        </v-card-text>
        <v-card-text v-if="!data.agency_address" class="contentMargin">
          <span>{{ $t('label.not_complete_agency_address') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant_file_url" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_file') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant_email" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_email') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <v-card-text v-if="!data.applicant_primary_phone_number" class="contentMargin">
          <span>{{ $t('label.not_complete_applicant_primary_phone_number') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </v-card-text>
        <hr class="thin">
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
  name: 'CompletenessDetailVaccine',
  props: {
    show: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      data: null
    }
  },
  methods: {
    // Default Method
    setData(value) {
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
  .headerMargin {
    margin-bottom: -20px;
  }
  .contentMargin {
    margin-top: -20px;
  }
</style>
