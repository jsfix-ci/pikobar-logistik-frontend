import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  // vaccine
  dataListVaccineRequest: [],
  totalListVaccineRequest: 0,
  totalDataVaccineRequest: 0,
  listMaterial: []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
