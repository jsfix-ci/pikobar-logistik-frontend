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
          Sisa Stock Barang
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.location_stock').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.remaining_stock').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in listStock" :key="index">
                  <td>{{ item.matg_name }}</td>
                  <td>{{ item.soh_location_name }}</td>
                  <td>{{ item.stock_ok }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <div style="display: block; margin: 0 auto">
            <v-btn
              color="success"
              @click="closeDialogStock"
            >
              Ok
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
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listStock'
    ])
  },
  async created() {
    this.getStock()
  },
  methods: {
    closeDialogStock() {
      EventBus.$emit('closeDialogStock', false)
    },
    async getStock() {
      const param = {
        material_group: 'COVERALL'
      }
      await this.$store.dispatch('logistics/getStock', param)
    }
  }
}
</script>
