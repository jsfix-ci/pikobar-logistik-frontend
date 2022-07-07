import { fetchList } from '@/api'

export default {
  async getTrackingLogisticRequest({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}/logistic-request`, 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingLogisticRecommendation({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}/logistic-recommendation`, 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingLogisticRealization({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}/logistic-finalization`, 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingLogisticWarehouse({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}/logistic-outbound`, 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingLogisticDistribution({ commit }, params) {
    const id = params.id
    const loId = params.loId
    delete params.id
    delete params.loId
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}/logistic-outbound/${loId}`, 'GET', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingVaccine({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/vaccine-tracking', 'GET', params)
      return response
    } catch (e) {
      // silent error
    }
  },
  async getTrackingVaccineDetail({ commit }, id) {
    try {
      const response = await fetchList(`/api/v1/vaccine-tracking/${id}`, 'GET')
      return response
    } catch (e) {
      // silent error
    }
  }
}
