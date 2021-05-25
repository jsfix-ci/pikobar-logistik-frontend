import { fetchList } from '@/api'

export default {
  async getTrackingLogisticRequest({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}/logistic-request`, 'GET', params)
      commit('SET_LIST_REQUEST', response.items.data)
      commit('SET_TOTAL_PAGE_REQUEST', response.items.last_page)
      commit('SET_TOTAL_DATA_REQUEST', response.items.total)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingLogisticRecommendation({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}/logistic-recommendation`, 'GET', params)
      commit('SET_LIST_RECOMMENDATION', response.items.data)
      commit('SET_TOTAL_PAGE_RECOMMENDATION', response.items.last_page)
      commit('SET_TOTAL_DATA_RECOMMENDATION', response.items.total)
      return response
    } catch (e) {
      return e
    }
  }
}
