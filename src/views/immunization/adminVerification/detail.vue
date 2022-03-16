<template>
  <div class="detail d-flex flex-column mb-6">
    <h1 class="detail__title">
      {{ $t('label.request_detail') }}
    </h1>
    <v-row>
      <!-- Identity Section -->
      <v-col v-for="(content, index) in listContent" :key="index" cols="12" :lg="content.col" sm="12">
        <!-- Section Title -->
        <div v-if="content.isSectionTitle" class="d-flex flex-row align-center">
          <span class="detail__section-title">{{ content.label }}</span>
          <img
            src="/img/icons/arrow-down.svg"
            alt="arrow-down"
            height="18px"
            @click="onArrowClick"
          >
        </div>

        <!-- Disabled Field -->
        <DisabledField
          v-else
          v-model="content.value"
          :label="content.label"
          :class="{
            'd-none': content.isApplicantIdentity ? !showApplicantIdentity : false,
            'd-flex': content.isApplicantIdentity ? showApplicantIdentity : true
          }"
        />
      </v-col>
    </v-row>

    <!-- KTP -->
    <span class="detail__ktp">{{ $t('label.ktp_or_employee_card') }}</span>
    <ImageViewer
      :src="vaccineRequest.applicant_file_url"
      class="d-flex"
      alt="ktp-image"
      thumb-width="149px"
      thumb-height="100px"
      preview-width="600"
      preview-height="400"
    />

    <!-- Letter Number Section -->
    <div class="d-flex flex-column">
      <div class="d-flex flex-row align-center mb-6 mt-8">
        <span class="detail__section-title">{{ $t('label.applicant_letter') }}</span>
        <img
          src="/img/icons/arrow-down.svg"
          alt="arrow-down"
          height="18px"
          @click="onArrowClick"
        >
      </div>
      <DisabledField
        v-model="vaccineRequest.letter_number"
        :label="$t('label.letter_number')"
        class="mb-8"
      >
        <template #append>
          <JDSButton class="ml-6" height="38px" @click="onDownload">
            {{ $t('label.download') }}
          </JDSButton>
        </template>
      </DisabledField>
    </div>

    <!-- Vaccine Table Section -->
    <div class="d-flex flex-column">
      <div class="d-flex flex-row align-center mb-6">
        <span class="detail__section-title">{{ $t('label.request') }}</span>
        <img
          src="/img/icons/arrow-down.svg"
          alt="arrow-down"
          height="18px"
          @click="onArrowClick"
        >
      </div>

      <!-- Vaccine -->
      <div class="detail__table-container d-flex flex-column">
        <span class="detail__table-container__title">
          {{ $t('label.vaccine') }}
        </span>
        <JDSTable
          :headers="vaccineHeaders"
          :items="listVaccine"
        >
          <template v-slot:item-prop="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ item.vaccine_product.name || '-' }}</td>
              <td>{{ item.quantity || '-' }}</td>
              <td>{{ item.unit || '-' }}</td>
              <td>{{ item.usage || '-' }}</td>
              <td>{{ item.description || '-' }}</td>
            </tr>
          </template>
        </JDSTable>
      </div>

      <!-- Vaccine Support -->
      <div class="detail__table-container d-flex flex-column mt-6">
        <span class="detail__table-container__title">
          {{ $t('label.logistic_vaccine_supporter') }}
        </span>
        <JDSTable
          :headers="vaccineHeaders"
          :items="listVaccineSupport"
        >
          <template v-slot:item-prop="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ item.vaccine_product.name || '-' }}</td>
              <td>{{ item.quantity || '-' }}</td>
              <td>{{ item.unit || '-' }}</td>
              <td>{{ item.usage || '-' }}</td>
              <td>{{ item.description || '-' }}</td>
            </tr>
          </template>
        </JDSTable>
      </div>

      <!-- Action Button -->
      <div class="d-flex flex-row justify-space-between mt-8">
        <JDSButton inverted height="42px" @click="onBack()">
          {{ $t('label.back') }}
        </JDSButton>
        <div>
          <JDSButton danger height="42px" class="mr-4" @click="onReject()">
            {{ $t('label.reject') }}
          </JDSButton>
          <JDSButton height="42px" @click="onVerify()">
            {{ $t('label.verification') }}
          </JDSButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DisabledField from '@/components/Base/DisabledField'
