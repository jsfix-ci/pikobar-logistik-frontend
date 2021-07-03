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
          <v-col cols="12" offset-sm="4" offset-md="4" sm="2" md="2">
            <v-btn color="green" large text outlined style="float: right" @click="addLetter"><v-icon left>mdi-plus</v-icon> {{ $t('label.outgoing_mail_add') }}</v-btn>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-btn class="primary" large max-width="100px" @click="showFilter = !showFilter">{{ $t('label.filter') }}
              <v-icon v-if="!showFilter" right>mdi-chevron-right</v-icon>
              <v-icon v-else right>mdi-chevron-down</v-icon></v-btn>
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
                  <th class="text-center">{{ $t('label.number').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.outgoing_mail_name').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.outgoing_mail_number').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.outgoing_mail_date').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.outgoing_mail_total').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.status').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in listOutgoingMail" :key="data.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ data.letter_name }}</td>
                  <td align="center">{{ data.letter_number }}</td>
                  <td align="center">{{ data.letter_date === null ? $t('label.stripe') : $moment(data.letter_date).format('D MMMM YYYY') }}</td>
                  <td align="center">{{ data.request_letter_total }}</td>
                  <td align="center">
                    <span v-if="data.file" class="green--text">{{ $t('label.outgoing_mail_ready') }}</span>
                    <span v-else class="red--text">{{ $t('label.outgoing_mail_not_ready') }}</span>
                  </td>
                  <td align="center">
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
                          <v-list-item @click="uploadLetter(data)">
                            <span class="blue--text"><v-icon class="blue--text" left>mdi-upload</v-icon> {{ $t('label.outgoing_mail_upload') }}</span>
                          </v-list-item>
                          <v-list-item v-if="data.file" @click="download(data.file)">
                            <span class="green--text"><v-icon class="green--text" left>mdi-download</v-icon> {{ $t('label.download') }}</span>
                          </v-list-item>
                          <v-list-item @click="toDetail(data)">
                            <span class="black--text"><v-icon class="black--text" left>mdi-view-list</v-icon> {{ $t('label.detail') }}</span>
                          </v-list-item>
                        </v-card>
                      </v-menu>
                    </v-card-actions>
                  </td>
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
    <pagination
      :total="totalListOutgoingMail"
      :total-data="totalDataOutgoingMail"
      :page="listQuery.page"
      :limit="listQuery.limit"
      @update:page="onListQueryPageUpdated"
      @update:limit="onListQueryLimitUpdated"
    />
    <CreateLetter
      :show="showForm"
    />
    <UploadLetter
      ref="uploadLetter"
      :show="uploadForm"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CreateLetter from './Create'
import UploadLetter from './Upload'
import EventBus from '@/utils/eventBus'

export default {
  components: {
    CreateLetter,
    UploadLetter
  },
  data() {
    return {
      list: null,
      showFilter: true,
      showForm: false,
      uploadForm: false,
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 10),
        letter_number: this.$route.query?.letter_number || null,
        letter_date: this.$route.query?.letter_date || null,
        sort: this.$route.query?.sort || null
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
    EventBus.$on('createDialogHide', (value) => {
      this.showForm = false
      if (value) {
        this.getList()
      }
    })
    EventBus.$on('dialogUploadHide', (value) => {
      this.uploadForm = false
      if (value) {
        this.getList()
      }
    })
  },
  methods: {
    toDetail(data) {
      this.$router.push(`/letter/outgoing/detail/${data.id}`)
    },
    download(data) {
      window.open(data)
    },
    addLetter() {
      this.showForm = true
    },
    uploadLetter(data) {
      this.uploadForm = true
      this.$refs.uploadLetter.setDialog(data)
    },
    async getList() {
      await this.$store.dispatch('letter/getListOutgoingMail', this.listQuery)
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async handleSearch() {
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
      await this.getList()
    },
    async changeDate(value) {
      this.listQuery.letter_date = value
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
      await this.getList()
    },
    onListQueryPageUpdated(newPage) {
      this.listQuery.page = newPage
      this.$router.replace({
        query: {
          ...this.$route.query,
          page: newPage
        }
      })
    },
    onListQueryLimitUpdated(newLimit) {
      this.listQuery.limit = newLimit
      this.$router.replace({
        query: {
          ...this.$route.query,
          limit: newLimit
        }
      })
    },
    filterQuery(oldQuery) {
      const newQuery = { ...oldQuery }
      Object.keys(newQuery).forEach(key => {
        if (newQuery[key] === null || newQuery[key] === undefined || newQuery[key] === '' || key === 'approval_status' || key === 'is_rejected' || key === 'verification_status') {
          delete newQuery[key]
        }
      })
      return newQuery
    }
  }
}
</script>
