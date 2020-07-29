<template>
  <v-dialog
    v-model="show"
    max-width="480"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-col>
          <div v-if="isUpdate" class="title-update-logistic-needs" style="padding-bottom: 30px">{{ $t('label.update_distribution_realization') }}</div>
          <div v-else-if="isCreate" class="title-update-logistic-needs" style="padding-bottom: 30px">{{ $t('label.add_distribution_realization') }}</div>
          <div v-else class="title-update-logistic-needs">{{ $t('label.update_logistic_needs_title') }}</div>
        </v-col>
        <v-col v-if="updateName === false" class="mb-30">
          <span class="sub-title-update-logistic-needs">{{ $t('label.apd_spec_name') }}</span>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item.product ? item.product.name : '-' }}</span>
        </v-col>
        <v-col v-if="!isCreate" class="margin-top-min-30-update-logistic-needs">
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredStatus"
          >
            <span class="sub-title-update-logistic-needs">{{ $t('label.status') }}</span>
            <v-autocomplete
              v-model="data.status"
              outlined
              solo-inverted
              :placeholder="$t('label.select_status')"
              :error-messages="errors"
              :items="status"
            />
          </ValidationProvider>
        </v-col>
        <v-col v-if="data.status !== 'not_available'" class="margin-top-min-30-update-logistic-needs">
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredAPDName"
          >
            <span class="sub-title-update-logistic-needs">{{ $t('label.realization_item') }}</span>
            <v-autocomplete
              v-model="data.product_id"
              :placeholder="$t('label.choose_apd')"
              :items="listAPD"
              :error-messages="errors"
              outlined
              solo-inverted
              item-text="name"
              item-value="id"
              @change="setUnit(data.product_id)"
            />
          </ValidationProvider>
        </v-col>
        <v-col v-if="!isCreate" class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.total_needs') }}</span>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item ? item.quantity : '-' }}</span>
        </v-col>
        <v-col v-if="data.status !== 'not_available'" class="margin-top-min-20-update-logistic-needs">
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
                  solo-inverted
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
                  v-model="data.unit_id"
                  :items="listApdUnit"
                  outlined
                  solo-inverted
                  :no-data-text="$t('label.no_data')"
                  :error-messages="errors"
                  item-value="id"
                  item-text="name"
                />
              </ValidationProvider>
            </v-col>
            <v-col v-if="(data.product_id)" cols="3">
              <div class="mt-30" style="margin-top: 30px">
                <v-btn small color="success" height="45px" dark @click="getStockItem()">{{ $t('label.check_stock') }}</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="data.status !== 'not_available'" class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.realization_date') }}</span>
          <date-picker-input
            :value="data.realization_date"
            @selected="changeDate"
          />
        </v-col>
        <v-col>
          <v-btn class="margin-btn-update-logistic-needs" outlined @click="hideDialog">{{ $t('label.cancel') }}</v-btn>
          <v-btn v-if="isUpdate === true" class="margin-btn-update-logistic-needs" color="success" @click="submitData()">{{ $t('label.update') }}</v-btn>
          <v-btn v-else-if="isCreate === true" class="margin-btn-update-logistic-needs" color="success" @click="submitData(true)">{{ $t('label.add') }}</v-btn>
          <v-btn v-else class="margin-btn-update-logistic-needs" color="success" @click="submitData(false)">{{ $t('label.update') }}</v-btn>
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
    }
  },
  data() {
    return {
      data: {},
      item: {},
      dialogStock: false,
      updateName: false,
      isCreate: false,
      isUpdate: false,
      unitList: [],
      unitId: null,
      dialog: false,
      date: null,
      agency_id: null,
      labelDate: this.$t('label.input_date'),
      status: [
        {
          text: this.$t('label.approved_item'),
          value: 'approved'
        },
        {
          text: this.$t('label.not_available'),
          value: 'not_available'
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
      this.getStock(this.data.product_id)
    },
    async getStock(value) {
      const param = {
        poslog_id: await value
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
    setDialog(type, data, value) {
      this.isCreate = type
      this.updateName = type
      if (type === false) {
        this.data = {}
        this.item = data
        this.data = data
        this.setUnit(data.realization_product_id)
        this.data.product_id = data.realization_product_id
        this.data.unit_id = '1'
      } else if (type === true) {
        this.agency_id = data
        this.data = {}
      } else {
        this.isCreate = true
        this.updateName = true
        this.isUpdate = true
        this.data = data
        this.setUnit(data.product_id)
      }
    },
    async setUnit(id) {
      await this.$store.dispatch('logistics/getListApdUnit', id)
      this.listApdUnit.forEach(element => {
        element.value = {
          id: element.id,
          name: element.name
        }
      })
    },
    async submitData(value) {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      if (this.isUpdate) {
        this.data.status = 'approved'
        await this.$store.dispatch('logistics/updateLogisticNeedsAdmin', this.data)
      } else {
        if (value === true) {
          this.data.status = 'approved'
          this.data.agency_id = this.agency_id
          await this.$store.dispatch('logistics/postUpdateLogisticNeedsAdmin', this.data)
        } else {
          this.data.need_id = this.item.id
          this.data.product_id = this.data.product_id || this.item.product_id
          this.data.agency_id = this.item.agency_id
          delete this.data.id
          await this.$store.dispatch('logistics/postUpdateLogisticNeeds', this.data)
        }
      }
      window.location.reload()
    },
    hideDialog() {
      this.$refs.observer.reset()
      window.location.reload()
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
  .margin-top-min-20-update-logistic-needs {
    margin-top: -25px;
  }
  .margin-btn-update-logistic-needs {
    margin: 5px;
  }
</style>
