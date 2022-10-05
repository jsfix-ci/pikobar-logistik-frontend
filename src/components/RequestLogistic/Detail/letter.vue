<template>
  <div>
    <p class="text-label mb-1">{{ title }}</p>
    <div class="letter">
      <a
        :href="letter"
        target="_blank"
        class="letter-class blue--text align-self-center"
      >
        {{ letter.application_letter_number }}
      </a>
      <span class="ml-auto">
        <JDSButton inverted height="40" class="mx-1" @click="downloadFile(letter.letter)">
          <v-icon left dark>mdi-download</v-icon>
          {{ 'UNDUH' }}
        </JDSButton>
        <JDSButton inverted height="40" class="mx-1" @click="update()">
          <v-icon left dark>mdi-pencil</v-icon>
          {{ 'UBAH' }}
        </JDSButton>
      </span>
    </div>
  </div>
</template>
<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  name: 'CardLetter',
  components: {
    JDSButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    letter: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    downloadFile(payload) {
      window.open(payload)
    },
    update() {
      this.$emit('update')
    }
  }
}
</script>
<style lang="scss" scoped>
.text-label {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: #757575;
}
.letter-class {
  font-family: "Product Sans";
  font-weight: 400;
  font-size: 14px;
  text-decoration: underline;
}
.letter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid #E0E0E0;
  padding: 1.2rem;
  border-radius: 0.3rem;
}
</style>
