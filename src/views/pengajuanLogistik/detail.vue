<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" sm="12">
          <span class="table-title">{{ $t('label.detail_request_logistic_medic') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="9">
          <v-card
            v-if="!isVerified && !isRejected"
            class="mx-auti"
            color="#219653"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span style="color: white">{{ $t('label.verify_text_alert_1') }}<b>{{ $t('label.verify_text_alert_2') }}</b> {{ $t('label.verify_text_alert_3') }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            v-if="isVerified && !isApproved"
            class="mx-auti"
            color="#219653"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="sub-title-verified-card-detail-logistic-needs white--text">{{ $t('label.alert_verified_title_card_logistic_needs_1') }} <b>{{ $t('label.alert_verified_title_card_logistic_needs_2') }}</b></span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">{{ $t('label.request_date') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="7" sm="8">
          <span
            class="text-data-green"
          >:  {{ detailLogisticRequest.created_at === null ? $t('label.stripe') : $moment.utc(detailLogisticRequest.created_at).tz('Asia/Jakarta').format('LLL') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">{{ $t('label.status') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="2" sm="2">
          <span
            v-if="isVerified && !isApproved"
            class="text-data-green"
          >
            :  {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.verification_status : '-' }}
          </span>
          <span
            v-else-if="isApproved"
            class="text-data-green"
          >
            :  {{ detailLogisticRequest.applicant.approval_status }}
          </span>
          <span
            v-else
            class="text-data-red"
          >
            :  {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.verification_status : '-' }}
          </span>
        </v-col>
        <v-col cols="5" sm="5">
          <span>
            <v-btn
              v-if="!isVerified && !isRejected"
              outlined
              color="#2E7D32"
              class="margin-btn"
              @click="postVerification"
            >
              {{ $t('label.verif_now') }}
            </v-btn>
            <v-btn
              v-if="isRejected"
              outlined
              color="#2E7D32"
              @click.stop="showDialogReasonReject = true"
            >
              {{ $t('label.reason_reject') }}
            </v-btn>
            <v-btn
              v-if="isVerified && !isApproved"
              outlined
              color="#2E7D32"
              class="margin-btn"
              @click="submitApprove()"
            >
              {{ $t('label.approve') }}
            </v-btn>
          </span>
          <span style="margin-left: 20px">
            <v-btn
              v-if="!isVerified && !isRejected"
              outlined
              color="#e62929"
              class="margin-btn"
              @click.stop="showDialogReject = true"
            >
              {{ $t('route.rejected_title') }}
            </v-btn>
            <v-btn
              v-if="isVerified && !isApproved"
              outlined
              color="#e62929"
              class="margin-btn"
              @click.stop="showDialogReject = true"
              @click="setTotal()"
            >
              {{ $t('route.rejected_title') }}
            </v-btn>
          </span>
        </v-col>
      </v-row>
      <rejectKebutuhanLogistik
        :show="showDialogReject"
        :item="detailLogisticRequest"
        :total="listLogisticNeeds.length > 0 ? listLogisticNeeds[0].logistic_item_summary : null"
      />
      <reasonDeniedLogisticNeeds
        :show="showDialogReasonReject"
        :item="detailLogisticRequest"
        :total="listLogisticNeeds.length > 0 ? listLogisticNeeds[0].logistic_item_summary : null"
      />
    </div>
    <div>
      <br>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('label.instance_identity') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-row>
              <v-col class="margin-20" cols="12" sm="6" md="6">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.instance_type') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.master_faskes_type ? detailLogisticRequest.master_faskes_type.name : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.city_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.city ? detailLogisticRequest.city.kemendagri_kabupaten_nama : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.instance_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.agency_name }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.select_sub_district_full_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.sub_district ? detailLogisticRequest.sub_district.kemendagri_kecamatan_nama : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.number_phone') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.phone_number || '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.village') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.village ? detailLogisticRequest.village.kemendagri_desa_nama : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="margin-20" cols="12" sm="4" md="4">
                <v-row>
                  <span
                    class="text-title-green"
                  >
                    {{ $t('label.full_address') }}
                  </span>
                </v-row>
                <v-row>
                  <v-label>
                    {{ detailLogisticRequest.location_address }}
                  </v-label>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('label.step_title_2') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-row>
              <v-col class="margin-20" cols="12" sm="6" md="6">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.contact_person') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.applicant_name : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.capital_email') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.email : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.applicant_position_identity') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.applicants_office : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.applicant_phone') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.primary_phone_number : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col offset-md="6" offset-sm="6">
                    <span class="text-title-green">
                      {{ $t('label.applicant_phone_sub') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.secondary_phone_number : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="margin-20" cols="12" sm="4" md="4">
                <v-row><span class="text-title-green">{{ $t('label.applicant_ktp') }}</span></v-row>
                <v-row>
                  <v-label v-if="detailLogisticRequest.applicant && detailLogisticRequest.applicant.file === '-'">{{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.file : '-' }}</v-label>
                  <a v-else-if="detailLogisticRequest.applicant && detailLogisticRequest.applicant.file.substr(0, 4) === 'https'" class="letter-class" :href="detailLogisticRequest.applicant.file" target="_blank">{{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.file : '-' }}</a>
                  <img v-else class="image-style" :src="detailLogisticRequest.applicant ? detailLogisticRequest.applicant.file : '-'">
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('label.applicant_letter') }}
          </span>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <v-row class="ml-2">
              <v-col cols="6" md="6">
                <a :href="detailLogisticRequest.letter ? detailLogisticRequest.letter.letter : '#'" target="_blank" class="blue--text letter-class"><u>{{ $t('label.applicant_letter') }}</u></a>
              </v-col>
              <v-col cols="6" md="6">
                <div class="margin-top-min-15">
                  <v-btn small outlined color="success" width="130px" height="50px" absolute right @click="downloadFile(detailLogisticRequest.letter ? detailLogisticRequest.letter.letter : '#')">
                    {{ $t('label.download') }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('label.list_logistic_need') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.description').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.total').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.unit').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.purpose').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.item_type').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left">{{ $t('label.remaining_stock_item').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.realization_amount').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.realization_date').toUpperCase() }}</th>
                    <th class="text-left">{{ $t('label.status').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left">{{ $t('label.action').toUpperCase() }}</th>
                  </tr>
                </thead>
                <tbody v-if="loaded">
                  <tr v-if="listLogisticNeeds.length === 0">
                    <td class="text-center" :colspan="7">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr v-for="(item, index) in listLogisticNeeds" v-else :key="item.index">
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.product ? item.product.name : '-' }}</td>
                    <td>{{ item.brand || '-' }}</td>
                    <td>{{ item.quantity || '-' }}</td>
                    <td>{{ item.unit.unit || '-' }}</td>
                    <td>{{ item.usage || '-' }}</td>
                    <td>{{ item.product ? item.product.category : '-' }}</td>
                    <td v-if="isVerified"><v-btn small color="success" dark @click="getStockItem(item.product.id)">{{ $t('label.check_stock') }}</v-btn></td>
                    <td>{{ item.realization_quantity || '-' }}</td>
                    <td>{{ item.realization_date || '-' }}</td>
                    <td>{{ item.statusLabel || '-' }}</td>
                    <td v-if="isVerified">
                      <v-btn text small color="info" @click.stop="openForm(false, item.product, index)">
                        {{ $t('label.update') }}
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <br>
            <v-pagination
              v-model="listQuery.page"
              :length="totalLogisticNeeds"
              :total-visible="3"
              @input="onNext"
            />
          </v-card>
        </v-col>
      </v-row>
      <div>
        <v-row>
          <v-col>
            <span class="text-data-green">
              {{ $t('label.add_distribution_other') }}
            </span>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col>
          <v-card outlined min-height="100">
            <v-card-text>
              <v-row>
                <v-col>
                  <v-btn outlined color="success" height="50px" absolute right @click.stop="openForm(true)">
                    <v-icon dark>mdi-plus</v-icon>
                    {{ $t('label.add_distribution_realization') }}
                  </v-btn>
                  <v-simple-table style="margin-top: 70px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">{{ $t('label.number').toUpperCase() }}</th>
                          <th class="text-left">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                          <th class="text-left">{{ $t('label.realization_amount').toUpperCase() }}</th>
                          <th class="text-left">{{ $t('label.unit').toUpperCase() }}</th>
                          <th class="text-left">{{ $t('label.realization_date').toUpperCase() }}</th>
                          <th class="text-left">{{ $t('label.status').toUpperCase() }}</th>
                          <th v-if="isVerified" class="text-left">{{ $t('label.action').toUpperCase() }}</th>
                        </tr>
                      </thead>
                      <tbody v-if="loaded">
                        <tr v-if="listRealization.length === 0">
                          <td class="text-center" :colspan="7">{{ $t('label.no_data') }}</td>
                        </tr>
                        <tr v-for="(item, index) in listRealization" v-else :key="item.index">
                          <td>{{ getTableRowNumbering(index) }}</td>
                          <td>{{ item.product_name ? item.product_name : '-' }}</td>
                          <td>{{ item.realization_quantity || '-' }}</td>
                          <td>{{ item.realization_unit || '-' }}</td>
                          <td>{{ item.realization_date || '-' }}</td>
                          <td>{{ item.statusLabel || '-' }}</td>
                          <td v-if="isVerified">
                            <v-card-actions>
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
                                    style="text-transform: none;height: 30px;min-width: 50px;"
                                    tile
                                    outlined
                                    v-on="on"
                                  >
                                    Pilih aksi<v-icon style="color: #009D57;font-size: 2rem;" right>mdi-menu-down</v-icon>
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-list-item>
                                    <v-btn text small color="info" @click="openForm(null, index)">
                                      {{ $t('label.update') }}
                                    </v-btn>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-btn text small color="info" @click="deleteRealization(item)">
                                      {{ $t('label.delete') }}
                                    </v-btn>
                                  </v-list-item>
                                </v-card>
                              </v-menu>
                            </v-card-actions>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <br>
                  <v-pagination
                    v-model="listQuery.page"
                    :length="totalListRealization"
                    :total-visible="3"
                    @input="onNextRealization"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-15">
        <v-col>
          <v-btn small color="success" width="114px" height="46px" absolute right @click="back()">
            {{ $t('label.back') }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <br>
    <CheckStockDialog :dialog-show="dialogStock" />
    <updateKebutuhanLogistik
      ref="updateForm"
      :show="showForm"
    />
    <DialogDelete
      :dialog="dialogDelete"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialogDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`logistics/deleteRealization`"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import updateKebutuhanLogistik from './update'
import DialogDelete from '@/components/DialogDelete'
import CheckStockDialog from './stock'
import EventBus from '@/utils/eventBus'
import rejectKebutuhanLogistik from './reject'
import reasonDeniedLogisticNeeds from './reasonReject'

export default {
  name: 'ListDetailPengajuanLogistik',
  components: {
    updateKebutuhanLogistik,
    rejectKebutuhanLogistik,
    reasonDeniedLogisticNeeds,
    CheckStockDialog,
    DialogDelete
  },
  data() {
    return {
      letterFileType: '',
      isVerified: false,
      isRejected: false,
      isApproved: false,
      isCreate: false,
      listQuery: {
        page: 1,
        limit: 3,
        agency_id: null
      },
      showForm: false,
      showDialogReject: false,
      showDialogReasonReject: false,
      loaded: false,
      dialogStock: false,
      dialogDelete: false,
      dataDelete: null,
      logisticNeeds: []
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'detailLogisticRequest',
      'listLogisticNeeds',
      'totalLogisticNeeds',
      'listRealization',
      'totalListRealization',
      'totalDataRealization',
      'listStock'
    ])
  },
  async created() {
    this.listQuery.agency_id = this.$route.params.id
    await this.getListDetail()
    await this.getListDetailNeeds()
    await this.getListRealizationAdmin()
    const temp = this.detailLogisticRequest.letter.letter.split('.')
    this.letterFileType = temp[temp.length - 1]
    this.isVerified = this.detailLogisticRequest.applicant.verification_status === 'Terverifikasi'
    this.isRejected = this.detailLogisticRequest.applicant.verification_status === 'Pengajuan Ditolak'
    this.isApproved = this.detailLogisticRequest.applicant.approval_status === 'Telah Disetujui'
    EventBus.$on('dialogHide', (value) => {
      this.showForm = value
    })
    EventBus.$on('closeDialogStock', (value) => {
      this.dialogStock = value
    })
    EventBus.$on('dialogHideReject', (value) => {
      this.showDialogReject = value
      this.showDialogReasonReject = value
    })
    EventBus.$on('submitReject', (value) => {
      const formData = new FormData()
      this.showDialogReject = false
      formData.append('applicant_id', this.detailLogisticRequest.id)
      formData.append('verification_status', 'rejected')
      formData.append('note', value)
      this.postReject(formData)
    })
  },
  methods: {
    getTableRowNumbering(index) {
      return ((parseInt(this.listQuery.page) - 1) * parseInt(this.listQuery.limit)) + (parseInt(index) + 1)
    },
    downloadFile(value) {
      window.open(value)
    },
    openForm(type, value, index) {
      this.showForm = true
      this.isCreate = type
      if (type === true) {
        this.$refs.updateForm.setDialog(type, this.listQuery.agency_id)
      } else if (type === false) {
        this.$refs.updateForm.setDialog(type, this.listLogisticNeeds[index], value.id)
      } else {
        this.$refs.updateForm.setDialog(null, this.listRealization[value])
      }
    },
    async deleteRealization(item) {
      this.dialogDelete = true
      this.dataDelete = await item
    },
    async getListRealizationAdmin() {
      this.loaded = false
      await this.$store.dispatch('logistics/getLogisticNeedsAdmin', this.listQuery)
      this.listRealization.forEach(element => {
        switch (element.status) {
          case 'approved':
            element.statusLabel = this.$t('label.approved')
            break
          case 'not_delivered':
            element.statusLabel = this.$t('label.not_delivered')
            break
          case 'delivered':
            element.statusLabel = this.$t('label.delivered')
            break
          case 'not_available':
            element.statusLabel = this.$t('label.not_available')
            break
          case 'replaced':
            element.statusLabel = this.$t('label.replaced')
            break
          default:
            element.statusLabel = this.$t('label.not_approved')
        }
      })
      this.loaded = true
    },
    async getListDetail() {
      await this.$store.dispatch('logistics/getListDetailLogisticRequest', this.$route.params.id)
      const temp = this.detailLogisticRequest.letter.letter.split('.')
      this.letterFileType = '.' + temp[temp.length - 1]
    },
    async getStock(value) {
      const param = {
        id: await value
      }
      await this.$store.dispatch('logistics/getStock', param)
    },
    async getListDetailNeeds() {
      this.loaded = false
      await this.$store.dispatch('logistics/getListDetailLogisticNeeds', this.listQuery)
      this.listLogisticNeeds.forEach(element => {
        switch (element.status) {
          case 'approved':
            element.statusLabel = this.$t('label.approved')
            break
          case 'not_delivered':
            element.statusLabel = this.$t('label.not_delivered')
            break
          case 'delivered':
            element.statusLabel = this.$t('label.delivered')
            break
          case 'not_available':
            element.statusLabel = this.$t('label.not_available')
            break
          case 'replaced':
            element.statusLabel = this.$t('label.replaced')
            break
          default:
            element.statusLabel = this.$t('label.not_approved')
        }
      })
      this.loaded = true
    },
    async onNext() {
      await this.getListDetailNeeds()
    },
    async onNextRealization() {
      await this.getListRealizationAdmin()
    },
    async postVerification() {
      const formData = new FormData()
      formData.append('applicant_id', this.detailLogisticRequest.id)
      formData.append('verification_status', 'verified')
      await this.$store.dispatch('logistics/postVerificationStatus', formData)
      window.location.reload()
    },
    async postReject(formData) {
      await this.$store.dispatch('logistics/postVerificationStatus', formData)
      window.location.reload()
    },
    setTotal() {
      this.totalAPD = 0
      this.listLogisticNeeds.forEach(element => {
        this.totalAPD += parseInt(element.quantity)
      })
    },
    async submitApprove() {
      const formData = new FormData()
      formData.append('applicant_id', this.detailLogisticRequest.id)
      formData.append('approval_status', 'approved')
      await this.$store.dispatch('logistics/postApprovalStatus', formData)
      window.location.reload(true)
    },
    getStockItem(value) {
      this.dialogStock = true
      this.getStock(value)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.table-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: black;
}
.text-title {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: black;
}
.text-data-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #219653;
}
.text-data-red {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #e62929;
}
.text-title-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #219653;
}
.margin-left-min-30 {
  margin-left: -30px;
}
.margin-20 {
  margin: 20px;
}
.margin-top-min-15 {
  margin-top: -15px
}
.margin-top-min-20 {
  margin-top: -30px
}
.d-none {
  display: none;
}
.image-style {
    max-width: 100%;
    max-height: 500px;
  }
.letter-class {
  color: #2D9CDB !important;
  font-family: "Product Sans";
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-decoration: underline;
}
.sub-title-verified-card-detail-logistic-needs {
  font-size: 13px;
}
.mb-15 {
  margin-bottom: 60px;
}
</style>
