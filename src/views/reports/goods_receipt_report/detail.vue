<template>
  <div>
    <div>
      <v-row>
        <v-col cols="8" sm="8">
          <span class="table-title">{{ $t('route.goods_receipt_report_detail') }}</span>
        </v-col>
        <v-col cols="4" sm="4">
          <v-btn
            outlined
            absolute
            right
            color="success"
            class="margin-btn margin-top-min-15"
            @click="toLogisticDetail(listQuery.agency_id)"
          >
            Lihat Detail Permohonan
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">Kode Permohonan</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="7" sm="8">
          : <span class="text-data-green">{{ detailAcceptanceReport.id }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">Nama Pemohon</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="7" sm="8">
          : <span class="text-data-green">{{ detailAcceptanceReport.applicant ? detailAcceptanceReport.applicant.applicant_name : '-' }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <span class="text-title">Status</span>
        </v-col>
        <v-col class="margin-left-min-30" cols="7" sm="8">
          : <span v-if="detailAcceptanceReport.acceptance_report" class="text-data-green">Sudah Lapor</span>
          <span v-else class="orange--text">Belum Lapor</span>
        </v-col>
      </v-row>
    </div>
    <!-- goods receipt report detail section -->
    <div v-if="detailAcceptanceReport.acceptance_report">
      <br>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('route.goods_receipt_report_detail') }}
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
              <v-col class="mx-3 mt-5" cols="12" sm="12" md="12">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.acceptance_report.fullname') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailAcceptanceReport.acceptance_report ? detailAcceptanceReport.acceptance_report.fullname : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.acceptance_report.position') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailAcceptanceReport.acceptance_report ? detailAcceptanceReport.acceptance_report.position : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.acceptance_report.phone') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailAcceptanceReport.acceptance_report ? detailAcceptanceReport.acceptance_report.phone : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.acceptance_report.date') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailAcceptanceReport.acceptance_report ? $moment(detailAcceptanceReport.acceptance_report.date).format('D MMMM YYYY') : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="mx-3 mb-5" cols="12" sm="12" md="12">
                <v-row>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.acceptance_report.officer_fullname') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailAcceptanceReport.acceptance_report ? detailAcceptanceReport.acceptance_report.officer_fullname : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div><!-- end goods receipt report detail section -->
    <!-- items table section -->
    <div v-if="detailAcceptanceReportItem.total > 0">
      <br>
      <v-row>
        <v-col>
          <span class="text-data-green">
            {{ $t('label.acceptance_report.items_title') }}
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
                    <th class="text-left green darken-2 white--text text-uppercase">{{ $t('label.acceptance_report.item.product_name') }}</th>
                    <th class="text-left green darken-2 white--text text-uppercase">{{ $t('label.acceptance_report.item.qty') }}</th>
                    <th class="text-left green darken-2 white--text text-uppercase">{{ $t('label.acceptance_report.item.qty_ok') }}</th>
                    <th class="text-left green darken-2 white--text text-uppercase">{{ $t('label.acceptance_report.item.qty_nok') }}</th>
                    <th class="text-left green darken-2 white--text text-uppercase">{{ $t('label.acceptance_report.item.quality') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="detailAcceptanceReportItem.total === 0">
                    <td class="text-center" :colspan="21">{{ $t('label.no_data') }}</td>
                  </tr>
                  <tr v-for="(item) in detailAcceptanceReportItem.data" v-else :key="item.index">
                    <td>{{ item.product_name }}</td>
                    <td class="text-center">{{ item.qty }}</td>
                    <td class="text-center">{{ item.qty_ok }}</td>
                    <td class="text-center">{{ item.qty_nok }}</td>
                    <td class="text-center">{{ item.quality }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <pagination
            :total="detailAcceptanceReportItem.last_page"
            :total-data="detailAcceptanceReportItem.total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :on-next="onNextItemPage"
          />
        </v-col>
      </v-row>
    </div>
    <!-- Proof Pic section -->
    <div v-if="detailAcceptanceReport.acceptance_report">
      <v-row>
        <!-- label.acceptance_report.proof_pic section -->
        <v-col cols="6" sm="6">
          <span class="text-data-green">
            {{ $t('label.acceptance_report.proof_pic') }}
          </span>
        </v-col>
        <!-- label.acceptance_report.item_proof section -->
        <v-col cols="6" sm="6">
          <span class="text-data-green">
            {{ $t('label.acceptance_report.item_proof') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <!-- label.acceptance_report.proof_pic section -->
        <v-col cols="6" sm="6">
          <v-card class="mx-auto" outlined>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <template>
                  <v-carousel height="250">
                    <v-carousel-item
                      v-for="(item,i) in evidence.proof_pic"
                      :key="i"
                    >
                      <v-img :src="item.path" contain max-height="200" />
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- label.acceptance_report.item_proof section -->
        <v-col cols="6" sm="6">
          <v-card class="mx-auto" outlined>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <template>
                  <v-carousel height="250">
                    <v-carousel-item
                      v-for="(item,i) in evidence.item_proof"
                      :key="i"
                    >
                      <v-img :src="item.path" contain max-height="200" />
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!-- label.acceptance_report.bast_proof section -->
    <div v-if="detailAcceptanceReport.acceptance_report">
      <v-row>
        <v-col cols="12" sm="12">
          <span class="text-data-green">
            {{ $t('label.acceptance_report.bast_proof') }}
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-card class="mx-auto" outlined>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <template>
                  <v-carousel height="250">
                    <v-carousel-item
                      v-for="(item,i) in evidence.bast_proof"
                      :key="i"
                    >
                      <v-img :src="item.path" contain max-height="200" />
                    </v-carousel-item>
                  </v-carousel>
                </template>
              </v-col>
              <v-col cols="6" sm="6">
                <template>
                  <v-row justify="center">
                    <v-dialog
                      v-model="bastDialog"
                      width="80%"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          absolute
                          right
                          outlined
                          v-bind="attrs"
                          class="mt-10"
                          v-on="on"
                        >
                          {{ $t('label.preview') }}
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ $t('label.acceptance_report.bast_proof') }}</span>
                        </v-card-title>
                        <hr>
                        <template>
                          <v-img
                            v-for="(item,i) in evidence.item_proof"
                            :key="i"
                            :src="item.path"
                            contain
                            max-width="80%"
                            class="mx-auto mb-5"
                          />
                        </template>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!-- label.acceptance_report.note section -->
    <div v-if="detailAcceptanceReport.acceptance_report">
      <v-row>
        <v-col cols="12" sm="12">
          <span class="text-data-green">
            {{ $t('label.other') }}
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
              <v-col class="mx-3 mt-5 mb-5" cols="12" sm="12" md="12">
                <v-row class="margin-top-min-15">
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.acceptance_report.note') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailAcceptanceReport.acceptance_report ? detailAcceptanceReport.acceptance_report.note : '-' }}
                    </v-label>
                  </v-col>
                  <v-col>
                    <span class="text-title-green">
                      {{ $t('label.acceptance_report.feedback') }}
                    </span>
                    <br>
                    <v-label>
                      {{ detailAcceptanceReport.acceptance_report ? detailAcceptanceReport.acceptance_report.feedback : '-' }}
                    </v-label>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div><!-- end items table section -->
      <!-- Button Back -->
      <v-row class="mb-15">
        <v-col>
          <v-btn small color="success" width="114px" height="46px" absolute right @click="back()">
            {{ $t('label.back') }}
          </v-btn>
        </v-col>
      </v-row><!-- End Button Back -->
    </div>
    <br>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GoodsReceiptReportDetail',
  data() {
    return {
      bastDialog: false,
      noImage: './img/noimage.gif',
      listQuery: {
        page: 1,
        limit: 3,
        agency_id: null,
        acceptance_report_id: null
      },
      evidence: {
        proof_pic: [],
        bast_proof: [],
        item_proof: []
      }
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'detailAcceptanceReport',
      'detailAcceptanceReportItem',
      'acceptanceReportEvidence'
    ])
  },
  async created() {
    this.listQuery.agency_id = this.$route.params.id
    await this.getReportDetail()
    await this.getReportDetailItems()
    await this.getAcceptanceReportEvidence()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    toLogisticDetail(id) {
      this.$router.push(`/alat-kesehatan/detail/${id}`)
    },
    async getReportDetail() {
      await this.$store.dispatch('logistics/getGoodsReceiptReportDetail', this.$route.params.id)
      this.listQuery.acceptance_report_id = this.detailAcceptanceReport.acceptance_report.id
    },
    async getReportDetailItems() {
      await this.$store.dispatch('logistics/getGoodsReceiptReportDetailItems', this.listQuery)
    },
    async getAcceptanceReportEvidence() {
      await this.$store.dispatch('logistics/getAcceptanceReportEvidence', this.listQuery)
      this.acceptanceReportEvidence.forEach(element => {
        switch (element.type) {
          case 'proof_pic':
            this.evidence.proof_pic.push(element)
            break
          case 'bast_proof':
            this.evidence.bast_proof.push(element)
            break
          case 'item_proof':
            this.evidence.item_proof.push(element)
            break
        }
      })
    },
    async onNextItemPage() {
      await this.getReportDetailItems()
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
