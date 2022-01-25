<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" sm="12">
          <span class="table-title">{{ $t('label.detail_request_vaccine_medic') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="9" md="12">
          <v-card
            v-if="detailVaccineRequest.status === 'not_verified'"
            class="mx-auti"
            color="#219653"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text-wrap" style="color: white">{{ $t('label.verify_text_alert_1') }}<b>{{ $t('label.verify_text_alert_2') }}</b> {{ $t('label.verify_text_alert_3') }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            v-if="detailVaccineRequest.status === 'verified'"
            class="mx-auti"
            color="#219653"
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="sub-title-verified-card-detail-Vaccine-needs white--text text-wrap">{{ $t('label.alert_verified_title_card_Vaccine_needs_1') }} <b>{{ $t('label.alert_verified_title_card_Vaccine_needs_2') }}</b></span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <div class="d-flex flex-row mt-8">
        <span
          class="text-title"
          :class="{
            'mr-13': $vuetify.breakpoint.smAndUp,
            'mr-3': $vuetify.breakpoint.xsOnly
          }"
        >
          {{ $t('label.request_date') }}
        </span>
        <span class="text-data-green">:
          {{
            detailVaccineRequest.created_at === null
              ? $t('label.stripe')
              : $moment.utc(detailVaccineRequest.created_at).tz('Asia/Jakarta').format('LLL')
          }}
        </span>
      </div>

      <div class="d-flex flex-row my-8">
        <span
          class="text-title mr-16"
        >
          {{ $t('label.status') }}
        </span>
        <span
          :class="{
            'text-data-green': detailVaccineRequest.status === 'verified' || detailVaccineRequest.status === 'finalized' || detailVaccineRequest.status === 'approved',
            'text-data-red': detailVaccineRequest.status === 'not_verified' || detailVaccineRequest.status === 'verification_rejected' || detailVaccineRequest.status === 'approval_rejected',
            'ml-16': $vuetify.breakpoint.smAndUp,
            'ml-6': $vuetify.breakpoint.xsOnly
          }"
        >
          : {{ statusLabel }}
        </span>
      </div>

      <div v-if="detailVaccineRequest.status === 'finalized'" class="d-flex flex-row my-8">
        <span
          class="text-title mr-4"
        >
          {{ $t('label.approved_by') }}
        </span>
        <span
          :class="{
            'text-data-green': detailVaccineRequest.status === 'verified' || detailVaccineRequest.status === 'finalized' || detailVaccineRequest.status === 'approved',
            'text-data-red': detailVaccineRequest.status === 'not_verified' || detailVaccineRequest.status === 'verification_rejected' || detailVaccineRequest.status === 'approval_rejected',
            'ml-16': $vuetify.breakpoint.smAndUp,
            'ml-6': $vuetify.breakpoint.xsOnly
          }"
        >
          : {{ detailVaccineRequest.finalized_by !== null ? detailVaccineRequest.finalized_by.name + picHandphone : '-' }}
          <br>
          {{ detailVaccineRequest.finalized_by !== null ? detailVaccineRequest.finalized_by.agency_name : '-' }}
        </span>
      </div>

      <div v-else-if="detailVaccineRequest.status === 'approved'" class="d-flex flex-row my-8">
        <span
          class="text-title mr-4"
        >
          {{ $t('label.approved_by') }}
        </span>
        <span
          :class="{
            'text-data-green': detailVaccineRequest.status === 'verified' || detailVaccineRequest.status === 'finalized' || detailVaccineRequest.status === 'approved',
            'text-data-red': detailVaccineRequest.status === 'not_verified' || detailVaccineRequest.status === 'verification_rejected' || detailVaccineRequest.status === 'approval_rejected',
            'ml-16': $vuetify.breakpoint.smAndUp,
            'ml-6': $vuetify.breakpoint.xsOnly
          }"
        >
          : {{ detailVaccineRequest.approved_by !== null ? detailVaccineRequest.approved_by.name + picHandphone : '-' }}
          <br>
          {{ detailVaccineRequest.approved_by !== null ? detailVaccineRequest.approved_by.agency_name : '-' }}
        </span>
      </div>
      <v-row
        v-if="isNotDinkesKota"
        :class="{
          'justify-center': $vuetify.breakpoint.xsOnly,
          'pl-3': $vuetify.breakpoint.smAndUp
        }"
      >
        <div>
          <span>
            <v-btn
              v-if="detailVaccineRequest.status === 'not_verified'"
              outlined
              color="#2E7D32"
              :class="verifyButton"
              @click="postVerification"
            >
              {{ $t('label.verif_now') }}
            </v-btn>
            <v-btn
              v-if="detailVaccineRequest.status === 'verification_rejected' || detailVaccineRequest.status === 'approval_rejected'"
              outlined
              color="#2E7D32"
              :class="verifyButton"
              @click.stop="showDialogReasonReject = true"
            >
              {{ $t('label.reason_reject') }}
            </v-btn>
            <v-btn
              v-if="detailVaccineRequest.status === 'verified'"
              outlined
              color="#2E7D32"
              :class="verifyButton"
              @click="submitApprove()"
            >
              {{ $t('label.approve') }}
            </v-btn>
            <v-btn
              v-if="detailVaccineRequest.status === 'approved'"
              outlined
              color="#2E7D32"
              class="btn-sm__done"
              @click="submitFinal()"
            >
              {{ $t('label.final') }}
            </v-btn>
          </span>
          <span class="ml-3">
            <v-btn
              v-if="detailVaccineRequest.status === 'not_verified'"
              outlined
              color="#e62929"
              :class="rejectButton"
              @click.stop="showDialogReject = true"
            >
              {{ $t('route.rejected_title') }}
            </v-btn>
            <v-btn
              v-if="detailVaccineRequest.status === 'verified'"
              outlined
              color="#e62929"
              :class="rejectButton"
              @click.stop="showDialogReject = true"
              @click="setTotal()"
            >
              {{ $t('route.rejected_title') }}
            </v-btn>
          </span>
        </div>
      </v-row>
      <rejectKebutuhanLogistik
        :show="showDialogReject"
        :item="detailVaccineRequest"
        :total="listVaccineNeeds.length > 0 ? listVaccineNeeds[0].Vaccine_item_summary : null"
        @submitReject="rejectData"
      />
      <reasonDeniedVaccineNeeds
        :show="showDialogReasonReject"
        :item="detailVaccineRequest"
        :total="listVaccineNeeds.length > 0 ? listVaccineNeeds[0].Vaccine_item_summary : null"
      />
    </div>

    <div>
      <br>
      <v-row v-if="isNotDinkesKota" class="mt-3">
        <v-col>
          <span class="text-data-green">
            {{ $t('label.applicant_urgency') }}
          </span>
        </v-col>
      </v-row>
      <v-row v-if="isNotDinkesKota">
        <v-col cols="12" sm="12">
          <v-card
            class="d-flex flex-row mx-auto pa-4 align-center"
            outlined
          >
            <v-container
              v-if="isUrgent"
              fluid
              class="d-flex"
              :class="{
                'flex-row align-center justify-space-between': $vuetify.breakpoint.smAndUp,
                'flex-column text-center': $vuetify.breakpoint.xsOnly
              }"
            >
              <span>
                {{ $t('label.applicant_label_urgency') }} <b>{{ $t('label.important_applicant') }}</b>
              </span>
              <v-btn
                outlined
                color="warning"
                :class="{
                  'mt-3': $vuetify.breakpoint.xsOnly
                }"
                @click="urgencyChange(detailVaccineRequest.id, 0)"
              >
                {{ $t('label.important') }}
              </v-btn>
            </v-container>
            <v-container
              v-else
              fluid
              class="d-flex mx-0"
              :class="{
                'flex-row align-center justify-space-between': $vuetify.breakpoint.smAndUp,
                'flex-column text-center': $vuetify.breakpoint.xsOnly
              }"
            >
              <span class="text-title-green">
                {{ $t('label.applicant_label_no_urgency') }}
              </span>
              <v-btn
                outlined
                color="#2E7D32"
                :class="{
                  'mt-3': $vuetify.breakpoint.xsOnly
                }"
                @click="urgencyChange(detailVaccineRequest.id, 1)"
              >
                {{ $t('label.button_applicant_urgency_important') }}
              </v-btn>
            </v-container>
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
            class="d-flex flex-row mx-auto pa-4 align-center"
            outlined
          >
            <v-container
              fluid
              class="d-flex"
              :class="{
                'flex-row align-center justify-space-between': $vuetify.breakpoint.smAndUp,
                'flex-column text-center': $vuetify.breakpoint.xsOnly
              }"
            >
              <span>
                {{ $t('label.applicant_status_description') }} <b>{{ detailVaccineRequest.step_label }}</b>
              </span>
              <v-btn
                outlined
                color="info"
                :class="{
                  'mt-3': $vuetify.breakpoint.xsOnly
                }"
                @click="returnChange(detailVaccineRequest.id)"
              >
                {{ $t('label.return') }}
              </v-btn>
            </v-container>
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
                      {{ detailVaccineRequest.master_faskes_type ? detailVaccineRequest.master_faskes_type.name : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.city_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.village ? detailVaccineRequest.village.kemendagri_kabupaten_nama : '-' }}
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
                      {{ detailVaccineRequest.agency_name }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.select_sub_district_full_name') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.village ? detailVaccineRequest.village.kemendagri_kecamatan_nama : '-' }}
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
                      {{ detailVaccineRequest.agency_phone_number || '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.village') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.village ? detailVaccineRequest.village.kemendagri_desa_nama : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                sm="3"
                md="3"
                :class="{
                  'margin-20': $vuetify.breakpoint.smAndUp,
                  'ml-5 mt-n4': $vuetify.breakpoint.xsOnly
                }"
              >
                <span class="text-title-green">
                  {{ $t('label.full_address') }}
                </span>
                <br>
                <v-label>
                  {{ detailVaccineRequest.agency_address }}
                </v-label>
              </v-col>
              <v-col
                v-if="isNotDinkesKota"
                cols="12"
                sm="1"
                md="1"
                :class="{
                  'mt-5': $vuetify.breakpoint.smAndUp,
                  'ml-5 mb-5': $vuetify.breakpoint.xsOnly
                }"
              >
                <v-btn small outlined color="success" style="padding:20px;" @click="showAgencyIdentityDialog"><span>{{ $t('label.edit') }}</span><u><v-icon small dark style="padding-left:5px">mdi-pencil</v-icon></u></v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div><!-- End Agency Component -->

    <div><!-- Applicant Component -->
      <v-row class="mt-5">
        <v-col>
          <span class="text-data-green">
            {{ $t('label.step_title_2') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card class="mx-auto" outlined>
            <v-row class="mb-5">
              <v-col class="margin-20" cols="12" sm="6" md="6">
                <v-row class="margin-top-min-15">
                  <v-col :class="{ 'max-width__cp': $vuetify.breakpoint.xsOnly }">
                    <span class="text-title-green">
                      {{ $t('label.contact_person') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.applicant_name || '-' }}
                    </v-label>
                  </v-col>
                  <v-col :class="{ 'max-width__email': $vuetify.breakpoint.xsOnly }">
                    <span class="text-title-green">
                      {{ $t('label.capital_email') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.applicant_email || '-' }}
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
                      {{ detailVaccineRequest.applicant_office || '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.applicant_phone') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.applicant_primary_phone_number || '-' }}
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
                      {{ detailVaccineRequest.applicant_secondary_phone_number || '-' }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <v-row
                  class="mt-4 mx-0"
                  :class="{
                    'ml-5 mt-n5': $vuetify.breakpoint.xsOnly
                  }"
                >
                  <span class="text-title-green">{{ $t('label.applicant_ktp') }}</span>
                </v-row>
                <v-row
                  class="mt-4 mx-0"
                  :class="{
                    'ml-5': $vuetify.breakpoint.xsOnly
                  }"
                >
                  <v-label v-if="detailVaccineRequest.applicant_file_url">{{ detailVaccineRequest.applicant_file_url }}</v-label>
                  <a
                    v-else-if="detailVaccineRequest.applicant_file_url.substr(0, 4) === 'https'"
                    class="letter-class"
                    :href="detailVaccineRequest.applicant_file_url"
                    target="_blank"
                  >{{ detailVaccineRequest.applicant_file_url }}</a>
                  <v-img
                    v-else
                    :class="{
                      'image-large': $vuetify.breakpoint.smAndUp,
                      'image-small': $vuetify.breakpoint.xsOnly
                    }"
                    :src="detailVaccineRequest.applicant_file_url"
                    @error="errorHandler"
                  />
                </v-row>
              </v-col>
              <v-col v-if="isNotDinkesKota" class="margin-20" cols="12" sm="1" md="1">
                <v-btn small outlined color="success" style="padding:20px;" @click="showApplicantIdentityDialog"><span>{{ $t('label.edit') }}</span><u><v-icon small dark style="padding-left:5px">mdi-pencil</v-icon></u></v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row class="mt-5">
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
          <v-card-text
            :class="{
              'd-flex flex-row align-center justify-space-between': $vuetify.breakpoint.smAndUp,
              'd-flex flex-column align-center justify-space-around': $vuetify.breakpoint.xsOnly
            }"
          >
            <a
              :href="detailVaccineRequest.letter ? detailVaccineRequest.letter.letter : '#'"
              target="_blank"
              class="blue--text letter-class"
            >
              <u>{{ detailVaccineRequest.application_letter_number }}</u>
            </a>
            <div :class="{ 'mt-4': $vuetify.breakpoint.xsOnly }">
              <v-btn
                small
                outlined
                color="success"
                class="pa-5"
                @click="downloadFile(detailVaccineRequest.letter ? detailVaccineRequest.letter.letter : '#')"
              >
                <v-icon left small dark>mdi-download</v-icon>
                <span>{{ $t('label.download') }}</span>
              </v-btn>
              <v-btn
                v-if="isNotDinkesKota"
                small
                outlined
                color="success"
                class="ml-3 pa-5"
                @click="updateLetter"
              >
                <span>{{ $t('label.edit') }}</span>
                <v-icon right small dark>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="detailVaccineRequest.agency_type <= 3">
      <v-row>
        <v-col>
          <span class="text-data-green">Detail Kondisi Fasilitas Kesehatan</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-row>
              <v-col class="margin-20">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="text-title-green">Jumlah Pasien COVID-19 yang ditangani</span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.total_covid_patients }} Orang
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">Jumlah Tempat Tidur</span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.total_bedroom }} Tempat Tidur
                    </v-label>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <span class="text-title-green">Jumlah Ruang Isolasi</span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.total_isolation_room }} Ruangan
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">Jumlah Tenaga Kesehatan</span>
                    <br>
                    <v-label>
                      {{ detailVaccineRequest.total_health_worker }} Orang
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div> <!-- Daftar Barang Permohonan -->
      <v-row class="mt-5">
        <v-col>
          <span class="text-data-green">
            {{ $t('label.list_Vaccine_need') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined class="pa-4">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th colspan="7" class="text-center green lighten-5">{{ $t('label.request').toUpperCase() }}</th>
                    <th v-if="isVerified && !isFinalized && isNotDinkesKota" rowspan="2" class="text-center grey lighten-5">{{ $t('label.remaining_stock_item').toUpperCase() }}</th>
                    <th v-if="isVerified" colspan="6" class="text-center green lighten-4">{{ $t('label.recommendation').toUpperCase() }}</th>
                    <th v-if="isApproved" colspan="6" class="text-center green lighten-3">{{ $t('label.realization').toUpperCase() }}</th>
                    <th v-if="isVerified && !isFinalized && isNotDinkesKota" rowspan="2" class="text-center grey lighten-5">{{ $t('label.action').toUpperCase() }}</th>
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
                  <tr v-if="listVaccineNeeds.length === 0">
                    <td class="text-center" :colspan="21">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr v-for="(item, index) in listVaccineNeeds" v-else :key="item.index">
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.product ? item.product.name : '-' }}</td>
                    <td class="text-no-wrap">
                      <div v-html="splitIntoRows(item.brand || '-')" />
                    </td>
                    <td class="text-right">{{ formatCurrency(item.quantity) || '-' }}</td>
                    <td>{{ item.unit.unit || '-' }}</td>
                    <td>{{ item.usage || '-' }}</td>
                    <td>{{ item.product ? item.product.category : '-' }}</td>
                    <td v-if="isVerified && !isFinalized && isNotDinkesKota"><v-btn small color="success" dark @click="getStockItem(item.product.id)">{{ $t('label.check_stock') }}</v-btn></td>
                    <td v-if="isVerified" class="text-no-wrap">
                      <div v-html="splitIntoRows(item.recommendation_product_name || '-')" />
                    </td>
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
                    <td v-if="isVerified && !isApproved && isNotDinkesKota">
                      <v-btn text small color="info" @click.stop="openForm(false, item.product, index, true, false)">
                        {{ $t('label.update') }}
                      </v-btn>
                    </td>
                    <td v-if="isApproved" class="text-no-wrap">
                      <div v-html="splitIntoRows(item.realization_product_name || '-')" />
                    </td>
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
                    <td v-if="isApproved && !isFinalized && isNotDinkesKota">
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
              :length="totalVaccineNeeds"
              :total-visible="3"
              @input="onNext"
            />
          </v-card>
        </v-col>
      </v-row>
      <div v-if="isVerified">
        <v-row class="mt-5">
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
                  <div
                    class="d-flex flex-row"
                    :class="{
                      'justify-end': $vuetify.breakpoint.smAndUp,
                      'justify-center': $vuetify.breakpoint.xsOnly
                    }"
                  >
                    <v-btn
                      v-if="isVerified && !isApproved && !isFinalized && isNotDinkesKota"
                      outlined
                      color="success"
                      height="50px"
                      @click.stop="openForm(true, null, null, true, false)"
                    >
                      <v-icon dark>mdi-plus</v-icon>
                      <span>{{ $t('label.add_distribution_recommendation') }}</span>
                    </v-btn>
                    <v-btn
                      v-else-if="isVerified && isApproved && !isFinalized && isNotDinkesKota"
                      outlined
                      color="success"
                      height="50px"
                      @click.stop="openForm(true, null, null, true, true)"
                    >
                      <v-icon dark>mdi-plus</v-icon>
                      <span>{{ $t('label.add_distribution_realization') }}</span>
                    </v-btn>
                  </div>
                  <v-simple-table class="mt-8">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th rowspan="2" class="text-center grey lighten-5">{{ $t('label.number').toUpperCase() }}</th>
                          <th colspan="6" class="text-center green lighten-4">{{ $t('label.recommendation').toUpperCase() }}</th>
                          <th v-if="isApproved" colspan="6" class="text-center green lighten-3">{{ $t('label.realization').toUpperCase() }}</th>
                          <th v-if="!isFinalized && isNotDinkesKota" rowspan="2" class="text-center grey lighten-5">{{ $t('label.action').toUpperCase() }}</th>
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
                          <td class="text-no-wrap">
                            <div v-html="splitIntoRows(item.recommendation_product_name || '-')" />
                          </td>
                          <td class="text-right">{{ formatCurrency(item.recommendation_quantity) || '-' }}</td>
                          <td>{{ item.recommendation_product_name !== null ? item.recommendation_unit : '-' }}</td>
                          <td>{{ item.recommendationDate || '-' }}</td>
                          <td>{{ item.recommendationStatusLabel || '-' }}</td>
                          <td>
                            <a v-if="item.recommendBy" class="blue--text letter-class" @click="picPopUp(item, true, false, item.recommendBy)">{{ item.recommendBy || '-' }}</a>
                            <span v-else>-</span>
                          </td>
                          <td v-if="isVerified && !isApproved && isNotDinkesKota">
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
                          <td v-if="isApproved">
                            <div v-html="splitIntoRows(item.realization_product_name || '-')" />
                          </td>
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
                          <td v-if="isApproved && !isFinalized && isNotDinkesKota">
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
      :store-path-delete="`vaccine/deleteRealization`"
    />
    <PicInfo
      :dialog="dialogPic"
      :data-pic="dataPic"
      :dialog-pic.sync="dialogPic"
      :pic-date.sync="dataPic"
      :store-path-pic="`vaccine/deleteRealization`"
    />
  </div>
