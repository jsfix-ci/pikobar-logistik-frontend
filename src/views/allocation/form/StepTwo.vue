<template>
  <div class="d-flex flex-column">
    <p class="text-center mx-16">
      {{ $t('label.allocation_step_two_description') }}
    </p>
    <ValidationObserver ref="observer">
      <v-form>
        <div
          v-for="(instance, parentIndex) in form.instance_list"
          :key="instance.agency_id"
          class="d-flex flex-column mb-5"
        >
          <!-- Parent (instance) -->
          <StepTwoParent
            :instance="instance"
            :array-length="form.instance_list.length"
            :index="parentIndex"
            @addParent="createNewInstance()"
            @delete="(index) => deleteArray(form.instance_list, index)"
          />
          <!-- Child (material) -->
          <div v-show="instance.isExtended">
            <StepTwoChild
              v-for="(material, childIndex) in instance.allocation_material_requests"
              :key="material.material_id"
              :material="material"
              :field-list="fieldList"
              :options-list="listOptions"
              :index="childIndex"
              :array-length="instance.allocation_material_requests.length"
              @addChild="createNewMaterial(instance)"
              @delete="(index) => deleteArray(instance.allocation_material_requests, index)"
            />
          </div>
          <hr>
        </div>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fieldList from './stepTwoField'
import StepTwoParent from './StepTwoParent.vue'
import StepTwoChild from './StepTwoChild.vue'
import { ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
    StepTwoParent,
    StepTwoChild
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
      // @todo: replace listOptions with real data
      listOptions: {
        material: [],
        quantity: [
          '10',
          '20',
          '50',
          '100'
        ]
      }
    }
  },
  computed: {
    ...mapState('vaccine', [
      'listMaterial'
    ])
  },
  async mounted() {
    await this.$store.dispatch('vaccine/getListMaterial', { is_paginated: 0 })
    this.listOptions.material = this.listMaterial
  },
  methods: {
    async createNewInstance() {
      // @todo: create function description
      if (this.isInstanceValid()) {
        const instance = {
          agency_id: '',
          agency_type: '',
          agency_type_name: '',
          distribution_plan_date: '',
          additional_information: '',
          allocation_material_requests: [],
          isExtended: false,
          listAgency: []
        }
        this.createNewMaterial(instance, true)
        this.form.instance_list.push(instance)
      } else {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.please_complete_current_instance_first'))
      }
    },
    async createNewMaterial(instance, isInitiate = false) {
      // @todo: create function description
      if (this.isMaterialValid(instance, isInitiate)) {
        instance.allocation_material_requests.push({
          material_id: '',
          material_name: '',
          matg_id: '',
          qty: '',
          UoM: ''
        })
      } else {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.please_complete_current_material_first'))
      }
    },
    deleteArray(array, index) {
      array.splice(index, 1)
    },
    isInstanceValid() {
      // @todo: create function description
      return this.form.instance_list[this.form.instance_list.length - 1].agency_type &&
        this.form.instance_list[this.form.instance_list.length - 1].agency_id &&
        this.form.instance_list[this.form.instance_list.length - 1].distribution_plan_date
    },
    isMaterialValid(instance, isInitiate) {
      // @todo: create function description
      return isInitiate ||
        (
          !isInitiate &&
          instance.allocation_material_requests[instance.allocation_material_requests.length - 1].material_id &&
          instance.allocation_material_requests[instance.allocation_material_requests.length - 1].qty
        )
    },
    async validate() {
      return await this.$refs.observer.validate()
    }
  }
}
</script>
