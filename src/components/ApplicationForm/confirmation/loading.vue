<template>
  <div>
    <v-row align="center" justify="center">
      <img height="200" src="@/static/mengirim.svg">
    </v-row>
    <v-row align="center" justify="center" class="margin-wait-data-confirmation">
      {{ $t('label.wait') }}
    </v-row>
    <v-row align="center" justify="center" class="mt-5">
      {{ $t('label.loading_step_one') }}
    </v-row>
    <v-row align="center" justify="center">
      {{ $t('label.loading_step_two') }}
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'LoadingPage'
}
</script>
