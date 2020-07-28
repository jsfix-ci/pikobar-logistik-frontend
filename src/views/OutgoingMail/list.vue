<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <span class="table-title">{{ $t('label.outgoing_mail_data') }}</span>
      </v-card-text>
      <hr class="thin">
      <v-card-text>
        <v-row class="margin-top-bot-min-20-list-pengajuan-logistik">
          <v-col cols="12" sm="3" md="3">
            <v-card
              outlined
              class="card-search"
            >
              <v-text-field
                v-model="listQuery.letter_number"
                solo-inverted
                flat
                hide-details
                :placeholder="$t('label.search_data')"
                prepend-inner-icon="search"
                @change="handleSearch"
              />
            </v-card>
          </v-col>
          <v-col cols="12" offset-sm="1" offset-md="1" sm="3" md="3">
            <v-btn color="green" large text outlined style="float: right"><v-icon left>mdi-plus</v-icon> {{ $t('label.outgoing_mail_add') }}</v-btn>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-btn color="green" large text outlined style="margin: auto"><v-icon left>mdi-upload</v-icon> {{ $t('label.outgoing_mail_upload') }}</v-btn>
          </v-col>
          <v-col cols="12" sm="1" md="1">
            <v-btn class="primary" large max-width="100px" style="margin-left: 65px" @click="showFilter = !showFilter">{{ $t('label.filter') }} <v-icon v-if="!showFilter" right>mdi-chevron-right</v-icon><v-icon v-else right>mdi-chevron-down</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <hr v-if="showFilter" class="thin">
      <v-card-text v-if="showFilter">
        <v-row class="margin-top-bot-min-20-list-pengajuan-logistik">
          <v-col cols="12" sm="4">
            <v-label class="title">{{ $t('label.sort') }}</v-label>
            <v-select
              v-model="listQuery.sort"
              :items="sortOption"
              solo
              item-text="label"
              item-value="value"
              :clearable="true"
              :placeholder="$t('label.sort')"
              @change="handleSearch"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-label class="title">{{ $t('label.outgoing_mail_date') }}</v-label>
            <date-picker
              :value="listQuery.letter_date"
              @selected="changeDate"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <hr class="thin">
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.outgoing_mail_number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.outgoing_mail_date').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.outgoing_mail_total').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in listOutgoingMail" :key="data.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ data.letter_number }}</td>
                  <td>{{ data.letter_date === null ? $t('label.stripe') : $moment(data.letter_date).format('D MMMM YYYY') }}</td>
                  <td>{{ data.request_letter_total }}</td>
                  <td><v-btn text small color="info" @click="toDetail(data)">{{ $t('label.detail') }}</v-btn></td>
                </tr>
                <tr v-if="listOutgoingMail.length === 0">
                  <td colspan="6" class="text-center">{{ $t('label.no_data') }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-card
        outlined
        height="80%"
        style="margin: 13px"
      >
        <v-list-item>
          <v-list-item-content>
            {{ $t('label.total_data') }} : {{ totalDataOutgoingMail }}
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <pagination
        :total="totalListOutgoingMail"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="onNext"
      />
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      list: null,
      showFilter: false,
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        limit: 10,
        page: 1,
        total: null,
        letter_number: null,
        letter_date: null,
        sort: null
      }
    }
  },

  computed: {
    ...mapGetters('letter', [
      'listOutgoingMail',
      'totalDataOutgoingMail',
      'totalListOutgoingMail'
    ])
  },

  async created() {
    this.getList()
  },
  methods: {
    async getList() {
      await this.$store.dispatch('letter/getListOutgoingMail', this.listQuery)
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async onNext() {
      await this.getList()
    },
    async handleSearch() {
      await this.getList()
    },
    async changeDate(value) {
      this.listQuery.letter_date = value
      await this.getList()
    }
  }
}
</script>
