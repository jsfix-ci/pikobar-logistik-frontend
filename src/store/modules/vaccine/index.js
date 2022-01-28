import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  // vaccine
  dataListVaccineRequest: [],
  totalListVaccineRequest: 0,
  totalDataVaccineRequest: 0,
  listMaterial: [],
  // Detail Vaccine Request
  vaccineRequest: {},
  vaccineProductRequests: [],
  listRealization: [],
  totalListRealization: 0,
  totalDataRealization: 0,
  allocationMaterials: [],
  loadDataStock: false
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
