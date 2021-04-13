export default {
  SET_LIST_APD: (state, data) => {
    state.dataListAPD = data
  },
  SET_LIST_APD_UNIT: (state, data) => {
    state.dataListApdUnit = data
  },
  SET_LIST_INSTANCE_TYPE: (state, data) => {
    state.dataInstanceType = data
  },
  SET_LIST_LOGISTIC_REQUEST: (state, data) => {
    state.dataListLogisticRequest = data
  },
  SET_TOTAL_LIST_LOGISTIC_REQUEST: (state, data) => {
    state.totalListLogisticRequest = data
  },
  SET_TOTAL_DATA_LOGISTIC_REQUEST: (state, data) => {
    state.totalDataLogisticRequest = data
  },
  // Acceptance Report
  SET_LIST_ACCEPTANCE_REPORT: (state, data) => {
    state.listAcceptanceReport = data
  },
  SET_TOTAL_LIST_ACCEPTANCE_REPORT: (state, data) => {
    state.totalListAcceptanceReport = data
  },
  SET_TOTAL_DATA_ACCEPTANCE_REPORT: (state, data) => {
    state.totalDataAcceptanceReport = data
  },
  SET_DETAIL_ACCEPTANCE_REPORT: (state, data) => {
    state.detailAcceptanceReport = data
  },
  SET_DETAIL_ACCEPTANCE_REPORT_ITEM: (state, data) => {
    state.detailAcceptanceReportItem = data
  },
  SET_ACCEPTANCE_REPORT_EVIDENCE: (state, data) => {
    state.acceptanceReportEvidence = data
  },
  // Detail Logistic Request
  SET_DETAIL_LOGISTIC_REQUEST: (state, data) => {
    state.dataDetailLogisticRequest = data
  },
  SET_LIST_DETAIL_LOGISTIC_NEEDS: (state, data) => {
    state.dataListDetailLogisticNeeds = data
  },
  SET_TOTAL_DETAIL_LOGISTIC_NEEDS: (state, data) => {
    state.totalDetailLogisticNeeds = data
  },
  SET_DATA_LOGISTIC_REQUEST_SUMMARY: (state, data) => {
    state.dataLogisticRequestSummary = data
  },
  SET_DATA_FASKES_TYPE_TOTAL_REQUEST: (state, data) => {
    state.dataFaskesTypeTotalRequest = data
  },
  SET_PRODUCT_TOTAL_REQUEST: (state, data) => {
    state.dataProductTotalRequest = data
  },
  SET_CITY_TOTAL_REQUEST: (state, data) => {
    state.dataCityTotalRequest = data
  },
  SET_STOCK: (state, data) => {
    state.listStock = data
  },
  LOAD_DATA_STOCK: (state, data) => {
    state.loadDataStock = data
  },
  SET_LIST_REALIZATION: (state, data) => {
    state.listRealization = data
  },
  SET_TOTAL_LIST_REALIZATION: (state, data) => {
    state.totalListRealization = data
  },
  SET_TOTAL_DATA_REALIZATION: (state, data) => {
    state.totalDataRealization = data
  },
  SET_DATA_TRACKING: (state, data) => {
    state.dataTracking = data
  },
  SET_PRODUCT_TOP_REQUEST: (state, data) => {
    state.productTopRequest = data
  },
  SET_DATA_FASKES_TOP_TOTAL_REQUEST: (state, data) => {
    state.faskesTopRequest = data
  }
}
