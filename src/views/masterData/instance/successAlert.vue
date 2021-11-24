<template>
  <v-dialog
    v-model="isOpen"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title>
        <v-img :max-width="100" :src="image" class="img-icon-add-instance" />
      </v-card-title>
      <v-card-text>
        <div class="my-2 title-dialog-success-add-instance">{{ title }}</div>
        <div class="text-dialog-success-add-instance">{{ text }}</div>
        <div class="text-dialog-success-add-instance">{{ failedText }}</div>
      </v-card-text>
      <v-card-actions>
        <div class="mx-auto">
          <v-btn
            color="primary"
            @click="closeAlert()"
          >
            {{ textButton }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'SuccessAlert',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    failedText: {
      type: String,
      default: null
    },
    textButton: {
      type: String,
      default: null
    }
  },
  methods: {
    closeAlert() {
      this.$emit('close-alert')
    }
  }
}
</script>
