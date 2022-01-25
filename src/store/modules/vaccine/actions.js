import { fetchList } from '@/api'

export default {
  async getListMaterial({ commit }, params) {
    try {
      const response = await fetchList(`/api/v1/vaccine-material`, 'GET', params)
      commit('SET_LIST_MATERIAL', response.data)
    } catch (e) {
      return e
    }
  },

  async getListVaccineRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/vaccine-request', 'GET', params)
      commit('SET_LIST_VACCINE_REQUEST', response.data)
      commit('SET_TOTAL_LIST_VACCINE_REQUEST', response.meta.last_page)
      commit('SET_TOTAL_DATA_VACCINE_REQUEST', response.meta.total)
    } catch (e) {
      return e
    }
  },
  // API Detail Vaccine
  async getListDetailVaccineRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/vaccine-request/' + params, 'GET')
      commit('SET_DETAIL_VACCINE_REQUEST', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getListDetailVaccineNeeds({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/vaccine-request/need/list', 'GET', params)
      commit('SET_LIST_DETAIL_VACCINE_NEEDS', response.data.data)
      commit('SET_TOTAL_DETAIL_VACCINE_NEEDS', response.data.last_page)
    } catch (e) {
      return e
    }
  }
}
