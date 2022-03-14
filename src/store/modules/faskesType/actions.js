import { fetchList } from '@/api'

export default {
  async getListFaskesType({ state, commit }, params) {
    try {
      const { listFaskesType } = state
      if (!Array.isArray(listFaskesType) || !listFaskesType.length) {
        const response = await fetchList('/api/v1/master-faskes-type', 'GET', params)
        commit('SET_LIST_FASKES_TYPE', response.data)
      }
      return state.listFaskesType
    } catch (error) {
      return error.response
    }
  },
  async getVaccineListFaskesType({ state, commit }) {
    try {
      const { listVaccineFaskesType } = state
      if (!Array.isArray(listVaccineFaskesType) || !listVaccineFaskesType.length) {
        const response = await fetchList('/api/v1/medical-facility-type', 'GET')
        commit('SET_VACCINE_LIST_FASKES_TYPE', response.data)
      }
      return state.listVaccineFaskesType
    } catch (error) {
      // silent error
    }
  }
}
