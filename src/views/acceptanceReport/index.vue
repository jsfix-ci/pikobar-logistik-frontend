<template>
  <div class="background-landing-page">
    <div class="full-landing-page">
      <div class="header-landing-page">
        <v-row align="center">
          <v-col cols="12" md="9" xs="12">
            <v-row>
              <img height="40" src="../../static/logistik_logo_lingkar.svg">
              <div class="title-page-landing-page">{{ $t('label.logistics_medical_device') }}</div>
            </v-row>
          </v-col>
          <v-col cols="12" md="3" xs="12" style="padding-top: 20px">
            <v-row class="float-right-landing-page">
              <a :href="$t('label.link_tutorial')" target="_blank"><div class="tutorial-class pusat-bantuan-landing-page landing-page-guide">{{ $t('label.tutorial') }} </div></a>
              <a :href="$t('label.link_tutorial')" target="_blank"><img height="25" src="../../static/icon_book-outline.png"></a>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="negative-landing-page">
      <v-card class="main-card-landing-page" outlined>
        <div class="back">
          <span>
            <a href="#/landing-page">
              <img class="back-image" width="15px" src="../../static/back_icon.png">
            </a>
            <span class="back-text">{{ $t('label.back') }}</span>
          </span>
        </div>
        <v-row class="bg-yellow-pastel">
          <v-col sm="12" md="8" class="left-side">
            <div class="title">
              <h3>{{ $t('label.form') }} <span class="logistic">{{ $t('label.logistic_acceptance_report_header').toLowerCase() }}</span> {{ $t('label.logistik_covid') }}</h3>
            </div>
            <div class="body-text">
              <p>{{ $t('label.logistic_acceptance_report_subheader') }}</p>
            </div>
          </v-col>
          <v-col sm="12" md="4">
            <img src="../../static/logistic_acceptance_report.png" class="display-image-right">
          </v-col>
        </v-row>
        <v-row>
          <div v-if="!showVerificationForm && !acceptanceLogisticFormShow" class="form mt-10 col-sm-6 offset-md-3">
            <ValidationObserver ref="observer">
              <v-label><b>{{ $t('label.applicant_code') }}</b></v-label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredApplicantCode"
              >
                <v-text-field
                  v-model="listQuery.register_id"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                  :placeholder="$t('label.applicant_code_placeholder')"
                  @keyup.enter.native="findApplicantCode"
                />
              </ValidationProvider>
              <div class="button-action">
                <div class="body-text">
                  <p>{{ $t('label.logistic_acceptance_report_applicant_find_description') }}<a href="#/landing-page">{{ landingPage }}</a></p>
                </div>
                <v-btn class="button-style" min-width="150px" color="success" @click="findApplicantCode">{{ $t('label.tracking_cek') + ' ' + $t('label.applicant_code') }} <img src="../../static/arrow-right.png" alt=""></v-btn>
              </div>
            </ValidationObserver>
          </div>
          <!-- Form Verification -->
          <div v-if="showVerificationForm && !acceptanceLogisticFormShow" class="form mt-10 col-sm-6 offset-md-3">
            <ValidationObserver ref="observer2">
              <v-form ref="form">
                <v-label><b>{{ $t('label.verification_code') }}</b></v-label>
                <div class="body-text">
                  <p class="grey--text">{{ $t('label.verification_code_description') }}</p>
                </div>
                <v-row class="body-text">
                  <v-col class="col-sm-2">
                    <img src="../../static/carbon_email.png" alt="">
                  </v-col>
                  <v-col class="col-sm-6">
                    {{ $t('label.acceptance_report.already_sent_code_to_email') }} <span class="blue--text"><b><u>{{ email }}</u></b></span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2" md="2">
                    <ValidationProvider
                      rules="requiredApplicantCode"
                    >
                      <v-text-field
                        v-model="listQuery.verification_code1"
                        outlined
                        solo-inverted
                        maxlength="1"
                        @change="verCode"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="2" md="2">
                    <ValidationProvider
                      rules="requiredApplicantCode"
                    >
                      <v-text-field
                        v-model="listQuery.verification_code2"
                        outlined
                        solo-inverted
                        maxlength="1"
                        @change="verCode"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="2" md="2">
                    <ValidationProvider
                      rules="requiredApplicantCode"
                    >
                      <v-text-field
                        v-model="listQuery.verification_code3"
                        outlined
                        solo-inverted
                        maxlength="1"
                        @change="verCode"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="2" md="2">
                    <ValidationProvider
                      rules="requiredApplicantCode"
                    >
                      <v-text-field
                        v-model="listQuery.verification_code4"
                        outlined
                        solo-inverted
                        maxlength="1"
                        @change="verCode"
                      />
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="2" md="2">
                    <ValidationProvider
                      rules="requiredApplicantCode"
                    >
                      <v-text-field
                        v-model="listQuery.verification_code5"
                        outlined
                        solo-inverted
                        maxlength="1"
                        @change="verCode"
                      />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <div class="button-action">
                  <v-btn v-if="verCodeComplete" class="button-style" min-width="150px" color="success" @click="confirmVerCode">{{ $t('label.continue') }}</v-btn>
                  <v-btn v-else class="button-style" min-width="150px" color="success" disabled>{{ $t('label.continue') }}</v-btn>
                  <a class="button-style green--text" min-width="150px" @click="resendCode">{{ $t('label.resend_verification_code') }}</a>
                </div>
              </v-form>
            </ValidationObserver>
          </div>
          <div v-if="showVerificationForm && acceptanceLogisticFormShow"><!-- Form Acceptance Logistic Report -->
            <ValidationObserver ref="observer3">
              <div id="form-body">
                <div><!-- Informasi Penerima Barang -->
                  <v-row id="form-title">
                    <v-col sm="12" md="8" class="left-side">
                      <div class="title">
                        <h3><span class="logistic">{{ $t('label.acceptance_report.logistic_acceptance_report_title') }}</span></h3>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.fullname') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <div class="body-text">
                        <p class="grey--text">{{ $t('label.acceptance_report.fullname_description') }}</p>
                      </div>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="acceptanceReportFullName"
                      >
                        <v-text-field
                          v-model="recipient.fullname"
                          outlined
                          solo-inverted
                          placeholder="Masukan Nama Penerima"
                          :error-messages="errors"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.position') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="acceptanceReportPosition"
                      >
                        <v-text-field
                          v-model="recipient.position"
                          outlined
                          solo-inverted
                          placeholder="Masukan Jabatan"
                          :error-messages="errors"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.phone') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="acceptanceReportPhone|isPhoneNumber"
                      >
                        <v-text-field
                          v-model="recipient.phone"
                          outlined
                          solo-inverted
                          placeholder="Masukkan Nomor Telepon"
                          :error-messages="errors"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.date') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <date-picker-input
                        :value="recipient.date"
                        @selected="changeDate"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.proof_pic') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <div class="body-text">
                        <p class="grey--text">{{ $t('label.acceptance_report.upload_description') }}<br>{{ $t('label.acceptance_report.upload_description_type') }}</p>
                      </div>
                      <v-btn class="button-style" small color="success" @click="addProofPicDialogShow">{{ $t('label.add_file') }}</v-btn>
                    </v-col>
                    <v-col v-if="proofPicRequiredError" cols="12">
                      <v-alert type="error">{{ $t('label.acceptance_report.error.proof_pic') }}</v-alert>
                    </v-col>
                  </v-row>
                  <v-row v-for="(val, index) in recipient.proof_pic" :key="'pic' + index">
                    <v-col cols="7" class="left-side">
                      <v-alert v-if="index === 0" dense outlined text max-height="30px">
                        <v-row align="center" style="margin-top:-18px">
                          <v-col class="grow">{{ val.name.length > 25 ? val.name.substring(0, 25) + '...' : val.name }}</v-col>
                          <v-col class="shrink">
                            <v-icon @click="deleteDataProofPic(index)">mdi-close-circle</v-icon>
                          </v-col>
                        </v-row>
                      </v-alert>
                      <v-alert v-else dense outlined text max-height="30px" style="margin-top:-30px">
                        <v-row align="center" style="margin-top:-18px">
                          <v-col class="grow">{{ val.name.length > 25 ? val.name.substring(0, 25) + '...' : val.name }}</v-col>
                          <v-col class="shrink">
                            <v-icon @click="deleteDataProofPic(index)">mdi-close-circle</v-icon>
                          </v-col>
                        </v-row>
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-dialog
                      v-model="dialogProofPic"
                      max-width="50%"
                    >
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ $t('label.acceptance_report.dialog_title.proof_pic') }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <ValidationObserver ref="uploadDialog">
                                  <ValidationProvider
                                    v-slot="{ errors }"
                                    rules="acceptanceReportProofPic"
                                  >
                                    <v-file-input
                                      v-model="selectedFile"
                                      counter
                                      :error-messages="errors"
                                      placeholder="Klik untuk upload..."
                                      prepend-icon="mdi-camera"
                                      accept="image/png, image/jpg"
                                      outlined
                                      show-size
                                    >
                                      <template v-slot:selection="{ text }">
                                        <v-chip
                                          label
                                          small
                                        >
                                          {{ text }}
                                        </v-chip>
                                      </template>
                                    </v-file-input>
                                  </ValidationProvider>
                                </ValidationObserver>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn class="button-style" outlined text @click="closeProofPic">{{ $t('label.cancel') }}</v-btn>
                          <v-btn class="button-style" min-width="150px" color="success" @click="saveProofPic">{{ $t('label.edit') }}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.officer_fullname') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <div class="body-text">
                        <p class="grey--text">{{ $t('label.acceptance_report.officer_fullname_description') }}</p>
                      </div>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="acceptanceReportOfficerFullname"
                      >
                        <v-text-field
                          v-model="recipient.officer_fullname"
                          outlined
                          solo-inverted
                          placeholder="Masukkan Nama Petugas"
                          :error-messages="errors"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </div><!-- End Informasi Penerima Barang -->
                <div><!-- Detail Informasi Penerimaan Barang -->
                  <v-row id="form-title">
                    <v-col cols="12" sm="12" md="12" class="left-side">
                      <div class="title">
                        <h3><span class="logistic">{{ $t('label.acceptance_report.items_title') }}</span></h3>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <template>
                      <v-data-table
                        :headers="headers"
                        :items="recipient.items"
                        sort-by="name"
                        class="elevation-1"
                        color="success"
                        :footer-props="{
                          'items-per-page-options':[3, 10, 50, 100],
                          'itemsPerPageText': 'Tampilkan'
                        }"
                        :items-per-page="3"
                      >
                        <template v-slot:top>
                          <v-toolbar
                            flat
                          >
                            <v-toolbar-title><span class="text-green">{{ $t('label.acceptance_report.items_table_title') }}</span></v-toolbar-title>
                            <v-dialog
                              v-model="dialog"
                              max-width="50%"
                            >
                              <v-card>
                                <v-card-title>
                                  <span class="headline">{{ $t('label.acceptance_report.dialog_title.items') }}</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                      >
                                        <v-text-field
                                          v-model="editedItem.name"
                                          label="Nama Barang/Item"
                                          disabled
                                          dense
                                          outlined
                                        />
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                      >
                                        <v-text-field
                                          v-model="editedItem.qty"
                                          label="Jumlah Barang"
                                          disabled
                                          dense
                                          outlined
                                        />
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                      >
                                        <v-text-field
                                          v-model="editedItem.qty_ok"
                                          label="Jmlh Barang Sesuai"
                                          type="number"
                                          dense
                                          outlined
                                          @input="setQtyNok(editedItem.qty_ok)"
                                        />
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                      >
                                        <v-text-field
                                          v-model="editedItem.qty_nok"
                                          label="Jmlh Barang Tdk Sesuai"
                                          type="number"
                                          dense
                                          outlined
                                          @input="setQtyOk(editedItem.qty_nok)"
                                        />
                                      </v-col>
                                      <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                      >
                                        <v-select
                                          v-model="editedItem.quality"
                                          :items="qualityList"
                                          label="Kualitas/Mutu"
                                          dense
                                          outlined
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>

                                <v-card-actions>
                                  <v-spacer />
                                  <v-btn class="button-style" outlined text @click="close">{{ $t('label.cancel') }}</v-btn>
                                  <v-btn class="button-style" min-width="150px" color="success" @click="save">{{ $t('label.edit') }}</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-btn small @click="editItem(item)">
                            <v-icon small class="mr-2">mdi-pencil</v-icon>
                            {{ $t('label.edit') }}
                          </v-btn>
                        </template>
                        <template v-slot:[`footer.page-text`]="props">
                          {{ $t('label.acceptance_report.table_footer_page_text') + props.itemsLength }}
                        </template>
                      </v-data-table>
                    </template>
                    <v-col v-if="itemsRequiredError" cols="12">
                      <v-alert type="error">{{ $t('label.acceptance_report.error.item_proof') }}</v-alert>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.bast_proof') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <div class="body-text">
                        <p class="grey--text">Ukuran maksimal tiap satu file adalah 5 Mb.<br>File yang didukung adalah .jpg dan .png</p>
                      </div>
                      <v-btn class="button-style" small color="success" @click="addBastProofDialogShow">Tambah File +</v-btn>
                    </v-col>
                    <v-col v-if="bastProofRequiredError" cols="12">
                      <v-alert type="error">Belum ada file Foto BAST yang diupload</v-alert>
                    </v-col>
                  </v-row>
                  <v-row v-for="(val, index) in recipient.bast_proof" :key="'bast' + index">
                    <v-col cols="7" class="left-side">
                      <v-alert v-if="index === 0" dense outlined text max-height="30px">
                        <v-row align="center" style="margin-top:-18px">
                          <v-col class="grow">{{ val.name.length > 25 ? val.name.substring(0, 25) + '...' : val.name }}</v-col>
                          <v-col class="shrink">
                            <v-icon @click="deleteDataBastProof(index)">mdi-close-circle</v-icon>
                          </v-col>
                        </v-row>
                      </v-alert>
                      <v-alert v-else dense outlined text max-height="30px" style="margin-top:-30px">
                        <v-row align="center" style="margin-top:-18px">
                          <v-col class="grow">{{ val.name.length > 25 ? val.name.substring(0, 25) + '...' : val.name }}</v-col>
                          <v-col class="shrink">
                            <v-icon @click="deleteDataBastProof(index)">mdi-close-circle</v-icon>
                          </v-col>
                        </v-row>
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-dialog
                      v-model="dialogBastProof"
                      max-width="50%"
                    >
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah file Foto BAST</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <ValidationObserver ref="uploadDialog">
                                  <ValidationProvider
                                    v-slot="{ errors }"
                                    rules="acceptanceReportBastProof"
                                  >
                                    <v-file-input
                                      v-model="selectedFile"
                                      counter
                                      :error-messages="errors"
                                      placeholder="Klik untuk upload..."
                                      prepend-icon="mdi-camera"
                                      accept="image/png, image/jpg"
                                      outlined
                                      show-size
                                    >
                                      <template v-slot:selection="{ text }">
                                        <v-chip
                                          label
                                          small
                                        >
                                          {{ text }}
                                        </v-chip>
                                      </template>
                                    </v-file-input>
                                  </ValidationProvider>
                                </ValidationObserver>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn class="button-style" outlined text @click="closeBastProof">{{ $t('label.cancel') }}</v-btn>
                          <v-btn class="button-style" min-width="150px" color="success" @click="saveBastProof">{{ $t('label.edit') }}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>Foto Barang yang Diterima</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
                      <div class="body-text">
                        <p class="grey--text">Ukuran maksimal tiap satu file adalah 5 Mb.<br>File yang didukung adalah .jpg dan .png</p>
                      </div>
                      <v-btn class="button-style" small color="success" @click="addItemProofDialogShow">Tambah File +</v-btn>
                    </v-col>
                    <v-col v-if="itemProofRequiredError" cols="12">
                      <v-alert type="error">Belum ada file Foto Barang yang diupload</v-alert>
                    </v-col>
                  </v-row>
                  <v-row v-for="(val, index) in recipient.item_proof" :key="'item' + index">
                    <v-col cols="7" class="left-side">
                      <v-alert v-if="index === 0" dense outlined text max-height="30px">
                        <v-row align="center" style="margin-top:-18px">
                          <v-col class="grow">{{ val.name.length > 25 ? val.name.substring(0, 25) + '...' : val.name }}</v-col>
                          <v-col class="shrink">
                            <v-icon @click="deleteDataItemProof(index)">mdi-close-circle</v-icon>
                          </v-col>
                        </v-row>
                      </v-alert>
                      <v-alert v-else dense outlined text max-height="30px" style="margin-top:-30px">
                        <v-row align="center" style="margin-top:-18px">
                          <v-col class="grow">{{ val.name.length > 25 ? val.name.substring(0, 25) + '...' : val.name }}</v-col>
                          <v-col class="shrink">
                            <v-icon @click="deleteDataItemProof(index)">mdi-close-circle</v-icon>
                          </v-col>
                        </v-row>
                      </v-alert>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-dialog
                      v-model="dialogItemProof"
                      max-width="50%"
                    >
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah Foto Barang yang Diterima</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="6"
                              >
                                <ValidationObserver ref="uploadDialog">
                                  <ValidationProvider
                                    v-slot="{ errors }"
                                    rules="acceptanceReportItemProof"
                                  >
                                    <v-file-input
                                      v-model="selectedFile"
                                      counter
                                      label="Foto bukti bisa lebih dari satu"
                                      :error-messages="errors"
                                      placeholder="Klik untuk upload..."
                                      prepend-icon="mdi-camera"
                                      accept="image/png, image/jpg"
                                      outlined
                                      show-size
                                    >
                                      <template v-slot:selection="{ text }">
                                        <v-chip
                                          label
                                          small
                                        >
                                          {{ text }}
                                        </v-chip>
                                      </template>
                                    </v-file-input>
                                  </ValidationProvider>
                                </ValidationObserver>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn class="button-style" outlined text @click="closeItemProof">{{ $t('label.cancel') }}</v-btn>
                          <v-btn class="button-style" min-width="150px" color="success" @click="saveItemProof">{{ $t('label.edit') }}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  <v-row>
                    <v-col sm="12" md="8" class="left-side">
                      <v-label><b>{{ $t('label.acceptance_report.note') }}</b></v-label>
                      <v-textarea
                        v-model="recipient.note"
                        outlined
                        solo-inverted
                        placeholder="Tambahkan catatan lainnya..."
                      />
                    </v-col>
                  </v-row>
                </div>
                <!-- End Detail Informasi Penerimaan Barang -->
              </div>
              <div class="button-action text-right">
                <v-btn class="button-style" outlined text>{{ $t('label.cancel') }}</v-btn>
                <v-btn class="button-style" min-width="150px" color="success" @click="saveRecipient">Selesai</v-btn>
                <v-btn v-if="isLocalhost" class="button-style" min-width="150px" color="success" @click="defaultValueForm">Isi Form Default</v-btn>
              </div>
            </ValidationObserver>
          </div><!-- End Form Acceptance Logistic Report -->
        </v-row>
      </v-card>
      <div class="text-card-main"><!-- footer -->
        <v-row style="margin-top: -20px">
          <v-col cols="6" md="6">
            <img class="landing-page-logo-jds" src="../../static/jds-logo.png">
          </v-col>
          <v-col cols="6" md="6">
            <div class="copyright">
              <p>
                <span>{{ $t('label.copyright') }}</span>
                <span> &copy; </span>
                <span>{{ $t('label.year') }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div> <!-- end footer -->
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'AcceptanceReport',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      isLocalhost: false,
      id: null,
      listQuery: {
        register_id: null,
        verification_code1: null,
        verification_code2: null,
        verification_code3: null,
        verification_code4: null,
        verification_code5: null
      },
      landingPage: location.host + '/#/landing-page',
      nextPage: location.host,
      showVerificationForm: false,
      email: null,
      verCodeComplete: false,
      acceptanceLogisticFormShow: false,
      listQueryTable: {
        page: 1,
        limit: 3
      },
      qualityList: [
        'Dapat Dipakai',
        'Tidak Dapat Dipakai'
      ],
      recipient: {
        fullname: null,
        position: null,
        phone: null,
        date: null,
        officer_fullname: null,
        items: [],
        proof_pic: [],
        bast_proof: [],
        item_proof: [],
        note: null,
        selectedFile: null
      },
      selectedFile: null,
      PicProofId: 0,
      ItemProofId: 0,
      bastProofId: 0,
      dialogProofPic: false,
      dialogBastProof: false,
      dialogItemProof: false,
      itemsRequiredError: false,
      proofPicRequiredError: false,
      bastProofRequiredError: false,
      itemProofRequiredError: false,
      isValid: false,
      /** Data Tabel Barang */
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Nama Barang/Item', align: 'start', value: 'name', class: 'success white--text' },
        { text: 'Jumlah Barang', align: 'center', value: 'qty', class: 'success white--text' },
        { text: 'Satuan', align: 'center', value: 'unit', class: 'success white--text' },
        { text: 'Jmlh Barang Sesuai', align: 'center', value: 'qty_ok', class: 'success white--text' },
        { text: 'Jmlh Barang Tdk Sesuai', align: 'center', value: 'qty_nok', class: 'success white--text' },
        { text: 'Kualitas Mutu', value: 'quality', class: 'success white--text' },
        { text: 'Aksi', align: 'center', value: 'actions', sortable: false, class: 'success white--text' }
      ],
      options: {
        itemsPerPage: 3
      },
      editedIndex: -1,
      editedItem: {
        product_id: '',
        name: '',
        qty: 0,
        unit: 'PCS',
        qty_ok: 0,
        qty_nok: 0,
        quality: ''
      },
      defaultItem: {
        product_id: '',
        name: '',
        qty: 0,
        unit: 'PCS',
        qty_ok: 0,
        qty_nok: 0,
        quality: ''
      }
    }
  },
  computed: {
    // CRUD Table
    ...mapGetters('logistics', [
      'detailLogisticRequest',
      'listLogisticRequest',
      'totalListLogisticRequest',
      'totalDataLogisticRequest'
    ])
  },
  // CRUD Table
  watch: {
    dialogItemProof(val) {
      val || this.close()
    },
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },
  // CRUD Table
  methods: {
    // CRUD Table Method
    editItem(item) {
      this.editedIndex = this.recipient.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (this.editedItem.qty_ok === undefined || this.editedItem.qty_ok === 0) {
        this.editedItem.qty_ok = this.editedItem.qty
        this.editedItem.qty_nok = this.editedItem.qty - this.editedItem.qty_ok
      }
      this.editedItem.quality = this.editedItem.quality === '' ? this.qualityList[0] : this.editedItem.quality
      this.dialog = true
    },
    setQtyOk(qty) {
      this.editedItem.qty_ok = this.editedItem.qty - qty
    },
    setQtyNok(qty) {
      this.editedItem.qty_nok = this.editedItem.qty - qty
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      Object.assign(this.recipient.items[this.editedIndex], this.editedItem)
      this.itemsRequiredError = false
      this.recipient.items.forEach(item => {
        if (item.quality === undefined) {
          this.itemsRequiredError = true
        }
      })
      this.close()
    },
    // End CRUD Table Method
    async findApplicantCode() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      const response = await this.$store.dispatch('logistics/postRegisterVerification', this.listQuery)
      if (response.status === 200) {
        this.id = response.data.agency_id
        this.email = response.data.email
        this.showVerificationForm = true
      }
    },
    async verCode() {
      this.verCodeComplete = false
      const valid = await this.$refs.observer2.validate()
      if (!valid) {
        return
      }
      this.verCodeComplete = true
    },
    async confirmVerCode() {
      this.acceptanceLogisticFormShow = false
      const response = await this.$store.dispatch('logistics/postConfirmVerificationCode', this.listQuery)
      if (response.status === 200) {
        this.acceptanceLogisticFormShow = true
        await this.getTrackingLogisticNeedList(this.id)
        if (location.host === 'localhost:8080') this.isLocalhost = true
      }
    },
    async resendCode() {
      // Resend Verification Code
      alert('sent!')
    },
    async getTrackingLogisticNeedList(id) {
      this.id = id
      this.listQueryTable.id = id
      this.listQueryTable.limit = 100
      this.listQueryTable.final_status = 'approved'
      const response = await this.$store.dispatch('logistics/getLogisticReportRealizationItem', this.listQueryTable)
      this.recipient.items = response.data
    },
    // Method untuk Upload Bukti Penerimaan Barang
    deleteDataProofPic(index) {
      this.recipient.proof_pic.splice(index, 1)
    },
    addProofPicDialogShow() {
      this.selectedFile = null
      this.dialogProofPic = true
    },
    closeProofPic() {
      this.dialogProofPic = false
    },
    async saveProofPic() {
      const valid = await this.$refs.uploadDialog.validate()
      if (!valid) {
        return
      }
      this.recipient.proof_pic.push(this.selectedFile)
      this.proofPicRequiredError = false
      this.dialogProofPic = false
    }, // End Method untuk Upload Bukti Penerimaan Barang
    // Method untuk Upload BAST
    deleteDataBastProof(index) {
      this.recipient.bast_proof.splice(index, 1)
    },
    addBastProofDialogShow() {
      this.selectedFile = null
      this.dialogBastProof = true
    },
    closeBastProof() {
      this.dialogBastProof = false
    },
    async saveBastProof() {
      const valid = await this.$refs.uploadDialog.validate()
      if (!valid) {
        return
      }
      this.recipient.bast_proof.push(this.selectedFile)
      this.bastProofRequiredError = false
      this.dialogBastProof = false
    }, // End Method untuk Upload BAST
    // Method untuk Upload Foto Barang
    deleteDataItemProof(index) {
      this.recipient.item_proof.splice(index, 1)
    },
    addItemProofDialogShow() {
      this.selectedFile = null
      this.dialogItemProof = true
    },
    closeItemProof() {
      this.dialogItemProof = false
    },
    async saveItemProof() {
      const valid = await this.$refs.uploadDialog.validate()
      if (!valid) {
        return
      }
      this.recipient.item_proof.push(this.selectedFile)
      this.itemProofRequiredError = false
      this.dialogItemProof = false
    }, // End Method untuk Upload Foto Barang
    async saveRecipient() {
      this.isValid = true
      this.itemsRequiredError = false
      this.proofPicRequiredError = false
      this.bastProofRequiredError = false
      this.itemProofRequiredError = false
      const valid = await this.$refs.observer3.validate()
      if (!valid) {
        this.isValid = false
      }
      this.recipient.items.forEach(item => {
        if (item.quality === undefined) {
          this.itemsRequiredError = true
          this.isValid = false
        }
      })

      if (this.recipient.proof_pic.length === 0) {
        this.proofPicRequiredError = true
        this.isValid = false
      }

      if (this.recipient.bast_proof.length === 0) {
        this.bastProofRequiredError = true
        this.isValid = false
      }

      if (this.recipient.item_proof.length === 0) {
        this.itemProofRequiredError = true
        this.isValid = false
      }

      if (!this.isValid) return
      const formData = new FormData()
      formData.append('fullname', this.recipient.fullname)
      formData.append('position', this.recipient.position)
      formData.append('phone', this.recipient.phone)
      formData.append('date', this.recipient.date)
      formData.append('officer_fullname', this.recipient.officer_fullname)
      formData.append('items', JSON.stringify(this.recipient.items))
      var i = 0
      this.recipient.proof_pic.forEach(element => {
        formData.append('proof_pic' + i, this.recipient.proof_pic[i])
        i++
      })
      formData.append('proof_pic_length', this.recipient.proof_pic.length)
      i = 0
      this.recipient.bast_proof.forEach(element => {
        formData.append('bast_proof' + i, this.recipient.bast_proof[i])
        i++
      })
      formData.append('bast_proof_length', this.recipient.bast_proof.length)
      i = 0
      this.recipient.item_proof.forEach(element => {
        formData.append('item_proof' + i, this.recipient.item_proof[i])
        i++
      })
      formData.append('item_proof_length', this.recipient.item_proof.length)
      formData.append('note', this.recipient.note)
      formData.append('agency_id', this.id)
      const response = await this.$store.dispatch('logistics/postRecipientReport', formData)
      if (response.status === 200) {
        this.$router.push({ path: '/landing-page' })
      }
    },
    defaultValueForm() {
      this.recipient.fullname = 'Rindi Budiaramdhan'
      this.recipient.position = 'Ketua RT'
      this.recipient.phone = '081809556334'
      // this.recipient.date = '2020-12-11'
      this.recipient.officer_fullname = 'Rizie Advista'
      this.recipient.note = 'Tidak ada catatan'
    },
    changeDate(value) {
      this.recipient.date = value
    }
  }
}
</script>
<style lang="scss" scoped>
 .main-card-landing-page {
   padding: 50px;
 }
 .left-side {
   padding-right: 100px;
 }
 .button-style {
   margin-right: 20px;
 }
 .back {
   margin-bottom: 30px;
 }
 .back-text {
   margin-left: 30px;
   margin-bottom: 40px;
   font-family: Lato;
   font-size: 16px;
 }
 .body-text {
   font-family: Lato;
   font-size: 13px;
   line-height: 21px;
 }
 .card-data-tracking {
   margin-top: -30px;
 }
 .result {
   p {
     font-family: Lato;
     font-size: 16px;
   }
 }
 .identity {
   margin: 20px 0;
 }
 .text-data-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 17px;
  color: #219653;
}
.text-title-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #219653;
}
 .title {
   h3 {
    font-family: Lora;
    font-size: 28px;
    font-weight: bold;
    line-height: 45px;

    .logistic {
      color: #16A75C
    }
   }
 }
 .text-green {
   color: #16A75C
 }
 .color-step {
   color: white;
 }
 .tracking-status {
   background: #16A75C;
 }
 .tracking-status-reject {
   background: #EF5350;
 }
 .tracking-status-text {
   color: white;
   margin: 20px;
   width: 500px;
   padding-left: 35px;
   padding-bottom: 20px;
 }
 .tracking-status-reject-note {
    color: white;
    margin: 20px;
    padding-left: 5rem;
    padding-left: 2rem;
 }
 .tracking-step-first {
   margin-left: -60rem;
 }
 .tracking-step {
   color: white;
   padding-top: 80px
 }
 .tracking-divider {
   background: white;
   margin-top: 90px !important;
 }
 .tracking-step-error {
   color: #D50000 !important;
 }
 .step-name {
   text-align: left;
   margin-left: 35px;
   margin-top: -30px;
 }
 .not-found-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 34px;
    color: #020814;
 }
 .not-found-text {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    color: #414D5C;
 }
 .total-data-title {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    color: #757575;
 }
 .total-data {
    font-weight: bold;
    color: #4F4F4F;
 }
 .pagination {
    display: block;
    float: right !important;
 }
 .reject-reason-title {
   font-size: 16px;
   line-height: 26px;
 }
 .reject-reason-data {
   font-size: 14px;
   line-height: 26px;
   margin-top: -1rem;
 }
 .tracking-reject-reason {
   margin-top: .5rem;
 }
.bg-yellow-pastel {
    background-color:#FFF9E1;
    border-radius: 16px;
}
.display-image-right {
  width: 282.7px;
  margin-top: 4rem;
  margin-left: 1rem;
}
</style>
