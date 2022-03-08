import { doPostUpdate } from '@/api'
import { setToken, removeToken } from '@/utils/cookies'
import { resetRouter } from '@/router'

export default {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      doPostUpdate('/api/v1/login', 'POST', userInfo).then((response) => {
        const { token } = response.data
        commit('SET_TOKEN', token)
        setToken(token)
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      doPostUpdate('/api/v1/users/me', 'GET').then((response) => {
        const { roles, name, code_district_city, name_district_city, phase, app } = response.data
        const role = [roles]
        commit('SET_ROLES', role)
        commit('SET_DISTRICT', code_district_city)
        commit('SET_DISTRICT_NAME', name_district_city)
        commit('SET_FULLNAME', name)
        commit('SET_USER', response.data)
        commit('SET_PHASE', phase)
        commit('SET_APP', app)
        resolve(role)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  async changePasswordUser({ commit }, data) {
    try {
      const response = await doPostUpdate('/api/v1/users/change-password', 'PUT', data)
      return response
    } catch (e) {
      return e
    }
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_DISTRICT', [])
      removeToken()
      resetRouter()

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}
