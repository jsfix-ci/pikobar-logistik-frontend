<template>
  <div class="d-flex flex-column">
    <v-row>
      <v-col
        v-for="(item, index) in listIdentity"
        :key="index"
        cols="12"
        :lg="item.col"
        sm="12"
      >
        <!-- Section Title -->
        <div v-if="item.isSectionTitle" class="d-flex flex-row align-center">
          <span class="identity__section-title">{{ item.label }}</span>
          <img
            src="/img/icons/arrow-down.svg"
            alt="arrow-down"
            height="18px"
            @click="onClick"
          >
        </div>

        <!-- Disabled Field -->
        <DisabledField
          v-else-if="!item.isHidden"
          v-model="item.value"
          :label="item.label"
          :class="{
            'd-none': item.isApplicantIdentity ? !showApplicantIdentity : false,
            'd-flex': item.isApplicantIdentity ? showApplicantIdentity : true
          }"
        />
      </v-col>
    </v-row>

    <!-- KTP Field-->
    <span class="identity__ktp">{{ $t('label.ktp_or_employee_card') }}</span>
    <ImageViewer
      :src="identity.applicant_file_url"
      class="d-flex"
      alt="ktp-image"
      thumb-width="149px"
      thumb-height="100px"
      preview-width="600"
      preview-height="400"
    />
  </div>
</template>

<script>
import DisabledField from '@/components/Base/DisabledField'
import ImageViewer from '@/components/ImageViewer'
export default {
  components: {
    DisabledField,
    ImageViewer
  },
  props: {
    identity: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      listIdentity: [],
      listNotes: [],
      showApplicantIdentity: true
    }
  },
  watch: {
    identity() {
      this.fillIdentity()
    }
  },
  mounted() {
    this.fillIdentity()
  },
  methods: {
    show(item) {
      // @todo: implement this method
      return {
        'd-none': item.isApplicantIdentity ? !this.showApplicantIdentity : false,
        'd-flex': item.isApplicantIdentity ? this.showApplicantIdentity : true
      }
    },
    createNotes() {
      this.listNotes = []
      if (this.identity?.vaccine_request_status_notes?.length > 0) {
        this.identity.vaccine_request_status_notes.forEach(item => {
          this.listNotes.push(item.name)
        })
      }
      if (this.identity?.note) { this.listNotes.push(this.identity.note) }
    },
    fillIdentity() {
      this.createNotes()
      this.listIdentity = [
        {
          label: this.$t('label.requested_date'),
          value: this.identity.created_at
            ? this.$moment(this.identity.created_at).format('D MMMM YYYY')
            : '-',
          col: 4
        },
        {
          label: this.$t('label.print_mail_nature'),
          value: this.identity.is_urgency ? this.$t('label.soon') : this.$t('label.not_urgency'),
          col: 4
        },
        {
          label: this.$t('label.status'),
          value: this.identity.is_letter_file_final ? this.$t('label.final_2') : this.$t('label.draft'),
          col: 4
        },
        {
          label: this.$t('label.reason'),
          value: this.listNotes,
          col: 12,
          isHidden: this.listNotes.length === 0
        },
        {
          label: this.$t('label.instance_identity'),
          isSectionTitle: true
        },
        {
          label: this.$t('label.instance_type'),
          value: this.identity.agency_type_name || '-',
          col: 4
        },
        {
          label: this.$t('label.instance_name'),
          value: this.identity.agency_name || '-',
          col: 4
        },
        {
          label: this.$t('label.number_phone'),
          value: this.identity.agency_phone_number || '-',
          col: 4
        },
        {
          label: this.$t('label.city_district'),
          value: this.identity.agency_city_name || '-',
          col: 4
        },
        {
          label: this.$t('label.select_sub_district_full_name'),
          value: this.identity.agency_district_name || '-',
          col: 4
        },
        {
          label: this.$t('label.village'),
          value: this.identity.agency_village_name || '-',
          col: 4
        },
        {
          label: this.$t('label.delivery_address'),
          value: this.identity.agency_address || '-',
          col: 12
        },
        {
          label: this.$t('label.step_title_2'),
          isSectionTitle: true
        },
        {
          label: this.$t('label.name'),
          value: this.identity.applicant_fullname || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.position'),
          value: this.identity.applicant_position || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.number_phone'),
          value: this.identity.applicant_primary_phone_number || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.email'),
          value: this.identity.applicant_email || '-',
          isApplicantIdentity: true,
          col: 4
        },
        {
          label: this.$t('label.phone_number_sub'),
          value: this.identity.applicant_secondary_phone_number || '-',
          isApplicantIdentity: true,
          col: 4
        }
      ]
    },
    onClick() {
      // @todo: create onClick function
    }
  }
}
</script>

<style lang="scss" scoped>
.identity {
  &__section-title {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #BDBDBD;
    margin-right: 15px;
  }

  &__ktp {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #757575;
    margin: 16px 0 8px 0;
  }
}
</style>
