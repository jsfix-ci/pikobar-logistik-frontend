export default {
  PUSH_LOADING: (state) => {
    state.isLoading.push(true)
  },
  POP_LOADING: (state) => {
    if (state.isLoading.length > 0) { state.isLoading.pop() }
  }
}
