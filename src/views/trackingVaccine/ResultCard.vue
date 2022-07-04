<template>
  <div class="result">
    <div class="result__column result__column--header">
      <span class="mb-2">No.</span>
      <span class="mb-2">Tanggal Permohonan</span>
      <span class="mb-2">Nomor Surat</span>
      <span class="mb-2">Nama Instansi</span>
      <span class="mb-2">Jenis Instansi</span>
      <span class="mb-2">Pemohon</span>
      <span>Aksi</span>
    </div>
    <div class="result__column">
      <span class="mb-2">{{ index }}</span>
      <span class="mb-2">{{ data.created_at }}</span>
      <span class="mb-2">{{ data.letter_number }}</span>
      <span class="mb-2">{{ data.agency_name }}</span>
      <span class="mb-2">{{ data.agency_type_name }}</span>
      <span class="mb-2">{{ data.applicant_fullname }}</span>
      <JDSButton inverted height="34px" @click="onDetail()">
        {{ $t('label.detail') }}
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
    index: {
      type: [Number, String],
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onDetail() {
      // @todo: create onDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: row;
  padding: 16px;
  background: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  border-color: #f2f2f2;
  border-width: 1px;
  border-top-style: solid;

  &__column {
    display: flex;
    flex-direction: column;
    width: 50%;

    &--header {
      font-weight: 700;
      color: #069550;
    }
  }
}
</style>
