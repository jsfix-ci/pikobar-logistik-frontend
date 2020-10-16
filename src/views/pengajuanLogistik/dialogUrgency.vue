<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogShow"
      width="40%"
    >
      <v-card>
        <div class="col-sm-12">
          <v-card-text>
            <span v-if="isUrgency === 1"><h4><b>{{ $t('label.urgency_dialog') }}</b></h4></span>
            <span v-else><h4><b>{{ $t('label.not_urgency_dialog') }}</b></h4></span>
          </v-card-text>
        </div>
        <div style="margin-left: 10px; margin-top: -20px">
          <div class="col-sm-12">
            <span><b>{{ $t('label.applicant_letter_number') }}</b></span>
            <br>
            <span class="green--text">{{ dataDialog.applicant.application_letter_number }}</span>
          </div>

          <div class="col-sm-12">
            <span><b>{{ $t('label.applicant_agency_name') }}</b></span>
            <br>
            <span class="green--text">{{ dataDialog.agency_name }}</span>
          </div>

          <div class="col-sm-12">
            <span><b>{{ $t('label.applicant_name') }}</b></span>
            <br>
            <span class="green--text">{{ dataDialog.applicant.applicant_name }}</span>
          </div>
        </div>

        <v-divider />

        <v-col class="d-flex justify-center">
          <v-btn
            class="margin-btn-update-logistic-needs"
            @click="closeDialogStock"
          >
            {{ $t('label.cancel') }}
          </v-btn>
          <v-btn
            color="success"
            class="margin-btn-update-logistic-needs"
            @click="updateUrgency(isUrgency)"
          >
            {{ $t('label.action_button_urgency') }}
          </v-btn>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'UrgencyDialog',
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: null,
      isUrgency: 0,
      dataDialog: {
        id: null,
        agency_name: '-',
        applicant: {
          application_letter_number: '-',
          applicant_name: '-'
        }
      }
    }
  },
  methods: {
    async setData(id, value, dataDialog) {
      this.id = id
      this.isUrgency = value
      this.dataDialog = dataDialog
    },
    closeDialogStock() {
      EventBus.$emit('dialogUrgencyConfirmation', false)
    },
    async updateUrgency(value) {
      const param = {
        id: this.id,
        is_urgency: this.isUrgency
      }
      const response = await this.$store.dispatch('logistics/postUrgencyChange', param)
      if (response.status === 200) {
        EventBus.$emit('dialogUrgencyConfirmation', true)
      }
    }
  }
}
</script>
