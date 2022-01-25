export default {
  SET_LIST_MATERIAL: (state, data) => {
    state.listMaterial = data
  },

  SET_LIST_VACCINE_REQUEST: (state, data) => {
    state.dataListVaccineRequest = data
  },

  SET_TOTAL_LIST_VACCINE_REQUEST: (state, data) => {
    state.totalListVaccineRequest = data
  },

  SET_TOTAL_DATA_VACCINE_REQUEST: (state, data) => {
    state.totalDataVaccineRequest = data
  },
  // Detail Vaccine Request
  SET_DETAIL_VACCINE_REQUEST: (state, data) => {
    state.dataDetailVaccineRequest = data
  },
  SET_LIST_DETAIL_VACCINE_NEEDS: (state, data) => {
    state.dataListDetailVaccineNeeds = data
  },
  SET_TOTAL_DETAIL_VACCINE_NEEDS: (state, data) => {
    state.totalDetailVaccineNeeds = data
  }
}
