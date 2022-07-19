export default {
  pushLoading({ commit }, newLoading) {
    return new Promise(resolve => {
      commit('PUSH_LOADING')
      resolve()
    })
  },
  popLoading({ commit }, newLoading) {
    return new Promise(resolve => {
      commit('POP_LOADING')
      resolve()
    })
  }
}
