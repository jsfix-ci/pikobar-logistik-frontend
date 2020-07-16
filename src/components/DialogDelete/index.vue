<template>
  <v-row justify="center" class="dialog-delete">
    <v-dialog
      v-model="dialogDelete"
      persistent
      max-width="340px"
    >
      <v-card>
        <div class="justify-center dialog-img-delete">
          <img src="../../static/image-delete-dialog.svg">
        </div>
        <v-card-text v-if="dataDeleted" class="dialog-delete-title font-weight-bold">
          {{ $t('label.delete_dialog') }} <br>
          <span
            v-if="dataDeleted.id"
            class="font-weight-black"
          >
            {{ dataDeleted.product.name.toUpperCase() +'?' }}
          </span>
        </v-card-text>
        <v-card-actions class="justify-center" style="padding: 2rem">
          <v-btn
            color="grey"
            outlined
            style="height: 40px;min-width: 120px;"
            @click="dialogDelete = false"
          >
            {{ $t('label.cancel') }}
          </v-btn>
          <v-btn
            color="red"
            outlined
            style="height: 40px;min-width: 120px;"
            @click="deleteData"
          >
            {{ $t('label.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogDelete',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    storePathDelete: {
      type: String,
      default: null
    },
    dataDeleted: {
      type: Object,
      default: null
    }
  },
  computed: {
    dialogDelete: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('update:dialogDelete', val)
      }
    }
  },
  methods: {
    async deleteData() {
      await this.$store.dispatch(this.storePathDelete, this.dataDeleted.id)
      await this.$emit('update:dialogDelete', false)
      await this.$emit('update:deletedData', {})
      await this.$store.dispatch('toast/successToast', this.$t('success.data_success_delete'))
      this.$parent.getListRealizationAdmin()
    }
  }
}
</script>
