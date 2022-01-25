<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogShow"
      width="70%"
      :persistent="true"
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
            :items-per-page="5"
            :no-data-text="$t('label.no_data')"
            :loading="loadDataStock"
            :loading-text="$t('label.loading_data')"
            :footer-props="{
              'items-per-page-text':$t('label.stock_data_table')
            }"
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
        { text: this.$t('label.apd_id_specification').toUpperCase(), align: 'start', sortable: false, value: 'material_id' },
        { text: this.$t('label.apd_name_spec').toUpperCase(), align: 'start', sortable: false, value: 'material_name' },
        { text: this.$t('label.location_stock').toUpperCase(), sortable: false, value: 'soh_location_name' },
        { text: this.$t('label.remaining_stock').toUpperCase(), sortable: false, align: 'right', value: 'stock_ok' },
        { text: this.$t('label.unit').toUpperCase(), sortable: false, value: 'uom' }
      ]
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listStock',
      'loadDataStock'
    ])
  },
  methods: {
    closeDialogStock() {
      this.clearStock(true)
      EventBus.$emit('closeDialogStock', false)
    },
    async clearStock(value) {
      const param = {
        id: await value
      }
      await this.$store.dispatch('logistics/clearStock', param)
    }
  }
}
</script>
