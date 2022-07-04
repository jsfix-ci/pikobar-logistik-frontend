<template>
  <div
    :class="{
      'tracking': true,
      'px-4': $vuetify.breakpoint.smAndDown
    }"
  >
    <div>
      <VaccineHeader />
      <TrackingHeader />
      <h1 class="tracking__title mb-6">Isi Permohonan Di Bawah</h1>

      <!-- Form Input -->
      <ValidationObserver ref="form">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="ID/No. HP/Email Permohonan"
        >
          <JDSTextField
            v-model="search"
            label="ID/No. HP/Email Permohonan"
            sub-label="*ID permohonan didapatkan setelah anda melakukan permohonan"
            placeholder="Tulis ID/No. HP/Email Permohonan"
            :error-messages="errors"
            :hide-details="errors.length === 0"
          />
        </ValidationProvider>
      </ValidationObserver>
      <div
        :class="{
          'd-flex': true,
          'flex-row justify-space-between mt-10 mb-15': $vuetify.breakpoint.mdAndUp,
          'flex-column-reverse mt-6 mb-10': $vuetify.breakpoint.smAndDown
        }"
      >
        <JDSButton
          inverted
          height="38px"
          :width="$vuetify.breakpoint.mdAndUp ? '48%' : '100%'"
          :class="{ 'mt-2': $vuetify.breakpoint.smAndDown }"
          @click="$router.go(-1)"
        >
          Kembali ke Menu Utama
        </JDSButton>
        <JDSButton
          height="38px"
          :width="$vuetify.breakpoint.mdAndUp ? '48%' : '100%'"
          @click="onSearch"
        >
          Lacak
        </JDSButton>
      </div>
      <JDSTable
        v-if="$vuetify.breakpoint.mdAndUp"
        :headers="headers"
        :items="listVaccine"
      >
        <template v-slot:item-prop="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.created_at ? $moment(item.created_at).format('D MMMM YYYY') : '-' }}</td>
            <td>{{ item.letter_number || '-' }}</td>
            <td>{{ item.agency_name || '-' }}</td>
            <td>{{ item.agency_type_name || '-' }}</td>
            <td>{{ item.applicant_fullname || '-' }}</td>
            <td>
              <JDSButton inverted height="25px" @click="onDetail(item.id)">
                {{ $t('label.detail') }}
              </JDSButton>
            </td>
          </tr>
        </template>
      </JDSTable>
      <div v-for="(item, index) in listVaccine" v-else :key="item.id">
        <ResultCard :index="index + 1" :data="item" />
      </div>
    </div>
    <VaccineFooter />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VaccineHeader from '@/components/requestVaccine/Header'
import VaccineFooter from '@/components/requestVaccine/Footer'
import JDSTextField from '@/components/Base/JDSTextField'
import JDSButton from '@/components/Base/JDSButton'
import JDSTable from '@/components/Base/JDSTable'
import TrackingHeader from './TrackingHeader'
import ResultCard from './ResultCard'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    VaccineHeader,
    VaccineFooter,
    JDSTextField,
    JDSButton,
    JDSTable,
    TrackingHeader,
    ResultCard
  },
  data() {
    return {
      search: '',
      headers: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: 'Tanggal Permohonan', sortable: false },
        { text: 'Nomor Surat', sortable: false },
        { text: 'Nama Instansi', sortable: false },
        { text: 'Jenis Instansi', sortable: false },
        { text: 'Pemohon', sortable: false },
        { text: 'Aksi', sortable: false }
      ],
      listVaccine: [
        {
          created_at: '2020-07-22T06:55:14.000000Z',
          letter_number: 'B/984/V/2020',
          agency_name: 'Komando Daerah Militer III Siliwangi',
          agency_type_name: 'Instansi Lainnya',
          applicant_fullname: 'Kunto Arief Wibowo'
        }
      ]
    }
  },
  methods: {
    async onSearch() {
      const isValid = await this.$refs.form.validate()
      console.log(isValid) // @todo: delete console statement
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/scss/pages/vaccineTracking.scss";
</style>
