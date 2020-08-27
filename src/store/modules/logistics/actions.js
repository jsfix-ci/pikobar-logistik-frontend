import { fetchList, doPostUpdate, doDetailDelete } from '@/api'
import request from '@/utils/request'

export default {
  async getListAPDMaterialGroup({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/landing-page-registration/products', 'GET', params)
      commit('SET_LIST_APD', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getListApdUnitMaterialGroup({ commit }, idAlkes) {
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/product-unit/${idAlkes}`, 'GET')
      commit('SET_LIST_APD_UNIT', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getListAPD({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/logistic-realization/products', 'GET', params)
      commit('SET_LIST_APD', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getListApdUnit({ commit }, idAlkes) {
    try {
      const response = await fetchList(`/api/v1/logistic-realization/product-units/${idAlkes}`, 'GET')
      commit('SET_LIST_APD_UNIT', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getListInstanceType({ commit }) {
    try {
      const response = await fetchList('/api/v1/master-faskes-type', 'GET')
      commit('SET_LIST_INSTANCE_TYPE', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getListInstanceName({ commit }, param) {
    try {
      const response = await fetchList('/api/v1/master-faskes', 'GET', param)
      commit('SET_LIST_INSTANCE_TYPE', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async postApplicantForm({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postApplicantFormAdmin({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request-non-public', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getListLogisticRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/logistic-request', 'GET', params)
      commit('SET_LIST_LOGISTIC_REQUEST', response.data.data)
      commit('SET_TOTAL_LIST_LOGISTIC_REQUEST', response.data.last_page)
      commit('SET_TOTAL_DATA_LOGISTIC_REQUEST', response.data.total)
    } catch (e) {
      return e
    }
  },
  async getListDetailLogisticRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/logistic-request/' + params, 'GET')
      commit('SET_DETAIL_LOGISTIC_REQUEST', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getListDetailLogisticNeeds({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/logistic-request/need/list', 'GET', params)
      commit('SET_LIST_DETAIL_LOGISTIC_NEEDS', response.data.data)
      commit('SET_TOTAL_DETAIL_LOGISTIC_NEEDS', response.data.last_page)
    } catch (e) {
      return e
    }
  },
  async postVerificationStatus({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/verification', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postAddFaskes({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/master-faskes', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postUpdateLogisticNeeds({ commit }, params) {
    try {
      params.realization_quantity = parseInt(params.realization_quantity)
      const response = await doPostUpdate('/api/v1/logistic-request/realization', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postUpdateLogisticNeedsAdmin({ commit }, params) {
    try {
      params.realization_quantity = parseInt(params.realization_quantity)
      const response = await doPostUpdate('/api/v1/logistic-admin-realization', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async updateLogisticNeedsAdmin({ commit }, params) {
    const id = params.id
    try {
      params.realization_quantity = parseInt(params.realization_quantity)
      const response = await doPostUpdate(`/api/v1/logistic-admin-realization/${id}`, 'PUT', params)
      return response
    } catch (e) {
      return e
    }
  },
  async deleteRealization({ commit }, id) {
    try {
      const response = await doDetailDelete(`/api/v1/logistic-admin-realization`, 'DELETE', id)
      return response
    } catch (error) {
      return error.response
    }
  },
  async getLogisticNeedsAdmin({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/logistic-admin-realization', 'GET', params)
      commit('SET_LIST_REALIZATION', response.data.data)
      commit('SET_TOTAL_LIST_REALIZATION', response.data.last_page)
      commit('SET_TOTAL_DATA_REALIZATION', response.data.total)
      return response
    } catch (e) {
      return e
    }
  },
  async getLogisticRequestSummary({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/logistic-request-summary', 'GET', params)
      commit('SET_DATA_LOGISTIC_REQUEST_SUMMARY', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getStock({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/stock', 'GET', params)
      commit('SET_STOCK', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getFaskesTypeTotalRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/faskes-type-total-request', 'GET', params)
      commit('SET_DATA_FASKES_TYPE_TOTAL_REQUEST', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getProductTotalRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/products-total-request', 'GET', params)
      commit('SET_PRODUCT_TOTAL_REQUEST', response.data.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getCityTotalRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/logistic-request/cities/total-request', 'GET', params)
      commit('SET_CITY_TOTAL_REQUEST', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingLogistic({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/landing-page-registration/tracking', 'GET', params)
      commit('SET_DATA_TRACKING', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getTrackingLogisticNeedList({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList(`/api/v1/landing-page-registration/tracking/${id}`, 'GET', params)
      commit('SET_LIST_LOGISTIC_REQUEST', response.data.data)
      commit('SET_TOTAL_LIST_LOGISTIC_REQUEST', response.data.last_page)
      commit('SET_TOTAL_DATA_LOGISTIC_REQUEST', response.data.total)
      return response
    } catch (e) {
      return e
    }
  },
  async logisticRequestExportData({ commit }, params) {
    try {
      const response = await request({
        url: `/api/v1/logistic-request/data/export`,
        method: 'GET',
        params: params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  async postCheckStockStatus({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/stock-checking', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postApprovalStatus({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/approval', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  }
}
