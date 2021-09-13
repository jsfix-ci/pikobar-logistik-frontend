<template>
  <v-card class="mx-auto" outlined>
    <v-col>
      <v-row class="margin-top-min-15">
        <v-col>
          <span class="main-color-data-confirmation">Jumlah Pasien COVID-19 yang ditangani</span>
          <br>
          <v-label>
            {{ applicantLetter.total_covid_patients || '-' }} Orang
          </v-label>
        </v-col>
        <v-col>
          <span class="main-color-data-confirmation">Jumlah Tempat Tidur</span>
          <br>
          <v-label>
            {{ applicantLetter.total_bedroom || '-' }} Tempat Tidur
          </v-label>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span class="main-color-data-confirmation">Jumlah Ruang Isolasi</span>
          <br>
          <v-label>
            {{ applicantLetter.total_isolation_room || '-' }} Ruangan
          </v-label>
        </v-col>
        <v-col>
          <span class="main-color-data-confirmation">Jumlah Tenaga Kesehatan</span>
          <br>
          <v-label>
            {{ applicantLetter.total_health_worker || '-' }} Orang
          </v-label>
        </v-col>
      </v-row>
    </v-col>
  </v-card>
</template>
<script>
export default {
  name: 'FaskesStatus',
  props: {
    applicantLetter: {
      type: Object,
      default: null
    }
  }
}
</script>
