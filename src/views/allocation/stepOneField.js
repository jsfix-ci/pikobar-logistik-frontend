import i18n from '@/lang'
export default [
  // @todo: replace all model props with real props from API
  {
    id: 1,
    label: i18n.t('label.outgoing_letter_number'),
    model: 'outgoing_letter_number',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 2,
    label: i18n.t('label.letter_date'),
    model: 'letter_date',
    type: 'date',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 3,
    label: i18n.t('label.applicant_name'),
    model: 'applicant_name',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 4,
    label: i18n.t('label.applicant_position_identity'),
    model: 'applicant_position_identity',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 5,
    label: i18n.t('label.applicant_instance_code'),
    model: 'applicant_instance_code',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 6,
    label: i18n.t('label.applicant_instance_name'),
    model: 'applicant_instance_name',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 7,
    label: i18n.t('label.distribution_note'),
    model: 'distribution_note',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 8,
    label: i18n.t('label.applicant_letter_link'),
    model: 'applicant_letter_link',
    type: 'text',
    isRequired: true,
    rules: 'required'
  }
]
