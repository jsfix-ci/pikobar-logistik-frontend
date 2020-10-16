import { required, email, max, numeric } from 'vee-validate/dist/rules'
import { isContainHtmlTags, isPhoneNumber } from '@/utils/validate'
import { extend, setInteractionMode } from 'vee-validate'
import i18n from '@/lang'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled', values)
})

extend('requiredInstanceType', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_instance_type', values)
})

extend('requiredInstanceName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_instance_name', values)
})

extend('requiredCityName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_city_name', values)
})

extend('requiredDistrictName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_district_name', values)
})

extend('requiredVillageName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_village_name', values)
})

extend('requiredFullAddress', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_full_address', values)
})

extend('requiredRegistrationNumber', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_registraion_number', values)
})

extend('requiredLicenseNumberFacility', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_license_number_facility', values)
})

extend('requiredFaskesName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_faskes_name', values)
})

extend('requiredUpperName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_upper_name', values)
})

extend('requiredApplicantName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_applicant_name', values)
})

extend('requiredApplicantPosition', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_applicant_position', values)
})

extend('requiredApplicantEmail', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_applicant_email', values)
})

extend('requiredApplicantPhoneNumber', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_applicant_phone_number', values)
})

extend('requiredAPDName', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_apd_name', values)
})

extend('requiredBrand', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_brand', values)
})

extend('requiredTotal', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_total', values)
})

extend('requiredUnit', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_unit', values)
})

extend('requiredPurpose', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_purpose', values)
})

extend('requiredUrgencyLevel', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_urgency_level', values)
})

extend('requiredRealizationAmount', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_realization_amount', values)
})

extend('requiredTrackingField', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_tracking', values)
})

extend('numericRealizationAmount', {
  ...numeric,
  message: (_, values) => i18n.t('errors.field_unauthorized_characters_realization_amount', values)
})

extend('requiredRealizationDate', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_realization_date', values)
})

extend('requiredStatus', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_status', values)
})

extend('requiredApplicantLetterNumber', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_applicant_letter_number', values)
})

extend('requiredReasonReject', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled_reason_reject', values)
})

extend('max', {
  ...max,
  message: 'This field must be {length} characters or less'
})

extend('numeric', {
  ...numeric,
  message: (_, values) => i18n.t('errors.field_unauthorized_characters', values)
})

extend('email', {
  ...email,
  message: (_, values) => i18n.t('errors.field_must_be_valid_email', values)
})

extend('isHtml', {
  message: (_, values) => i18n.t('errors.field_unauthorized_characters', values),
  validate: value => {
    return !isContainHtmlTags(value)
  }
})

extend('isPhoneNumber', {
  message: (_, values) => i18n.t('errors.field_phone_number_not_valid', values),
  validate: value => {
    return isPhoneNumber(value)
  }
})

extend('notMinus', {
  message: (_, values) => i18n.t('errors.not_minus', values),
  validate: value => {
    return value > 0
  }
})

extend('atLeastOne', {
  message: 'At least one item must be selected.',
  validate: (value) => {
    return value.length > 0
  }
})

extend('phoneRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.phone_number', values)
})

extend('addressRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.address', values)
})

extend('distributionDestinationRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.distribution_destination', values)
})

extend('distributionDestinationNameRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.distribution_destination_name', values)
})

extend('distributionQuantityRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.distribution_quantity', values)
})

extend('contactPersonRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.contact_person', values)
})

extend('distributionDateRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.distribution_date', values)
})

extend('subDistricRequired', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.select_sub_district', values)
})

extend('letterName', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.letter_name', values)
})

extend('letterNumber', {
  ...required,
  message: (_, values) => i18n.t('errors.required_fields.letter_number', values)
})
