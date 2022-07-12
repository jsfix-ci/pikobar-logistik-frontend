<template>
  <v-dialog
    v-model="value"
    max-width="500px"
    persistent
  >
    <!-- Dialog with form -->
    <div v-if="type === 'verifWithNote'" class="detail-dialog">
      <img
        src="/img/confirmation.svg"
        alt="confirmation"
        width="320"
        height="187"
      >
      <span class="detail-dialog__title">
        Anda yakin permohonan ini diterima dengan catatan? Mengapa?
      </span>
      <div class="d-flex flex-column">
        <v-checkbox
          v-for="item in noteList"
          :key="item.id"
          v-model="note"
          hide-details
          :label="item.name"
          :value="item"
          :error="showError"
          multiple
          class="detail-dialog__note"
        />
        <span class="detail-dialog__note mt-6">Alasan Lainnya/Keterangan</span>
        <v-textarea
          v-model="extraNote"
          placeholder="Tulis alasan/keterangan di sini (opsional)"
          hide-details
        />
        <span v-if="showError" class="detail-dialog__note mt-2 red--text">Harap mengisi catatan</span>
      </div>
      <div class="d-flex flex-row justify-space-between mt-10" style="width: 100%">
        <JDSButton inverted height="42px" width="200px" @click="$emit('close')">
          Sebentar, cek Kembali
        </JDSButton>
        <JDSButton height="42px" width="200px" @click="onVerifyWithNote">
          Terima dengan Catatan
        </JDSButton>
      </div>
    </div>

    <!-- Default Dialog -->
    <div v-else class="detail-dialog">
      <img
        v-if="content.image"
        :src="content.image"
        alt="dialog-image"
        width="320"
        height="187"
      >
      <span class="detail-dialog__title" style="white-space:pre-wrap;">
        {{ content.title }}
      </span>
      <span v-if="content.subtitle" class="detail-dialog__subtitle" style="white-space:pre-wrap;">
        {{ content.subtitle }}
      </span>
      <div class="d-flex flex-row justify-space-between mt-10" style="width: 100%">
        <JDSButton
          v-if="content.buttonLeft"
          :inverted="content.buttonLeft.isInverted"
          height="42px"
          :width="content.buttonRight ? '200px' : '420px'"
          @click="content.buttonLeft.onClick"
        >
          {{ content.buttonLeft.label }}
        </JDSButton>
        <JDSButton
          v-if="content.buttonRight"
          :inverted="content.buttonRight.isInverted"
          height="42px"
          :width="content.buttonLeft ? '200px' : '420px'"
          @click="content.buttonRight.onClick"
        >
          {{ content.buttonRight.label }}
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
    },
    instanceLead: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      note: [],
      noteList: [],
      extraNote: '',
      showError: false,
      content: {},
      listContent: {
        verifConfirmation: {
          image: '/img/confirmation.svg',
          title: 'Anda yakin permohonan ini lolos verifikasi?',
          buttonLeft: {
            label: 'Cek Kembali',
            isInverted: true,
            onClick: () => { this.$emit('close') }
          },
          buttonRight: {
            label: 'Ya, Verifikasi!',
            onClick: () => { this.$emit('verify', { isVerifWithNote: false }) }
          }
        },
        success: {
          image: '/img/verified.svg',
          title: 'Permohonan telah diverifikasi',
          subtitle: 'Selanjutnya silakan cek menu rekomendasi',
          buttonLeft: {
            label: 'Kembali ke Verifikasi',
            isInverted: true,
            onClick: () => { this.$router.push('/admin-verification') }
          },
          buttonRight: {
            label: 'Lanjut ke Rekomendasi',
            onClick: () => { this.$router.push('/recommendation') }
          }
        },
        verifWithNoteSuccess: {
          image: '/img/warning.svg',
          title: 'Permohonan telah \n diterima dengan catatan!',
          // TEMPORARILY HIDDEN
          // subtitle: 'Silakan update permohonan yang \n diterima dengan catatan pada menu “Arsip”',
          buttonLeft: {
            label: 'Kembali ke Verifikasi',
            isInverted: true,
            onClick: () => { this.$router.push('/admin-verification') }
          },
          buttonRight: {
            label: 'Lanjut ke Rekomendasi',
            onClick: () => { this.$router.push('/recommendation') }
          }
        },
        notUpdated: {
          image: '/img/warning.svg',
          title: 'Harap Update Barang Anda!',
          subtitle: 'Cek area yang bertuliskan “Belum Diupdate”',
          buttonLeft: {
            label: ' Cek Kembali',
            isInverted: true,
            onClick: () => { this.$emit('close') }
          }
        },
        recommendConfirmation: {
          image: '/img/confirmation.svg',
          title: `Apakah proses rekomendasi ini telah disetujui oleh ${this.instanceLead.role}?`,
          subtitle: `(${this.instanceLead.fullname})`,
          buttonLeft: {
            label: 'Tanya Kembali',
            isInverted: true,
            onClick: () => { this.$emit('close') }
          },
          buttonRight: {
            label: 'Ya, Telah Disetujui',
            onClick: () => { this.$emit('recommend') }
          }
        },
        recommendSuccess: {
          image: '/img/email.svg',
          title: 'Proses Rekomendasi Telah Selesai!',
          subtitle: `Permohonan akan dikirim kepada ${this.instanceLead.role} \n \n (${this.instanceLead.fullname})`,
          buttonRight: {
            label: 'Kembali ke Rekomendasi',
            onClick: () => { this.$router.push('/recommendation') }
          }
        },
        realizeConfirmation: {
          image: '/img/confirmation.svg',
          title: `Apakah proses realisasi ini telah disetujui oleh ${this.instanceLead.role}?`,
          subtitle: `(${this.instanceLead.fullname})`,
          buttonLeft: {
            label: 'Sebentar, cek kembali',
            isInverted: true,
            onClick: () => { this.$emit('close') }
          },
          buttonRight: {
            label: 'Ya, realisasikan',
            onClick: () => { this.$emit('realize') }
          }
        },
        realizeSuccess: {
          image: '/img/email.svg',
          title: 'Permohonan telah direalisasikan',
          subtitle: `Permohonan telah dikirim kepada ${this.instanceLead.role}`,
          buttonRight: {
            label: 'Kembali ke Menu Realisasi',
            onClick: () => { this.$router.push('/realization') }
          }
        },
        deliverConfirmation: {
          image: '/img/confirmation.svg',
          title: 'Apakah Anda yakin Data Perintah Pengeluaran Barang Ini Sudah Benar?',
          buttonLeft: {
            label: 'Cek kembali',
            isInverted: true,
            onClick: () => { this.$emit('close') }
          },
          buttonRight: {
            label: 'Ya',
            onClick: () => { this.$emit('deliver') }
          }
        },
        deliverSuccess: {
          image: '/img/email.svg',
          title: 'Perintah Pengeluaran dan Penyaluran Barang Telah Selesai',
          buttonRight: {
            label: 'Kembali Ke Menu Satuan Tugas',
            onClick: () => { this.$router.push('/delivery-plan') }
          }
        },
        deliveryLoading: {
          image: '/img/icons/vaccine-track-right.svg',
          title: 'Sedang cek stok, Mohon Menunggu'
        }
      }
    }
  },
  watch: {
    note() {
      this.showError = this.note.length <= 0
    },
    extraNote() {
      this.showError = this.extraNote === ''
    },
    type(val) {
      this.content = { ...this.listContent[val] }
    }
  },
  async mounted() {
    if (this.type === 'verifWithNote') {
      this.noteList = await this.$store.dispatch('vaccine/getVaccineStatusNote')
    } else {
      this.content = { ...this.listContent[this.type] }
    }
  },
  methods: {
    async onVerifyWithNote() {
      this.showError = false
      const isValid = this.note.length > 0 || this.extraNote !== ''
      if (!isValid) {
        this.showError = true
        return
      }
      this.$emit('verify', {
        isVerifWithNote: true,
        note: this.note,
        extraNote: this.extraNote
      })
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
