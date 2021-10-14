<template>
  <div>
    <v-card-text>
      <v-row class="margin-top-bot-min-20-list-pengajuan-logistik">
        <v-col cols="12" sm="4" md="4">
          <v-card
            outlined
            class="card-search"
          >
            <v-text-field
              v-model="listQuery.agency_name"
              solo-inverted
              flat
              hide-details
              :placeholder="$t('label.search_data')"
              prepend-inner-icon="search"
              @change="handleSearch"
            />
          </v-card>
        </v-col>
        <v-col cols="12" offset-sm="4" offset-md="4" sm="2" md="2">
          <v-btn color="green" large text outlined @click="exportData()"><v-icon left>mdi-upload</v-icon> {{ $t('label.export_data') }}</v-btn>
        </v-col>
        <v-col cols="12" sm="2" md="2">
          <v-btn class="primary" large max-width="100px" @click="showFilter = !showFilter">{{ $t('label.filter') }}
            <v-icon v-if="!showFilter" right>mdi-chevron-right</v-icon>
            <v-icon v-else right>mdi-chevron-down</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <hr v-if="showFilter" class="thin">
    <v-card-text v-if="showFilter">
      <v-row class="margin-top-bot-min-20-list-pengajuan-logistik">
        <v-col cols="12" sm="1">
          <v-label class="title">{{ $t('label.sort') }}</v-label>
          <v-select
            v-model="listQuery.sort"
            :items="sortOption"
            solo
            item-text="label"
            item-value="value"
            :clearable="true"
            :placeholder="$t('label.sort')"
            @change="handleSearch"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-label class="title">{{ $t('label.request_date') }}</v-label>
          <date-picker-dashboard
            :initial-start-date="listQuery.start_date"
            :initial-end-date="listQuery.end_date"
            @selected="changeDate"
          />
        </v-col>
        <v-col cols="12" sm="2">
          <v-label class="title">{{ $t('label.city_district') }}</v-label>
          <select-area-district-city
            :disabled-district="disabledDistrict"
            :district-city="districtCity"
            :city-district.sync="districtCity"
            :on-select-district-city="onSelectDistrictCity"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-label class="title">{{ $t('label.instance_type') }}</v-label>
          <v-select
            v-model="listQuery.faskes_type"
            :items="faskesTypeList"
            solo
            item-text="name"
            item-value="id"
            :clearable="true"
            :placeholder="$t('label.select_instance_type')"
            @change="handleSearch()"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-label class="title">{{ $t('label.applicant_origin') }}</v-label>
          <v-select
            v-model="listQuery.source_data"
            :items="applicantOrigin"
            solo
            item-text="text"
            item-value="value"
            :clearable="true"
            :placeholder="$t('label.select_applicant_origin')"
            @change="handleSearch()"
          />
        </v-col>
        <v-col cols="12" sm="3" class="mt-n8">
          <v-label class="title">{{ $t('label.instance_reference_status') }}</v-label>
          <v-select
            v-model="listQuery.is_reference"
            :items="referenceFaskes"
            solo
            item-text="text"
            item-value="value"
            :clearable="true"
            :placeholder="$t('label.instance_reference_status_placeholder')"
            @change="handleSearch()"
          />
        </v-col>
        <v-col cols="12" sm="3" class="mt-n8">
          <v-label class="title">{{ $t('label.completeness') }}</v-label>
          <v-select
            v-model="listQuery.completeness"
            :items="completeStatus"
            solo
            item-text="text"
            item-value="value"
            :clearable="true"
            :placeholder="$t('label.completeness_placeholder')"
            @change="handleSearch()"
          />
        </v-col>
        <v-col cols="12" sm="3" class="mt-n8">
          <v-label class="title">{{ $t('label.urgency_level') }}</v-label>
          <v-select
            v-model="listQuery.is_urgency"
            :items="urgencyStatus"
            solo
            item-text="text"
            item-value="value"
            :clearable="true"
            :placeholder="$t('label.input_urgency_level')"
            @change="handleSearch()"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <hr class="thin">
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchFilter',
  props: {
    listQuery: {
      type: Object,
      default: null
    },
    districtCity: {
      type: Object,
      default: null
    },
    disabledDistrict: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFilter: true,
      sortOption: [
        { value: 'asc', label: 'A-Z' },
        { value: 'desc', label: 'Z-A' }
      ],
      applicantOrigin: [
        {
          text: this.$t('label.dinkes_province'),
          value: 'dinkes_provinsi'
        },
        {
          text: this.$t('label.pikobar'),
          value: 'pikobar'
        }
      ],
      referenceFaskes: [
        {
          text: this.$t('label.is_reference'),
          value: 1
        },
        {
          text: this.$t('label.is_not_reference'),
          value: 0
        }
      ],
      completeStatus: [
        {
          text: this.$t('label.not_complete'),
          value: 0
        },
        {
          text: this.$t('label.completed'),
          value: 1
        }
      ],
      urgencyStatus: [
        {
          text: this.$t('label.emergency'),
          value: 1
        },
        {
          text: this.$t('label.not_urgency'),
          value: 0
        }
      ]
    }
  },
  computed: {
    ...mapGetters('faskesType', [
      'faskesTypeList'
    ])
  },
  async mounted() {
    await this.$store.dispatch('faskesType/getListFaskesType')
  },
  methods: {
    handleSearch() {
      this.$emit('handle-search')
    },
    changeDate(value) {
      this.$emit('change-date', value)
    },
    onSelectDistrictCity(value) {
      this.$emit('selected-district-city', value)
    },
    exportData() {
      this.$emit('export-data')
    }
  }
}
</script>
