import { fetchList } from '@/api'

export default {
  async getListAllocation({ commit }, params) {
    try {
      const response = await fetchList(`/api/v1/allocation-vaccine-request`, 'GET', params)
      commit('SET_LIST_ALLOCATION', response.data.data)
      commit('SET_TOTAL_LIST_ALLOCATION', response.data.total)
      commit('SET_TOTAL_LIST_ALLOCATION_PAGE', response.data.last_page)
    } catch (e) {
      return e
    }
  },
  async getAllocationStatistic({ commit }) {
    try {
      const response = await fetchList(`/api/v1/allocation-vaccine-request-statistic`, 'GET')
      commit('SET_TOTAL_ALLOCATION', response.total_requests)
      commit('SET_TOTAL_SUCCESS', response.total_success)
      commit('SET_TOTAL_DRAFT', response.total_draft)
    } catch (e) {
      return e
    }
  },
  async getDetailAllocationInfo({ commit }, id) {
    try {
      const response = await fetchList(`/api/v1/allocation-vaccine-request/${id}`, 'GET')
      commit('SET_DETAIL_ALLOCATION_INFO', response.data)
    } catch (e) {
      return e
    }
  },
  async getDetailAllocationData({ commit }, params) {
    try {
      const response = await fetchList(`/api/v1/allocation-distribution-vaccine-request`, 'GET', params)
      commit('SET_DETAIL_ALLOCATION_DATA', response.data)
    } catch (e) {
      return e
    }
  }
}
