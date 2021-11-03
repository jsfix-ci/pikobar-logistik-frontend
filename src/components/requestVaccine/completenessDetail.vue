<template>
  <v-dialog
    v-model="show"
    width="40%"
    :persistent="true"
  >
    <v-card>
      <v-card-title>
        <span><h4><b>{{ $t('label.completeness_header') }}</b></h4></span>
      </v-card-title>
      <v-card-text>
        <div>{{ $t('label.not_complete_description') + data.id + ':' }}</div>
        <div v-if="!data.agency_address">
          <span>{{ $t('label.not_complete_agency_address') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </div>
        <div v-if="!data.applicant_file_url">
          <span>{{ $t('label.not_complete_applicant_file') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </div>
        <div v-if="!data.applicant_email">
          <span>{{ $t('label.not_complete_applicant_email') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </div>
        <div v-if="!data.applicant_primary_phone_number">
          <span>{{ $t('label.not_complete_applicant_primary_phone_number') }}</span>
          <span class="red--text">{{ $t('label.completeness_fail') }}</span>
        </div>
      </v-card-text>
      <v-col class="d-flex justify-center">
        <v-btn
          small
          width="180px"
          height="40px"
          color="success"
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
    setData(value) {
      this.data = value
      console.log(this.data)
    },
    closeDialog() {
      EventBus.$emit('hideCompletenessDetail', false)
    }
  }
}
</script>
