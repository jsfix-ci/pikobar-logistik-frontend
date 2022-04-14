export default {
  listAPD: (state, getters) => {
    return state.dataListAPD
  },
  listApdUnit: (state, getters) => {
    return state.dataListApdUnit
  },
  listInstanceType: (state, getters) => {
    return state.dataInstanceType
  },
  listLogisticRequest: (state, getters) => {
    return state.dataListLogisticRequest
  },
  totalListLogisticRequest: (state, getters) => {
    return state.totalListLogisticRequest
  },
  totalDataLogisticRequest: (state, getters) => {
    return state.totalDataLogisticRequest
  },
  // Acceptance Report
  listAcceptanceReport: (state, getters) => {
    return state.listAcceptanceReport
  },
  totalListAcceptanceReport: (state, getters) => {
    return state.totalListAcceptanceReport
  },
  totalDataAcceptanceReport: (state, getters) => {
    return state.totalDataAcceptanceReport
  },
  detailAcceptanceReport: (state, getters) => {
    return state.detailAcceptanceReport
  },
  detailAcceptanceReportItem: (state, getters) => {
    return state.detailAcceptanceReportItem
  },
  acceptanceReportEvidence: (state, getters) => {
    return state.acceptanceReportEvidence
  },
  // Detail Logistic Request
  detailLogisticRequest: (state, getters) => {
    return state.dataDetailLogisticRequest
  },
  listLogisticNeeds: (state, getters) => {
    return state.dataListDetailLogisticNeeds
  },
  totalLogisticNeeds: (state, getters) => {
    return state.totalDetailLogisticNeeds
  },
  dataLogisticRequestSummary: (state, getters) => {
    return state.dataLogisticRequestSummary
  },
  dataFaskesTypeTotalRequest: (state, getters) => {
    return state.dataFaskesTypeTotalRequest
  },
  dataProductTotalRequest: (state, getters) => {
    return state.dataProductTotalRequest
  },
  dataCityTotalRequest: (state, getters) => {
    return state.dataCityTotalRequest
  },
  listStock: (state) => {
    return state.listStock
  },
  loadDataStock: (state) => {
    return state.loadDataStock
  },
  listRealization: (state) => {
    return state.listRealization
  },
  totalListRealization: (state) => {
    return state.totalListRealization
  },
  totalDataRealization: (state) => {
    return state.totalDataRealization
  },
  dataTracking: (state) => {
    return state.dataTracking
  },
  productTopRequest: (state) => {
    return state.productTopRequest
  },
  faskesTopRequest: (state) => {
    return state.faskesTopRequest
  },
  logisticRequestType: (state) => {
    return state.logisticRequestType
  },
  listVaccineRequest: (state) => {
    return state.dataListVaccineRequest
  },
  totalListVaccineRequest: (state) => {
    return state.totalListVaccineRequest
  },
  totalDataVaccineRequest: (state) => {
    return state.totalDataVaccineRequest
  }
}
