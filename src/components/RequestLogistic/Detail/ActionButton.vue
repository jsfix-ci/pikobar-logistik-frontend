<template>
  <div>
    <!-- Verification -->
    <div v-if="stage === 'NOT_VERIFIED'" class="d-flex flex-row justify-space-between mt-8">
      <JDSButton inverted height="42px" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <div>
        <JDSButton inverted danger height="42px" class="mr-4" @click="$emit('reject-verification')">
          {{ $t('label.reject_request') }}
        </JDSButton>
        <JDSButton height="42px" @click="$emit('verif-confirmation')">
          {{ $t('label.verification') }}
        </JDSButton>
      </div>
    </div>

    <!-- Recommendation -->
    <div v-else-if="stage === 'VERIFIED'" class="d-flex flex-row justify-space-between mt-8">
      <JDSButton inverted height="42px" class="mr-3" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <div>
        <JDSButton inverted danger height="42px" class="mr-3" @click="$emit('reject-approval')">
          {{ $t('label.reject_request') }}
        </JDSButton>
        <JDSButton height="42px" @click="$emit('recommend')">
          {{ $t('label.give_recommendation') }}
        </JDSButton>
      </div>
    </div>

    <!-- Realization -->
    <div v-else-if="stage === 'APPROVED'" class="d-flex flex-row justify-space-between mt-8">
      <JDSButton inverted height="42px" class="mr-3" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <div>
        <JDSButton height="42px" @click="$emit('realize')">
          {{ $t('label.give_realization') }}
        </JDSButton>
      </div>
    </div>

    <div v-else-if="stage === 'VERIFICATION_REJECTED' || stage === 'APPROVAL_REJECTED'" class="d-flex flex-row justify-space-between mt-8">
      <JDSButton inverted height="42px" class="mr-3" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <div>
        <JDSButton height="42px" @click="$emit('show-note')">
          {{ 'Alasan Ditolak' }}
        </JDSButton>
      </div>
    </div>

    <div v-else class="d-flex flex-row justify-start mt-8">
      <JDSButton inverted height="42px" @click="onBack()">
        {{ $t('label.back') }}
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
    }
  }
}
</script>
