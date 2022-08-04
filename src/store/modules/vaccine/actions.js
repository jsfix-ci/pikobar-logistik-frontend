import { fetchList, doPostUpdate } from '@/api'

export default {
  async getListMaterial({ commit }, params) {
    try {
      const response = await fetchList(`/api/v1/vaccine-material`, 'GET', params)
      commit('SET_LIST_MATERIAL', response.data)
      return response
    } catch (e) {
      return e
    }
  },

  async getListVaccineRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/vaccine-request', 'GET', params)
      commit('SET_LIST_VACCINE_REQUEST', response.data)
      commit('SET_TOTAL_LIST_VACCINE_REQUEST', response.meta.last_page)
      commit('SET_TOTAL_DATA_VACCINE_REQUEST', response.meta.total)
    } catch (e) {
      return e
    }
  },
  // API Detail Vaccine
  async getVaccineRequestById({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/vaccine-request/' + params, 'GET')
      commit('SET_DETAIL_VACCINE_REQUEST', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getVaccineProductRequests({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/vaccine-product-request', 'GET', params)
      commit('SET_VACCINE_PRODUCT_REQUESTS', response.data)
      return response.data
    } catch (e) {
      return e
    }
  },
  async updateVaccineRequestStatus({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/vaccine-request/' + params.id, 'PUT', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getItemVaccineProductRequest({ commit }, id) {
    try {
      const response = await fetchList('/api/v1/vaccine-product-request/' + id, 'GET')
      return response
    } catch (e) {
      // silent error
    }
  },
  async createVaccineProductRequest({ commit }, payload) {
    try {
      const response = await doPostUpdate('/api/v1/vaccine-product-request/', 'POST', payload)
      return response
    } catch (e) {
      // silent error
    }
  },
  async updateVaccineProductRequest({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/vaccine-product-request/' + params.id, 'PUT', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getStock({ commit }, params) {
    try {
      commit('LOAD_DATA_STOCK', true)
      const response = await fetchList('/api/v1/vaccine-material', 'GET', params)
      commit('SET_ALLOCATION_MATERIALS', response.data)
      commit('LOAD_DATA_STOCK', false)
      return response
    } catch (e) {
      commit('LOAD_DATA_STOCK', false)
      return e
    }
  },
  async getStockItem({ commit }, params) {
    try {
      const { id, ...payload } = params
      const response = await fetchList(`/api/v1/check-stock/${id}`, 'GET', payload)
      commit('SET_VACCINE_ITEM_STOCK', response.data)
      return response
    } catch (e) {
      return // silent error
    }
  },
  async clearStockItem({ commit }, item) {
    commit('SET_VACCINE_ITEM_STOCK', {})
  },
  async clearStock({ commit }, params) {
    try {
      commit('LOAD_DATA_STOCK', true)
      commit('SET_ALLOCATION_MATERIALS', [])
      commit('LOAD_DATA_STOCK', false)
    } catch (e) {
      return e
    }
  },
  async getVaccineStatusNote() {
    try {
      const response = await fetchList('/api/v1/vaccine-status-note/', 'GET')
      return response.data
    } catch (e) {
      // silent error
    }
  },
  async getInstanceLead({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/leader', 'GET', params)
      return response
    } catch (e) {
      // silent error
    }
  }
}
