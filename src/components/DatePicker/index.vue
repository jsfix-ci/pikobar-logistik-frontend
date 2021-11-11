<template>
  <v-menu
    ref="menu1"
    v-model="menu1"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    width="100%"
    min-width="none"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider
        v-slot="{ errors }"
        :rules="required ? rule : ''"
        :name="name || $t('label.date')"
      >
        <v-text-field
          v-model="dateFormatted"
          hint="dd/mm/yyyy"
          persistent-hint
          clearable
          solo
          :placeholder="$t('label.date_placeholder')"
          prepend-icon="event"
          :error-messages="errors"
          v-on="on"
          @click:clear="date = null"
        />
      </ValidationProvider>
    </template>
    <v-date-picker v-model="date" no-title @input="menu1 = false" @change="handleSelectedDate(date)" />
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'DatePicker',
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
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menu1: false,
      date: null,
      dateFormatted: null
    }
  },
  watch: {
    date(val) {
      if (this.date == null) {
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

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    handleSelectedDate(value) {
      this.$emit('selected', value)
    }
  }
}
</script>
