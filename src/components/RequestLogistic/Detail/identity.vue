<template>
  <div>
    <p class="text-label mb-1">{{ items.title }}</p>
    <div class="instance-identity">
      <div v-for="item in items.data" :key="item.title" :class="{ 'nomor-handphone': item.title === 'Nomor Handphone Pengganti', 'image': item.type }">
        <p class="text-label-green mb-0">{{ item.title }}</p>
        <p v-if="!item.type" class="text-value">{{ item.value }}</p>
        <div v-else>
          <v-img
            v-if="item.type === 'image'"
            width="300"
            height="200"
            :src="item.value"
          />
          <a
            v-else
            :href="item.value"
            target="_blank"
            class="letter-class blue--text align-self-center"
          >
            {{ 'Unduh KTP' }}
          </a>
        </div>
      </div>
      <div class="edit-button justify-end ml-auto">
        <JDSButton inverted height="40" class="mx-1">
          <v-icon left dark>mdi-pencil</v-icon>
          <span>{{ 'UBAH' }}</span>
        </JDSButton>
      </div>
    </div>
  </div>
</template>
<script>
import JDSButton from '@/components/Base/JDSButton'
export default {
  name: 'CardIdentity',
  components: {
    JDSButton
  },
  props: {
    items: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
// PR long content dan dinamic kolom untuk identitas pemohon
// Tambahkan hide and show dibagian identitas pemohon
.instance-identity {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 10rem;
  grid-template-areas:
  ". . image editButton"
  ". . image editButton"
  ". nomorHandphone image editButton";
  gap: 1rem;
  border: 1px solid #E0E0E0;
  padding: 1.2rem 1.2rem;
  border-radius: 0.3rem;
}
.edit-button {
  grid-area: editButton;
}
.nomor-handphone {
  grid-area: nomorHandphone;
}
.image {
  grid-area: image;
}
.letter-class {
  font-family: "Product Sans";
  font-weight: 400;
  font-size: 14px;
  text-decoration: underline;
}
.text-label {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: #757575;
}
.text-label-green {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 27px;
  color: #1FB767;
}
.text-value {
  font-family: "Product Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;
  color: #757575;
}
</style>
