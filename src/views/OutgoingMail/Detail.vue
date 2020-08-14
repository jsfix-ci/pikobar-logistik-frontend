<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12" sm="12">
          <span class="table-title">{{ $t('label.outgoing_mail_detail') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2">
          <div class="text-title">{{ $t('label.letter_number') }}</div>
          <div class="text-title">{{ $t('label.outgoing_mail_date_print') }}</div>
          <div class="text-title">{{ $t('label.outgoing_mail_total_applicant') }}</div>
        </v-col>
        <v-col cols="7" sm="8">
          <div class="text-data-green">:  {{ detailLetter ? detailLetter.outgoing_letter.letter_number : '-' }}</div>
          <div class="text-data-green">:  {{ detailLetter ? $moment.utc(detailLetter.outgoing_letter.letter_date).tz('Asia/Jakarta').format('LL') : '-' }}</div>
          <div class="text-data-green">:  {{ detailLetter ? detailLetter.outgoing_letter.request_letter_total : '-' }}</div>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col>
        <span class="text-data-green">
          {{ $t('route.outgoing_mail') }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-text>
            <v-row class="ml-2">
              <v-col cols="6" md="6">
                <a :href="'#'" target="_blank" class="blue--text letter-class"><u>{{ detailLetter ? detailLetter.outgoing_letter.letter_number : '-' }}</u></a>
              </v-col>
              <v-col cols="6" md="6">
                <div class="margin-top-min-15">
                  <v-btn small outlined color="success" width="130px" height="50px" absolute right @click="downloadLetter">
                    {{ $t('label.outgoing_mail_print') }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span class="text-data-green">
          {{ $t('route.applicant_medical_tools_list_title') }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3" md="3">
        <v-card
          outlined
          class="card-search"
        >
          <v-text-field
            v-model="listQuery.application_letter_number"
            solo-inverted
            flat
            hide-details
            :placeholder="$t('label.search_application_letter')"
            prepend-inner-icon="search"
            @change="handleSearch"
          />
        </v-card>
      </v-col>
      <v-col>
        <v-btn outlined color="success" height="50px" absolute right @click.stop="openForm('add')">
          <v-icon dark>mdi-plus</v-icon>
          {{ $t('label.outgoing_mail_add_number_letter') }}
        </v-btn>
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
                  <th class="text-left">{{ $t('label.applicant_letter_number').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.instance_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.city_district').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.contact_person').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.realization_amount').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.realization_date').toUpperCase() }}</th>
                  <th class="text-center">{{ $t('label.action').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="detailLetterApplication ? detailLetterApplication.data.length === 0 : '-'">
                  <td class="text-center" :colspan="7">{{ $t('label.no_data') }}</td>
                </tr>
                <tr v-for="(item, index) in detailLetterApplication ? detailLetterApplication.data : null" v-else :key="item.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ item.application_letter_number }}</td>
                  <td>{{ item.agency_name || '-' }}</td>
                  <td>{{ item.kemendagri_kabupaten_nama || '-' }}</td>
                  <td>{{ item.applicant_name || '-' }}</td>
                  <td>{{ item.realization_total }}</td>
                  <td>{{ item.realization_date || '-' }}</td>
                  <td>
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
                            {{ $t('label.action_options') }}<v-icon style="color: #009D57;font-size: 2rem;" right>mdi-menu-down</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-list-item>
                            <v-btn text small color="info" @click="openForm('update', item)">
                              {{ $t('label.update') }}
                            </v-btn>
                          </v-list-item>
                          <v-list-item v-if="detailLetterApplication ? detailLetterApplication.data.length > 1 : '-'">
                            <v-btn text small color="info" @click="deleteData(item)">
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
            :length="totalListLetterApplication"
            :total-visible="3"
            @input="onNext"
          />
        </v-card>
        <!-- {{ detailLetter }} -->
        <!-- {{ detailLetterApplication.data[0] }} -->
        {{ detailLetterPrint }}
      </v-col>
    </v-row>
    <v-row class="mb-15">
      <v-col>
        <v-btn small color="success" width="114px" height="46px" absolute right @click="back()">
          {{ $t('label.back') }}
        </v-btn>
      </v-col>
    </v-row>
    <CreateLetter
      ref="updateForm"
      :show="showForm"
      :data-source="dataSource"
      :data-update="dataUpdate"
      :type="type"
    />
    <DialogDelete
      :dialog="dialogDelete"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialogDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`letter/deleteApplicationLetter`"
      :type="'letter'"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CreateLetter from './Create'
import DialogDelete from '@/components/DialogDelete'
import pdfMake from 'pdfmake/build/pdfmake'

export default {
  components: {
    CreateLetter,
    DialogDelete
  },
  data() {
    return {
      loaded: false,
      showForm: false,
      dataSource: null,
      dataUpdate: null,
      dataDelete: null,
      dialogDelete: false,
      type: null,
      listQuery: {
        page: 1,
        limit: 3,
        outgoing_letter_id: null,
        application_letter_number: null
      },
      logo: require('@/static/pemprov_jabar.png')
      // detailLetterPrint: {
      //   data: {
      //     letter_request: [
      //       {
      //         'id': 1,
      //         'outgoing_letter_id': 3,
      //         'applicant_id': 1351,
      //         'application_letter_number': '1351/DINKES/15/06/2020',
      //         'agency_id': '1351',
      //         'agency_name': 'KLINIK Bandung',
      //         'location_district_code': '32.73',
      //         'kemendagri_kabupaten_nama': 'KOTA BANDUNG',
      //         'applicant_name': 'Uni Choirini'
      //       },
      //       {
      //         'id': 2,
      //         'outgoing_letter_id': 4,
      //         'applicant_id': 1351,
      //         'application_letter_number': '1352/DINKES/15/06/2020',
      //         'agency_id': '1351',
      //         'agency_name': 'KLINIK LMC SUDIRMAN',
      //         'location_district_code': '32.73',
      //         'kemendagri_kabupaten_nama': 'KOTA BANDUNG',
      //         'applicant_name': 'Uni Choirini'
      //       }
      //     ],
      //     material: [
      //       {
      //         'product_id': 'MAT-0003',
      //         'product_name': 'NEO MASKER HEADLOOP (GUBERNUR)',
      //         'realization_unit': 'PCS',
      //         'material_group': 'MASKER BEDAH',
      //         'realization_quantity': '120',
      //         'location': 'WHS_PAKUAN_A'
      //       },
      //       {
      //         'product_id': 'MAT-0004',
      //         'product_name': 'MASKER HEADLOOP (GUBERNUR)',
      //         'realization_unit': 'PCS',
      //         'material_group': 'MASKER BEDAH',
      //         'realization_quantity': '120',
      //         'location': 'WHS_PAKUAN_A'
      //       }
      //     ]
      //   }
      // }
    }
  },
  computed: {
    ...mapGetters('letter', [
      'detailLetter',
      'detailLetterPrint',
      'detailLetterApplication',
      'totalDataLetterApplication',
      'totalListLetterApplication'
    ])
  },
  async created() {
    await this.getDetailData()
    await this.getDetailApplication()
  },
  methods: {
    async downloadLetter() {
      await this.getDetailPrint()
      const instansi = []
      const itemLogistic = []
      const bodyData = []
      this.detailLetterPrint.request_letter.forEach(element => {
        instansi.push(element.agency_name + ' dengan nomor surat ' + element.application_letter_number)
      })
      this.detailLetterPrint.material.forEach((element, index) => {
        itemLogistic.push(element.material_group + ' ' + element.realization_quantity + ' ' + element.realization_unit + ' ' + element.product_id)
        const dataRow = []
        dataRow.push(index + 1)
        dataRow.push(element.material_group)
        dataRow.push(element.realization_quantity)
        dataRow.push(element.realization_unit)
        dataRow.push(element.product_id)
        dataRow.push(element.product_name)
        dataRow.push(element.location)

        bodyData.push(dataRow)
      })
      const docDefinition = {
        content: [
          {
            text: 'PEMERINTAH DAERAH PROVINSI JAWA BARAT',
            style: 'headerPemprov'
          },
          {
            text: 'DINAS PERINDUSTRIAN DAN PERDAGANGAN',
            style: 'headerDisperindag'
          },
          {
            text: 'Jalan Asia Afrika No. 146 Tlp. (022) 4230897 Fax. (022) 4200331 – 43209 \n Website: http://disperindag.jabarprov.go.id, email: disperindag@jabarprov.go.id',
            style: 'address'
          },
          {
            text: 'BANDUNG - 40261',
            style: 'city'
          },
          {
            text: '\n\n'
          },
          {
            text: 'Bandung, ' + this.$moment(this.detailLetter.outgoing_letter.letter_date).format('LL') + '\n\n',
            style: 'date',
            margin: [0, 0, 100, 0]
          },
          {
            columns: [
              {
                width: 70,
                text: 'Nomor\n Sifat\n Lampiran \n Hal\n',
                style: 'fontSizeBody'
              },
              {
                width: 210,
                text: ': ' + this.detailLetter.outgoing_letter.letter_number + '\n : Biasa \n : Satu Lembar \n : Penyaluran Permohonan Logistik Kesehatan',
                style: 'fontSizeBody'
              },
              {
                text: 'Kepada Yth. Gubernur Jawa Barat selaku \n Ketua Gugus Tugas Percepatan \n Penanggulangan Covid-19 di \n Jawa Barat \n di \n Bandung\n\n',
                style: 'fontSizeBody'
              }
            ]
          },
          {
            text: '\u200B\t\u200B\t\u200B\t\u200B\tDisampaikan dengan hormat, menindaklanjuti Surat ' + instansi + ' Bersama ini kami sampaikan permohonan penyaluran logistik alat kesehatan.\n\n',
            style: 'fontSizeBody'
          },
          {
            text: '\u200B\t\u200B\t\u200B\t\u200B\tAdapun jenis dan jumlah barang-barang Kesehatan yang dimaksud adalah sebagai berikut:\n\n',
            style: 'fontSizeBody'
          },
          {
            ol: itemLogistic,
            margin: [50, 0, 0, 0],
            style: 'fontSizeBody'
          },
          {
            text: '\n\u200B\t\u200B\t\u200B\t\u200B\tDemikian disampaikan. Atas perhatian dan perkenan Bapak kami ucapkan terima kasih.',
            style: 'fontSizeBody'
          },
          {
            text: 'KEPALA\nDINAS PERINDUSTRIAN DAN PERDAGANGAN\nselaku\nKETUA DIVISI LOGISTIK GUGUS TUGAS\nPERCEPATAN PENANGGULANGAN COVID-19\nDI JAWA BARAT',
            style: 'signatureTitle'
          },
          {
            text: 'Drs. H. MOHAMAD ARIFIN SOEDJAYANA, MM.\nPembina Utama Madya\nNIP 19640730 198903 1 004\n\n',
            style: 'signatureData'
          },
          {
            text: 'Tembusan:',
            style: 'fontSizeBody'
          },
          {
            ol: [
              'Yth. Wakil Gubernur Jawa Barat',
              'Yth. Sekretaris Daerah Provinsi Jawa Barat',
              'Yth. Asisten Perekonomian dan Pembangunan Setda Prov. Jawa Barat',
              'Yth. Asisten Administrasi Setda Prov. Jawa Barat',
              'Yth. Asisten Pemerintahan, Hukum dan Kesejahteraan Sosial Setda Prov. Jawa Barat',
              'Yth. Inspektur Provinsi Jawa Barat',
              'Yth. Gugus Tugas Percepatan Penanggulangan COVID-19 di Jawa Barat'
            ],
            style: 'fontSizeBody',
            pageBreak: 'after'
          },
          {
            text: 'Lampiran: ',
            margin: [250, 0, 0, 10],
            style: 'fontSizeBody'
          },
          {
            columns: [
              {
                width: 90,
                text: 'NOMOR \n TANGGAL \n TENTANG',
                style: 'fontSizeBody'
              },
              {
                width: 200,
                text: ': ' + this.detailLetter.outgoing_letter.letter_number + ' \n : ' + this.$moment(this.detailLetter.outgoing_letter.letter_date).format('LL') + ' \n : Penyaluran Permohonan Logistik Kesehatan'
              }
            ],
            margin: [250, 0, 0, 30],
            style: 'fontSizeBody'
          },
          {
            table: {
              style: 'tableStyle',
              widths: [30, '*', 50, 50, 60, '*', '*'],
              // body: [
              //   [{ text: 'No', style: 'tableStyle' }, { text: 'Material', style: 'tableStyle' }, { text: 'Jumlah', style: 'tableStyle' }, { text: 'Satuan', style: 'tableStyle' }, { text: 'ID Material', style: 'tableStyle' }, { text: 'Nama Material', style: 'tableStyle' }, { text: 'Lokasi', style: 'tableStyle' }]
              // ]
              body: bodyData
            }
          }
        ],
        styles: {
          headerPemprov: {
            fontSize: 12,
            bold: true,
            alignment: 'center'
          },
          headerDisperindag: {
            fontSize: 16,
            bold: true,
            alignment: 'center'
          },
          address: {
            fontSize: 10,
            alignment: 'center'
          },
          city: {
            fontSize: 11,
            bold: true,
            alignment: 'center'
          },
          date: {
            fontSize: 11,
            alignment: 'right'
          },
          fontSizeBody: {
            fontSize: 11
          },
          signatureTitle: {
            fontSize: 11,
            alignment: 'center',
            margin: [225, 50, 0, 0]
          },
          signatureData: {
            fontSize: 11,
            alignment: 'center',
            margin: [225, 70, 0, 0]
          },
          tableStyle: {
            fontSize: 11
          }
        }
      }
      pdfMake.createPdf(docDefinition).open()
    },
    getTableRowNumbering(index) {
      return ((parseInt(this.listQuery.page) - 1) * parseInt(this.listQuery.limit)) + (parseInt(index) + 1)
    },
    async deleteData(item) {
      this.dialogDelete = true
      this.dataDelete = await item
    },
    async getDetailPrint() {
      await this.$store.dispatch('letter/getDetailLetterPrint', this.$route.params.id)
    },
    async getDetailData() {
      await this.$store.dispatch('letter/getDetailLetter', this.$route.params.id)
    },
    async getDetailApplication() {
      this.listQuery.outgoing_letter_id = this.$route.params.id
      await this.$store.dispatch('letter/getDetailLetterByOutgoing', this.listQuery)
    },
    back() {
      this.$router.go(-1)
    },
    async handleSearch() {
      await this.getDetailApplication()
    },
    openForm(type, value) {
      this.$refs.updateForm.setDialog(value)
      this.type = type
      this.dataUpdate = value
      this.dataSource = this.detailLetter.outgoing_letter
      this.showForm = true
    },
    async onNext() {
      await this.getDetailApplication()
    }
  }
}
</script>
<style scoped>
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
    margin-bottom: 20px;
  }
  .text-data-green {
    font-family: "Product Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #219653;
    margin-bottom: 20px;
  }
  .text-data-red {
    font-family: "Product Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #e62929;
  }
  .letter-class {
    color: #2D9CDB !important;
    font-family: "Product Sans";
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-decoration: underline;
  }
  .margin-top-min-15 {
    margin-top: -15px
  }
</style>
