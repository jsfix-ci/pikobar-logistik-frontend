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
  // Acceptance Report
  listAcceptanceReport: [],
  totalListAcceptanceReport: 0,
  totalDataAcceptanceReport: 0,
  detailAcceptanceReport: [],
  detailAcceptanceReportItem: [],
  acceptanceReportEvidence: [],
  // Detail Logistic Request
  dataDetailLogisticRequest: {},
  totalDetailLogisticNeeds: 0,
  dataListDetailLogisticNeeds: [],
  dataLogisticRequestSummary: {},
  dataFaskesTypeTotalRequest: [],
  dataProductTotalRequest: [],
  dataCityTotalRequest: [],
  listStock: [],
  loadDataStock: false,
  listRealization: [],
  totalListRealization: 0,
  totalDataRealization: 0,
  dataTracking: null,
  productTopRequest: null,
  faskesTopRequest: null
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
