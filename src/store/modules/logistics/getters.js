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
  }
}
