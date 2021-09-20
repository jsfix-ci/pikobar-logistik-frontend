<template>
  <div>
    <div class="header-landing-page">
      <v-row justify="space-between" align="center">
        <v-col cols="12" md="8" xs="12">
          <v-row>
            <router-link to="/landing-page">
              <v-img :max-width="40" src="@/static/logistik_logo_lingkar.svg" />
            </router-link>
            <router-link to="/landing-page">
              <div class="title-page-data-confirmation">{{ $t('label.applicant_form_title') }}</div>
            </router-link>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-row class="float-right-landing-page">
            <a :href="$t('label.link_tutorial')" target="_blank"><v-icon color="white" size="25">{{ $t('label.icon_help') }}</v-icon></a>
            <a :href="$t('label.link_tutorial')" target="_blank"><div class="tutorial-class-form-pemohon pusat-bantuan-landing-page">{{ $t('label.tutorial') }}</div></a>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderLandingPage'
}
</script>
