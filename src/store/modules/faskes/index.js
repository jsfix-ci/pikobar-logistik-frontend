import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  listFaskes: [],
  listFaskesVaccine: [],
  detailFaskes: [],
  totalList: 0,
  totalData: 0
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
