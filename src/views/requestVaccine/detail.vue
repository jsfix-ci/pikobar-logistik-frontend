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
              v-else-if="status > 0"
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
            <span class="text-title">{{ $t('label.status') }}</span>
          </v-col>
          <v-col>
            <span
              :class="`${(status < 2 ? 'red--text' : 'green--text text--darken-2')} font-weight-bold`"
            >
              : {{ $t(`status.${(vaccineRequest.status || statusTarget)}`) }}
            </span>
          </v-col>
        </v-row>

        <v-row v-if="status < 0" class="mt-n5">
          <v-col cols="2" class="mr-3">
            <span class="text-title">{{ $t('label.reason_reject') }}</span>
          </v-col>
          <v-col>
            <span>: {{ vaccineRequest.note }}</span>
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
              @click="showConfirmDialog(2)"
            >{{ $t('label.verif_now') }}</v-btn>
            <v-btn
              v-else-if="status == 2"
              class="mx-3 my-1 font-weight-bold"
              color="success"
              outlined
              @click="showConfirmDialog(3)"
            >{{ $t('label.approve') }}</v-btn>
            <v-btn
              v-else-if="status == 3"
              class="mx-3 my-1 font-weight-bold"
              color="success"
              outlined
              @click="showConfirmDialog(4)"
            >{{ $t('label.final') }}</v-btn>
            <v-btn
              v-if="status == 1 || status == 2"
              class="mx-3 my-1 font-weight-bold"
              color="red"
              outlined
              @click="showConfirmDialog((status == 1 ? -1 : -2))"
            >{{ $t('route.rejected_title') }}</v-btn>
          </v-col>
        </v-row>

        <template><!-- Confirm Change Status Dialog -->
          <v-row justify="center">
            <v-dialog
              v-model="confirmDialog"
              persistent
              max-width="60%"
            >
              <v-card>
                <v-card-title class="text-h5">
                  Konfirmasi Perubahan Status Permohonan
                </v-card-title>
                <div class="mx-5 mb-5">
                  <span>Apakah Anda yakin akan mengubah status permohonan ini menjadi <span class="font-weight-bold">{{ $t('status.' + statusTarget) }}</span> ?</span>
                  <br>
                  <v-textarea
                    v-if="tempStatus < 0"
                    v-model="note"
                    class="mt-3"
                    outlined
                    :label="$t('errors.field_must_be_filled_reason_reject')"
                    :rules="[rules.required]"
                  />
                </div>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="error"
                    dark
                    @click="confirmDialog = false"
                  >
                    Kembali
                  </v-btn>
                  <v-btn
                    color="success"
                    @click="updateStatus"
                  >
                    Ya, Ubah status!
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>

        <template><!-- Update Status Failed Dialog -->
          <v-row justify="center">
            <v-dialog
              v-model="updateFailedDialog"
              persistent
              max-width="40%"
            >
              <v-card>
                <v-card-title class="text-h5">
                  Ubah Status Gagal!
                </v-card-title>
                <v-card-text>Ada <span>{{ (status == 2 ? unrecommendItemTotal : unfinalizedItemTotal) }}</span> barang yang belum di <span>{{ $t('label.not_approved') }}</span></v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="error"
                    dark
                    @click="updateFailedDialog = false"
                  >
                    Kembali
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>

      </div>

      <div><!-- Agency Identity -->
        <v-row>
          <v-col>
            <span class="green--text text--darken-2 font-weight-bold">Identitas Instansi</span>
          </v-col>
        </v-row>
        <v-card
          outlined
        >
          <v-row>
            <v-col class="mx-3 my-3" cols="12" sm="6" md="6">
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.instance_type') }}</span>
                  <br>
                  <span>{{ vaccineRequest.master_faskes_type.name }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.city_name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.village.kemendagri_kabupaten_nama }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.instance_name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.agency_name }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.select_sub_district_full_name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.village.kemendagri_kecamatan_nama }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.number_phone') }}</span>
                  <br>
                  <span>{{ vaccineRequest.agency_phone_number }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.village') }}</span>
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
              <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.full_address') }}</span>
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
            <span class="green--text text--darken-2 font-weight-bold">Identitas Pemohon</span>
          </v-col>
        </v-row>
        <v-card
          outlined
        >
          <v-row>
            <v-col class="mx-3 my-3" cols="12" sm="6" md="6">
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.name') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_fullname }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.capital_email') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_email }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.applicant_position_identity') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_position }}</span>
                </v-col>
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.applicant_phone') }}</span>
                  <br>
                  <span>{{ vaccineRequest.applicant_primary_phone_number }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mr-2" />
                <v-col class="mr-2">
                  <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.applicant_phone_sub') }}</span>
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
              <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.applicant_ktp') }}</span>
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
            <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.applicant_letter') }}</span>
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
            <span class="green--text text--darken-2 font-weight-bold">Daftar Kebutuhan Vaksin</span>
          </v-col>
        </v-row>
        <v-card outlined>
          <template><!-- Vaccine Product Request Table -->
            <v-simple-table class="mb-3">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th colspan="7" class="text-center green lighten-5">{{ $t('label.request').toUpperCase() }}</th>
                    <th v-if="status >= 2 && status < 4" rowspan="2" class="text-center grey lighten-5">{{ $t('label.remaining_stock_item').toUpperCase() }}</th>
                    <th v-if="status >= 2" colspan="6" class="text-center green lighten-4">{{ $t('label.recommendation').toUpperCase() }}</th>
                    <th v-if="status == 2" rowspan="2" class="text-center grey lighten-5">{{ $t('label.action').toUpperCase() }}</th>
                    <th v-if="status >= 3" colspan="6" class="text-center green lighten-3">{{ $t('label.realization').toUpperCase() }}</th>
                    <th v-if="status == 3" rowspan="2" class="text-center grey lighten-5">{{ $t('label.action').toUpperCase() }}</th>
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
                    <!-- Recommendation Data Section -->
                    <td v-if="status >= 2 && status < 4"><v-btn color="success" dark small @click="getStockItem(item)">Cek Stok</v-btn></td>
                    <td v-if="status >= 2">{{ item.recommendation_product_name || '-' }}</td>
                    <td v-if="status >= 2">{{ item.recommendation_quantity || '-' }}</td>
                    <td v-if="status >= 2">{{ item.recommendation_UoM || '-' }}</td>
                    <td v-if="status >= 2">{{ item.recommendation_date ? $moment.utc(item.recommendation_date).format('DD MMMM YYYY') : '-' }}</td>
                    <td v-if="status >= 2">
                      <span v-if="item.recommendation_status" class="green--text text--darken-2">{{ $t('label.' + item.recommendation_status) }}</span>
                      <span v-else class="text-danger">{{ $t('label.not_approved') }}</span>
                    </td>
                    <td v-if="status >= 2">{{ item.recommendation_by ? item.recommendation_by.name : '-' }}</td>
                    <td v-if="status == 2"><v-btn color="info" dark small @click="updateItem(item)">{{ $t('label.update') }}</v-btn></td>
                    <!-- Final Data Section -->
                    <td v-if="status >= 3">{{ item.finalized_product_name || '-' }}</td>
                    <td v-if="status >= 3">{{ item.finalized_quantity || '-' }}</td>
                    <td v-if="status >= 3">{{ item.finalized_UoM || '-' }}</td>
                    <td v-if="status >= 3">{{ item.finalized_date ? $moment.utc(item.finalized_date).format('DD MMMM YYYY') : '-' }}</td>
                    <td v-if="status >= 3">
                      <span v-if="item.finalized_status" class="green--text text--darken-2">{{ $t('label.' + item.finalized_status) }}</span>
                      <span v-else class="text-danger">{{ $t('label.not_approved') }}</span>
                    </td>
                    <td v-if="status >= 3">{{ item.finalized_by ? item.finalized_by.name : '-' }}</td>
                    <td v-if="status == 3"><v-btn color="info" dark small @click="updateItem(item)">{{ $t('label.update') }}</v-btn></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-pagination
              v-model="vaccineProductRequests.current_page"
              :length="vaccineProductRequests.last_page"
              :total-visible="3"
              class="mb-3"
              @input="onNext"
            />
          </template>

          <template><!-- Stock Dialog -->
            <div class="text-center">
              <v-dialog
                v-model="stockDialog"
                width="70%"
                :persistent="true"
              >
                <v-card>
                  <v-card-title
                    primary-title
                  >
                    {{ $t('label.remaining_stock_item') }}
                  </v-card-title>

                  <v-card-text>
                    <v-data-table
                      :headers="stockheaders"
                      :items="allocationMaterials"
                      :items-per-page="5"
                      :no-data-text="$t('label.no_data')"
                      :loading="loadDataStock"
                      :loading-text="$t('label.loading_data')"
                      :footer-props="{
                        'items-per-page-text':$t('label.stock_data_table')
                      }"
                    />
                  </v-card-text>

                  <v-divider />

                  <v-card-actions>
                    <div style="display: block; margin: 0 auto">
                      <v-btn
                        color="success"
                        @click="closeStockDialog"
                      >
                        {{ $t('label.ok') }}
                      </v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </template>

          <template><!-- Form Update Vaccine Product Request Dialog -->
            <ValidationObserver ref="observer">
              <div class="text-center">
                <v-dialog
                  v-model="formUpdateVaccineProductRequestDialog"
                  width="70%"
                  :persistent="true"
                >
                  <v-card>
                    <v-card-title primary-title>
                      {{ $t('label.update_vaccine_needs_title') }}
                    </v-card-title>
                    <v-divider />
                    <div class="mx-5">
                      <v-row>
                        <v-col cols="3">
                          <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.apd_spec_name') }}</span>
                        </v-col>
                        <v-col>
                          <span>{{ product.product.name }}</span>
                        </v-col>
                      </v-row>
                      <v-row class="mt-n3">
                        <v-col cols="3">
                          <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.total_needs') }}</span>
                        </v-col>
                        <v-col>
                          <span>{{ product.quantity + ' ' + product.unit.unit }}</span>
                        </v-col>
                      </v-row>

                      <div><!-- recommendation field card -->
                        <v-row class="mt-n3">
                          <v-col cols="3" class="mt-2">
                            <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.recommendation_status') }}</span>
                          </v-col>
                          <v-col cols="3">
                            <ValidationProvider
                              v-slot="{ errors }"
                              rules="requiredStatus"
                            >
                              <v-autocomplete
                                v-model="product.recommendation_status"
                                :items="vaccineProductRequestStatusEnum"
                                dense
                                solo
                                :readonly="status == 3"
                                :error-messages="errors"
                                @change="setAllocationMaterial"
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-card
                          v-if="!hideRecommendationField"
                          class="mt-n7 py-3 px-3"
                          outlined
                        >
                          <v-row
                            v-if="!hideRecommendationField"
                          >
                            <v-col cols="3" :class="status == 2 ? 'mt-2' : 'mb-5'">
                              <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.recommendation_item') }}</span>
                            </v-col>
                            <v-col v-if="status == 2" cols="7">
                              <ValidationProvider
                                v-slot="{ errors }"
                                rules="required"
                                :name="$t('label.recommendation_item')"
                              >
                                <v-autocomplete
                                  v-model="product.recommendation_product_id"
                                  :items="allocationMaterials"
                                  dense
                                  solo
                                  :error-messages="errors"
                                  :no-data-text="loadDataStock ? $t('label.loading_data') : $t('label.no_data')"
                                  @change="setUnit(product.recommendation_product_id, 'recommendation')"
                                />
                              </ValidationProvider>
                            </v-col>
                            <v-col v-else>
                              <span>{{ product.recommendation_product_name }}</span>
                            </v-col>
                          </v-row>
                          <v-row class="mt-n5">
                            <v-col cols="3">
                              <ValidationProvider
                                v-slot="{ errors }"
                                rules="required"
                                :name="$t('label.recommendation_amount')"
                              >
                                <v-text-field
                                  v-model="product.recommendation_quantity"
                                  :label="$t('label.recommendation_amount')"
                                  outlined
                                  dense
                                  :error-messages="errors"
                                  :readonly="status == 3"
                                />
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="2">
                              <ValidationProvider
                                v-slot="{ errors }"
                                rules="required"
                                :name="$t('label.item_unit')"
                              >
                                <v-text-field
                                  v-model="product.recommendation_UoM"
                                  :label="$t('label.item_unit')"
                                  outlined
                                  dense
                                  readonly
                                  :error-messages="errors"
                                />
                              </ValidationProvider>
                            </v-col>
                            <v-col v-if="status == 2" cols="2">
                              <v-btn class="mt-2" color="success" dark small @click="getStockItem(product)">{{ $t('label.check_stock') }}</v-btn>
                            </v-col>
                          </v-row>
                          <v-row class="mt-n8">
                            <v-col cols="3">
                              <span class="green--text text--darken-2 font-weight-bold">Tanggal Rekomendasi</span>
                            </v-col>
                          </v-row>
                          <v-row class="mt-n5">
                            <v-col
                              v-if="status == 2"
                              cols="4"
                            >
                              <date-picker-input
                                :value="product.recommendation_date"
                                @selected="changeRecommendationDate"
                              />
                            </v-col>
                            <v-col
                              v-else
                              cols="4"
                            >
                              <span>{{ product.recommendation_date ? $moment.utc(product.recommendation_date).format('DD MMMM YYYY') : '-' }}</span>
                            </v-col>
                          </v-row>
                        </v-card>
                      </div>
                      <!-- finalized field card -->
                      <div v-if="status == 3" class="mt-3">
                        <v-row>
                          <v-col cols="3" class="mt-2">
                            <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.realization_status') }}</span>
                          </v-col>
                          <v-col cols="3">
                            <ValidationProvider
                              v-slot="{ errors }"
                              rules="required"
                              :name="$t('label.realization_status')"
                            >
                              <v-autocomplete
                                v-model="product.finalized_status"
                                :items="vaccineProductRequestStatusEnum"
                                dense
                                solo
                                :readonly="status == 4"
                                :error-messages="errors"
                                @change="setAllocationMaterial"
                              />
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                        <v-card
                          v-if="!hideFinalizedField"
                          class="mt-n7 py-3 px-3"
                          outlined
                        >
                          <v-row
                            v-if="!hideFinalizedField"
                          >
                            <v-col cols="3" class="mt-2">
                              <span class="green--text text--darken-2 font-weight-bold">{{ $t('label.realization_item') }}</span>
                            </v-col>
                            <v-col cols="7">
                              <ValidationProvider
                                v-slot="{ errors }"
                                rules="required"
                                :name="$t('label.realization_item')"
                              >
                                <v-autocomplete
                                  v-model="product.finalized_product_id"
                                  :items="allocationMaterials"
                                  dense
                                  solo
                                  :readonly="status == 4"
                                  :error-messages="errors"
                                  :no-data-text="loadDataStock ? $t('label.loading_data') : $t('label.no_data')"
                                  @change="setUnit(product.finalized_product_id, 'final')"
                                />
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row class="mt-n5">
                            <v-col cols="3">
                              <ValidationProvider
                                v-slot="{ errors }"
                                rules="required"
                                :name="$t('label.realization_amount')"
                              >
                                <v-text-field
                                  v-model="product.finalized_quantity"
                                  :label="$t('label.realization_amount')"
                                  outlined
                                  dense
                                  :error-messages="errors"
                                  :readonly="status == 4"
                                />
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="2">
                              <ValidationProvider
                                v-slot="{ errors }"
                                rules="required"
                                :name="$t('label.item_unit')"
                              >
                                <v-text-field
                                  v-model="product.finalized_UoM"
                                  :label="$t('label.item_unit')"
                                  outlined
                                  dense
                                  readonly
                                  :error-messages="errors"
                                />
                              </ValidationProvider>
                            </v-col>
                            <v-col v-if="status == 3" cols="2">
                              <v-btn class="mt-2" color="success" dark small @click="getStockItem(product)">{{ $t('label.check_stock') }}</v-btn>
                            </v-col>
                          </v-row>
                          <v-row class="mt-n8">
                            <v-col cols="3">
                              <span class="green--text text--darken-2 font-weight-bold">Tanggal Realisasi</span>
                            </v-col>
                          </v-row>
                          <v-row class="mt-n5">
                            <v-col
                              v-if="status == 3"
                              cols="4"
                            >
                              <date-picker-input
                                :value="product.finalized_date"
                                @selected="changeFinalizedDate"
                              />
                            </v-col>
                            <v-col
                              v-else
                              cols="4"
                            >
                              <span>{{ product.finalized_date ? $moment.utc(product.finalized_date).format('DD MMMM YYYY') : '-' }}</span>
                            </v-col>
                          </v-row>
                        </v-card>
                      </div>
                    </div>
                    <v-divider />
                    <v-card-actions>
                      <div style="display: block; margin: 0 auto">
                        <v-btn
                          class="mx-3 my-3"
                          color="error"
                          @click="cancelUpdateItem"
                        >
                          {{ $t('label.cancel') }}
                        </v-btn>
                        <v-btn
                          class="mx-3 my-3"
                          color="success"
                          @click="updateVaccineProductRequest"
                        >
                          {{ $t('label.update') }}
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </ValidationObserver>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'ListDetailPermohonanVaksin',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      status: 1,
      statusTarget: 'not_verified',
      noImage: './img/noimage.gif',
      confirmDialog: false,
      updateFailedDialog: false,
      stockDialog: false,
      formUpdateVaccineProductRequestDialog: false,
      tempStatus: null,
      unrecommendItemTotal: 0,
      unfinalizedItemTotal: 0,
      note: null,
      rules: {
        required: v => !!v || 'Tidak boleh kosong'
      },
      listQuery: {
        page: 1,
        limit: 3,
        vaccine_request_id: null
      },
      stockheaders: [
        { text: this.$t('label.apd_id_specification').toUpperCase(), align: 'start', sortable: false, value: 'material_id' },
        { text: this.$t('label.apd_name_spec').toUpperCase(), align: 'start', sortable: false, value: 'material_name' },
        { text: this.$t('label.location_stock').toUpperCase(), sortable: false, value: 'soh_location_name' },
        { text: this.$t('label.remaining_stock').toUpperCase(), sortable: false, align: 'right', value: 'current_stock_formatted' },
        { text: this.$t('label.unit').toUpperCase(), sortable: false, value: 'uom' }
      ],
      product: {
        id: null,
        product_id: null,
        quantity: null,
        product: {
          name: null,
          material_group: null
        },
        unit: {
          unit: null
        },
        recommendation_product_id: null,
        recommendation_product_name: null,
        recommendation_quantity: 0,
        recommendation_UoM: null,
        recommendation_date: null,
        recommendation_status: null,
        recommendation_by: null,
        finalized_product_id: null,
        finalized_product_name: null,
        finalized_quantity: 0,
        finalized_UoM: null,
        finalized_date: null,
        finalized_status: null,
        finalized_by: null
      },
      vaccineProductRequestStatusEnum: [
        {
          text: this.$t('label.approved_item'),
          value: 'approved'
        },
        {
          text: this.$t('label.not_available'),
          value: 'not_available'
        },
        {
          text: this.$t('label.replaced'),
          value: 'replaced'
        },
        {
          text: this.$t('label.not_yet_fulfilled'),
          value: 'not_yet_fulfilled'
        }
      ],
      hideRecommendationField: true,
      hideFinalizedField: true,
      loading: false
    }
  },
  computed: {
    ...mapGetters('vaccine', [
      'vaccineRequest',
      'vaccineProductRequests',
      'listRealization',
      'totalListRealization',
      'totalDataRealization',
      'allocationMaterials',
      'loadDataStock'
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
      this.loading = true
      await this.$store.dispatch('vaccine/getVaccineProductRequests', this.listQuery)

      // Count Vaccine Product List that need to be review first
      this.unrecommendItemTotal = 0
      this.unfinalizedItemTotal = 0
      for (let i = 0; i < this.vaccineProductRequests.data.length; i++) {
        const item = this.vaccineProductRequests.data[i]
        if (!item.recommendation_status) {
          this.unrecommendItemTotal++
        }
        if (!item.finalized_status) {
          this.unfinalizedItemTotal++
        }
      }
      this.loading = false
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
    getStatus(status) {
      let statusLabel = 'not_verified'
      switch (status) {
        case -2:
          statusLabel = 'approval_rejected'
          break
        case -1:
          statusLabel = 'verification_rejected'
          break
        case 1:
          statusLabel = 'not_verified'
          break
        case 2:
          statusLabel = 'verified'
          break
        case 3:
          statusLabel = 'approved'
          break
        case 4:
          statusLabel = 'finalized'
          break
        default:
          statusLabel = 'not_verified'
      }
      return statusLabel
    },
    showConfirmDialog(status) {
      this.tempStatus = status
      this.statusTarget = this.getStatus(status)
      this.confirmDialog = true
    },
    async updateStatus() {
      if (this.tempStatus < 0 && !this.note) {
        return false
      }

      if (this.status > 1 && this.cannotUpdate()) {
        this.confirmDialog = false
        this.updateFailedDialog = true
        return false
      }

      const status = this.tempStatus
      const params = {
        id: this.vaccineRequest.id,
        status: this.getStatus(status),
        note: this.note
      }
      const response = await this.$store.dispatch('vaccine/updateVaccineRequestStatus', params)
      if (response.status === 200) {
        await this.getVaccineRequestById()
      }
      this.confirmDialog = false
    },
    cannotUpdate() {
      let result = false
      if (this.tempStatus > 1) {
        result = this.unrecommendItemTotal > 0
        if (this.status === 3) {
          result = this.unfinalizedItemTotal > 0
        }
      }
      return result
    },
    getStockItem(item) {
      this.stockDialog = true
      this.getStock(item)
    },
    async getStock(item) {
      const param = {
        matg_id: await item.product.material_group,
        is_paginated: 0
      }
      await this.$store.dispatch('vaccine/getStock', param)
    },
    updateItem(item) {
      this.sethideRecommendationField(item.recommendation_status)
      this.sethideFinalizedField(item.finalized_status)
      this.formUpdateVaccineProductRequestDialog = true
      this.product = item
    },
    async cancelUpdateItem() {
      this.formUpdateVaccineProductRequestDialog = false
      await this.getVaccineProductRequests()
    },
    closeStockDialog() {
      this.clearStock(true)
      this.stockDialog = false
    },
    async clearStock(value) {
      const param = {
        id: await value
      }
      await this.$store.dispatch('vaccine/clearStock', param)
    },
    async setAllocationMaterial(val) {
      this.loading = true
      let param = {
        is_paginated: 0
      }
      if (this.status === 2) {
        this.sethideRecommendationField(val)
      } else {
        this.sethideFinalizedField(val)
      }
      if (val === 'approved') {
        param = {
          matg_id: this.product.product.material_group,
          is_paginated: 0
        }
        await this.getAllocationMaterial(param)
      } else if (val === 'replaced') {
        await this.getAllocationMaterial(param)
      }
      this.loading = false
    },
    async getAllocationMaterial(param) {
      this.loading = true
      await this.$store.dispatch('vaccine/getStock', param)
      this.allocationMaterials.forEach(element => {
        element.value = element.material_id
        element.text = '(' + element.material_id + ') ' + element.material_name
      })
      this.loading = false
    },
    setUnit(id, phase) {
      this.allocationMaterials.forEach(element => {
        if (id === element.material_id) {
          if (phase === 'recommendation') {
            this.product.recommendation_product_name = element.material_name
            this.product.recommendation_UoM = element.UoM
          } else {
            this.product.finalized_product_name = element.material_name
            this.product.finalized_UoM = element.UoM
          }
          return false
        }
      })
    },
    changeRecommendationDate(value) {
      this.product.recommendation_date = value
    },
    changeFinalizedDate(value) {
      this.product.finalized_date = value
    },
    async updateVaccineProductRequest() {
      this.loading = true
      const param = {
        id: this.product.id,
        recommendation_product_id: this.product.recommendation_product_id,
        recommendation_product_name: this.product.recommendation_product_name,
        recommendation_quantity: this.product.recommendation_quantity,
        recommendation_UoM: this.product.recommendation_UoM,
        recommendation_date: this.product.recommendation_date,
        recommendation_status: this.product.recommendation_status,
        finalized_product_id: this.product.finalized_product_id,
        finalized_product_name: this.product.finalized_product_name,
        finalized_quantity: this.product.finalized_quantity,
        finalized_UoM: this.product.finalized_UoM,
        finalized_date: this.product.finalized_date,
        finalized_status: this.product.finalized_status
      }

      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.isLoading = false
        return
      }

      const response = await this.$store.dispatch('vaccine/updateVaccineProductRequest', param)
      if (response.status === 200) {
        await this.getVaccineProductRequests()
        this.formUpdateVaccineProductRequestDialog = false
      }
      this.loading = false
    },
    sethideRecommendationField(value) {
      this.hideRecommendationField = true
      if (value === 'approved' || value === 'replaced') {
        this.hideRecommendationField = false
      }
    },
    sethideFinalizedField(value) {
      this.hideFinalizedField = true
      if (value === 'approved' || value === 'replaced') {
        this.hideFinalizedField = false
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
<style scoped>
  .v-autocomplete {
    font-size: 1em;
  }

  .date-picker-input {
    font-size: 1em
  }
</style>
