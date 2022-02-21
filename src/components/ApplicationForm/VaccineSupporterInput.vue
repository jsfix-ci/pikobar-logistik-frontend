<template>
  <div class="d-flex flex-column">
    <span class="h4 font-weight-bold ml-16 mb-6">
      {{ $t('label.vaccine_supporter') }}
    </span>

    <!-- Item Input List -->
    <div
      v-for="(data, index) in listVaccineSupporter"
      :key="index"
    >
      <ThirdStepItem
        :key="listVaccineSupporter.length"
        :index="index"
        :input-data="data"
        is-vaccine
        class="ma-0"
        @change="(updateData) => onRequestChange(index, updateData)"
        @delete="onDelete"
      />
    </div>

    <!-- Add More Button -->
    <v-row class="mx-16">
      <v-col cols="12" sm="12" md="2" class="pl-0">
        <center>
          <v-btn
            color="#2E7D32"
            outlined
            @click="addMore"
          >
            {{ $t('label.add_more') }}
          </v-btn>
        </center>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ThirdStepItem from './ThirdStepItem.vue'
export default {
  components: {
    ThirdStepItem
  },
  data() {
    return {
      listVaccineSupporter: []
    }
  },
  methods: {
    /**
     * insert data from ThirdStepItem into listVaccineSupporter
     *
     * @param {Number} index - index number of the array
     * @param {Object} data - input data object
     */
    onRequestChange(index, data) {
      this.listVaccineSupporter[index] = { ...data }
    },
    addMore() {
      this.listVaccineSupporter.push({
        apd: '',
        apdName: '',
        description: '',
        total: 0,
        unitId: '',
        unitName: '',
        unitList: [],
        purpose: '',
        urgency: ''
      })
    },
    onDelete(index) {
      this.listVaccineSupporter.splice(index, 1)
    }
  }
}
</script>
