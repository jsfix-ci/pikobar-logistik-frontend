<template>
  <v-dialog
    v-model="dialog"
    max-width="490"
  >
    <v-card>
      <v-card-title class="headline">{{ $t('label.attention') }}</v-card-title>
      <v-card-text>
        <span>{{ $t('label.warning_letter') }} </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          text
          @click="goBack"
        >
          {{ $t('label.ok') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    }
  },
  created() {
    this.dialog = true
  },
  methods: {
    goBack() {
      this.dialog = false
      this.$router.go(-1)
    }
  }
}
</script>
