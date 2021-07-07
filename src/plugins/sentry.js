import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

export default {
  install(Vue) {
    Sentry.init({
      Vue: Vue,
      dsn: process.env.VUE_APP_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: parseFloat(process.env.VUE_APP_SENTRY_TRACE_SAMPLE_RATE),
      environment: process.env.VUE_APP_ENV
    })
  }
}
