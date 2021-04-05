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
          : <span class="text-data-green">{{ detailAcceptanceReport.applicant.applicant_name }}</span>
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
    <!-- goods_receipt_report_detail section -->
    <div>
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
    </div><!-- end goods_receipt_report_detail section -->
    <div>
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
      noImage: './img/noimage.gif',
      listQuery: {
        page: 1,
        limit: 3,
        agency_id: null
      }
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'detailAcceptanceReport'
    ])
  },
  async created() {
    this.listQuery.agency_id = this.$route.params.id
    await this.getReportDetail()
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
