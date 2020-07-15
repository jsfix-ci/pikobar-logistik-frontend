<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogShow"
      width="800"
    >
      <v-card>
        <v-card-title
          primary-title
        >
          {{ $t('label.remaining_stock_item') }}
        </v-card-title>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="listStock"
            :hide-default-footer="true"
            :no-data-text="$t('label.no_data')"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <div style="display: block; margin: 0 auto">
            <v-btn
              color="success"
              @click="closeDialogStock"
            >
              {{ $t('label.ok') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'CheckStockDialog',
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('label.apd_name_spec').toUpperCase(),
          align: 'start',
          sortable: false,
          value: 'matg_name'
        },
        { text: this.$t('label.location_stock').toUpperCase(), value: 'soh_location_name' },
        { text: this.$t('label.remaining_stock').toUpperCase(), value: 'stock_ok' }
      ]
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listStock'
    ])
  },
  methods: {
    closeDialogStock() {
      EventBus.$emit('closeDialogStock', false)
    }
  }
}
</script>
