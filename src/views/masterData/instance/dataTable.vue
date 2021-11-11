<template>
  <v-card outlined>
    <v-card-text>
      <span class="table-title">{{ $t('label.list_instance') }}</span>
    </v-card-text>
    <hr class="thin">
    <v-row>
      <v-col auto>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="listQuery.limit"
          hide-default-footer
        >
          <template v-slot:[`item.numbering_item`]="{ item }">
            {{ getTableRowNumbering(item) }}
          </template>
          <template v-slot:[`item.village.kemendagri_kabupaten_nama`]="{ value }">
            {{ value || '-' }}
          </template>
          <template v-slot:[`item.nomor_telepon`]="{ value }">
            {{ value || '-' }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-card-actions class="justify-center">
              <v-menu
                :close-on-content-click="false"
                :nudge-width="0"
                :nudge-left="0"
                :nudge-top="0"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="ma-1"
                    color="#828282"
                    style="text-transform: none; height: 30px; min-width: 50px;"
                    tile
                    outlined
                    v-on="on"
                  >
                    {{ $t('label.action_options') }}<v-icon style="color: #009D57;font-size: 2rem;" right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item @click="updateData(item)">
                    <span><v-icon left>mdi-file-document-edit</v-icon> {{ $t('label.edit_2') }}</span>
                  </v-list-item>
                  <v-list-item @click="toDetail(item)">
                    <span><v-icon left>mdi-view-list</v-icon> {{ $t('label.detail') }}</span>
                  </v-list-item>
                </v-card>
              </v-menu>
            </v-card-actions>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'DataTableInstance',
  props: {
    listQuery: {
      type: Object,
      default: null
    },
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getTableRowNumbering(value) {
      const index = this.items.indexOf(value)
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    updateData(value) {
      return value
    },
    toDetail(value) {
      return value
    }
  }
}
</script>
