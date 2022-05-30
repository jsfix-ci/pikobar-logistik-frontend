import i18n from '@/lang'

export const mailOptions = [
  {
    text: 'Draft',
    value: 0
  },
  {
    text: 'Final',
    value: 1
  }
]

export const verificationOptions = [
  {
    text: i18n.t('status.not_verified'),
    value: 'not_verified'
  },
  {
    text: 'Terverifikasi',
    value: 'verified'
  },
  {
    text: i18n.t('label.accepted_with_note'),
    value: '1'
  }
]

export const warrantOptions = [
  {
    text: 'Belum Tersedia',
    value: 'not_yet'
  },
  {
    text: 'Tersedia',
    value: 'available'
  }
]

export const stageOptions = [
  {
    text: i18n.t('label.dashboard_unverified'),
    value: 'not_verified'
  },
  {
    text: i18n.t('label.recommend'),
    value: 'verified'
  },
  {
    text: i18n.t('label.realization'),
    value: 'approved'
  },
  {
    text: i18n.t('label.release_order'),
    value: 'finalized'
  },
  {
    text: 'Barang Keluar',
    value: 'integrated'
  }
]
