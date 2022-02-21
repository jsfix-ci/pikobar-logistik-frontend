<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="1"
      class="d-flex flex-column align-center justify-center"
    >
      <span>{{ index + 1 }}</span>
      <v-icon
        color="red"
        size="25"
        @click="$emit('delete', index)"
      >
        mdi-delete
      </v-icon>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="2"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="requiredAPDName"
      >
        <v-label>
          <strong>{{ $t('label.apd_name_spec') }}</strong>
        </v-label>
        <v-autocomplete
          v-model="data.apd"
          :placeholder="$t('label.choose_apd')"
          :items="listApd"
          item-text="name"
          item-value="id"
          :error-messages="errors"
          :hide-details="errors.length === 0"
          outlined
          solo-inverted
          @change="setUnit(data)"
        />
      </ValidationProvider>
    </v-col>
    <v-col
      v-if="!hideDescription"
      cols="12"
      sm="12"
      md="2"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="requiredBrand"
      >
        <v-label>
          <strong>{{ $t('label.description') }}</strong>
        </v-label>
        <v-text-field
          v-model="data.description"
          :placeholder="$t('label.input_description')"
          :error-messages="errors"
          :hide-details="errors.length === 0"
          outlined
          solo-inverted
        />
      </ValidationProvider>
    </v-col>
    <v-col
      cols="4"
      sm="4"
      md="1"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="requiredTotal|notMinus|notDecimal"
      >
        <v-label>
          <strong>{{ $t('label.total') }}</strong>
        </v-label>
        <v-text-field
          v-model="data.total"
          outlined
          solo-inverted
          type="number"
          :error-messages="errors"
          :hide-details="errors.length === 0"
          @change="setTotalAPD"
        />
      </ValidationProvider>
    </v-col>
    <v-col
      cols="8"
      sm="8"
      md="2"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="requiredUnit"
      >
        <v-label>
          <strong>{{ $t('label.unit') }}</strong>
        </v-label>
        <v-autocomplete
          :key="data.unitList.length"
          v-model="data.unitId"
          :items="data.unitList"
          outlined
          solo-inverted
          :error-messages="errors"
          :hide-details="errors.length === 0"
          item-value="unit_id"
          item-text="unit"
        />
      </ValidationProvider>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="2"
    >
      <ValidationProvider
        v-slot="{ errors }"
        rules="requiredPurpose"
      >
        <v-label>
          <strong>{{ $t('label.purpose') }}</strong>
        </v-label>
        <v-text-field
          v-model="data.purpose"
          :placeholder="$t('label.input_purpose')"
          outlined
          solo-inverted
          :error-messages="errors"
          :hide-details="errors.length === 0"
        />
      </ValidationProvider>
    </v-col>
    <v-col
      v-if="isVaccine"
      cols="12"
      sm="12"
      md="2"
    >
      <v-label>
        <strong>{{ $t('label.note') }}</strong>
      </v-label>
      <!-- @todo: adjust this model naming with BE -->
      <v-text-field
        v-model="data.note"
        :placeholder="$t('label.input_note')"
        :error-messages="errors"
        hide-details
        outlined
        solo-inverted
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider
  },
  props: {
    index: {
      type: Number,
      default: null
    },
    inputData: {
      type: Object,
      default: () => ({}),
      required: true
    },
    isVaccine: {
      type: Boolean,
      default: false
    },
    hideDescription: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: {},
      vaccineList: [ // @todo: request this data from BE
        {
          id: 1,
          name: 'SINOVAC'
        },
        {
          id: 2,
          name: 'MODERNA'
        },
        {
          id: 3,
          name: 'PFIZER'
        }
      ]
    }
  },
  computed: {
    ...mapState('logistics', [
      'dataListAPD'
    ]),
    listApd() {
      return this.isVaccine
        ? this.vaccineList
        : this.dataListAPD
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.$emit('change', this.data)
      }
    }
  },
  created() {
    this.data = { ...this.inputData }
  },
  methods: {
    async setUnit(value) {
      value.unitId = ''
      value.unitName = ''
      const listApd = await this.$store.dispatch('logistics/getListApdUnitMaterialGroup', value.apd)
      value.unitList = listApd.map(element => {
        return {
          unit_id: element.unit_id,
          unit: element.unit
        }
      })
    },
    setTotalAPD() {
      this.$emit('onTotalChange')
    },
    deleteData(index) {
      this.data.splice(index, 1)
      this.setTotalAPD()
      this.isValid = Object.keys(this.data).length !== 0
    }
  }
}
</script>
