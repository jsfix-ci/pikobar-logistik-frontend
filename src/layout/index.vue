<!-- App Main Structure -->
<template>
  <div>
    <!-- App Header -->
    <app-header v-if="!isVaccineContent" />
    <div class="wrapper d-flex flex-column justify-space-between">
      <!-- App Main Content -->
      <v-main>
        <!-- Breadcrumbs -->
        <v-row v-if="!isVaccineContent" style="padding: 5px 20px;">
          <breadcrumb />
        </v-row>
        <!-- App Router -->
        <div :class="{ 'app-container': !isVaccineContent }">
          <transition name="fade" mode="out-in">
            <router-view :key="key" />
          </transition>
        </div>
      </v-main>
      <!-- App Footer -->
      <!-- Temporarily hidden -->
      <!-- <app-footer v-if="isVaccineContent" /> -->
      <!-- App Back To Top -->
    </div>
    <vm-back-top style="bottom: 10px;" />
  </div>
</template>

<script>
/* eslint-disable */
import Header from "./Header/Header.vue"
import Footer from "./Footer/Footer.vue"
export default {
  components: {
    appHeader: Header,
    appFooter: Footer
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
    },
    isVaccineContent() {
      return this.$route.meta.isVaccineContent
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
.wrapper {
  height: 100vh;
}
</style>
