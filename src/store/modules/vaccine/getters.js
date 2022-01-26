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
  vaccineRequest: (state) => {
    return state.vaccineRequest
  },
  vaccineProductRequests: (state) => {
    return state.vaccineProductRequests
  },
  allocationMaterials: (state) => {
    return state.allocationMaterials
  },
  loadDataStock: (state) => {
    return state.loadDataStock
  }
}
