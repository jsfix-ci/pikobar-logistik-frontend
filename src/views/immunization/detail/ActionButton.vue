<template>
  <div>
    <div v-if="stage === 'admin-verification'" class="d-flex flex-row justify-space-between mt-8">
      <JDSButton inverted height="42px" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <div>
        <JDSButton danger height="42px" class="mr-4" @click="onReject()">
          {{ $t('label.reject') }}
        </JDSButton>
        <JDSButton height="42px" @click="onVerify()">
          {{ $t('label.verification') }}
        </JDSButton>
      </div>
    </div>
    <div v-if="stage === 'recommendation'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted height="42px" class="mr-4" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton height="42px" @click="onRecommend()">
        {{ $t('label.give_recommendation') }}
      </JDSButton>
    </div>
  </div>
</template>

<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  components: {
    JDSButton
  },
  props: {
    stage: {
      type: String,
      default: ''
    }
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    },
    onReject() {
      // @todo: create onReject function
    },
    onVerify() {
      // @todo: create onVerify function
    },
    onRecommend() {
      // @todo: create onRecommend function
    }
  }
}
</script>
