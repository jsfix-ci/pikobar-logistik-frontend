export default {
  listVaccineRequest: (state) => {
    return state.dataListVaccineRequest
  },
  totalListVaccineRequest: (state) => {
    return state.totalListVaccineRequest
  },
  totalDataVaccineRequest: (state) => {
    return state.totalDataVaccineRequest
  },
  // Detail Vaccine Request
  detailVaccineRequest: (state, getters) => {
    return state.dataDetailVaccineRequest
  },
  listVaccineNeeds: (state, getters) => {
    return state.dataListDetailVaccineNeeds
  },
  totalVaccineNeeds: (state, getters) => {
    return state.totalDetailVaccineNeeds
  }
}
