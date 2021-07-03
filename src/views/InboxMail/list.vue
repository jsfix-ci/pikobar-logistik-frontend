<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <span class="table-title">{{ $t('label.list_request_logistic_medic') }}</span>
      </v-card-text>
      <hr class="thin">
      <v-card-text>
        <v-row class="margin-top-bot-min-20-list-pengajuan-logistik">
          <v-col cols="12" sm="4" md="4">
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
          <v-col cols="12" offset-sm="6" offset-md="6" sm="2" md="2">
            <v-btn class="primary float-right" large max-width="100px" @click="showFilter = !showFilter">{{ $t('label.filter') }} <v-icon v-if="!showFilter" right>mdi-chevron-right</v-icon><v-icon v-else right>mdi-chevron-down</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <hr v-if="showFilter" class="thin">
      <v-card-text v-if="showFilter">
        <v-row class="margin-top-bot-min-20-list-pengajuan-logistik">
          <v-col cols="12" sm="1">
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
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.request_date') }}</v-label>
            <date-picker
              :value="listQuery.letter_date"
              @selected="changeDate"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-label class="title">{{ $t('label.city_district') }}</v-label>
            <v-select
              v-model="listQuery.district_code"
              :items="listDistrictCity"
              solo
              item-value="kemendagri_kabupaten_kode"
              item-text="kemendagri_kabupaten_nama"
              :clearable="true"
              :placeholder="$t('label.select_district')"
              @change="handleSearch()"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.instance_type') }}</v-label>
            <v-select
              v-model="listQuery.agency_type"
              :items="faskesTypeList"
              solo
              item-text="name"
              item-value="id"
              :clearable="true"
              :placeholder="$t('label.select_instance_type')"
              @change="handleSearch()"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.mail_status') }}</v-label>
            <v-select
              v-model="listQuery.mail_status"
              :items="mailStatus"
              solo
              item-text="text"
              item-value="value"
              :clearable="true"
              :placeholder="$t('label.select_mail_status')"
              @change="handleSearch()"
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
                  <th class="text-left">{{ $t('label.incoming_mail_number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.instance_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.city_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.contact_person').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.request_date').toUpperCase() }}</th>
                  <th v-if="isApproved" class="text-center">{{ $t('label.approved_by').toUpperCase() }}</th>
                  <th v-if="isApproved" class="text-center">{{ $t('label.finalized_by').toUpperCase() }}</th>
                  <th v-else class="text-left">{{ $t('label.status').toUpperCase() }}</th>
                  <th v-if="isVerified" class="text-center">{{ $t('label.verified_by').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in listIncomingMail" :key="data.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ data.letter_number }}</td>
                  <td>{{ data.agency_name }}</td>
                  <td>{{ data.district_name }}</td>
                  <td>{{ data.applicant_name }}</td>
                  <td>{{ data.letter_date === null ? $t('label.stripe') : $moment(data.letter_date).format('D MMMM YYYY') }}</td>
                  <td>
                    <span v-if="data.incoming_mail_status===$t('label.status_outgoing_mail_exists')" class="green--text">{{ data.incoming_mail_status }}</span>
                    <span v-else class="orange--text">{{ data.incoming_mail_status }}</span>
                  </td>
                  <td><v-btn text small color="info" @click="toDetail(data)">{{ $t('label.detail') }}</v-btn></td>
                </tr>
                <tr v-if="listIncomingMail.length === 0">
                  <td colspan="10" class="text-center">{{ $t('label.no_data') }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalListIncomingMail"
      :total-data="totalDataIncomingMail"
      :page="listQuery.page"
      :limit="listQuery.limit"
      @update:page="onListQueryPageUpdated"
      @update:limit="onListQueryLimitUpdated"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListIncomingMail',
  data() {
    const agencyType = parseInt(this.$route.query?.agency_type)
    return {
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        page: parseInt(this.$route.query?.page || 1),
        limit: parseInt(this.$route.query?.limit || 10),
        sort: this.$route.query?.sort || '',
        district_code: this.$route.query?.district_code || '',
        letter_number: this.$route.query?.letter_number || '',
        agency_type: Number.isNaN(agencyType) ? null : agencyType,
        mail_status: this.$route.query?.mail_status || '',
        letter_date: this.$route.query?.letter_date || ''
      },
      status: [
        {
          text: this.$t('label.verified'),
          value: this.$t('label.verified_value')
        },
        {
          text: 'Belum Terverifikasi',
          value: this.$t('label.not_verified_value')
        }
      ],
      applicantOrigin: [
        {
          text: this.$t('label.dinkes_province'),
          value: 'dinkes_provinsi'
        },
        {
          text: this.$t('label.pikobar'),
          value: 'pikobar'
        }
      ],
      mailStatus: [
        {
          text: this.$t('label.status_outgoing_mail_not_exists'),
          value: 'not_exists'
        },
        {
          text: this.$t('label.status_outgoing_mail_exists'),
          value: 'exists'
        }
      ],
      date: null,
      showFilter: true,
      isVerified: false,
      isApproved: false
    }
  },
  computed: {
    ...mapGetters('letter', [
      'listIncomingMail',
      'totalListIncomingMail',
      'totalDataIncomingMail'
    ]),
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ]),
    ...mapGetters('region', [
      'listDistrictCity'
    ])
  },
  async created() {
    await this.$store.dispatch('faskesType/getListFaskesType')
    await this.$store.dispatch('region/getListDistrictCity')
    this.getIncomingMailList()
  },
  methods: {
    async changeDate(value) {
      this.listQuery.letter_date = value
      this.handleSearch()
    },
    async getIncomingMailList() {
      await this.$store.dispatch('letter/getListIncomingMail', this.listQuery)
    },
    async handleSearch() {
      this.listQuery.page = 1
      this.$router.replace({
        query: {
          ...this.filterQuery(this.listQuery)
        }
      })
      await this.getIncomingMailList()
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    onSelectDistrictCity(value) {
      this.listQuery.city_code = value ? value.kemendagri_kabupaten_kode : ''
      this.handleSearch()
    },
    toDetail(data) {
      this.$router.push(`/letter/incoming/detail/${data.id}`)
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

<style>
.bg-dark {
  background: linear-gradient(90deg, #4F4F4F 0%, #828282 100%);
}
.bg-success {
  background: linear-gradient(90deg, #219653 0%, #27AE60 100%);
}
.bg-info {
  background: linear-gradient(90deg, #2F80ED 0%, #2D9CDB 100%);
}
.bottom-add-survey {
  margin-top:25px;
}
.margin-top-min-20-list-pengajuan-logistik {
  margin-top: -20px;
}
.margin-top-bot-min-20-list-pengajuan-logistik {
  margin-top: -20px;
  margin-bottom: -20px;
}
.table-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #828282;
}
.thin {
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
