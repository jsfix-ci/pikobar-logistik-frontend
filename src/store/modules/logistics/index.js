import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  dataListAPD: [],
  dataListApdUnit: [],
  dataInstanceType: [],
  dataListLogisticRequest: [],
  totalListLogisticRequest: 0,
  totalDataLogisticRequest: 0,
  dataDetailLogisticRequest: {},
  totalDetailLogisticNeeds: 0,
  dataListDetailLogisticNeeds: [],
  dataLogisticRequestSummary: {},
  dataFaskesTypeTotalRequest: [],
  dataProductTotalRequest: [],
  dataCityTotalRequest: [],
  listStock: []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
