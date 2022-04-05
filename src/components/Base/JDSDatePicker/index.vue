<template>
  <div class="jds-datepicker">
    <span class="jds-datepicker__label">
      {{ label }}
    </span>
    <v-menu
      ref="menu"
      v-model="menu"
      offset-y
      transition="scale-transition"
      width="100%"
      min-width="none"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFormatted"
          :clearable="clearable"
          :placeholder="placeholder"
          :hide-details="hideDetails"
          :error="error"
          :error-messages="errorMessages"
          solo
          v-on="on"
          @click:clear="$emit('clear')"
        >
          <template v-slot:prepend-inner>
            <img width="16" height="16" alt="calendar" src="/img/calendar.svg">
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        :value="value"
        no-title
        @input="$emit('input', $event)"
        @change="$emit('change')"
      />
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    errorMessages: {
      type: Array,
      default: () => []
    },
    error: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      menu: false,
      dateFormatted: null
    }
  },
  watch: {
    value(val) {
      this.dateFormatted = val ?? this.formatDate(val)
    }
  },
  methods: {
    formatDate(date) {
      return date ?? this.$moment(date).format('L')
    }
  }
}
</script>

<style lang="scss" scoped>
.jds-datepicker {
  display: flex;
  flex-direction: column;

  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
    margin-bottom: 8px;
  }
}

.theme--light.v-text-field--solo::v-deep {
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
.theme--light.v-list::v-deep {
  .v-list-item__title {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #424242;
  }
}
</style>
