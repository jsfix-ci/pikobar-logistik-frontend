import i18n from '@/lang'
export default [
  // @todo: replace all model props with real props from API
  {
    id: 1,
    label: i18n.t('label.outgoing_letter_number'),
    model: 'letter_number',
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
    model: 'applicant_position',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 5,
    label: i18n.t('label.instance_type'),
    model: 'applicant_agency_type',
    type: 'dropdown',
    isRequired: true,
    rules: 'required',
    options: 'listFaskesType',
    placeholder: i18n.t('label.select_instance_type'),
    itemText: 'name',
    itemValue: 'id'
  },
  {
    id: 6,
    label: i18n.t('label.applicant_instance_name'),
    model: 'applicant_agency_id',
    type: 'dropdown',
    isRequired: true,
    rules: 'required',
    options: 'listFaskes',
    placeholder: i18n.t('label.choose_instance'),
    itemText: 'nama_faskes',
    itemValue: 'id',
    key: 'applicant_agency_type',
    isReturnObject: true
  },
  {
    id: 7,
    label: i18n.t('label.distribution_note'),
    model: 'distribution_description',
    type: 'text',
    isRequired: true,
    rules: 'required'
  },
  {
    id: 8,
    label: i18n.t('label.applicant_letter_link'),
    model: 'letter_url',
    type: 'text',
    isRequired: true,
    rules: 'required|url'
  }
]
