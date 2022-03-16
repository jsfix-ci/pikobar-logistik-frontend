<template>
  <div class="image-viewer">
    <v-dialog
      v-model="dialog"
      :width="previewWidth"
      :height="previewHeight"
    >
      <v-img
        contain
        :max-width="previewWidth"
        :max-height="previewHeight"
        :src="imageSource"
        :alt="alt"
        @error="onImgError"
      >
        <template #placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            />
          </v-row>
        </template>
      </v-img>
    </v-dialog>

    <div
      class="image-viewer__thumbnail"
      @click.stop="openDialog"
    >
      <v-img
        cover
        :width="thumbWidth"
        :height="thumbHeight"
        :src="imageSource"
        :alt="alt"
        class="rounded-lg"
        @error="onImgError"
      >
        <template #placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            />
          </v-row>
        </template>
      </v-img>
      <div
        class="image-viewer__thumbnail-overlay rounded-lg"
      >
        <v-icon color="white" aria-label="Preview Image">
          mdi-magnify-plus-outline
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import imageDefault from '@/static/noimage.gif'
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: null
    },
    thumbWidth: {
      type: [Number, String],
      default: 90
    },
    thumbHeight: {
      type: [Number, String],
      default: 60
    },
    previewWidth: {
      type: [Number, String],
      default: 600
    },
    previewHeight: {
      type: [Number, String],
      default: 400
    }
  },
  data() {
    return {
      dialog: false,
      failed_image: false,
      img: this.src
    }
  },
  computed: {
    imageSource() {
      return this.failed_image ? imageDefault : this.src
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    onImgError() {
      this.failed_image = true
    }
  }
}
</script>

<style lang="scss" scoped>
.image-viewer {
  &__thumbnail {
    cursor: pointer;
    position: relative;
    &-overlay {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba($color: #000000, $alpha: 0.3);
    }
  }
}
</style>
