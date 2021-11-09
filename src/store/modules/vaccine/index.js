import actions from './actions'
import mutations from './mutations'

const state = {
  listMaterial: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
