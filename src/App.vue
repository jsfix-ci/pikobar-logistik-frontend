<template>
  <v-app
    id="inspire"
  >
    <toast-notification />
    <loading-logo
      :loading="$store.state.general.isLoading.length !== 0"
    />
    <template v-if="pageLoading">
      <!-- Loader -->
      <div class="spinwrap">
        <div class="spinner">
          <loading-logo
            :loading="true"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loading: true // page loading
    }
  },
  computed: {
    pageLoading: function() {
      return this.loadingPage()
    }
  },
  methods: {
    loadingPage() {
      var self = this
      setTimeout(function() {
        self.loading = false
      }, 1500)
      return self.loading
    }
  }
}
</script>
