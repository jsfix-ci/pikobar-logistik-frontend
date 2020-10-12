<!-- App Main Structure -->
<template>
  <div>
    <!-- App Header -->
    <app-header />
    <!-- App Main Content -->
    <v-content>
      <!-- Breadcrumbs -->
      <v-row style="padding: 5px 20px;">
        <breadcrumb />
      </v-row>
      <!-- App Router -->
      <div class="app-container">
        <transition name="fade" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </v-content>
    <!-- App Back To Top -->
    <vm-back-top style="bottom: 10px;" />
  </div>
</template>

<script>
/* eslint-disable */
import Header from "./Header/Header.vue"
export default {
  components: {
    appHeader: Header
  },
  data: () => ({
      itemsBreadcrumbs: [
         {
           text: 'Dashboard',
           disabled: false,
           to: '/',
         }
      ],
  }),
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    //
  }
};
</script>
<style scoped>
.app-container {
  /* 50= navbar  50  */
  /* min-height: calc(100vh - 50px); */
  padding: 5px 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
