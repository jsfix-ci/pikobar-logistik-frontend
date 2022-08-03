<template>
  <div class="d-flex flex-column">
    <v-row>
      <v-col
        v-for="(item, index) in listIdentity"
        :key="index"
        cols="12"
        :lg="item.col"
        :class="item.type && !item.isSectionTitle ? show(item) : ''"
        sm="12"
      >
        <!-- Section Title -->
        <div v-if="item.isSectionTitle" class="identity__section" @click="onClick(item)">
          <span class="identity__section-title">{{ item.label }}</span>
          <img
            src="/img/icons/arrow-down.svg"
            alt="arrow-down"
            height="18px"
            :class="{
              'identity__arrow': true,
              'identity__arrow--right': arrowDisplay(item)
            }"
          >
        </div>

        <!-- Disabled Field -->
        <DisabledField
          v-else-if="!item.isHidden"
          v-model="item.value"
          :label="item.label"
          class="d-flex"
        >
          <template v-slot:append>
            <JDSButton
              v-if="item.label === $t('label.print_mail_nature')"
              height="38px"
              @click="onCito"
            >
              Jadikan CITO
            </JDSButton>
          </template>
        </DisabledField>
      </v-col>
    </v-row>

    <!-- KTP Field-->
    <div
      :class="{
        'd-none': !showApplicantIdentity,
        'd-flex flex-column': showApplicantIdentity
      }"
    >
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
  </div>
</template>

<script>
import DisabledField from '@/components/Base/DisabledField'
import JDSButton from '@/components/Base/JDSButton'
import ImageViewer from '@/components/ImageViewer'
export default {
  components: {
    DisabledField,
    ImageViewer,
    JDSButton
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
      showInstanceIdentity: false,
      showApplicantIdentity: false
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
      return {
        'd-none': item.type === 'applicant' ? !this.showApplicantIdentity : !this.showInstanceIdentity,
        'd-block': item.type === 'applicant' ? this.showApplicantIdentity : this.showInstanceIdentity
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
          type: 'instance',
          isSectionTitle: true
        },
        {
          label: this.$t('label.instance_type'),
          value: this.identity.agency_type_name || '-',
          type: 'instance',
          col: 4
        },
        {
          label: this.$t('label.instance_name'),
          value: this.identity.agency_name || '-',
          type: 'instance',
          col: 4
        },
        {
          label: this.$t('label.number_phone'),
          value: this.identity.agency_phone_number || '-',
          type: 'instance',
          col: 4
        },
        {
          label: this.$t('label.city_district'),
          value: this.identity.agency_city_name || '-',
          type: 'instance',
          col: 4
        },
        {
          label: this.$t('label.select_sub_district_full_name'),
          value: this.identity.agency_district_name || '-',
          type: 'instance',
          col: 4
        },
        {
          label: this.$t('label.village'),
          value: this.identity.agency_village_name || '-',
          type: 'instance',
          col: 4
        },
        {
          label: this.$t('label.delivery_address'),
          value: this.identity.agency_address || '-',
          type: 'instance',
          col: 12
        },
        {
          label: this.$t('label.step_title_2'),
          type: 'applicant',
          isSectionTitle: true
        },
        {
          label: this.$t('label.name'),
          value: this.identity.applicant_fullname || '-',
          type: 'applicant',
          col: 4
        },
        {
          label: this.$t('label.position'),
          value: this.identity.applicant_position || '-',
          type: 'applicant',
          col: 4
        },
        {
          label: this.$t('label.number_phone'),
          value: this.identity.applicant_primary_phone_number || '-',
          type: 'applicant',
          col: 4
        },
        {
          label: this.$t('label.email'),
          value: this.identity.applicant_email || '-',
          type: 'applicant',
          col: 4
        },
        {
          label: this.$t('label.phone_number_sub'),
          value: this.identity.applicant_secondary_phone_number || '-',
          type: 'applicant',
          col: 4
        }
      ]
    },
    onClick(item) {
      if (item.type === 'applicant') {
        this.showApplicantIdentity = !this.showApplicantIdentity
      } else if (item.type === 'instance') {
        this.showInstanceIdentity = !this.showInstanceIdentity
      }
    },
    arrowDisplay(item) {
      if (item.type === 'applicant') {
        return !this.showApplicantIdentity
      } else if (item.type === 'instance') {
        return !this.showInstanceIdentity
      }
    },
    onCito() {
      // create CITO function
    }
  }
}
</script>

<style lang="scss" scoped>
.identity {
  &__section {
    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

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

  &__arrow {
    &--right {
       transform: rotate(270deg);
     }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
