<template>
  <v-dialog
    v-model="value"
    max-width="500px"
    :persistent="type === 'success'"
    @click:outside="$emit('close')"
  >
    <!-- Verification Confirmation Dialog -->
    <div v-if="type === 'verifConfirmation'" class="detail-dialog">
      <img
        src="/img/confirmation.svg"
        alt="confirmation"
        width="320px"
        height="187px"
      >
      <span class="detail-dialog__title">
        Anda yakin permohonan ini lolos verifikasi?
      </span>
      <div class="d-flex flex-row justify-space-between mt-10" style="width: 100%">
        <JDSButton inverted height="42px" width="200px" @click="$emit('close')">
          Cek Kembali
        </JDSButton>
        <JDSButton height="42px" width="200px" @click="$emit('verify', false)">
          Ya, Verifikasi!
        </JDSButton>
      </div>
    </div>

    <!-- Verified Success Dialog -->
    <div v-else-if="type === 'success'" class="detail-dialog">
      <img
        src="/img/verified.svg"
        alt="success"
        width="320px"
        height="187px"
      >
      <span class="detail-dialog__title">
        Permohonan telah diverifikasi
      </span>
      <span class="detail-dialog__subtitle">
        Selanjutnya silakan cek menu rekomendasi
      </span>
      <div class="d-flex flex-row justify-space-between mt-10" style="width: 100%">
        <JDSButton inverted height="42px" width="200px" @click="$router.push('/admin-verification')">
          Kembali ke Verifikasi
        </JDSButton>
        <JDSButton height="42px" width="200px" @click="$router.push('/recommendation')">
          Lanjut ke Rekomendasi
        </JDSButton>
      </div>
    </div>

    <!-- Verified with Note Dialog -->
    <div v-else-if="type === 'verifWithNote'" class="detail-dialog">
      <img
        src="/img/confirmation.svg"
        alt="confirmation"
        width="320px"
        height="187px"
      >
      <span class="detail-dialog__title">
        Anda yakin permohonan ini diterima dengan catatan? Mengapa?
      </span>
      <div class="d-flex flex-column">
        <v-checkbox
          v-model="note"
          hide-details
          label="Tujuan surat salah, seharusnya kepada Dinas Kesehatan Provinsi Jawa Barat"
          value="Tujuan surat salah, seharusnya kepada Dinas Kesehatan Provinsi Jawa Barat"
          class="detail-dialog__note"
        />
        <v-checkbox
          v-model="note"
          hide-details
          label="Detail permohonan di surat dan aplikasi tidak sama."
          value="Detail permohonan di surat dan aplikasi tidak sama."
          class="detail-dialog__note"
        />
        <v-checkbox
          v-model="note"
          hide-details
          label="Barang yang dimohon sedang tidak tersedia"
          value="Barang yang dimohon sedang tidak tersedia"
          class="detail-dialog__note"
        />
        <span class="detail-dialog__note mt-6">Alasan Lainnya/Keterangan</span>
        <v-textarea
          v-model="extraNote"
          placeholder="Tulis alasan/keterangan di sini"
        />
      </div>
      <div class="d-flex flex-row justify-space-between mt-10" style="width: 100%">
        <JDSButton inverted height="42px" width="200px" @click="$emit('close')">
          Sebentar, cek Kembali
        </JDSButton>
        <JDSButton height="42px" width="200px" @click="$emit('verify', true)">
          Terima dengan Catatan
        </JDSButton>
      </div>
    </div>

    <!-- Verified with Note Success Dialog -->
    <div v-else-if="type === 'verifWithNoteSuccess'" class="detail-dialog">
      <img
        src="/img/rejected.svg"
        alt="rejected"
        width="320px"
        height="187px"
      >
      <span class="detail-dialog__title">
        Permohonan telah <br> diterima dengan catatan!
      </span>
      <span class="detail-dialog__subtitle">
        Silakan update permohonan yang <br> diterima dengan catatan pada menu “Arsip”
      </span>
      <div class="d-flex flex-row justify-space-between mt-10" style="width: 100%">
        <JDSButton inverted height="42px" width="200px" @click="$router.push('/admin-verification')">
          Kembali ke Verifikasi
        </JDSButton>
        <JDSButton height="42px" width="200px" @click="$router.push('/recommendation')">
          Lanjut ke Rekomendasi
        </JDSButton>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSButton
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      note: [],
      extraNote: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-dialog {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #424242;
    text-align: center;
    margin-top: 40px;
  }

  &__subtitle {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #757575;
    text-align: center;
  }

  &__note {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #424242;
    line-height: 16px;
  }
}

.v-text-field::v-deep {
  .v-text-field__slot {
    background: #FAFAFA;
    border-radius: 8px;
    border-width: 1px;
    border-color: #9E9E9E;
    border-style: solid;
    padding: 10px 8px;
  }
  .v-input__slot::after, .v-input__slot::before {
    display: none;
  }
}
</style>
