<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    width="600"
    min-width="none"
  >
    <template v-slot:activator="{ on }">
      <div class="d-flex flex-column">
        <span v-if="jdsStyle" class="date__label">
          {{ label }}
        </span>
        <ValidationProvider
          v-slot="{ errors }"
          :rules="required ? rule : ''"
        >
          <v-text-field
            v-model="dateFormatted"
            clearable
            solo
            :placeholder="placeholder"
            :append-icon="jdsStyle ? '' : 'event'"
            :error-messages="errors"
            :class="{ 'date__input': jdsStyle }"
            v-on="on"
            @click:clear="resetDate"
          >
            <template v-if="jdsStyle" v-slot:prepend-inner>
              <img width="16" height="16" alt="calendar" src="/img/calendar.svg">
            </template>
          </v-text-field>
        </ValidationProvider>
      </div>
    </template>
    <v-dialog
      v-model="menu"
      max-width="650"
    >
      <v-card class="d-flex flex-column pa-5">
        <div
          class="d-flex"
          :class="{
            'flex-row justify-space-between': $vuetify.breakpoint.mdAndUp,
            'flex-column': $vuetify.breakpoint.xsOnly
          }"
        >
          <v-date-picker v-model="startDate" :max="endDate" no-title />
          <v-date-picker v-model="endDate" :max="currentDate" :min="startDate" no-title />
        </div>
        <v-card-actions class="align-self-center mt-2">
          <JDSButton
            v-if="jdsStyle"
            width="300px"
            @click="handleSelectedDate()"
          >
            {{ $t('label.apply') }}
          </JDSButton>
          <v-btn v-else color="primary" @click="handleSelectedDate()">{{ $t('label.apply') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import JDSButton from '@/components/Base/JDSButton'
export default {
  name: 'DatePickerDashboard',
  components: {
    ValidationProvider,
    JDSButton
  },
  props: {
    date: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    rule: {
      type: String,
      default: ''
    },
    initialStartDate: {
      type: String,
      default: null
    },
    initialEndDate: {
      type: String,
      default: null
    },
    jdsStyle: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Tanggal Bulan Tahun - Tanggal Bulan Tahun'
    }
  },
  data() {
    return {
      menu: false,
      startDate: this.initialStartDate || '2022-01-01',
      endDate: this.initialEndDate || this.$moment(Date.now()).format('YYYY-MM-DD'),
      dateFormatted: this.initialStartDate && this.initialEndDate
        ? `${this.$moment(this.initialStartDate).format('DD MMMM YYYY')} - ${this.$moment(this.initialEndDate).format('DD MMMM YYYY')}`
        : null,
      currentDate: this.$moment(Date.now()).format('YYYY-MM-DD')
    }
  },
  watch: {
    startDate(val) {
      if (this.startDate !== null && this.endDate !== null) {
        this.dateFormatted = `${this.$moment(this.startDate).format('DD MMMM YYYY')} - ${this.$moment(this.endDate).format('DD MMMM YYYY')}`
      }
    },
    endDate(val) {
      if (this.startDate !== null && this.endDate !== null) {
        this.dateFormatted = `${this.$moment(this.startDate).format('DD MMMM YYYY')} - ${this.$moment(this.endDate).format('DD MMMM YYYY')}`
      }
    }
  },
  methods: {
    handleSelectedDate() {
      this.menu = false
      this.$emit('selected', { startDate: this.startDate, endDate: this.endDate })
    },
    resetDate() {
      this.startDate = null
      this.endDate = null
      this.handleSelectedDate()
    }
  }
}
</script>
<style lang="scss" scoped>
.date {
  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
    margin-bottom: 8px;
  }

  &__input.theme--light.v-text-field--solo::v-deep {
    .v-input__slot {
      background: #FAFAFA !important;
      border-radius: 8px;
      min-height: 38px;
      font-family: 'Lato', sans-serif;
      font-size: 14px;
      color: #424242;
    }

    input::placeholder {
      color: #757575;
    }
  }
}
</style>