</template>

<script>
import _split from 'lodash/split'
import _chunk from 'lodash/chunk'
import { mapGetters, mapState } from 'vuex'
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
import reasonDeniedVaccineNeeds from './reasonReject'

export default {
  name: 'ListDetailPengajuanLogistik',
  components: {
    updateKebutuhanLogistik,
    rejectKebutuhanLogistik,
    reasonDeniedVaccineNeeds,
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
      VaccineNeeds: [],
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
    ...mapGetters('vaccine', [
      'detailVaccineRequest',
      'listVaccineNeeds',
      'totalVaccineNeeds',
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
    ]),
    isNotDinkesKota() {
      return this.roles[0] !== 'dinkeskota'
    },
    statusLabel() {
      return this.$t('label.' + this.detailVaccineRequest.status)
    },
    verifyButton() {
      return this.$vuetify.breakpoint.smAndUp ? 'btn-sm' : 'btn-xs__verify'
    },
    rejectButton() {
      return this.$vuetify.breakpoint.smAndUp ? 'btn-sm' : 'btn-xs__reject'
    }
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
    splitIntoRows(str) {
      if (typeof str !== 'string') {
        return str
      }
      const wordsLength = 5
      const words = _split(str, ' ')
      const rowOfWords = _chunk(words, wordsLength)
      const rows = rowOfWords.reduce((result, row) => {
        result += `
          <p style="margin: 0;">
            ${row.join(' ')}
          </p>
        `
        return result
      }, '')
      return rows
    },
    rejectData(value) {
      const formData = new FormData()
      this.showDialogReject = false
      formData.append('agency_id', this.detailVaccineRequest.id)
      formData.append('applicant_id', this.detailVaccineRequest.id)
      if (this.detailVaccineRequest.status === 'verified') {
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
        this.$refs.updateForm.setDialog(type, this.listVaccineNeeds[index], value.id, recommendation, realization)
      } else {
        this.$refs.updateForm.setDialog(null, this.listRealization[value], null, recommendation, realization)
      }
    },
    urgencyChange(id, value) {
      this.showUrgencyForm = true
      this.dataUrgencyConfirmation = this.detailVaccineRequest
      this.$refs.dialogUrgencyForm.setData(id, value, this.dataUrgencyConfirmation)
    },
    returnChange(id) {
      this.showReturnForm = true
      this.dataReturnConfirmation = this.detailVaccineRequest
      this.$refs.dialogReturnForm.setData(id, this.dataReturnConfirmation)
    },
    showAgencyIdentityDialog() {
      this.$refs.agencyIdentityForm.setData(this.detailVaccineRequest.id, this.detailVaccineRequest)
      this.showAgencyIdentity = true
    },
    showApplicantIdentityDialog() {
      this.$refs.dialogApplicantIdentityForm.setData(this.detailVaccineRequest.id, this.detailVaccineRequest)
      this.showApplicantIdentity = true
    },
    updateLetter() {
      this.$refs.dialogUpdateLetterForm.setData(this.detailVaccineRequest.id, this.detailVaccineRequest)
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
      if (realization && item.realized_by !== null) {
        item.name = item.realized_by.name
        item.agency_name = item.realized_by.agency_name
        item.handphone = item.realized_by.handphone | '-'
      } else if (item.recommend_by !== null) {
        item.name = item.recommend_by.name
        item.agency_name = item.recommend_by.agency_name
        item.handphone = item.recommend_by.handphone | '-'
      }
      this.dataPic = await item
    },
    async getListRealizationAdmin() {
      this.loaded = false
      await this.$store.dispatch('vaccine/getVaccineNeedsAdmin', this.listQuery)
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
      // Cek otorisasi user
      await this.$store.dispatch('vaccine/getListDetailVaccineRequest', this.$route.params.id)

      // uncomment after ready
      // const res = await this.$store.dispatch('vaccine/getListDetailVaccineRequest', this.$route.params.id)
      // if (!res.data) {
      //   this.$router.push('/dashboard')
      //   return
      // }

      if (this.detailVaccineRequest.letter_file_url !== null) {
        const temp = this.detailVaccineRequest.letter_file_url.split('.')
        this.letterFileType = temp[temp.length - 1]
      }
      this.isVerified = this.detailVaccineRequest.status === 'verified'
      this.isRejected = this.detailVaccineRequest.status === 'verification_rejected'
      this.isRejectedApproval = this.detailVaccineRequest.status === 'approval_rejected'
      this.isApproved = this.detailVaccineRequest.status === 'approved'
      this.isFinalized = this.detailVaccineRequest.status === 'finalized'
      // Cek Step Permohonan
      this.detailVaccineRequest.step = 'verifikasi'
      this.detailVaccineRequest.step_label = 'Verifikasi Administrasi'
      if (this.isRejectedApproval) {
        this.detailVaccineRequest.step = 'ditolak rekomendasi'
        this.detailVaccineRequest.step_label = 'Ditolak pada Rekomendasi salur'
      } else if (this.isRejected) {
        this.detailVaccineRequest.step = 'ditolak verifikasi'
        this.detailVaccineRequest.step_label = 'Ditolak pada Verifikasi Administrasi'
      } else if (this.isFinalized) {
        this.picHandphone = this.detailVaccineRequest.finalized_by !== null ? this.detailVaccineRequest.finalized_by.handphone : '-'
        this.detailVaccineRequest.step = 'final'
        this.detailVaccineRequest.step_label = 'Selesai Realisasi Salur'
      } else if (this.isVerified && this.isApproved) {
        this.picHandphone = this.detailVaccineRequest.approved_by !== null ? this.detailVaccineRequest.approved_by.handphone : '-'
        this.detailVaccineRequest.step = 'realisasi'
        this.detailVaccineRequest.step_label = 'Realisasi Salur'
      } else if (this.isVerified && !this.isApproved) {
        this.picHandphone = this.detailVaccineRequest.verified_by !== null ? this.detailVaccineRequest.verified_by.handphone : '-'
        this.detailVaccineRequest.step = 'rekomendasi'
        this.detailVaccineRequest.step_label = 'Rekomendasi Salur'
      }
      this.picHandphone = this.picHandphone !== null ? this.picHandphone : '-'
      this.picHandphone = ' (' + this.picHandphone + ')'
      this.isUrgent = this.detailVaccineRequest.is_urgency === 1
    },
    async getStock(value) {
      const param = {
        id: await value
      }
      await this.$store.dispatch('vaccine/getStock', param)
    },
    async getListDetailNeeds() {
      this.loaded = false
      await this.$store.dispatch('vaccine/getListDetailVaccineNeeds', this.listQuery)
      this.listVaccineNeeds.forEach(element => {
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
      formData.append('agency_id', this.detailVaccineRequest.id)
      formData.append('applicant_id', this.detailVaccineRequest.id)
      formData.append('verification_status', 'verified')
      formData.append('url', location.host + '/#')
      const response = await this.$store.dispatch('vaccine/postVerificationStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      }
    },
    async postReject(formData) {
      const response = await this.$store.dispatch('vaccine/postVerificationStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      }
    },
    async postRejectApproval(formData) {
      const response = await this.$store.dispatch('vaccine/postApprovalStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      }
    },
    setTotal() {
      this.totalAPD = 0
      this.listVaccineNeeds.forEach(element => {
        this.totalAPD += parseInt(element.quantity)
      })
    },
    async submitApprove() {
      const formData = new FormData()
      formData.append('agency_id', this.detailVaccineRequest.id)
      formData.append('applicant_id', this.detailVaccineRequest.id)
      formData.append('approval_status', 'approved')
      formData.append('url', location.host + '/#')
      const response = await this.$store.dispatch('vaccine/postApprovalStatus', formData)
      if (response.status === 200) {
        await this.getListDetail()
      } else if (response.response.status === 422) {
        this.scrollToElement()
      }
    },
    async submitFinal() {
      const formData = new FormData()
      formData.append('agency_id', this.detailVaccineRequest.id)
      formData.append('applicant_id', this.detailVaccineRequest.id)
      formData.append('approval_status', 'approved')
      formData.append('url', location.host + '/#')
      const response = await this.$store.dispatch('vaccine/postFinalStatus', formData)
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
    errorHandler() {
      this.detailVaccineRequest.applicant_file_url = this.noImage
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss">
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
.sub-title-verified-card-detail-Vaccine-needs {
  font-size: 13px;
}
.mb-15 {
  margin-bottom: 60px;
}
.btn-xs {
  &__verify {
    min-width: 190px !important;
    max-width: 190px !important;
  }
  &__reject {
    max-width: 110px !important;
    min-width: 110px !important;
  }
}
.btn-sm {
  max-width: 200px !important;
  min-width: 200px !important;

  &__done {
    max-width: 250px !important;
    min-width: 250px !important;
  }
}
.image-large {
  max-width: 100%;
  max-height: 500px;
}
.image-small {
  max-width: 50%;
  max-height: 200px;
}
.max-width {
  &__cp {
    max-width: 180px !important;
  }

  &__email {
    max-width: 150px !important;
  }

  &__add {
    max-width: 150px !important;
  }
}
</style>
