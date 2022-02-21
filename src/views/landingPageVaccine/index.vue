<template>
  <div class="landing-page">
    <!-- Header -->
    <section class="d-flex flex-row justify-space-between py-5">
      <img src="../../../public/img/icons/pengajuan-logistik.svg" alt="pengajuan logistik">
      <v-btn
        depressed
        height="38px"
        min-width="0px"
        class="landing-page__btn green-dark white--text py-2 px-4"
        @click="onNext"
      >
        <v-icon
          right
          dark
          class="mr-2 ml-0"
        >
          mdi-alert-circle
        </v-icon>
        {{ $t('label.ask_us') }}
      </v-btn>
    </section>

    <hr class="my-0">

    <!-- Vaccine Request -->
    <section class="landing-page__main-section py-5">
      <v-row>
        <v-col cols="12" md="6" sm="12" class="d-flex flex-column">
          <h1 class="landing-page__title">
            {{ $t('label.vaccine_needs_request') }}
          </h1>
          <p class="landing-page__text">
            Portal ini berfungsi untuk mendata permohonan vaksin dan logistik pendukung vaksin yang diperuntukkan bagi
            <strong class="green-dark--text">Dinas Kesehatan, TNI, POLRI</strong>
            dan
            <strong class="green-dark--text">Instansi lainnya</strong>
            yang hendak melakukan vaksinasi.
          </p>
          <v-btn
            depressed
            height="44px"
            min-width="0px"
            max-width="176px"
            class="landing-page__btn d-flex green-dark white--text py-3 px-6"
            @click="onRequest"
          >
            {{ $t('label.request_vaccine') }}
            <v-icon
              right
              dark
            >
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" sm="12" class="d-flex justify-center">
          <img src="../../../public/img/icons/vaccination.svg" alt="vaccination">
        </v-col>
      </v-row>
    </section>

    <!-- Vaccine Tracking -->
    <section class="landing-page__main-section--grey d-flex flex-row justify-space-between">
      <img src="../../../public/img/icons/vaccine-track-left.svg" alt="vaccine track">
      <div class="d-flex flex-column align-center">
        <span class="landing-page__vaccination-track__title">Lacak Pengajuan Vaksin</span>
        <p align="center" class="landing-page__vaccination-track__text">
          Bingung permohonan Anda sudah sampai mana?
          <br>
          Yuk, cari tahu sejauh mana tahapan permohonan vaksin Anda.
        </p>
        <v-btn
          depressed
          height="42px"
          min-width="0px"
          max-width="167px"
          class="landing-page__btn landing-page__btn__inverted d-flex green-dark--text py-3 px-6"
          @click="onTracking"
        >
          {{ $t('label.track_request') }}
        </v-btn>
      </div>
      <img src="../../../public/img/icons/vaccine-track-right.svg" alt="vaccine track">
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    onRequest() {
      this.$store.dispatch('logistics/setFormRequestType', 'vaksin')
      this.$router.push('/form-pemohon')
    },
    onTracking() {
      this.$router.push('/tracking')
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  padding: 0 150px;
  background-color: white;
  height: 100vh;

  &__title {
    font-family: 'Lora';
    font-weight: 700;
    font-size: 40px;
    color: #424242;
  }

  &__text {
    font-family: 'Roboto';
    font-size: 16px;
  }

  &__main-section {
    margin: 150px 0 100px 0;

    &--grey {
      background-color: #FAFAFA;
      border-radius: 8px;
      padding: 24px 40px;
    }
  }

  &__vaccination-track {
    &__title {
      font-family: 'Roboto';
      font-size: 21px;
      font-weight: 500;
      color: #424242;
    }

    &__text {
      font-size: 16px;
      color: #757575;
    }
  }

  &__btn {
    text-transform: none;
    letter-spacing: 0;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 14px;

    &__inverted {
      border-color: #069550;
      border-style: solid;
      border-width: 1px;
    }
  }
}
</style>
