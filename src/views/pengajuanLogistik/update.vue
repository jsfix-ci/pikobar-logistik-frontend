<template>
  <v-dialog
    v-model="show"
    max-width="480"
    :persistent="true"
  >
    <v-card>
      <ValidationObserver ref="observer">
        <v-col>
          <div v-if="isUpdate" class="title-update-logistic-needs" style="padding-bottom: 30px">
            <span v-if="isVerified && !isApproved">{{ $t('label.update_distribution_recommendation') }}</span>
            <span v-else>{{ $t('label.update_distribution_realization') }}</span>
          </div>
          <div v-else-if="isCreate" class="title-update-logistic-needs" style="padding-bottom: 30px">
            <span v-if="isVerified && !isApproved">{{ $t('label.add_distribution_recommendation') }}</span>
            <span v-else>{{ $t('label.add_distribution_realization') }}</span>
          </div>
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
            <span v-if="isVerified && !isApproved" class="sub-title-update-logistic-needs">{{ $t('label.recommendation_status') }}</span>
            <span v-else-if="isVerified && isApproved" class="sub-title-update-logistic-needs">{{ $t('label.realization_status') }}</span>
            <span v-else class="sub-title-update-logistic-needs">{{ $t('label.realization_status') }}</span>
            <v-autocomplete
              v-model="data.status"
              outlined
              solo-inverted
              :placeholder="$t('label.select_status')"
              :error-messages="errors"
              :items="status"
              @change="getListAPD"
            />
          </ValidationProvider>
        </v-col>
        <v-col v-if="!hideException" class="margin-top-min-30-update-logistic-needs">
          <ValidationProvider
            v-slot="{ errors }"
            rules="requiredAPDName"
          >
            <span v-if="isVerified && !isApproved" class="sub-title-update-logistic-needs">{{ $t('label.recommendation_item') }}</span>
            <span v-else-if="isVerified && isApproved" class="sub-title-update-logistic-needs">{{ $t('label.realization_item') }}</span>
            <span v-else class="sub-title-update-logistic-needs">{{ $t('label.realization_item') }}</span>
            <v-autocomplete
              v-model="data.product_id"
              :placeholder="$t('label.choose_apd')"
              :items="listAPD"
              :error-messages="errors"
              :no-data-text="$t('label.no_data')"
              outlined
              solo-inverted
              item-text="name"
              item-value="material_id"
              @change="setUnit(data.product_id)"
            />
          </ValidationProvider>
        </v-col>
        <v-col v-if="!isCreate" class="margin-top-min-30-update-logistic-needs">
          <span class="sub-title-update-logistic-needs">{{ $t('label.total_needs') }}</span>
          <br>
          <span class="value-sub-title-update-logistic-needs">{{ item ? item.quantity : '-' }}</span>
        </v-col>
        <v-col v-if="!hideException" class="margin-top-min-20-update-logistic-needs">
          <v-row>
            <v-col cols="5">
              <span v-if="isVerified && !isApproved" class="sub-title-update-logistic-needs">{{ $t('label.recommendation_amount') }}</span>
              <span v-else-if="isVerified && isApproved" class="sub-title-update-logistic-needs">{{ $t('label.realization_amount') }}</span>
              <span v-else class="sub-title-update-logistic-needs">{{ $t('label.realization_amount') }}</span>
              <ValidationProvider
                v-slot="{ errors }"
                rules="requiredRealizationAmount|numericRealizationAmount"
              >
                <v-text-field
                  v-if="isVerified && !isApproved"
                  v-model="data.recommendation_quantity"
                  outlined
                  solo-inverted
                  :error-messages="errors"
                />
                <v-text-field
                  v-else
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
                  v-if="isVerified && !isApproved"
                  v-model="data.recommendation_unit"
                  :items="listApdUnit"
                  outlined
                  solo-inverted
                  :no-data-text="$t('label.no_data')"
                  :error-messages="errors"
                  item-value="id"
                  item-text="name"
                />
                <v-autocomplete
                  v-else
                  v-model="data.realization_unit_id"
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
        <v-col v-if="!hideException" class="margin-top-min-30-update-logistic-needs">
          <span v-if="isVerified && !isApproved" class="sub-title-update-logistic-needs">{{ $t('label.recommendation_date') }}</span>
          <span v-else-if="isVerified && isApproved" class="sub-title-update-logistic-needs">{{ $t('label.realization_date') }}</span>
          <span v-else class="sub-title-update-logistic-needs">{{ $t('label.realization_date') }}</span>
          <date-picker-input
            v-if="isVerified && !isApproved"
            :value="data.recommendation_date"
            @selected="changeDate"
          />
          <date-picker-input
            v-else
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
      isVerified: false,
      isApproved: false,
      hideException: false,
      unitList: [],
      unitId: null,
      dialog: false,
      date: null,
      agency_id: null,
      labelDate: this.$t('label.input_date'),
      listQueryAPD: {
        id: null,
        status: null
      },
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
        },
        {
          text: this.$t('label.not_yet_fulfilled'),
          value: 'not_yet_fulfilled'
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
      this.hideException = false
      this.listQueryAPD.status = null
      this.listQueryAPD.id = null
      if (this.data.status === 'approved') {
        this.listQueryAPD.status = 'approved'
        this.listQueryAPD.id = this.item.product !== undefined ? this.item.product.id : null
      } else if (this.data.status === 'not_available') {
        this.hideException = true
      } else if (this.data.status === 'not_yet_fulfilled') {
        this.hideException = true
      } else {
        this.listQueryAPD.status = null
        this.listQueryAPD.id = null
      }
      await this.$store.dispatch('logistics/getListAPD', this.listQueryAPD)
      this.listAPD.forEach(element => {
        element.value = {
          id: element.material_id,
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
    async setDialog(type, data, value, recommendation, realization) {
      this.isCreate = type
      this.updateName = type
      this.isUpdate = false
      this.isVerified = recommendation
      this.isApproved = realization
      this.data = {}
      this.item = {}
      if (type === false) {
        this.data = {}
        this.item = data
        this.data = data
        this.data.unit_id = '1'
        if (this.isVerified && !this.isApproved) {
          this.data.status = this.data.recommendation_status
          this.setUnit(data.recommendation_product_id)
          this.data.product_id = data.recommendation_product_id
        } else if (this.isVerified && this.isApproved) {
          this.data.status = this.data.realization_status
          this.setUnit(data.realization_product_id)
          this.data.product_id = data.realization_product_id
        }
      } else if (type === true) {
        this.agency_id = data
        this.data = {}
      } else {
        this.isCreate = true
        this.updateName = true
        this.isUpdate = true
        this.data = data
        this.setUnit(data.product_id)
        if (this.isVerified && !this.isApproved) {
          this.data.status = this.data.recommendation_status
          this.data.product_id = this.data.recommendation_product_id
        } else if (this.isVerified && this.isApproved) {
          this.data.status = this.data.realization_status
          this.data.product_id = this.data.realization_product_id
        }
      }
      await this.getListAPD()
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
      this.data.store_type = 'recommendation'
      if (this.isApproved) {
        this.data.store_type = 'realization'
      }
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      if (this.isUpdate) {
        this.data.status = 'approved'
        await this.$store.dispatch('logistics/updateLogisticNeedsAdmin', this.data)
        this.$parent.getListRealizationAdmin()
      } else {
        if (value === true) {
          this.data.status = 'approved'
          this.data.agency_id = this.agency_id
          await this.$store.dispatch('logistics/postUpdateLogisticNeedsAdmin', this.data)
          this.$parent.getListRealizationAdmin()
        } else {
          this.data.need_id = this.item.id
          this.data.product_id = this.data.product_id || this.item.product_id
          this.data.agency_id = this.item.agency_id
          delete this.data.id
          await this.$store.dispatch('logistics/postUpdateLogisticNeeds', this.data)
          this.$parent.getListDetailNeeds()
        }
      }
      await this.hideDialog()
    },
    hideDialog() {
      this.$refs.observer.reset()
      EventBus.$emit('dialogHide', false)
    },
    handleSelectedDate(value) {
      this.$emit('selected', value)
    },
    changeDate(value) {
      if (this.isVerified && !this.isApproved) {
        this.data.recommendation_date = value
      } else {
        this.data.realization_date = value
      }
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
