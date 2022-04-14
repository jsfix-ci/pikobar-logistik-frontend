<template>
  <div class="jds-pagination">
    <v-icon
      class="jds-pagination__icon jds-pagination__icon--left"
      @click="onPrev"
    >
      mdi-chevron-left
    </v-icon>
    <div class="d-flex flex-row align-center">
      <span class="jds-pagination__label">Halaman</span>
      <v-select
        :key="page"
        v-model="page"
        :items="listPages"
        hide-details
        solo
      >
        <template v-slot:append>
          <v-icon color="#008444">mdi-chevron-down</v-icon>
        </template>
      </v-select>
      <span class="jds-pagination__label">dari</span>
      <span class="jds-pagination__label font-weight-bold ml-1">{{ totalPage }}</span>
    </div>
    <v-icon
      class="jds-pagination__icon jds-pagination__icon--right"
      @click="onNext"
    >
      mdi-chevron-right
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    totalPage: {
      type: [String, Number],
      default: ''
    },
    initPage: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      page: null,
      listPages: []
    }
  },
  watch: {
    page(val) {
      this.$emit('update:page', val)
    }
  },
  mounted() {
    this.listPages = Array.from({ length: this.totalPage }, (_, i) => i + 1)
    this.page = this.initPage ?? this.listPages[0]
  },
  methods: {
    onPrev() {
      if (this.page !== 1) {
        this.page -= 1
        this.$emit('onPrev')
      }
    },
    onNext() {
      if (this.page !== this.listPages.length) {
        this.page += 1
        this.$emit('onNext')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jds-pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #FAFAFA;
  border-top-style: solid;
  border-width: 1px;
  border-color: #008444;

  &__label {
    font-family: 'Lato';
    font-size: 14px;
    color: #424242;
  }

  &__icon{
    border-color: #EEEEEE;
    border-width: 1px;

    &--left {
      border-right-style: solid;
    }

    &--right {
      border-left-style: solid;
    }
  }
}
.theme--light.v-text-field--solo::v-deep {
  .v-input__slot {
    background: transparent !important;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #424242;
    border: none !important;
    width: 75px;
  }

  .v-input__control {
    min-height: 0px;
  }
}
.theme--light.v-list::v-deep {
  .v-list-item__title {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: #424242;
  }
}
</style>
