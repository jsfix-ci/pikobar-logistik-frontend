<template>
  <div>
    <v-data-table
      :headers="headerFilter"
      :items="items"
      :loading="loading"
      :items-per-page="listQuery.limit"
      :loading-text="$t('label.loading')"
      :no-data-text="$t('label.no_data')"
      hide-default-footer
    >
      <template v-slot:[`item.numbering_item`]="{ item }">
        {{ getTableRowNumbering(item) }}
      </template>

      <template v-slot:[`item.is_reference`]="{ item }">
        <v-btn v-if="item.is_reference === 1" outlined small color="success" @click="referenceDetail(item)">{{ $t('label.instance_is_reference') }}</v-btn>
        <v-btn v-else outlined small color="secondary" class="cursor-auto">{{ $t('label.instance_is_not_reference') }}</v-btn>
      </template>

      <template v-slot:[`item.created_at`]="{ value }">
        {{ $moment(value).format('DD MMMM YYYY') }}
      </template>

      <template v-slot:[`item.applicant.approved_by`]="{ value }">
        <span v-if="value" class="green--text">{{ value.name }}</span>
        <span v-else class="red--text">{{ $t('label.not_approved') }}</span>
      </template>

      <template v-slot:[`item.applicant.finalized_by`]="{ value }">
        <span v-if="value" class="green--text">{{ value.name }}</span>
        <span v-else class="red--text">{{ $t('label.not_approved') }}</span>
      </template>

      <template v-slot:[`item.applicant.verified_by`]="{ value }">
        <span v-if="value" class="green--text">{{ value.name }}</span>
        <span v-else class="red--text">{{ $t('label.not_verified') }}</span>
      </template>

      <template v-slot:[`item.applicant.verified_at`]="{ value }">
        {{ $moment(value).format('DD MMMM YYYY') }}
      </template>

      <template v-slot:[`item.is_completed`]="{ item }">
        <v-btn v-if="item.is_completed" outlined small color="success" class="cursor-auto">{{ $t('label.completed') }}</v-btn>
        <v-btn v-else outlined small color="error" @click="completenessDetail(item)">{{ $t('label.not_complete') }}</v-btn>
      </template>

      <template v-slot:[`item.is_urgency`]="{ value }">
        <v-btn v-if="value" outlined small color="warning" class="cursor-auto">{{ $t('label.important') }}</v-btn>
        <v-btn v-else outlined small color="success" class="cursor-auto">{{ $t('label.normal') }}</v-btn>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text small color="info" @click="toDetail(item)">{{ $t('label.detail') }}</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: 'DataTable',
  props: {
    items: {
      type: Array,
      default: null
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    isRejected: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    listQuery: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('label.number').toUpperCase(),
          value: 'numbering_item',
          width: 50,
          sortable: false
        },
        {
          text: this.$t('label.incoming_mail_number').toUpperCase(),
          value: 'letter_number',
          width: 200
        },
        {
          text: this.$t('label.instance_type').toUpperCase(),
          value: 'agency_type_name',
          width: 150
        },
        {
          text: this.$t('label.instance_name').toUpperCase(),
          value: 'agency_name',
          width: 225
        },
        {
          text: this.$t('label.instance_reference_status').toUpperCase(),
          value: 'is_reference',
          width: 175,
          align: 'center'
        },
        {
          text: this.$t('label.city_name').toUpperCase(),
          value: 'agency_city_name',
          width: 200
        },
        {
          text: this.$t('label.contact_person').toUpperCase(),
          value: 'applicant_fullname',
          width: 200
        },
        {
          text: this.$t('label.request_date').toUpperCase(),
          value: 'created_at',
          width: 200
        },
        {
          text: this.$t('label.approved_by').toUpperCase(),
          value: 'applicant.approved_by',
          width: 150
        },
        {
          text: this.$t('label.finalized_by').toUpperCase(),
          value: 'applicant.finalized_by',
          width: 200
        },
        {
          text: this.$t('label.status').toUpperCase(),
          value: 'applicant.status',
          width: 200
        },
        {
          text: this.$t('label.verified_by').toUpperCase(),
          value: 'applicant.verified_by',
          width: 200
        },
        {
          text: this.$t('label.verified_date').toUpperCase(),
          value: 'applicant.verified_at',
          width: 200
        },
        {
          text: this.$t('label.completeness').toUpperCase(),
          value: 'is_completed',
          align: 'center',
          width: 150
        },
        {
          text: this.$t('label.urgency').toUpperCase(),
          value: 'is_urgency',
          align: 'center',
          width: 150
        },
        {
          text: this.$t('label.action').toUpperCase(),
          value: 'actions',
          align: 'center',
          width: 150
        }
      ]
    }
  },
  computed: {
    headerFilter() {
      if (!this.isVerified && !this.isApproved && !this.isRejected) {
        return this.headers.filter(head =>
          head.value !== 'applicant.finalized_by' &&
          head.value !== 'applicant.verified_by' &&
          head.value !== 'applicant.verified_at' &&
          head.value !== 'applicant.approved_by' &&
          head.value !== 'applicant.status')
      } else if (this.isVerified && !this.isApproved && !this.isRejected) {
        return this.headers.filter(head =>
          head.value !== 'applicant.finalized_by' &&
          head.value !== 'applicant.approved_by' &&
          head.value !== 'applicant.status')
      } else if (this.isApproved && !this.isVerified && !this.isRejected) {
        return this.headers.filter(head =>
          head.value !== 'applicant.verified_by' &&
          head.value !== 'applicant.verified_at' &&
          head.value !== 'applicant.status')
      } else if (this.isRejected && !this.isVerified && !this.isApproved) {
        return this.headers.filter(head =>
          head.value !== 'applicant.finalized_by' &&
          head.value !== 'applicant.verified_by' &&
          head.value !== 'applicant.verified_at' &&
          head.value !== 'applicant.approved_by')
      }
      return this.headers
    }
  },
  methods: {
    referenceDetail(value) {
      this.$emit('reference-detail', value)
    },
    completenessDetail(value) {
      this.$emit('completeness-detail', value)
    },
    toDetail(value) {
      this.$emit('to-detail', value)
    },
    getTableRowNumbering(value) {
      const index = this.items.indexOf(value)
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .cursor-auto {
    cursor: auto;
  }
</style>
