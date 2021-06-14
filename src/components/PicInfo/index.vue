<template>
  <v-row justify="center" class="dialog-pic">
    <v-dialog
      v-model="dialogPic"
      persistent
      max-width="350px"
    >
      <v-card>
        <div class="col-sm-12">
          <v-card-title class="dialog-pic-title">
            <h4><strong>{{ $t('label.pic_detail_title') }}</strong></h4>
          </v-card-title>
          <div v-if="dataPic">
            <v-card-text>
              <div class="col-sm-12">
                <span class="font-weight-bold green--text">{{ $t('label.pic_name') }}</span>
                <br>
                <span>{{ dataPic.name }}</span>
              </div>
              <div class="col-sm-12">
                <span class="font-weight-bold green--text">{{ $t('label.pic_agency_name') }}</span>
                <br>
                <span>{{ dataPic.agency_name }}</span>
              </div>
              <div class="col-sm-12">
                <span class="font-weight-bold green--text">{{ $t('label.pic_handphone') }}</span>
                <br>
                <span>{{ dataPic.handphone }}</span>
              </div>
            </v-card-text>
          </div>
          <v-card-actions class="justify-center" style="padding: 2rem">
            <v-btn
              color="success"
              dark
              style="height: 40px;min-width: 120px;"
              @click="dialogPic = false"
            >
              {{ $t('label.ok') }}
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogPic',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    storePathPic: {
      type: String,
      default: null
    },
    dataPic: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    dialogPic: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('update:dialogPic', val)
      }
    }
  },
  methods: {
    async picData() {
      await this.$store.dispatch(this.storePathPic, this.dataPic.id)
      await this.$emit('update:dialogPic', false)
      await this.$emit('update:picData', {})
      await this.$store.dispatch('toast/successToast', this.$t('success.data_success_pic'))
      if (this.type === 'letter') {
        await this.$parent.getDetailApplication()
      } else {
        this.$parent.getListRealizationAdmin()
      }
    }
  }
}
</script>
