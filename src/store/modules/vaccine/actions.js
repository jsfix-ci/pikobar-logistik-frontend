import { fetchList } from '@/api'

export default {
  async getListMaterial({ commit }, params) {
    try {
      const response = await fetchList(`/api/v1/vaccine-material`, 'GET', params)
      commit('SET_LIST_MATERIAL', response.data)
    } catch (e) {
      return e
    }
  }
}
