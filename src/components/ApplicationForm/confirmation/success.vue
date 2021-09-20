<template>
  <div>
    <v-row align="center" justify="center">
      <img height="200" src="@/static/berhasil.svg">
    </v-row>
    <v-row align="center" justify="center">
      <div class="save-style-data-confirmation">{{ $t('label.save_success') }}</div>
    </v-row>
    <v-row align="center" justify="center" class="confirmation-text mt-7">
      {{ $t('label.loading_done_one') }}
    </v-row>
    <v-row align="center" justify="center" class="confirmation-text mt-3">
      {{ $t('label.loading_done_two') }}
    </v-row>
    <br>
    <v-row align="center" justify="center" class="mt-3 mb-15">
      <v-btn href="/#/landing-page">{{ $t('label.back') }}</v-btn>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'SuccessRequest'
}
</script>
