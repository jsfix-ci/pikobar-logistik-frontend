<template>
  <div>
    <v-label class="title">
      <b>{{ title }}</b> <i class="text-small-first-step">{{ suffixTitle }}</i>
    </v-label>
    <div class="ma-1 pa-3 upload-file-border text-center">
      <div class="pointer" @click="onButtonClick">
        <img width="75" height="100" :src="isUpload ? imageValid : imageInValid">
      </div>
      <div>
        <v-label>{{ selectedFileName ? selectedFileName : emptyFile }}</v-label>
        <p class="note">{{ note }}</p>
      </div>
      <div v-show="false">
        <input
          ref="uploadImage"
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          @change="saveImage"
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UploadFile',
  props: {
    title: {
      type: String,
      default: null
    },
    suffixTitle: {
      type: String,
      default: null
    },
    isUpload: {
      type: Boolean,
      default: false
    },
    selectedFileName: {
      type: String,
      default: null
    },
    note: {
      type: String,
      default: null
    },
    emptyFile: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      imageValid: require('@/static/upload_dokumen.svg'),
      imageInValid: require('@/static/upload_no_dokumen.svg')
    }
  },
  methods: {
    saveImage(event) {
      this.$emit('saveImage', event)
    },
    onButtonClick() {
      this.$refs.uploadImage.click()
    }
  }
}
</script>
<style lang="scss" scoped>
	.upload-file-border {
		border: 2px dashed #cbd5e0;
		border-radius: 5px;
	}
	.pointer {
		cursor: pointer;
	}
	.note {
		color: #a0aec0;
	}
</style>
