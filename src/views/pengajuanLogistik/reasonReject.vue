<template>
  <v-dialog
    v-model="show"
    width="500"
    :persistent="true"
  >
    <v-card>
      <v-card-title class="headline">{{ $t('label.reason_reject_title') }}</v-card-title>

      <div style="margin-left:12px">
        <v-col>
          <span class="sub-title-reject-reason">{{ $t('label.instance_type') }}</span>
          <br>
          <span class="grey--text">{{ item.agency ? item.agency.agency_type_name : '-' }}</span>
        </v-col>
        <v-col>
          <span class="sub-title-reject-reason">{{ $t('label.instance_name') }}</span>
          <br>
          <span class="grey--text">{{ item.agency ? item.agency.agency_name : '-' }}</span>
        </v-col>
        <v-col>
          <span class="sub-title-reject-reason">{{ $t('label.total_apd_needs') }}</span>
          <br>
          <span class="grey--text">{{ total }}</span>
        </v-col>
        <v-col>
          <span class="sub-title-reject-reason">{{ $t('label.reason_reject') }}</span>
          <br>
          <span v-if="item.status === 'APPROVAL_REJECTED'" class="grey--text">{{ item.applicant.approval_note }}</span>
          <span v-else class="grey--text">{{ item.applicant ? item.applicant.note : '-' }}</span>
        </v-col>
      </div>

      <v-card-actions class="d-flex justify-center my-2">
        <v-btn
          text
          outlined
          @click="hideDialog"
        >
          {{ $t('label.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'AlasanTolakKebutuhanLogistik',
  props: {
    show: {
      type: Boolean,
      default: null
    },
    item: {
      type: Object,
      default: null
    },
    total: {
      type: Number,
      default: null
    }
  },
  methods: {
    hideDialog() {
      EventBus.$emit('dialogHideReject', false)
    }
  }
}
</script>

<style>
  .sub-title-reject-reason {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 17px;
    color: #219653;
  }
</style>
