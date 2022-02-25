<template>
  <div class="d-flex flex-column align-center">
    <span class="success__title mb-6">
      {{ $t('label.vaccine_save_success') }}
    </span>
    <img height="200" src="../../static/berhasil.svg">
    <div class="d-flex flex-row align-center my-6">
      <span class="success__request-id">
        {{ $t('label.request_id') }}
      </span>
      <strong class="mx-5">
        {{ requestId }}
      </strong>
      <v-icon @click="onCopy">
        mdi-content-copy
      </v-icon>
    </div>

    <strong class="success__section-title">
      {{ $t('label.verification') }}
    </strong>
    <p class="success__section-content">
      Data Anda akan diverifikasi dan diproses oleh Sub Divisi Logistik Satgas Covid-19 Jawa Barat.
    </p>

    <strong class="success__section-title">
      {{ $t('label.confirmation') }}
    </strong>
    <p class="success__section-content">
      Progress permohonan akan diinfokan secara berkala melalui email/No. WhatApp pemohon.
    </p>

    <strong class="success__section-title">
      {{ $t('label.self_track') }}
    </strong>
    <p class="success__section-content">
      Lacak proses permohonan Anda melalui
      <strong>Fitur Lacak Pengajuan Logistik Vaksin</strong>
      dengan memasukkan ID/No. HP/Email Permohonan
    </p>
    <v-btn
      depressed
      height="38px"
      min-width="0px"
      class="success__btn green-dark white--text py-2 px-4 mb-6"
      @click="onTracking"
    >
      {{ $t('label.track') }}
    </v-btn>

    <strong class="success__section-title">
      Pertanyaan, Keluhan dan Kirim Surat Final
    </strong>
    <p class="success__section-content">
      Akses Hotline PIKOBAR pada nomor 08112093306 atau digital.service@jabarprov.go.id.
    </p>
    <v-btn
      depressed
      height="38px"
      min-width="0px"
      class="success__btn green-dark white--text py-2 px-4 mb-6"
      @click="goWhatsapp"
    >
      {{ $t('label.admin_greeting') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    requestId: {
      type: String,
      default: ''
    }
  },
  methods: {
    onTracking() {
      this.$router.push('/tracking')
    },
    onCopy() {
      navigator.clipboard.writeText(this.requestId)
    },
    goWhatsapp() {
      window.open(`https://wa.me/${process.env.VUE_APP_HOTLINE_PIKOBAR}`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.success {
  &__title {
    font-size: 26px;
    font-weight: 700;
    font-family: 'Lora', serif;
  }

  &__request-id {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }

  &__section-title {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }

  &__section-content {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  &__btn {
    text-transform: none;
    letter-spacing: 0;
    font-family: 'Lato', serif;
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