import JDSButton from '@/components/Base/JDSButton'
import JDSTable from '@/components/Base/JDSTable'
import ImageViewer from '@/components/ImageViewer'
export default {
  components: {
    DisabledField,
    JDSButton,
    JDSTable,
    ImageViewer
  },
  data() {
    return {
      listContent: [],
      showApplicantIdentity: true,
      vaccineHeaders: [
        { text: this.$t('label.print_mail_no'), sortable: false },
        { text: this.$t('label.print_mail_material_name'), sortable: false },
        { text: this.$t('label.total'), sortable: false },
        { text: this.$t('label.unit'), sortable: false },
        { text: this.$t('label.purpose'), sortable: false },
        { text: this.$t('label.note'), sortable: false }
      ],
      listVaccine: [],
      listVaccineSupport: []
    }
  },
  computed: {
    ...mapState('vaccine', [
      'vaccineRequest',
      'vaccineProductRequests' // Vaccine Table Data
    ])
  },
  async mounted() {
    await this.$store.dispatch('vaccine/getVaccineRequestById', this.$route.params.id)
    await this.$store.dispatch('vaccine/getVaccineProductRequests', { vaccine_request_id: this.$route.params.id })
    this.fillIdentity()
    this.mapVaccineItem()
  },
  methods: {
    fillIdentity() {
      this.listContent = [
        {
          label: this.$t('label.requested_date'),
          value: this.vaccineRequest.created_at
            ? this.$moment(this.vaccineRequest.created_at).format('D MMMM YYYY')
            : '-',
          col: 4
        },
        {
          label: this.$t('label.print_mail_nature'),
          value: this.vaccineRequest.is_urgency ? this.$t('label.soon') : this.$t('label.not_urgency'),
          col: 4
        },
        {
          label: this.$t('label.status'),
          value: this.vaccineRequest.is_completed ? this.$t('label.final_2') : this.$t('label.draft'),
          col: 4
        },
        {
          label: this.$t('label.instance_identity'),
          isSectionTitle: true
        },
        {
          label: this.$t('label.instance_type'),
          value: this.vaccineRequest.agency_type_name || '-',
          col: 4
        },
        {
          label: this.$t('label.instance_name'),
          value: this.vaccineRequest.agency_name || '-',
          col: 4
        },
        {
          label: this.$t('label.number_phone'),
          value: this.vaccineRequest.agency_phone_number || '-',
          col: 4
        },
        {
          label: this.$t('label.city_district'),
          value: this.vaccineRequest.agency_city_name || '-',
          col: 4
        },
        {
          label: this.$t('label.select_sub_district_full_name'),
          value: this.vaccineRequest.agency_district_name || '-',
          col: 4
        },
        {
          label: this.$t('label.village'),
          value: this.vaccineRequest.agency_village_name || '-',
          col: 4
        },
        {
          label: this.$t('label.delivery_address'),
          value: this.vaccineRequest.agency_address || '-',
          col: 12
        },
        {
          label: this.$t('label.step_title_2'),
          isSectionTitle: true
        },
        {
          label: this.$t('label.name'),
          value: this.vaccineRequest.applicant_fullname || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.position'),
          value: this.vaccineRequest.applicant_position || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.number_phone'),
          value: this.vaccineRequest.applicant_primary_phone_number || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.email'),
          value: this.vaccineRequest.applicant_email || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.phone_number_sub'),
          value: this.vaccineRequest.applicant_secondary_phone_number || '-',
          isApplicantIdentity: true,
          col: 4
        }
      ]
    },
    show(item) {
      return {
        'd-none': item.isApplicantIdentity ? !this.showApplicantIdentity : false,
        'd-flex': item.isApplicantIdentity ? this.showApplicantIdentity : true
      }
    },
    onArrowClick() {
      // create onArrowClick function
      // this.showApplicantIdentity = !this.showApplicantIdentity
    },
    onDownload() {
      // create onDownload function
    },
    onBack() {
      this.$router.go(-1)
    },
    onReject() {
      // create onReject function
    },
    onVerify() {
      // create onVerify function
    },
    mapVaccineItem() {
      this.vaccineProductRequests.forEach(item => {
        item.category === 'vaccine'
          ? this.listVaccine.push(item)
          : this.listVaccineSupport.push(item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background: white;
  padding: 16px;
  border-radius: 8px;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #424242;
    margin-bottom: 32px;
  }

  &__section-title {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #BDBDBD;
    margin-right: 15px;
  }

  &__table-container {
    border-style: solid;
    border-color: #E0E0E0;
    border-width: 1px;
    border-radius: 8px;
    padding: 24px;

    &__title {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #757575;
      margin-bottom: 24px;
    }
  }

  &__ktp {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #757575;
    margin: 16px 0 8px 0;
  }
}
</style>
