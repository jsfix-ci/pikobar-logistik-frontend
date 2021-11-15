import actions from './actions'
import mutations from './mutations'

const state = {
  listAllocation: [],
  totalListAllocation: null,
  totalListAllocationPage: null,
  totalAllocation: null,
  totalSuccess: null,
  totalDraft: null,
  detailAllocationInfo: null,
  detailAllocationData: null,
  // @todo: adjust this payload to API needs
  allocationForm: {
    letter_number: '',
    letter_date: '',
    applicant_name: '',
    applicant_position: '',
    applicant_agency_code: '',
    applicant_agency_name: '',
    distribution_description: '',
    letter_url: '',
    // @todo: remove this dummy instance_list array
    instance_list: [
      {
        agency_type: '',
        agency_type_name: '',
        agency_id: '',
        agency_name: '',
        delivery_date: '',
        additional_information: '',
        isExtended: false,
        listAgency: [],
        allocation_material_requests: [
          {
            material_id: '',
            material_name: '',
            qty: ''
          }
        ]
      }
    ]
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
