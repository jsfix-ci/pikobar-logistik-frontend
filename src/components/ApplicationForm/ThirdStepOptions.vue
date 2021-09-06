<template>
  <div class="container">
    <v-row>
      <v-col md="5" offset-md="1">
        <div class="d-flex justify-center">
          <v-img
            src="../../static/apd.svg"
            :aspect-ratio="1"
            max-width="250px"
            max-height="250px"
          />
        </div>
        <p class="text-center">Tambahkan Kebutuhan Alat Kesehatan</p>
        <div class="d-flex justify-center">
          <v-btn
            color="#2E7D32"
            outlined
            @click="onClick('alkes')"
          >
            {{ $t('label.add') }}
          </v-btn>
        </div>
      </v-col>
      <v-col md="5">
        <div class="d-flex justify-center">
          <v-img
            src="../../static/apd.svg"
            :aspect-ratio="1"
            max-width="250px"
            max-height="250px"
          />
        </div>
        <!-- <p class="text-center">{{ $t('label.add_logistics_label') }}</p> -->
        <p class="text-center">Tambahkan Kebutuhan Vaksin</p>
        <div class="d-flex justify-center">
          <v-btn
            color="#2E7D32"
            outlined
            @click="onClick('vaccine')"
          >
            {{ $t('label.add') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'ThirdStepOptions',
  methods: {
    onClick(type) {
      this.$store.dispatch('logistics/logisticRequestType', type)
      this.$emit('next')
    }
  }
}
</script>
