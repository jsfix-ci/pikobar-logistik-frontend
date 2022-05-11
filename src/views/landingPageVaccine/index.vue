<template>
  <div class="landing-page">
    <div>
      <!-- Header -->
      <section class="d-flex flex-row justify-space-between py-5">
        <img src="/img/icons/pengajuan-logistik.svg" alt="pengajuan logistik">
        <v-btn
          depressed
          height="38px"
          min-width="0px"
          class="landing-page__btn green-dark white--text py-2 px-4"
          @click="onInfoClick"
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
          <v-col order-sm="last" cols="12" sm="12" class="d-flex flex-column align-center">
            <h1 class="landing-page__title text-center">
              {{ $t('label.vaccine_needs_request') }}
            </h1>
            <p class="landing-page__text text-center">
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
          <v-col cols="12" sm="12" class="d-flex justify-center">
            <img
              width="358px"
              height="262px"
              src="/img/icons/vaccination.png"
              alt="vaccination"
            >
          </v-col>
        </v-row>
      </section>

      <!-- Vaccine Tracking -->
      <!-- TEMPORARILY HIDDEN -->
      <!-- <section class="landing-page__main-section--grey d-flex flex-row justify-space-between">
        <img src="/img/icons/vaccine-track-left.svg" alt="vaccine track">
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
        <img src="/img/icons/vaccine-track-right.svg" alt="vaccine track">
      </section> -->
    </div>
    <div class="landing-page__footer d-flex flex-row py-4 justify-center">
      Copyright © Pikobar Logistik 2022. All rights reserved
    </div>

    <v-dialog v-model="showRequirement" max-width="800px">
      <RequirementPopUp @close="showRequirement = false" />
    </v-dialog>
  </div>
</template>

<script>
import RequirementPopUp from './RequirementPopUp.vue'
export default {
  components: {
    RequirementPopUp
  },
  data() {
    return {
      showRequirement: false
    }
  },
  methods: {
    onRequest() {
      this.showRequirement = true
    },
    onTracking() {
      this.$router.push('/tracking')
    },
    onInfoClick() {
      window.open(`https://wa.me/${process.env.VUE_APP_HOTLINE_PIKOBAR}`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  padding: 0 150px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    max-width: 50%;
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

  &__footer {
    background-color: #006430;
    color: white;
    font-family: 'Lato';
    font-weight: 700;
    font-size: 11px;
    line-height: 18px;
    width: 100vw;
    margin: 0 -150px;
  }
}
</style>
