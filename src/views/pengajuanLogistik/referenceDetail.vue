<template>
  <v-dialog
    v-model="show"
    width="40%"
    :persistent="true"
  >
    <v-card>
      <div class="col-sm-12">
        <v-card-text class="headerSection headerMargin">
          <span style="text-align:center"><h4><b>{{ $t('label.instance_reference_dialog_title') }}</b></h4></span>
        </v-card-text>
      </div>
      <v-col class="d-flex justify-center">
        <v-btn
          small
          width="180px"
          height="40px"
          class="margin-btn-update-logistic-needs"
          color="success"
          @click="closeDialog"
        >
          {{ $t('label.ok') }}
        </v-btn>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'ReferenceDetail',
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
      EventBus.$emit('hideReferenceDetail', false)
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
