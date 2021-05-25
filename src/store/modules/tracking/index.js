import actions from './actions'
import mutations from './mutations'

const state = {
  // Request
  listRequest: [],
  totalPageRequest: 0,
  totalDataRequest: 0,
  // Recommendation
  listRecommendation: [],
  totalPageRecommendation: 0,
  totalDataRecommendation: 0,
  // Realization
  listRealization: [],
  totalPageRealization: 0,
  totalDataRealization: 0
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
