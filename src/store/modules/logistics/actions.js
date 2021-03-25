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
      commit('LOAD_DATA_STOCK', true)
      const response = await fetchList(`/api/v1/landing-page-registration/product-unit/${idAlkes}`, 'GET')
      commit('SET_LIST_APD_UNIT', response.data)
      commit('LOAD_DATA_STOCK', false)
      return response
    } catch (e) {
      commit('LOAD_DATA_STOCK', false)
      return e
    }
  },
  async getListAPD({ commit }, params) {
    commit('SET_LIST_APD', [])
    try {
      commit('LOAD_DATA_STOCK', true)
      const response = await fetchList('/api/v1/logistic-realization/products', 'GET', params)
      commit('SET_LIST_APD', response.data)
      commit('LOAD_DATA_STOCK', false)
      return response
    } catch (e) {
      commit('LOAD_DATA_STOCK', false)
      return e
    }
  },
  async getListApdUnit({ commit }, idAlkes) {
    commit('SET_LIST_APD_UNIT', [])
    try {
      commit('LOAD_DATA_STOCK', true)
      const response = await fetchList(`/api/v1/logistic-realization/product-units/${idAlkes}`, 'GET')
      commit('SET_LIST_APD_UNIT', response.data)
      commit('LOAD_DATA_STOCK', false)
      return response
    } catch (e) {
      commit('LOAD_DATA_STOCK', false)
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
  async updateApplicant({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/' + params.id, 'PUT', params)
      return response
    } catch (e) {
      return e
    }
  },
  async updateApplicantIdentity({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/applicant-identity/' + params.get('applicant_id'), 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async updateApplicantLetter({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/applicant-letter/' + params.get('applicant_id'), 'POST', params)
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
  async getListGoodsReceiptReport({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/acceptance-report', 'GET', params)
      commit('SET_LIST_LOGISTIC_REQUEST', response.data)
      commit('SET_TOTAL_LIST_LOGISTIC_REQUEST', response.last_page)
      commit('SET_TOTAL_DATA_LOGISTIC_REQUEST', response.total)
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
      commit('LOAD_DATA_STOCK', true)
      const response = await fetchList('/api/v1/stock', 'GET', params)
      commit('SET_STOCK', response.data)
      commit('LOAD_DATA_STOCK', false)
      return response
    } catch (e) {
      commit('LOAD_DATA_STOCK', false)
      return e
    }
  },
  async clearStock({ commit }, params) {
    try {
      commit('LOAD_DATA_STOCK', true)
      commit('SET_STOCK', [])
      commit('LOAD_DATA_STOCK', false)
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
  async getFaskesTypeTopRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/faskes-type-top-request', 'GET', params)
      commit('SET_DATA_FASKES_TOP_TOTAL_REQUEST', response.data)
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
  async getProductTopRequest({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/products-top-request', 'GET', params)
      commit('SET_PRODUCT_TOP_REQUEST', response.data)
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
  async postRegisterVerification({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/verification-registration', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postResendCode({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/verification-resend', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postConfirmVerificationCode({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/verification-confirmation', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postRecipientReport({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/acceptance-report', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getLogisticReportRealizationItem({ commit }, params) {
    const id = params.id
    delete params.id
    try {
      const response = await fetchList('/api/v1/logistic-report/realization-item/' + id, 'GET', params)
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
  async postUrgencyChange({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/urgency', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postReturnChange({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/return', 'POST', params)
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
  },
  async postFinalStatus({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/logistic-request/final', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  }
}
