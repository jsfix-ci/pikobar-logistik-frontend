<template>
  <div>
    <!-- Verification -->
    <div v-if="stage === 'admin-verification'" class="d-flex flex-row justify-space-between mt-8">
      <JDSButton inverted height="42px" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <div>
        <JDSButton inverted danger height="42px" class="mr-4" @click="$emit('confirm', 'reject')">
          {{ $t('label.reject_request') }}
        </JDSButton>
        <JDSButton inverted height="42px" class="mr-4" @click="$emit('confirm', 'verifWithNote')">
          {{ $t('label.approved_with_notes') }}
        </JDSButton>
        <JDSButton height="42px" @click="$emit('confirm', 'verifConfirmation')">
          {{ $t('label.verification') }}
        </JDSButton>
      </div>
    </div>

    <!-- Recommendation -->
    <div v-if="stage === 'recommendation'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted height="42px" class="mr-4" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton height="42px" @click="$emit('recommend')">
        {{ $t('label.give_recommendation') }}
      </JDSButton>
    </div>

    <!-- Realization -->
    <div v-if="stage === 'realization'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted height="42px" class="mr-4" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton height="42px" @click="$emit('realize')">
        {{ $t('label.give_realization') }}
      </JDSButton>
    </div>

    <!-- Delivery Plan -->
    <div v-if="stage === 'delivery-plan'" class="d-flex flex-row justify-end mt-8">
      <JDSButton inverted danger height="42px" class="mr-4" @click="$emit('confirm', 'reject')">
        {{ $t('label.reject_request') }}
      </JDSButton>
      <JDSButton inverted height="42px" class="mr-4" @click="onBack()">
        {{ $t('label.back') }}
      </JDSButton>
      <JDSButton inverted height="42px" class="mr-4" @click="$emit('return')">
        Kembalikan Data
      </JDSButton>
      <JDSButton height="42px" @click="$emit('deliver')">
        Perintahkan Keluar Barang
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
