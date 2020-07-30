import { fetchList, doPostUpdate } from '@/api'

export default {
  async getListOutgoingMail({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/outgoing-letter', 'GET', params)
      commit('SET_LIST_OUTGOING_MAIL', response.data.data)
      commit('SET_TOTAL_LIST_OUTGOING_MAIL', response.data.last_page)
      commit('SET_TOTAL_DATA_OUTGOING_MAIL', response.data.total)
    } catch (e) {
      return e
    }
  },
  async getApplicationLetter({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/application-letter/search-by-letter-number', 'GET', params)
      commit('SET_APPLICATION_LETTER', response.data)
    } catch (e) {
      return e
    }
  },
  async postOutgoingMail({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/outgoing-letter', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
}
