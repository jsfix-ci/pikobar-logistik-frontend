<template>
  <v-dialog
    v-model="show"
    width="40%"
    :persistent="true"
  >
    <v-card>
      <div class="col-sm-12">
        <v-card-text>
          <span><h4><b>{{ titleReturn }}</b></h4></span>
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
          @click="updateReturn"
        >
          {{ $t('label.action_button_urgency') }}
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'DialogReturn',
  props: {
    show: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      id: null,
      titleReturn: this.$t('label.return_to_administration_step_dialog'),
      dataDialog: {
        id: null,
        step: null,
        agency_name: '-',
        applicant: {
          application_letter_number: '-',
          applicant_name: '-'
        }
      }
    }
  },
  methods: {
    async setData(id, dataDialog) {
      this.id = id
      this.dataDialog = dataDialog
      this.getUndoStepTitle()
    },
    getUndoStepTitle() {
      switch (this.dataDialog.step) {
        case 'ditolak rekomendasi':
          this.titleReturn = this.$t('label.return_to_administration_step_dialog')
          break
        case 'ditolak verifikasi':
          this.titleReturn = this.$t('label.return_to_administration_step_dialog')
          break
        case 'final':
          this.titleReturn = this.$t('label.return_to_final_step_dialog')
          break
        case 'realisasi':
          this.titleReturn = this.$t('label.return_to_recommendation_step_dialog')
          break
        case 'rekomendasi':
          this.titleReturn = this.$t('label.return_to_administration_step_dialog')
          break
      }
    },
    closeDialogStock() {
      EventBus.$emit('dialogReturnConfirmation', false)
    },
    async updateReturn(value) {
      const param = {
        id: this.id,
        step: this.dataDialog.step
      }
      const response = await this.$store.dispatch('logistics/postReturnChange', param)
      if (response.status === 200) {
        EventBus.$emit('dialogReturnConfirmation', true)
      }
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
    line-height: 17px;
    color: #219653;
  }
  .value-sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    color: #828282;
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
</style>
