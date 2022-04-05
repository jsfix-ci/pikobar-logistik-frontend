<template>
  <div class="jds-file-input">
    <span class="jds-file-input__label">
      {{ label }}
    </span>
    <input
      ref="file"
      type="file"
      class="d-none"
      accept=".jpg,.jpeg,.png"
      @input="onInput"
      @change="onChange"
    >
    <div
      class="jds-file-input__container"
      @click="$refs.file.click()"
      @dragover="dragover($event)"
      @drop="drop($event)"
    >
      <img v-if="!showFileName" src="/img/file-input.svg" alt="file-input" height="72" width="93.35">
      <span v-if="!showFileName" class="jds-file-input__placeholder">
        Geser gambar/foto di sini atau
        <span class="jds-file-input__placeholder jds-file-input__placeholder__upload" @click="$refs.file.click()">
          Upload
        </span>
      </span>
      <span v-if="!showFileName" class="jds-file-input__placeholder__format">(Format JPG, JPEG, PNG)</span>
      <span v-else>{{ fileList[0].name }}</span>
    </div>
    <span v-if="!hideDetails" class="jds-file-input__error-messages">{{ errorMessages[0] }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    errorMessages: {
      type: Array,
      default: () => []
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    showFileName() {
      return this.fileList.length !== 0
    }
  },
  methods: {
    onInput() {
      this.$emit('input', this.$refs.file.files[0])
    },
    onChange() {
      this.fileList = [...this.$refs.file.files]
      this.$emit('change', this.$refs.file.files)
    },
    drop(event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.onChange()
      this.onInput()
    },
    dragover(event) {
      event.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.jds-file-input {
  display: flex;
  flex-direction: column;

  &__label {
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: #424242;
    margin-bottom: 8px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #FAFAFA;
    padding: 40px;
    border-style: dashed;
    border-width: 1px;
    border-radius: 12px;
    border-color: #9E9E9E;
  }

  &__placeholder {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #424242;

    &__upload {
      color: #1e88e5;
      text-decoration: underline;
    }

    &__upload:hover {
      cursor: pointer;
    }

    &__format {
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      color: #757575;
    }
  }

  &__error-messages {
    font-size: 12px;
    color: #ff5252;
  }
}
</style>
