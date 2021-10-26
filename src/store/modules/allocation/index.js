import actions from './actions'
import mutations from './mutations'

const state = {
  listAllocation: [],
  totalListAllocation: null,
  totalListAllocationPage: null,
  totalAllocation: null,
  totalSuccess: null,
  totalDraft: null,
  detailAllocationInfo: null,
  detailAllocationData: null
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
