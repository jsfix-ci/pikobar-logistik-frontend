<template>
  <div>

    <div>
      <v-row>
        <v-col cols="12" sm="12">
          <span class="table-title">{{ $t('route.vaccine_request_detail_title') }}</span>
        </v-col>
      </v-row>

      <div><!-- Alert Section -->
        <v-row>
          <v-col cols="12" lg="9" md="12">
            <v-card
              v-if="status == 1"
              class="mx-auto"
              color="#219653"
            ><!-- Alert Administration Phase -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="text-wrap" style="color: white">{{ $t('label.verify_text_alert_1') }}<b>{{ $t('label.verify_text_alert_2') }}</b> {{ $t('label.verify_text_alert_3') }}</span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card
              v-else
              class="mx-auto"
              color="#219653"
            ><!-- Alert Verification Phase -->
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="sub-title-verified-card-detail-logistic-needs white--text text-wrap">{{ $t('label.alert_verified_title_card_logistic_needs_1') }} <b>{{ $t('label.alert_verified_title_card_logistic_needs_2') }}</b></span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div><!-- Date & Status Section -->
        <v-row>
          <v-col cols="2" class="mr-3">
            <span class="text-title">{{ $t('label.request_date') }}</span>
          </v-col>
          <v-col>
            <span class="green--text text--darken-2 font-weight-bold">: {{ $moment.utc(vaccineRequest.created_at).tz('Asia/Jakarta').format('LLL') }}</span>
          </v-col>
        </v-row>

        <v-row class="mt-n5">
          <v-col cols="2" class="mr-3">
            <span class="text-title">Status</span>
          </v-col>
          <v-col>
            <span class="red--text font-weight-bold">: {{ $t('label.' + vaccineRequest.status) }}</span>
          </v-col>
        </v-row>
      </div>

      <div><!-- Confirmation Button -->
        <v-row>
          <v-col>
            <v-btn
              v-if="status == 1"
              class="mx-3 my-1 font-weight-bold"
              color="success"
              outlined
            >VERIFIKASI SEKARANG</v-btn>
            <v-btn
              v-else-if="status == 2"
              class="mx-3 my-1 font-weight-bold"
              color="success"
              outlined
            >REKOMENDASI SEKARANG</v-btn>
            <v-btn
              v-else-if="status == 3"
              class="mx-3 my-1 font-weight-bold"
              color="success"
              outlined
            >REALISASI SEKARANG</v-btn>
            <v-btn
              v-if="status == 1 || status == 2"
              class="mx-3 my-1 font-weight-bold"
              color="red"
              outlined
            >DITOLAK</v-btn>
          </v-col>
        </v-row>
      </div>

      <div><!-- Agency Identity -->
        <v-row>
          <v-col>
            <span class="green--text darken-2 font-weight-bold">Identitas Instansi</span>
          </v-col>
        </v-row>
        <v-card
          outlined
        >
          <v-row>
            <v-col class="mx-3 my-3" cols="12" sm="6" md="6">
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.instance_type') }}</span>
                  <br>
                  <span>{{ vaccineRequest.master_faskes_type.name }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.city_name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.village.kemendagri_kabupaten_nama }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.instance_name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.agency_name }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.select_sub_district_full_name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.village.kemendagri_kecamatan_nama }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.number_phone') }}</span>
                  <br>
                  <span>{{ vaccineRequest.agency_phone_number }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.village') }}</span>
                  <br>
                  <span>{{ vaccineRequest.village.kemendagri_desa_nama }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              class="mx-3 my-3"
              cols="12"
              sm="3"
              md="3"
            >
              <span class="green--text darken-2 font-weight-bold">{{ $t('label.full_address') }}</span>
              <br>
              <span>{{ vaccineRequest.agency_address }}</span>
            </v-col>
            <v-col
              cols="12"
              sm="1"
              md="1"
            />
          </v-row>
        </v-card>
      </div><!-- End Agency Identity -->

      <div class="mt-3"><!-- Applicant Identity -->
        <v-row>
          <v-col>
            <span class="green--text darken-2 font-weight-bold">Identitas Pemohon</span>
          </v-col>
        </v-row>
        <v-card
          outlined
        >
          <v-row>
            <v-col class="mx-3 my-3" cols="12" sm="6" md="6">
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_fullname }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.capital_email') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_email }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.applicant_position_identity') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_position }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.applicant_phone') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_primary_phone_number }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2" />
                <v-col class="mr-2">
                  <span class="green--text darken-2 font-weight-bold">{{ $t('label.applicant_phone_sub') }}</span>
                  <br>
                  <span>{{ vaccineRequest.secondary_phone_number || '-' }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              class="mx-3 my-3"
              cols="12"
              sm="3"
              md="3"
            >
              <span class="green--text darken-2 font-weight-bold">{{ $t('label.applicant_ktp') }}</span>
              <br>
              <v-img
                alt="KTP/Kartu Pegawai/Surat Tugas"
                max-width="250px"
                :src="vaccineRequest.applicant_file_url || noImage"
              />
            </v-col>
          </v-row>
        </v-card>
      </div><!-- End Applicant Identity -->

      <div class="mt-3"><!-- Applicant Letter Section -->
        <v-row>
          <v-col>
            <span class="green--text darken-2 font-weight-bold">{{ $t('label.applicant_letter') }}</span>
          </v-col>
        </v-row>
        <v-card outlined>
          <v-row>
            <v-col class="mx-3 my-3" cols="10" sm="6" md="6">
              <a href="#" class="text-decoration-underline blue--text">{{ vaccineRequest.letter_number }}</a>
            </v-col>
            <v-col class="mx-3 my-3 text-right">
              <v-btn small outlined color="success">
                <v-icon left small dark>mdi-download</v-icon> UNDUH
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>

      <div class="mt-3"><!-- Vaccine Product Request List -->
        <v-row>
          <v-col>
            <span class="green--text darken-2 font-weight-bold">Daftar Kebutuhan Vaksin</span>
          </v-col>
        </v-row>
        <v-card outlined>
          <template>
            <v-simple-table class="mb-3">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th colspan="7" class="text-center green lighten-5">{{ $t('label.request').toUpperCase() }}</th>
                    <th v-if="status >= 2 && status < 4" rowspan="2" class="text-center grey lighten-5">{{ $t('label.remaining_stock_item').toUpperCase() }}</th>
                    <th v-if="status >= 2" colspan="6" class="text-center green lighten-4">{{ $t('label.recommendation').toUpperCase() }}</th>
                    <th v-if="status >= 3" colspan="6" class="text-center green lighten-3">{{ $t('label.realization').toUpperCase() }}</th>
                    <th v-if="status >= 2 && status < 4" rowspan="2" class="text-center grey lighten-5">{{ $t('label.action').toUpperCase() }}</th>
                  </tr>
                  <tr>
                    <th class="text-left green lighten-5">{{ $t('label.number').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.description').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.total').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.unit').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.purpose').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.item_type').toUpperCase() }}</th>
                    <th v-if="status >= 2" class="text-left green lighten-4">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                    <th v-if="status >= 2" class="text-left green lighten-4">{{ $t('label.total').toUpperCase() }}</th>
                    <th v-if="status >= 2" class="text-left green lighten-4">{{ $t('label.unit').toUpperCase() }}</th>
                    <th v-if="status >= 2" class="text-left green lighten-4">{{ $t('label.date').toUpperCase() }}</th>
                    <th v-if="status >= 2" class="text-left green lighten-4">{{ $t('label.status').toUpperCase() }}</th>
                    <th v-if="status >= 2" class="text-left green lighten-4">{{ $t('label.pic').toUpperCase() }}</th>
                    <th v-if="status >= 3" class="text-left green lighten-3">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                    <th v-if="status >= 3" class="text-left green lighten-3">{{ $t('label.total').toUpperCase() }}</th>
                    <th v-if="status >= 3" class="text-left green lighten-3">{{ $t('label.unit').toUpperCase() }}</th>
                    <th v-if="status >= 3" class="text-left green lighten-3">{{ $t('label.date').toUpperCase() }}</th>
                    <th v-if="status >= 3" class="text-left green lighten-3">{{ $t('label.status').toUpperCase() }}</th>
                    <th v-if="status >= 3" class="text-left green lighten-3">{{ $t('label.pic').toUpperCase() }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="vaccineProductRequests.data.length === 0">
                    <td class="text-center" :colspan="21">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr
                    v-for="(item, index) in vaccineProductRequests.data"
                    :key="index"
                  >
                    <td>{{ tableRowNumber(index) }}</td>
                    <td>{{ item.product.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.unit.unit }}</td>
                    <td>{{ item.usage }}</td>
                    <td>{{ item.product.material_group }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-pagination
              v-model="vaccineProductRequests.current_page"
              :length="vaccineProductRequests.total"
              :total-visible="3"
              class="mb-3"
              @input="onNext"
            />
          </template>
        </v-card>
      </div>
    </div>
    <div><!-- back to top button -->
      <v-row class="mt-3 mb-15">
        <v-col>
          <v-btn small color="success" width="114px" height="46px" absolute right @click="back()">
            {{ $t('label.back') }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ListDetailPengajuanVaksin',
  data() {
    return {
      status: 1,
      noImage: './img/noimage.gif',
      listQuery: {
        page: 1,
        limit: 3,
        vaccine_request_id: null
      }
    }
  },
  computed: {
    ...mapGetters('vaccine', [
      'vaccineRequest',
      'vaccineProductRequests',
      'listRealization',
      'totalListRealization',
      'totalDataRealization',
      'listStock'
    ]),
    ...mapGetters('user', [
      'phase'
    ]),
    ...mapState('user', [
      'roles'
    ])
  },
  async created() {
    this.listQuery.vaccine_request_id = this.$route.params.id
    await this.getVaccineRequestById()
    await this.getVaccineProductRequests()
  },
  methods: {
    async getVaccineRequestById() {
      await this.$store.dispatch('vaccine/getVaccineRequestById', this.$route.params.id)
      this.setStatus()
    },
    async getVaccineProductRequests() {
      await this.$store.dispatch('vaccine/getVaccineProductRequests', this.listQuery)
    },
    tableRowNumber(index) {
      return index + this.vaccineProductRequests.from
    },
    setStatus() {
      switch (this.vaccineRequest.status) {
        case 'verification_rejected':
          this.status = -2
          break
        case 'approval_rejected':
          this.status = -1
          break
        case 'not_verified':
          this.status = 1
          break
        case 'verified':
          this.status = 2
          break
        case 'approved':
          this.status = 3
          break
        case 'finalized':
          this.status = 4
          break
        default:
          this.status = 1
      }
    },
    back() {
      this.$router.go(-1)
    },
    async onNext() {
      await this.getVaccineProductRequests()
    }
  }
}
</script>
