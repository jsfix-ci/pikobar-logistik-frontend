import { fetchList } from '@/api'

export default {
  async getListDistrictCity({ state, commit }) {
    try {
      const response = await fetchList('/api/v1/areas/cities', 'GET')
      commit('SET_DISTRICT_CITY', response.data)
      const { listDistrictCity } = state
      if (!Array.isArray(listDistrictCity) || !listDistrictCity.length) {
        const response = await fetchList('/api/v1/areas/cities', 'GET')
        commit('SET_DISTRICT_CITY', response.data)
      }
      return response
    } catch (e) {
      return e
    }
  },
  async getDetailDistrict({ commit }, codeDistrict) {
    try {
      const response = await fetchList(`/api/v1/areas/cities?kabkota_kode=${codeDistrict}`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async getListSubDistrict({ commit }, codeDistrict) {
    try {
      const response = await fetchList(`/api/v1/areas/subarea?city_code=${codeDistrict}&area_type=subdistricts`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async getListVillage({ commit }, codeSubDistrict) {
    try {
      const response = await fetchList(`/api/v1/areas/subarea?subdistrict_code=${codeSubDistrict}&area_type=village`, 'GET')
      return response
    } catch (e) {
      return e
    }
  },
  async getListHospital({ commit }) {
    try {
      const response = await fetchList('/api/areas/hospital', 'GET')
      commit('SET_HOSPITAL_CITY', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getApplicantFormListCity({ commit }) {
    try {
      const response = await fetchList('/api/v1/landing-page-registration/areas/cities', 'GET')
      commit('SET_APPLICANT_LIST_CITY', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getApplicantFormListDistrict({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/landing-page-registration/areas/subarea', 'GET', params)
      commit('SET_APPLICANT_LIST_DISTRICT', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getApplicantFormListVillage({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/landing-page-registration/areas/subarea', 'GET', params)
      commit('SET_APPLICANT_LIST_VILLAGE', response.data)
      return response
    } catch (e) {
      return e
    }
  }
}
