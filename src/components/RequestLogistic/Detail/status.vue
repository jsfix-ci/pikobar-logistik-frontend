<template>
  <div :class="[length === 1 ? 'container-urgency-full': 'container-urgency']">
    <p class="text-label mb-1">{{ title }}</p>
    <div class="urgency">
      <span class="text-content align-self-center mr-2" :class="{ 'text-content--danger': type !== 'status-request' }">
        {{ content }}
        <strong>{{ strong }}</strong>
      </span>
      <div class="ml-auto flex-shrink-1 flex-grow-0 align-self-center">
        <JDSButton v-if="type === 'status-request'" inverted width="14rem" class="button-status" @click="restoreStatus()">
          <v-icon left large dark>mdi-backup-restore</v-icon>
          <span style=" white-space: normal; word-wrap: break-word;" class="text-left pl-2">{{ buttonLabel }}</span>
        </JDSButton>
        <JDSButton v-else inverted danger height="50" @click="changeUrgency()">
          <v-icon left medium dark>mdi-alert-octagram</v-icon>
          <span>{{ buttonLabel }}</span>
        </JDSButton>
      </div>
    </div>
  </div>
</template>
<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  name: 'CardStatus',
  components: {
    JDSButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    buttonLabel: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    strong: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 2
    }
  },
  methods: {
    changeUrgency() {
      this.$emit('change-urgency')
    },
    restoreStatus() {
      this.$emit('restore-status')
    }
  }
}
</script>
<style lang="scss" scoped>
.button-status {
  display: block;
 }
.text-content {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;

  &--danger {
    color: #D32F2F;
;
  }
}
.text-label {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: #757575;
}
.container-urgency {
  width: 49.5%;
}
.container-urgency-full {
  width: 100%;
}
.urgency {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border: 1px solid #E0E0E0;
  padding: 1rem 1.2rem;
  border-radius: 0.3rem;
  height: 7rem;
}
</style>
