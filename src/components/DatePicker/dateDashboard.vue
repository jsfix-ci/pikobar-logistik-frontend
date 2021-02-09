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
      <ValidationProvider
        v-slot="{ errors }"
        :rules="required ? rule : ''"
      >
        <v-text-field
          v-model="dateFormatted"
          clearable
          solo
          :placeholder="$t('label.date_dashboard_placeholder')"
          append-icon="event"
          :error-messages="errors"
          v-on="on"
          @click:clear="resetDate"
        />
      </ValidationProvider>
    </template>
    <v-dialog
      v-model="menu"
      max-width="650"
    >
      <v-card>
        <v-date-picker v-model="startDate" :max="endDate" no-title />
        <v-date-picker v-model="endDate" :max="currentDate" :min="startDate" no-title />
        <v-card-actions>
          <v-col cols="12" sm="12" md="2" offset-md="7">
            <v-btn color="primary" @click="handleSelectedDate()">{{ $t('label.apply') }}</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'DatePickerDashboard',
  components: {
    ValidationProvider
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
    }
  },
  data() {
    return {
      menu: false,
      startDate: '2020-01-01',
      endDate: this.$moment(Date.now()).format('YYYY-MM-DD'),
      dateFormatted: null,
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
