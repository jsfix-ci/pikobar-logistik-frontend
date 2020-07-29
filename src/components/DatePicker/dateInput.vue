<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    width="100%"
    min-width="none"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider
        v-slot="{ errors }"
        rules="requiredRealizationDate"
      >
        <v-text-field
          v-model="dateFormatted"
          persistent-hint
          clearable
          outlined
          solo-inverted
          :placeholder="$t('label.input_date')"
          append-icon="event"
          :error-messages="errors"
          v-on="on"
          @click:clear="date = null"
        />
      </ValidationProvider>
    </template>
    <v-date-picker v-model="date" no-title @input="menu = false" @change="handleSelectedDate(date)" />
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'DatePickerInput',
  components: {
    ValidationProvider
  },
  props: {
    value: {
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
      date: null,
      dateFormatted: null
    }
  },
  watch: {
    date(val) {
      if (this.date === null) {
        this.handleSelectedDate('')
      } else {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    value() {
      if (this.value !== '') {
        this.date = this.value
        this.dateFormatted = this.formatDate(this.value)
      } else {
        this.date = null
        this.dateFormatted = null
      }
    }
  },
  mounted() {
    this.date = this.value
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      return this.$moment(date).format('L')
    },
    handleSelectedDate(value) {
      this.$emit('selected', value)
    }
  }
}
</script>
