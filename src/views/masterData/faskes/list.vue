<template>
  <div>
    <v-row>
      <v-col cols="12" sm="2">
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
      <v-col cols="12" sm="5">
        <br>
        <v-card outlined>
          <search
            :handle-search="handleSearch"
            :list-query="listQuery"
            solo
          />
        </v-card>
      </v-col>
    </v-row>
    <v-card outlined>
      <v-card-text>
        <span class="table-title">{{ $t('label.list_applicant_logistic_medic') }}</span>
      </v-card-text>
      <hr class="thin">
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.license_number_facility').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.registration_number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.faskes_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.upper_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.faskes_location').toUpperCase() }}</th>
                  <th v-if="verificationStatusDefault != 'verified'" class="text-left">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(faskes, index) in faskesList" :key="faskes.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ faskes.nomor_izin_sarana }}</td>
                  <td>{{ faskes.nomor_registrasi }}</td>
                  <td>{{ faskes.nama_faskes }}</td>
                  <td>{{ faskes.nama_atasan }}</td>
                  <td>{{ faskes.point_latitude_longitude }}</td>
                  <td v-if="verificationStatusDefault != 'verified'" class="text-link">
                    <v-btn v-if="verificationStatusDefault === 'rejected'" text small color="info" @click="handleDetail(faskes)">{{ $t('label.detail') }}</v-btn>
                    <v-btn v-if="verificationStatusDefault === 'not_verified'" text small color="info" @click="handleVerification(faskes)">{{ $t('label.verification') }}</v-btn>
                  </td>
                </tr>
                <tr v-if="faskesList.length === 0">
                  <td colspan="6" class="text-center">{{ $t('label.no_data') }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalList"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
    <dataVerification
      :show="showVerification"
      :close.sync="showVerification"
      :close-detail.sync="isDetail"
      :verification-data="verificationData"
      :is-detail="isDetail"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dataVerification from './verification'
export default {
  name: 'ListFasilitasKesehatan',
  components: {
    dataVerification
  },
  data() {
    return {
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        sort: '',
        search: '',
        nama_faskes: '',
        verification_status: ''
      },
      verificationStatusDefault: '',
      showVerification: false,
      isDetail: false,
      verificationData: {}
    }
  },
  computed: {
    ...mapGetters('faskes', [
      'faskesList',
      'totalList'
    ])
  },
  watch: {
    'listQuery.search': {
      handler: function(value) {
        if (value.length >= 3 || value.length === 0) {
          this.listQuery.page = 1
          this.listQuery.nama_faskes = value
          this.handleSearch()
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.$route.name === 'FaskesTerdaftar') {
      this.listQuery.verification_status = 'verified'
      this.verificationStatusDefault = 'verified'
    } else if (this.$route.name === 'FaskesBelumTerdaftar') {
      this.listQuery.verification_status = 'not_verified'
      this.verificationStatusDefault = 'not_verified'
    } else if (this.$route.name === 'FaskesDitolak') {
      this.listQuery.verification_status = 'rejected'
      this.verificationStatusDefault = 'rejected'
    }
    this.getListFaskes()
  },
  methods: {
    async getListFaskes() {
      await this.$store.dispatch('faskes/getListFaskes', this.listQuery)
    },
    async handleSearch() {
      await this.getListFaskes()
    },
    async onNext() {
      await this.getListFaskes()
    },
    handleDetail(value) {
      this.isDetail = true
      this.verificationData = value
    },
    handleVerification(value) {
      this.showVerification = true
      this.verificationData = value
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    }
  }
}
</script>
