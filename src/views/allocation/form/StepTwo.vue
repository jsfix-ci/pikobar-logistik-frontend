<template>
  <div class="d-flex flex-column">
    <!-- @todo: replace this p tag content -->
    <p class="text-center mx-16">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Magna pulvinar lacus tortor, erat.
      Enim ut etiam phasellus aliquet amet, eget placerat sapien tempus.
      Rhoncus ut eu id integer risus lobortis
    </p>
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
      <div v-if="instance.isExtended">
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
  </div>
</template>

<script>
import fieldList from './stepTwoField'
import StepTwoParent from './StepTwoParent.vue'
import StepTwoChild from './StepTwoChild.vue'
export default {
  components: {
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
        instance: [
          'Instansi 1',
          'Instansi 2'
        ],
        item: [
          'Item 1',
          'Item 2'
        ],
        count: [
          'Jumlah 1',
          'Jumlah 2'
        ],
        unit: [
          'Unit 1',
          'Unit 2'
        ],
        purpose: [
          'Tujuan 1',
          'Tujuan 2'
        ]
      }
    }
  },
  methods: {
    createNewInstance() {
      // @todo: create function description
      if (this.form.instance_list[this.form.instance_list.length - 1].agency_type) {
        const instance = {
          agency_id: '',
          allocation_material_requests: [],
          isExtended: false
        }
        this.createNewMaterial(instance, true)
        this.form.instance_list.push(instance)
      }
    },
    createNewMaterial(instance, isInitiate = false) {
      // @todo: create function description
      if (isInitiate || (!isInitiate && instance.allocation_material_requests[instance.allocation_material_requests.length - 1].material_id)) {
        instance.allocation_material_requests.push({
          material_id: '',
          qty: '',
          UoM: '',
          additional_information: ''
        })
      }
    },
    deleteArray(array, index) {
      array.splice(index, 1)
    }
  }
}
</script>
