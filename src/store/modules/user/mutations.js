export default {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_DISTRICT: (state, district) => {
    state.district_user = district
  },
  SET_DISTRICT_NAME: (state, districtName) => {
    state.district_name = districtName
  },
  SET_FULLNAME: (state, fullname) => {
    state.fullname = fullname
  },
  SET_PHASE: (state, phase) => {
    state.phase = phase
  }
}
