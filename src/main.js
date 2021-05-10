// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Vue2Dragula } from 'vue2-dragula'
import VmBackTop from 'vue-multiple-back-top'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueMoment from 'vue-moment'
import * as VeeValidate from 'vee-validate'
import infiniteScroll from 'vue-infinite-scroll'
import FlagIcon from 'vue-flag-icon'
import VueCurrencyFilter from 'vue-currency-filter'

const moment = require('moment-timezone')
moment.utc().tz('Asia/Jakarta').format()
moment.locale('id')

import vuetify from './plugins/vuetify'
Vue.config.performance = process.env.NODE_ENV === 'development'

import App from './App'
import store from './store'
import router from './router'

import './components' // include all components
import '@/styles' // include all css files
import './permission' // permission control
import '@/utils/vee-validate' // include all validate form
import i18n from './lang' // Internationalization
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

Vue.use(FlagIcon)
Vue.use(Vue2Dragula)
Vue.use(VueBreadcrumbs)
Vue.component(VmBackTop.name, VmBackTop)

Vue.config.productionTip = false

// unregister service worker
// navigator.serviceWorker.getRegistrations().then(function(registrations) {
//   for (var registration of registrations) {
//     registration.unregister()
//   }
// })

Vue.use(infiniteScroll)
Vue.use(VueMoment, {
  moment
})

Vue.use(VeeValidate, {
  i18n
})

Vue.use(VueCurrencyFilter, {
  symbol: '',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App)
})
