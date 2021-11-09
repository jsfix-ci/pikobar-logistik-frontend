<template>
  <list-request-vaccine :title="title" />
</template>
<script>
import listRequestVaccine from '@/components/requestVaccine/list'
export default {
  components: {
    listRequestVaccine
  },
  data() {
    return {
      title: 'Pengajuan vaksin'
    }
  }
}
</script>
