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
                <a class="blue--text letter-class" @click="downloadLetter('open')"><u>{{ detailLetter ? detailLetter.outgoing_letter.letter_number : '-' }}</u></a>
              </v-col>
              <v-col cols="6" md="6">
                <div class="margin-top-min-15">
                  <v-btn small outlined color="success" width="130px" height="50px" absolute right @click="downloadLetter('download')">
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
      letterDate: null,
      dataUpdate: null,
      dataDelete: null,
      dialogDelete: false,
      type: null,
      listQuery: {
        page: 1,
        limit: 3,
        outgoing_letter_id: null,
        application_letter_number: null
      }
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
    async downloadLetter(openType) {
      await this.getDetailPrint()
      const instansi = []
      const itemLogistic = []
      const value = []
      const column = []
      column.push({ text: this.$t('label.number').toUpperCase(), style: 'tableHeader' })
      column.push({ text: this.$t('label.print_mail_receiver').toUpperCase(), style: 'tableHeader' })
      column.push({ text: this.$t('label.print_mail_material_name').toUpperCase(), style: 'tableHeader' })
      column.push({ text: this.$t('label.total').toUpperCase(), style: 'tableHeader' })
      column.push({ text: this.$t('label.unit').toUpperCase(), style: 'tableHeader' })
      column.push({ text: this.$t('label.print_mail_location_stock').toUpperCase(), style: 'tableHeader' })
      this.detailLetterPrint.request_letter.forEach(element => {
        instansi.push(' ' + element.agency_name + ' ' + this.$t('label.print_mail_with_number') + ' ' + element.application_letter_number + ' ' + this.$t('label.date').toLowerCase() + ' ' + this.$moment.utc(element.created_at).tz('Asia/Jakarta').format('DD MMMM YYYY'))
      })
      this.letterDate = this.$moment.utc(this.detailLetterPrint.outgoing_letter.letter_date).tz('Asia/Jakarta').format('MMMM YYYY')
      this.detailLetterPrint.material.forEach((element, index) => {
        itemLogistic.push(element.material_group + ' ' + element.qty + ' ' + element.final_unit + ' ' + element.final_product_id)
        const dataRow = []
        dataRow.push(index + 1)
        dataRow.push(element.agency_name)
        dataRow.push(element.final_product_name + ' (' + element.final_product_id + ')')
        dataRow.push({ text: element.qty, alignment: 'right' })
        dataRow.push(element.final_unit)
        dataRow.push(element.location)

        value.push(dataRow)
      })
      const docDefinition = {
        pageSize: 'A4',
        content: [
          {
            image: this.detailLetterPrint.image.pemprov,
            width: 70,
            margin: [0, 0, 0, 0]
          },
          {
            image: this.detailLetterPrint.image.divlog,
            width: 80,
            alignment: 'right',
            margin: [0, -80, 0, 0]
          },
          {
            text: this.$t('label.print_mail_header_pemprov').toUpperCase(),
            style: 'headerPemprov',
            margin: [0, -70, 0, 0]
          },
          {
            text: this.$t('label.print_mail_header_indag').toUpperCase(),
            style: 'headerDisperindag'
          },
          {
            text: this.$t('label.print_mail_address'),
            style: 'address'
          },
          {
            text: this.$t('label.print_mail_website'),
            style: 'website'
          },
          {
            text: this.$t('label.print_mail_postal_code'),
            style: 'city'
          },
          {
            canvas:
            [
              {
                type: 'line',
                x1: 0, y1: 10,
                x2: 510, y2: 10,
                lineWidth: 2
              },
              {
                type: 'line',
                x1: 0, y1: 13,
                x2: 510, y2: 13,
                lineWidth: 1
              }
            ]
          },
          {
            text: '\n'
          },
          {
            text: this.$t('label.print_mail_header').toUpperCase(),
            style: 'address'
          },
          {
            text: this.$t('label.print_mail_nomor').toUpperCase() + ': ' + this.detailLetter.outgoing_letter.letter_number,
            style: 'address'
          },
          {
            text: '\n'
          },
          {
            columns: [
              {
                width: 40,
                text: this.$t('label.print_mail_purpose_from'),
                style: 'fontSizeBody'
              },
              {
                text: ': ' + this.$t('label.print_mail_purpose_ketua_gugus_tugas'),
                style: 'fontSizeBody'
              }
            ]
          },
          {
            text: '\n'
          },
          {
            columns: [
              {
                width: 40,
                text: this.$t('label.print_mail_purpose_to'),
                style: 'fontSizeBody'
              },
              {
                text: ': ' + this.$t('label.print_mail_purpose_to_logistic'),
                style: 'fontSizeBody'
              }
            ]
          },
          {
            text: '\n\n'
          },
          {
            text: this.$t('label.print_mail_body_opening') + '\n\n',
            style: 'fontSizeBody'
          },
          {
            text: this.$t('label.print_mail_body_agency') + instansi + this.$t('label.print_mail_body_purpose') + '\n\n',
            style: 'fontSizeBody'
          },
          {
            style: 'fontSizeTable',
            table: {
              body: [column, ...value]
            }
          },
          {
            unbreakable: true,
            text: this.$t('label.print_mail_city') + '\t' + this.letterDate + '\n\n' + this.$t('label.print_mail_footer_head').toUpperCase() + '\n' + this.$t('label.print_mail_footer_indag').toUpperCase() + '\n' + this.$t('label.print_mail_footer_as') + '\n' + this.$t('label.print_mail_footer_logistic').toUpperCase() + '\n' + this.$t('label.print_mail_footer_covid_manag').toUpperCase() + '\n' + this.$t('label.print_mail_footer_jabar').toUpperCase() + '\n\n\n\n\n\n' + this.$t('label.print_mail_footer_head_name') + '\n' + this.$t('label.print_mail_footer_position') + '\n' + this.$t('label.print_mail_footer_nip') + '\n\n',
            style: 'signatureTitle'
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
          website: {
            fontSize: 9,
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
            alignment: 'justify',
            fontSize: 11
          },
          fontSizeTable: {
            fontSize: 10
          },
          signatureTitle: {
            fontSize: 11,
            alignment: 'center',
            margin: [215, 50, 0, 0]
          },
          tableHeader: {
            fontSize: 10,
            alignment: 'center',
            bold: true
          }
        }
      }
      if (openType === 'download') {
        pdfMake.createPdf(docDefinition).download(this.detailLetter.outgoing_letter.letter_number)
      } else {
        pdfMake.createPdf(docDefinition).open()
      }
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
