<template>
  <div class="d-flex flex-column align-center">
    <div ref="tableau" />
  </div>
</template>
<script>
/* global tableau */
export default {
  data() {
    return {
      options: {
        hideTabs: true
      },
      url: 'https://tableau.jabarprov.go.id/views/Pikobar-DashboardLogistikVaksin/LogistikVaksin?:showAppBanner=false&:origin=viz_share_link&:display_count=n&:showVizHome=n'
    }
  },
  mounted() {
    this.initViz()
  },
  methods: {
    initViz() {
      const viz = new tableau.Viz(this.$refs.tableau, this.url, this.options)
      return viz
    }
  }
}
</script>

<style lang="scss" scoped>
.under-development {
  &__text {
    font-family: 'Lora', sans-serif;
    font-size: 21px;
    color: #069550;
    font-weight: bold;
  }
}
</style>
