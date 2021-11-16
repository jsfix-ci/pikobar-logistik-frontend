<template>
  <div class="d-flex flex-column">
    <!-- @todo: replace this p tag content -->
    <p class="text-center mx-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna pulvinar lacus tortor, erat. Enim ut etiam phasellus aliquet amet, eget placerat sapien tempus. Rhoncus ut eu id integer risus lobortis</p>
    <ValidationObserver ref="observer">
      <v-form>
        <v-row no-gutters>
          <v-col
            v-for="field in fieldList"
            :key="field.id"
            cols="12"
            md="6"
            sm="12"
            class="px-2"
          >
            <ValidationProvider
              v-slot="{ errors }"
              :rules="field.rules"
              :name="field.label"
            >
              <div v-if="field.type !== 'dropdown'">
                <label>
                  <strong>{{ field.label }} </strong>
                  <i v-if="field.isRequired">{{ $t('label.should_be_filled') }}</i>
                </label>
                <v-text-field
                  v-if="field.type === 'text'"
                  v-model="form[field.model]"
                  :error-messages="errors"
                  :label="`${$t('label.please_input')} ${field.label}`"
                  solo-inverted
                />
                <date-picker
                  v-if="field.type === 'date'"
                  v-model="form[field.model]"
                  :required="field.isRequired"
                  :rule="'distributionDateRequired'"
                  @selected="(value) => form[field.model] = value"
                />
              </div>
              <DropdownInput
                v-else
                :key="form[field.key]"
                v-model="form[field.model]"
                :label="$t('label.instance_type')"
                :options="field.options === 'listFaskesType' ? listFaskesType : listFaskes"
                :placeholder="field.placeholder"
                :error-messages="errors"
                :required="field.isRequired"
                :item-text="field.itemText"
                :item-value="field.itemaValue"
                :is-return-object="field.isReturnObject"
                @input="(item) => onSelected(field.model, item)"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fieldList from './stepOneField'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import DropdownInput from '../../../components/DropdownInput'
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    DropdownInput
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fieldList,
      listFaskes: []
    }
  },
  computed: {
    ...mapState('faskesType', [
      'listFaskesType'
    ])
  },
  mounted() {
    this.options.listFaskesType = this.listFaskesType
  },
  methods: {
    async validate() {
      return await this.$refs.observer.validate()
    },
    async onSelected(model, item) {
      if (model === 'applicant_agency_type') {
        const params = {
          id_tipe_faskes: item,
          is_paginated: 0
        }
        const res = await this.$store.dispatch('faskes/getListFaskes', params)
        if (this.form.applicant_agency_id) {
          this.form.applicant_agency_id = null
          this.form.applicant_agency_name = null
        }
        this.listFaskes = res.data
      } else {
        this.form.applicant_agency_id = item.id
        this.form.applicant_agency_name = item.nama_faskes
      }
    }
  }
}
</script>
