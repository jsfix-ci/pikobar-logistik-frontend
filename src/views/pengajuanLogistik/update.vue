<template>
  <v-dialog
    v-model="show"
    max-width="480"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-col>
          <span class="title-update-logistic-needs">{{ $t('label.update_logistic_needs_title') }}</span>
        </v-col>
        <v-col v-if="updateName === false" class="mb-30">
          <span class="sub-title-update-logistic-needs">{{ $t('label.apd_spec_name') }}</span>
          <v-btn class="ma-2" small outlined color="success" height="35px" absolute right @click="updateName = true">
            <v-icon left>mdi-pencil</v-icon>{{ $t('label.edit') }}
          </v-btn>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item ? item.product.name : '-' }}</span>
        </v-col>
        <v-col v-else class="margin-top-min-10-update-logistic-needs">
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredAPDName"
          >
            <span class="sub-title-update-logistic-needs">{{ $t('label.apd_name_spec') }}</span>
            <v-autocomplete
              v-model="data.apd"
              :placeholder="$t('label.choose_apd')"
              :items="listAPD"
              item-text="name"
              item-value="id"
              :error-messages="errors"
              outlined
              solo-inverted
              @change="setUnit(data.apd)"
            />
          </ValidationProvider>
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.total_needs') }}</span>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item ? item.quantity : '-' }}</span>
        </v-col>
        <v-col class="margin-top-min-10-update-logistic-needs">
          <v-row>
            <v-col cols="5">
              <span class="sub-title-update-logistic-needs">{{ $t('label.realization_amount') }}</span>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredRealizationAmount|numericRealizationAmount"
              >
                <v-text-field
                  v-model="data.realization_quantity"
                  outlined
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="4">
              <span class="sub-title-update-logistic-needs">{{ $t('label.unit') }}</span>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredUnit"
              >
                <v-autocomplete
                  v-model="data.unitId"
                  :items="unitList"
                  outlined
                  solo-inverted
                  :no-data-text="$t('label.no_data')"
                  :error-messages="errors"
                  item-value="unit_id"
                  item-text="unit"
                />
              </ValidationProvider>
            </v-col>
            <v-col cols="3">
              <div class="mt-30" style="margin-top: 30px">
                <v-btn small color="success" height="45px" dark @click="getStockItem()">{{ $t('label.check_stock') }}</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.realization_date') }}</span>
          <date-picker-input
            :value="date"
            @selected="changeDate"
          />
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.status') }}</span>
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredStatus"
          >
            <v-select
              v-model="data.status"
              solo
              :placeholder="$t('label.select_status')"
              :error-messages="errors"
              :items="status"
            />
          </ValidationProvider>
        </v-col>
        <v-col class="margin-top-min-30-update-logistic-needs">
          <v-btn class="margin-btn-update-logistic-needs" outlined @click="hideDialog">{{ $t('label.cancel') }}</v-btn>
          <v-btn class="margin-btn-update-logistic-needs" color="success" @click="submitData">{{ $t('label.update') }}</v-btn>
        </v-col>
      </ValidationObserver>
    </v-card>
    <CheckStockDialog :dialog-show="dialogStock" />
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import CheckStockDialog from './stock'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'UpdateKebutuhanLogistik',
  components: {
    ValidationProvider,
    ValidationObserver,
    CheckStockDialog
  },
  props: {
    show: {
      type: Boolean,
      default: null
    },
    item: {
      type: Object,
      default: null
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: {},
      dialogStock: false,
      updateName: false,
      unitList: [],
      unitId: null,
      dialog: false,
      date: null,
      labelDate: this.$t('label.input_date'),
      status: [
        {
          text: this.$t('label.approved_item'),
          value: 'approved'
        },
        {
          text: this.$t('label.not_available'),
          value: 'not_avalivable'
        },
        {
          text: this.$t('label.replaced'),
          value: 'replaced'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('logistics', [
      'listAPD', 'listApdUnit'
    ])
  },
  async created() {
    await this.getListAPD()
    EventBus.$on('closeDialogStock', (value) => {
      this.dialogStock = value
    })
  },
  methods: {
    getStockItem() {
      this.dialogStock = true
      this.getStock(this.data.apd || this.item.product.id)
    },
    async getStock(value) {
      const param = {
        id: await value
      }
      await this.$store.dispatch('logistics/getStock', param)
    },
    async getListAPD() {
      await this.$store.dispatch('logistics/getListAPD', this.listQueryAPD)
      this.listAPD.forEach(element => {
        element.value = {
          id: element.id,
          name: element.name
        }
      })
    },
    setTotalAPD() {
      this.totalLogistic = 0
      this.logisticNeeds.forEach(element => {
        this.totalLogistic = this.totalLogistic + parseInt(element.total)
      })
    },
    async setUnit(value) {
      this.unitList = await this.$store.dispatch('logistics/getListApdUnit', value)
    },
    async submitData() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.data.need_id = this.item.id
      this.data.unit_id = this.data.unitId || this.item.unit.id
      this.data.product_id = this.data.apd || this.item.product_id
      this.data.agency_id = this.item.agency_id
      await this.$store.dispatch('logistics/postUpdateLogisticNeeds', this.data)
      window.location.reload()
    },
    hideDialog() {
      EventBus.$emit('dialogHide', false)
    },
    handleSelectedDate(value) {
      this.$emit('selected', value)
    },
    changeDate(value) {
      this.data.realization_date = value
    }
  }
}
</script>

<style>
  .title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 22px;
  }
  .sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 17px;
    color: #219653;
  }
  .value-sub-title-update-logistic-needs {
    font-family: 'Product Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    color: #828282;
  }
  .margin-top-min-10-update-logistic-needs {
    margin-top: -10px;
  }
  .margin-top-min-30-update-logistic-needs {
    margin-top: -30px;
  }
  .margin-btn-update-logistic-needs {
    margin: 5px;
  }
</style>
