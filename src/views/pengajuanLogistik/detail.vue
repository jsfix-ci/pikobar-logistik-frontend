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
          <span v-if="isVerified && !isApproved && !isRejectedApproval" class="text-data-green"> : {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.verification_status : '-' }}</span>
          <span v-else-if="isFinalized" class="text-data-green"> : {{ $t('label.finalized_status') }}</span>
          <span v-else-if="isApproved" class="text-data-green"> : {{ detailLogisticRequest.applicant.approval_status }}</span>
          <span v-else-if="isRejectedApproval" class="text-data-red"> : {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.approval_status : '-' }}</span>
          <span v-else class="text-data-red"> : {{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.verification_status : '-' }}</span>
        </v-col>
      </v-row>
      <v-row v-if="isFinalized">
        <v-col cols="2" sm="2">
          <span class="text-title">{{ $t('label.approved_by') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="5" sm="5">
          <span class="text-data-green"> :  {{ detailLogisticRequest.applicant.finalized_by.name + picHandphone }}</span>
          <br>
          <span class="text-data-green" style="margin-left:7px;">{{ detailLogisticRequest.applicant.finalized_by.agency_name }}</span>
        </v-col>
      </v-row>
      <v-row v-else-if="isApproved">
        <v-col cols="2" sm="2">
          <span class="text-title">{{ $t('label.approved_by') }}</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="5" sm="5">
          <span class="text-data-green">:  {{ detailLogisticRequest.applicant.approved_by.name + picHandphone }}</span>
          <br>
          <span class="text-data-green" style="margin-left:7px;">{{ detailLogisticRequest.applicant.approved_by.agency_name }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <span style="margin-left: 20px">
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
              v-if="isRejected || isRejectedApproval"
              outlined
              color="#2E7D32"
              @click.stop="showDialogReasonReject = true"
            >
              {{ $t('label.reason_reject') }}
            </v-btn>
            <v-btn
              v-if="isVerified && !isApproved && !isRejectedApproval"
              outlined
              color="#2E7D32"
              class="margin-btn"
              @click="submitApprove()"
            >
              {{ $t('label.approve') }}
            </v-btn>
            <v-btn
              v-if="isVerified && isApproved && !isRejectedApproval && !isFinalized"
              outlined
              color="#2E7D32"
              class="margin-btn"
              @click="submitFinal()"
            >
              {{ $t('label.final') }}
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
              v-if="isVerified && !isApproved && !isRejectedApproval"
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
        @submitReject="rejectData"
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
            {{ $t('label.applicant_urgency') }}
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
              <v-col class="margin-20" cols="12" sm="12" md="12">
                <v-row v-if="isUrgent" class="margin-top-min-15">
                  <v-col>
                    <span>
                      {{ $t('label.applicant_label_urgency') }} <b>{{ $t('label.important_applicant') }}</b>
                    </span>
                  </v-col>
                  <v-col>
                    <v-btn
                      outlined
                      absolute
                      right
                      color="warning"
                      class="margin-btn margin-top-min-15"
                      @click="urgencyChange(detailLogisticRequest.applicant.id, 0)"
                    >
                      {{ $t('label.important') }}
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.applicant_label_no_urgency') }}
                    </span>
                  </v-col>
                  <v-col>
                    <v-btn
                      outlined
                      absolute
                      right
                      color="#2E7D32"
                      class="margin-btn margin-top-min-15"
                      @click="urgencyChange(detailLogisticRequest.applicant.id, 1)"
                    >
                      {{ $t('label.button_applicant_urgency_important') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="(isVerified|isRejected|isRejectedApproval) && (phase === 'pimpinan'|phase === 'superadmin')">
        <v-col>
          <span class="text-data-green">
            {{ $t('label.applicant_status') }}
          </span>
        </v-col>
      </v-row>
      <v-row v-if="(isVerified|isRejected|isRejectedApproval) && (phase === 'pimpinan'|phase === 'superadmin')">
        <v-col cols="12" sm="12">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-row>
              <v-col class="margin-20" cols="12" sm="12" md="12">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span>
                      {{ $t('label.applicant_status_description') }} <b>{{ detailLogisticRequest.step_label }}</b>
                    </span>
                  </v-col>
                  <v-col>
                    <v-btn
                      outlined
                      absolute
                      right
                      color="info"
                      class="margin-btn margin-top-min-15"
                      @click="returnChange(detailLogisticRequest.id)"
                    >
                      {{ $t('label.return') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
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
              <v-col class="margin-20" cols="12" sm="3" md="3">
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
              <v-col class="margin-20" cols="12" sm="1" md="1">
                <v-btn small outlined color="success" style="padding:20px;" @click="showAgencyIdentityDialog"><span>{{ $t('label.edit') }}</span><u><v-icon small dark style="padding-left:5px">mdi-pencil</v-icon></u></v-btn>
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
              <v-col class="margin-20" cols="12" sm="3" md="3">
                <v-row><span class="text-title-green">{{ $t('label.applicant_ktp') }}</span></v-row>
                <v-row>
                  <v-label v-if="detailLogisticRequest.applicant && detailLogisticRequest.applicant.file === '-'">{{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.file : '-' }}</v-label>
                  <a v-else-if="detailLogisticRequest.applicant && detailLogisticRequest.applicant.file.substr(0, 4) === 'https'" class="letter-class" :href="detailLogisticRequest.applicant.file" target="_blank">{{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.file : '-' }}</a>
                  <v-img v-else class="image-style" :src="detailLogisticRequest.applicant ? detailLogisticRequest.applicant.file : noImage" @error="errorHandler" />
                </v-row>
              </v-col>
              <v-col class="margin-20" cols="12" sm="1" md="1">
                <v-btn small outlined color="success" style="padding:20px;" @click="showApplicantIdentityDialog"><span>{{ $t('label.edit') }}</span><u><v-icon small dark style="padding-left:5px">mdi-pencil</v-icon></u></v-btn>
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
              <v-col cols="9" md="9">
                <a :href="detailLogisticRequest.letter ? detailLogisticRequest.letter.letter : '#'" target="_blank" class="blue--text letter-class"><u>{{ detailLogisticRequest.applicant ? detailLogisticRequest.applicant.application_letter_number : '-' }}</u></a>
              </v-col>
              <v-col cols="3" md="3">
                <v-btn small outlined color="success" style="padding:20px;" @click="downloadFile(detailLogisticRequest.letter ? detailLogisticRequest.letter.letter : '#')">
                  <v-icon small dark style="padding-left:5px;">mdi-download</v-icon> <span>{{ $t('label.download') }}</span>
                </v-btn>
                <v-btn small outlined color="success" style="margin-left:15px; padding:20px;" @click="updateLetter"><span>{{ $t('label.edit') }}</span><u><v-icon small dark style="padding-left:5px">mdi-pencil</v-icon></u></v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div> <!-- Daftar Barang Permohonan -->
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
                    <th colspan="7" class="text-center green lighten-5">{{ $t('label.request').toUpperCase() }}</th>
                    <th v-if="isVerified && !isFinalized" rowspan="2" class="text-center grey lighten-5">{{ $t('label.remaining_stock_item').toUpperCase() }}</th>
                    <th v-if="isVerified" colspan="6" class="text-center green lighten-4">{{ $t('label.recommendation').toUpperCase() }}</th>
                    <th v-if="isApproved" colspan="6" class="text-center green lighten-3">{{ $t('label.realization').toUpperCase() }}</th>
                    <th v-if="isVerified && !isFinalized" rowspan="2" class="text-center grey lighten-5">{{ $t('label.action').toUpperCase() }}</th>
                  </tr>
                  <tr>
                    <th class="text-left green lighten-5">{{ $t('label.number').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.description').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.total').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.unit').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.purpose').toUpperCase() }}</th>
                    <th class="text-left green lighten-5">{{ $t('label.item_type').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left green lighten-4">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left green lighten-4">{{ $t('label.total').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left green lighten-4">{{ $t('label.unit').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left green lighten-4">{{ $t('label.date').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left green lighten-4">{{ $t('label.status').toUpperCase() }}</th>
                    <th v-if="isVerified" class="text-left green lighten-4">{{ $t('label.pic').toUpperCase() }}</th>
                    <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                    <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.total').toUpperCase() }}</th>
                    <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.unit').toUpperCase() }}</th>
                    <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.date').toUpperCase() }}</th>
                    <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.status').toUpperCase() }}</th>
                    <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.pic').toUpperCase() }}</th>
                  </tr>
                </thead>
                <tbody v-if="loaded">
                  <tr v-if="listLogisticNeeds.length === 0">
                    <td class="text-center" :colspan="21">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr v-for="(item, index) in listLogisticNeeds" v-else :key="item.index">
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.product ? item.product.name : '-' }}</td>
                    <td>{{ item.brand || '-' }}</td>
                    <td class="text-right">{{ formatCurrency(item.quantity) || '-' }}</td>
                    <td>{{ item.unit.unit || '-' }}</td>
                    <td>{{ item.usage || '-' }}</td>
                    <td>{{ item.product ? item.product.category : '-' }}</td>
                    <td v-if="isVerified && !isFinalized"><v-btn small color="success" dark @click="getStockItem(item.product.id)">{{ $t('label.check_stock') }}</v-btn></td>
                    <td v-if="isVerified">{{ item.recommendation_product_name || '-' }}</td>
                    <td v-if="isVerified" class="text-right">{{ formatCurrency(item.recommendation_quantity) || '-' }}</td>
                    <td v-if="isVerified">{{ item.recommendation_product_name !== null ? item.recommendation_unit : '-' }}</td>
                    <td v-if="isVerified">{{ item.recommendationDate || '-' }}</td>
                    <td v-if="isVerified">
                      <span v-if="item.recommendationStatusLabel === $t('label.not_approved')" class="red--text text--lighten-1">
                        {{ item.recommendationStatusLabel || '-' }}
                      </span>
                      <span v-else class="green--text text--lighten-1">
                        {{ item.recommendationStatusLabel || '-' }}
                      </span>
                    </td>
                    <td v-if="isVerified">
                      <a v-if="item.recommendBy" class="blue--text letter-class" @click="picPopUp(item, true, false, item.recommendBy)">{{ item.recommendBy || '-' }}</a>
                      <span v-else>-</span>
                    </td>
                    <td v-if="isVerified && !isApproved">
                      <v-btn text small color="info" @click.stop="openForm(false, item.product, index, true, false)">
                        {{ $t('label.update') }}
                      </v-btn>
                    </td>
                    <td v-if="isApproved">{{ item.realization_product_name || '-' }}</td>
                    <td v-if="isApproved" class="text-right">{{ formatCurrency(item.realization_quantity) || '-' }}</td>
                    <td v-if="isApproved">{{ item.realization_product_name !== null ? item.realization_unit : '-' }}</td>
                    <td v-if="isApproved">{{ item.realizationDate || '-' }}</td>
                    <td v-if="isApproved">
                      <span v-if="item.realizationStatusLabel === $t('label.not_approved')" class="red--text text--lighten-1">
                        {{ item.realizationStatusLabel || '-' }}
                      </span>
                      <span v-else class="green--text text--lighten-1">
                        {{ item.realizationStatusLabel || '-' }}
                      </span>
                    </td>
                    <td v-if="isApproved">
                      <a v-if="item.realizedBy" class="blue--text letter-class" @click="picPopUp(item, true, true, item.realizedBy)">{{ item.realizedBy || '-' }}</a>
                      <span v-else>-</span>
                    </td>
                    <td v-if="isApproved && !isFinalized">
                      <v-btn text small color="info" @click.stop="openForm(false, item.product, index, true, true)">
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
      <div v-if="isVerified">
        <v-row>
          <v-col>
            <span class="text-data-green">
              {{ $t('label.recommendation_distribution_other') }}
            </span>
          </v-col>
        </v-row>
      </div>
      <v-row v-if="isVerified">
        <v-col>
          <v-card outlined min-height="100">
            <v-card-text>
              <v-row>
                <v-col>
                  <v-btn v-if="isVerified && !isApproved && !isFinalized" outlined color="success" height="50px" absolute right @click.stop="openForm(true, null, null, true, false)">
                    <v-icon dark>mdi-plus</v-icon> <span>{{ $t('label.add_distribution_recommendation') }}</span>
                  </v-btn>
                  <v-btn v-else-if="isVerified && isApproved && !isFinalized" outlined color="success" height="50px" absolute right @click.stop="openForm(true, null, null, true, true)">
                    <v-icon dark>mdi-plus</v-icon> <span>{{ $t('label.add_distribution_realization') }}</span>
                  </v-btn>
                  <v-simple-table style="margin-top: 70px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th rowspan="2" class="text-center grey lighten-5">{{ $t('label.number').toUpperCase() }}</th>
                          <th colspan="6" class="text-center green lighten-4">{{ $t('label.recommendation').toUpperCase() }}</th>
                          <th v-if="isApproved" colspan="6" class="text-center green lighten-3">{{ $t('label.realization').toUpperCase() }}</th>
                          <th v-if="!isFinalized" rowspan="2" class="text-center grey lighten-5">{{ $t('label.action').toUpperCase() }}</th>
                        </tr>
                        <tr>
                          <th class="text-left green lighten-4">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                          <th class="text-left green lighten-4">{{ $t('label.allocation_amount').toUpperCase() }}</th>
                          <th class="text-left green lighten-4">{{ $t('label.unit').toUpperCase() }}</th>
                          <th class="text-left green lighten-4">{{ $t('label.allocation_date').toUpperCase() }}</th>
                          <th class="text-left green lighten-4">{{ $t('label.status').toUpperCase() }}</th>
                          <th class="text-left green lighten-4">{{ $t('label.pic').toUpperCase() }}</th>
                          <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.apd_name_spec').toUpperCase() }}</th>
                          <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.allocation_amount').toUpperCase() }}</th>
                          <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.unit').toUpperCase() }}</th>
                          <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.allocation_date').toUpperCase() }}</th>
                          <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.status').toUpperCase() }}</th>
                          <th v-if="isApproved" class="text-left green lighten-3">{{ $t('label.pic').toUpperCase() }}</th>
                        </tr>
                      </thead>
                      <tbody v-if="loaded">
                        <tr v-if="listRealization.length === 0">
                          <td class="text-center" :colspan="15">{{ $t('label.no_data') }}</td>
                        </tr>
                        <tr v-for="(item, index) in listRealization" v-else :key="item.index">
                          <td>{{ getTableRowNumbering(index) }}</td>
                          <td>{{ item.recommendation_product_name ? item.recommendation_product_name : '-' }}</td>
                          <td class="text-right">{{ formatCurrency(item.recommendation_quantity) || '-' }}</td>
                          <td>{{ item.recommendation_product_name !== null ? item.recommendation_unit : '-' }}</td>
                          <td>{{ item.recommendationDate || '-' }}</td>
                          <td>{{ item.recommendationStatusLabel || '-' }}</td>
                          <td>
                            <a v-if="item.recommendBy" class="blue--text letter-class" @click="picPopUp(item, true, false, item.recommendBy)">{{ item.recommendBy || '-' }}</a>
                            <span v-else>-</span>
                          </td>
                          <td v-if="isVerified && !isApproved">
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
                                    <v-btn text small color="info" @click="openForm(null, index, null, true, false)">
                                      {{ $t('label.update') }}
                                    </v-btn>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-btn text small color="info" @click="deleteRealization(item, true, false)">
                                      {{ $t('label.delete') }}
                                    </v-btn>
                                  </v-list-item>
                                </v-card>
                              </v-menu>
                            </v-card-actions>
                          </td>
                          <td v-if="isApproved">{{ item.realization_product_name ? item.realization_product_name : '-' }}</td>
                          <td v-if="isApproved" class="text-right">{{ formatCurrency(item.realization_quantity) || '-' }}</td>
                          <td v-if="isApproved">{{ item.realization_product_name !== null ? item.realization_unit : '-' }}</td>
                          <td v-if="isApproved">{{ item.realizationDate || '-' }}</td>
                          <td v-if="isApproved">
                            <span v-if="item.realizationStatusLabel === $t('label.not_approved')" class="red--text text--lighten-1">
                              {{ item.realizationStatusLabel || '-' }}
                            </span>
                            <span v-else class="green--text text--lighten-1">
                              {{ item.realizationStatusLabel || '-' }}
                            </span>
                          </td>
                          <td v-if="isApproved">
                            <a v-if="item.realizedBy" class="blue--text letter-class" @click="picPopUp(item, true, true, item.realizedBy)">{{ item.realizedBy || '-' }}</a>
                            <span v-else>-</span>
                          </td>
                          <td v-if="isApproved && !isFinalized">
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
                                    <v-btn text small color="info" @click="openForm(null, index, null, true, true)">
                                      {{ $t('label.update') }}
                                    </v-btn>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-btn text small color="info" @click="deleteRealization(item, true, true)">
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
    <updateKebutuhanLogistik ref="updateForm" :show="showForm" />
    <dialogReturn ref="dialogReturnForm" :show="showReturnForm" />
    <dialogUrgency ref="dialogUrgencyForm" :show="showUrgencyForm" />
    <agencyIdentity ref="agencyIdentityForm" :show="showAgencyIdentity" />
    <applicantIdentity ref="dialogApplicantIdentityForm" :show="showApplicantIdentity" />
    <updateLetter ref="dialogUpdateLetterForm" :show="updateLetterForm" />
    <DialogDelete
      :dialog="dialogDelete"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialogDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`logistics/deleteRealization`"
    />
    <PicInfo
      :dialog="dialogPic"
      :data-pic="dataPic"
      :dialog-pic.sync="dialogPic"
      :pic-date.sync="dataPic"
      :store-path-pic="`logistics/deleteRealization`"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import updateKebutuhanLogistik from './update'
import DialogDelete from '@/components/DialogDelete'
import dialogUrgency from './dialogUrgency'
import dialogReturn from './dialogReturn'
import agencyIdentity from './agencyIdentity'
import applicantIdentity from './applicantIdentity'
import updateLetter from './updateLetter'
import PicInfo from '@/components/PicInfo'
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
    DialogDelete,
    PicInfo,
    dialogUrgency,
    dialogReturn,
    agencyIdentity,
    applicantIdentity,
    updateLetter
  },
  data() {
    return {
      letterFileType: '',
      isVerified: false,
      isRejected: false,
      isApproved: false,
      isFinalized: false,
      isRejectedApproval: false,
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
      dialogPic: false,
      dataPic: null,
      logisticNeeds: [],
      picHandphone: '',
      dataUrgencyConfirmation: {
        id: null,
        agency_name: '-',
        applicant: {
          application_letter_number: '-',
          applicant_name: '-'
        }
      },
      showUrgencyForm: false,
      showReturnForm: false,
      isUrgent: false,
      showAgencyIdentity: false,
      showApplicantIdentity: false,
      updateLetterForm: false,
      noImage: './img/noimage.gif'
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
    ]),
    ...mapGetters('user', [
      'phase'
    ])
  },
  async created() {
    this.listQuery.agency_id = this.$route.params.id
    await this.getListDetail()
    await this.getListDetailNeeds()
    await this.getListRealizationAdmin()
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
    EventBus.$on('dialogUrgencyConfirmation', (value) => {
      this.showUrgencyForm = false
      if (value) {
        this.getListDetail()
      }
    })
    EventBus.$on('dialogReturnConfirmation', (value) => {
      this.showReturnForm = false
      if (value) {
        this.getListDetail()
      }
    })
    EventBus.$on('hideAgencyIdentity', (value) => {
      this.showAgencyIdentity = false
      if (value) {
        this.getListDetail()
      }
    })
    EventBus.$on('hideApplicantIdentity', (value) => {
      this.showApplicantIdentity = false
      if (value) {
        this.getListDetail()
      }
    })
    EventBus.$on('hideUpdateLetter', (value) => {
      this.updateLetterForm = false
      if (value) {
        this.getListDetail()
      }
    })
  },
  methods: {
    rejectData(value) {
      const formData = new FormData()
      this.showDialogReject = false
      formData.append('agency_id', this.detailLogisticRequest.id)
      formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
      if (this.detailLogisticRequest.applicant.verification_status === 'Terverifikasi') {
        formData.append('approval_status', 'rejected')
        formData.append('approval_note', value)
        this.postRejectApproval(formData)
      } else {
        formData.append('verification_status', 'rejected')
        formData.append('note', value)
        this.postReject(formData)
      }
    },
    getTableRowNumbering(index) {
      return ((parseInt(this.listQuery.page) - 1) * parseInt(this.listQuery.limit)) + (parseInt(index) + 1)
    },
    downloadFile(value) {
      window.open(value)
    },
    openForm(type, value, index, recommendation, realization) {
      this.showForm = true
      this.isCreate = type
      if (type === true) {
        this.$refs.updateForm.setDialog(type, this.listQuery.agency_id, null, recommendation, realization)
      } else if (type === false) {
        this.$refs.updateForm.setDialog(type, this.listLogisticNeeds[index], value.id, recommendation, realization)
      } else {
        this.$refs.updateForm.setDialog(null, this.listRealization[value], null, recommendation, realization)
      }
    },
    urgencyChange(id, value) {
      this.showUrgencyForm = true
      this.dataUrgencyConfirmation = this.detailLogisticRequest
      this.$refs.dialogUrgencyForm.setData(id, value, this.dataUrgencyConfirmation)
    },
    returnChange(id) {
      this.showReturnForm = true
      this.dataReturnConfirmation = this.detailLogisticRequest
      this.$refs.dialogReturnForm.setData(id, this.dataReturnConfirmation)
    },
    showAgencyIdentityDialog() {
      this.$refs.agencyIdentityForm.setData(this.detailLogisticRequest.id, this.detailLogisticRequest)
      this.showAgencyIdentity = true
    },
    showApplicantIdentityDialog() {
      this.$refs.dialogApplicantIdentityForm.setData(this.detailLogisticRequest.id, this.detailLogisticRequest)
      this.showApplicantIdentity = true
    },
    updateLetter() {
      this.$refs.dialogUpdateLetterForm.setData(this.detailLogisticRequest.id, this.detailLogisticRequest)
      this.updateLetterForm = true
    },
    async deleteRealization(item, recommendation, realization) {
      this.dialogDelete = true
      if (realization) {
        item.product_name = item.realization_product_name ?? item.recommendation_product_name
      } else {
        item.product_name = item.recommendation_product_name
      }
      this.dataDelete = await item
    },
    async picPopUp(item, recommendation, realization, name) {
      this.dialogPic = true
      if (realization) {
        item.name = item.realized_by.name
        item.agency_name = item.realized_by.agency_name
        item.handphone = item.realized_by.handphone | '-'
      } else {
        item.name = item.recommend_by.name
        item.agency_name = item.recommend_by.agency_name
        item.handphone = item.recommend_by.handphone | '-'
      }
      this.dataPic = await item
    },
    async getListRealizationAdmin() {
      this.loaded = false
      await this.$store.dispatch('logistics/getLogisticNeedsAdmin', this.listQuery)
      this.listRealization.forEach(element => {
        element.recommendBy = element.recommend_by ? element.recommend_by.name : null
        element.realizedBy = element.realized_by ? element.realized_by.name : null
        element.recommendationDate = element.recommendation_date ? this.$moment.utc(element.recommendation_date).tz('Asia/Jakarta').format('DD MMMM YYYY') : '-'
        element.realizationDate = element.realization_date ? this.$moment.utc(element.realization_date).tz('Asia/Jakarta').format('DD MMMM YYYY') : '-'
        switch (element.recommendation_status) {
          case 'approved':
            element.recommendationStatusLabel = this.$t('label.approved')
            break
          case 'not_delivered':
            element.recommendationStatusLabel = this.$t('label.not_delivered')
            break
          case 'delivered':
            element.recommendationStatusLabel = this.$t('label.delivered')
            break
          case 'not_available':
            element.recommendationStatusLabel = this.$t('label.not_available')
            break
          case 'replaced':
            element.recommendationStatusLabel = this.$t('label.replaced')
            break
          case 'not_yet_fulfilled':
            element.recommendationStatusLabel = this.$t('label.not_yet_fulfilled')
            break
          default:
            element.recommendationStatusLabel = null
        }
        switch (element.realization_status) {
          case 'approved':
            element.realizationStatusLabel = this.$t('label.approved')
            break
          case 'not_delivered':
            element.realizationStatusLabel = this.$t('label.not_delivered')
            break
          case 'delivered':
            element.realizationStatusLabel = this.$t('label.delivered')
            break
          case 'not_available':
            element.realizationStatusLabel = this.$t('label.not_available')
            break
          case 'replaced':
            element.realizationStatusLabel = this.$t('label.replaced')
            break
          case 'not_yet_fulfilled':
            element.realizationStatusLabel = this.$t('label.not_yet_fulfilled')
            break
          default:
            element.realizationStatusLabel = this.$t('label.not_approved')
        }
      })
      this.loaded = true
    },
    async getListDetail() {
      await this.$store.dispatch('logistics/getListDetailLogisticRequest', this.$route.params.id)
      if (this.detailLogisticRequest.letter !== null) {
        const temp = this.detailLogisticRequest.letter.letter.split('.')
        this.letterFileType = temp[temp.length - 1]
      }
      this.isVerified = this.detailLogisticRequest.applicant.verification_status === 'Terverifikasi'
      this.isRejected = this.detailLogisticRequest.applicant.verification_status === 'Pengajuan Ditolak'
      this.isRejectedApproval = this.detailLogisticRequest.applicant.approval_status === 'Permohonan Ditolak'
      this.isApproved = this.detailLogisticRequest.applicant.approval_status === 'Telah Disetujui'
      this.isFinalized = this.detailLogisticRequest.applicant.finalized_by !== null
      // Cek Step Permohonan
      this.detailLogisticRequest.step = 'verifikasi'
      this.detailLogisticRequest.step_label = 'Verifikasi Administrasi'
      if (this.isRejectedApproval) {
        this.detailLogisticRequest.step = 'ditolak rekomendasi'
        this.detailLogisticRequest.step_label = 'Ditolak pada Rekomendasi salur'
      } else if (this.isRejected) {
        this.detailLogisticRequest.step = 'ditolak verifikasi'
        this.detailLogisticRequest.step_label = 'Ditolak pada Verifikasi Administrasi'
      } else if (this.isFinalized) {
        this.picHandphone = this.detailLogisticRequest.applicant.finalized_by.handphone ?? '-'
        this.detailLogisticRequest.step = 'final'
        this.detailLogisticRequest.step_label = 'Selesai Realisasi Salur'
      } else if (this.isVerified && this.isApproved) {
        this.picHandphone = this.detailLogisticRequest.applicant.approved_by.handphone ?? '-'
        this.detailLogisticRequest.step = 'realisasi'
        this.detailLogisticRequest.step_label = 'Realisasi Salur'
      } else if (this.isVerified && !this.isApproved) {
        this.picHandphone = this.detailLogisticRequest.applicant.verified_by.handphone ?? '-'
        this.detailLogisticRequest.step = 'rekomendasi'
        this.detailLogisticRequest.step_label = 'Rekomendasi Salur'
      }
      this.picHandphone = ' (' + this.picHandphone + ')'
      this.isUrgent = this.detailLogisticRequest.applicant.is_urgency === 1
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
        element.recommendBy = element.recommend_by ? element.recommend_by.name : null
        element.realizedBy = element.realized_by ? element.realized_by.name : null
        element.recommendationDate = element.recommendation_date ? this.$moment.utc(element.recommendation_date).tz('Asia/Jakarta').format('DD MMMM YYYY') : '-'
        element.realizationDate = element.realization_date ? this.$moment.utc(element.realization_date).tz('Asia/Jakarta').format('DD MMMM YYYY') : '-'
        switch (element.recommendation_status) {
          case 'approved':
            element.recommendationStatusLabel = this.$t('label.approved')
            break
          case 'not_delivered':
            element.recommendationStatusLabel = this.$t('label.not_delivered')
            break
          case 'delivered':
            element.recommendationStatusLabel = this.$t('label.delivered')
            break
          case 'not_available':
            element.recommendationStatusLabel = this.$t('label.not_available')
            break
          case 'replaced':
            element.recommendationStatusLabel = this.$t('label.replaced')
            break
          case 'not_yet_fulfilled':
            element.recommendationStatusLabel = this.$t('label.not_yet_fulfilled')
            break
          default:
            element.recommendationStatusLabel = this.$t('label.not_approved')
        }
        switch (element.realization_status) {
          case 'approved':
            element.realizationStatusLabel = this.$t('label.approved')
            break
          case 'not_delivered':
            element.realizationStatusLabel = this.$t('label.not_delivered')
            break
          case 'delivered':
            element.realizationStatusLabel = this.$t('label.delivered')
            break
          case 'not_available':
            element.realizationStatusLabel = this.$t('label.not_available')
            break
          case 'replaced':
            element.realizationStatusLabel = this.$t('label.replaced')
            break
          case 'not_yet_fulfilled':
            element.realizationStatusLabel = this.$t('label.not_yet_fulfilled')
            break
          default:
            element.realizationStatusLabel = this.$t('label.not_approved')
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
      formData.append('agency_id', this.detailLogisticRequest.id)
      formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
      formData.append('verification_status', 'verified')
      formData.append('url', location.host + '/#')
      const response = await this.$store.dispatch('logistics/postVerificationStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      }
    },
    async postReject(formData) {
      const response = await this.$store.dispatch('logistics/postVerificationStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      }
    },
    async postRejectApproval(formData) {
      const response = await this.$store.dispatch('logistics/postApprovalStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      }
    },
    setTotal() {
      this.totalAPD = 0
      this.listLogisticNeeds.forEach(element => {
        this.totalAPD += parseInt(element.quantity)
      })
    },
    async submitApprove() {
      const formData = new FormData()
      formData.append('agency_id', this.detailLogisticRequest.id)
      formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
      formData.append('approval_status', 'approved')
      formData.append('url', location.host + '/#')
      const response = await this.$store.dispatch('logistics/postApprovalStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      } else if (response.response.status === 422) {
        this.scrollToElement()
      }
    },
    async submitFinal() {
      const formData = new FormData()
      formData.append('applicant_id', this.detailLogisticRequest.applicant.id)
      formData.append('approval_status', 'approved')
      formData.append('url', location.host + '/#')
      const response = await this.$store.dispatch('logistics/postFinalStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      } else if (response.response.status === 422) {
        this.scrollToElement()
      }
    },
    scrollToElement(options) {
      window.scrollTo(0, 1200)
    },
    getStockItem(value) {
      this.dialogStock = true
      this.getStock(value)
    },
    back() {
      this.$router.go(-1)
    },
    formatCurrency(value) {
      if (value) {
        const number_string = value.toString()
        const split = number_string.split(',')
        const modulo = split[0].length % 3
        let result = split[0].substr(0, modulo)
        const thousand = split[0].substr(modulo).match(/\d{3}/gi)
        if (thousand) {
          const separator = modulo ? '.' : ''
          result += separator + thousand.join('.')
        }
        result = split[1] !== undefined ? result + ',' + split[1] : result
        return result
      } else {
        return '0'
      }
    },
    errorHandler(url) {
      this.detailLogisticRequest.applicant.file = this.noImage
      this.$forceUpdate()
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
