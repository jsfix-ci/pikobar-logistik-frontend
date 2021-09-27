import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import toast from './modules/toast'
import rdtDistribution from './modules/rdtDistribution'
import recipient from './modules/recipient'
import recipientFaskes from './modules/recipientFaskes'
import region from './modules/region'
import constants from './modules/constants'
import general from './modules/general'
import logistics from './modules/logistics'
import letter from './modules/letter'
import faskes from './modules/faskes'
import faskesType from './modules/faskesType'
import masterData from './modules/masterData'
import tracking from './modules/tracking'
import allocation from './modules/allocation'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    toast,
    user,
    rdtDistribution,
    recipient,
    recipientFaskes,
    region,
    constants,
    general,
    logistics,
    faskes,
    faskesType,
    masterData,
    letter,
    tracking,
    allocation
  }
})

export default store
