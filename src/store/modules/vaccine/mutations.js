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
    state.vaccineRequest = data
  },
  SET_VACCINE_PRODUCT_REQUESTS: (state, data) => {
    state.vaccineProductRequests = data
  },
  SET_ALLOCATION_MATERIALS: (state, data) => {
    state.allocationMaterials = data
  },
  LOAD_DATA_STOCK: (state, data) => {
    state.loadDataStock = data
  },
  // Vaccine Stock Item
  SET_VACCINE_ITEM_STOCK: (state, data) => {
    state.vaccineItemStock = data
  }
}
