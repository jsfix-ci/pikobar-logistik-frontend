<template>
  <div>
    <!-- Verification -->
    <div v-if="stage === 'NOT_VERIFIED'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted height="42px" class="mr-2" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton inverted danger height="42px" class="mr-2" @click="$emit('reject-verification')">
        {{ $t('label.reject_request') }}
      </JDSButton>
      <JDSButton height="42px" @click="$emit('verif-confirmation')">
        {{ $t('label.verification') }}
      </JDSButton>
    </div>
    <!-- Verification versi space between -->
    <!-- <div v-if="stage === 'NOT_VERIFIED'" class="d-flex flex-row justify-space-between mt-8">
      <JDSButton inverted height="42px" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <div>
        <JDSButton inverted danger height="42px" class="mr-4" @click="$emit('confirm', 'reject')">
          {{ $t('label.reject_request') }}
        </JDSButton>
        <JDSButton height="42px" @click="$emit('confirm', 'verifConfirmation')">
          {{ $t('label.verification') }}
        </JDSButton>
      </div>
    </div> -->

    <!-- Recommendation -->
    <div v-if="stage === 'VERIFIED'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted height="42px" class="mr-3" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton inverted danger height="42px" class="mr-3" @click="$emit('reject-approval')">
        {{ $t('label.reject_request') }}
      </JDSButton>
      <JDSButton height="42px" @click="$emit('recommend')">
        {{ $t('label.give_recommendation') }}
      </JDSButton>
    </div>

    <!-- Realization -->
    <div v-if="stage === 'APPROVED'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted height="42px" class="mr-3" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton height="42px" @click="$emit('realize')">
        {{ $t('label.give_realization') }}
      </JDSButton>
    </div>

    <div v-if="stage === 'VERIFICATION_REJECTED' || stage === 'APPROVAL_REJECTED'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted height="42px" class="mr-3" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton height="42px" @click="$emit('show-note')">
        {{ 'Alasan Ditolak' }}
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
