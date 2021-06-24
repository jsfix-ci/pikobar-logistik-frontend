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
  }
}
