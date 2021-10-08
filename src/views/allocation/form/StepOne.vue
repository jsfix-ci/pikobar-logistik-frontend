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
            >
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
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import fieldList from './stepOneField'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fieldList
    }
  },
  methods: {
    async validate() {
      return await this.$refs.observer.validate()
    }
  }
}
</script>
