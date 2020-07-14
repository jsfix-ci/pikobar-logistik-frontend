<template>
  <v-dialog
    v-model="show"
    width="500"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-card-title class="headline">{{ $t('label.dialog_reject_title_1') }}<br>{{ $t('label.dialog_reject_title_2') }}</v-card-title>

        <div class="ml-3">
          <v-col>
            <span>{{ $t('label.instance_type') }}</span>
            <br>
            <span class="grey--text">{{ item.master_faskes_type ? item.master_faskes_type.name : '-' }}</span>
          </v-col>
          <v-col>
            <span class="sub-title-reject-logistic-needs">{{ $t('label.instance_name') }}</span>
            <br>
            <span class="grey--text">{{ item.agency_name }}</span>
          </v-col>
          <v-col>
            <span class="sub-title-reject-logistic-needs">{{ $t('label.total_apd_needs') }}</span>
            <br>
            <span class="grey--text">{{ total }}</span>
          </v-col>
          <v-col>
            <ValidationProvider
              v-slot="{ errors }"
              rules="requiredReasonReject"
            >
              <span class="sub-title-reject-logistic-needs">{{ $t('label.reason_reject') }}</span>
              <br>
              <v-textarea
                v-model="note"
                outlined
                :height="100"
                :error-messages="errors"
                solo-inverted
                :placeholder="$t('label.reason_reject_placeholder')"
              />
            </ValidationProvider>
          </v-col>
        </div>

        <v-card-actions>
          <v-col>
            <v-btn
              text
              outlined
              @click="hideDialog"
            >
              {{ $t('label.cancel') }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="error" @click="submitReject()">{{ $t('label.submit_reject') }}</v-btn>
          </v-col>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/utils/eventBus'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'TolakKebutuhanLogistik',
  components: {
    ValidationProvider,
    ValidationObserver
  },
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
  data() {
    return {
      note: null
    }
  },
  methods: {
    hideDialog() {
      EventBus.$emit('dialogHideReject', false)
    },
    async submitReject() {
      const valid = await this.$refs.observer.validate()
      if (!valid) return
      EventBus.$emit('submitReject', this.note)
    }
  }
}
</script>

<style>
  .sub-title-reject-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 17px;
    color: #219653;
  }
</style>
