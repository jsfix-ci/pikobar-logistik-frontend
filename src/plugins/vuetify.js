import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#27AE60',
        'green-dark': '#069550'
      },
      dark: {
        primary: '#27AE60'
      }
    }
  }
}

export default new Vuetify(opts)
