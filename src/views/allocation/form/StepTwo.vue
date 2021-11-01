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
      <div class="d-flex flex-row align-center">
        <DropdownInput
          v-model="instance.agency_id"
          :label="$t('label.instance_type')"
          :options="['satu', 'dua']"
          :placeholder="'Pilih Jenis Instansi'"
          class="mr-3"
        />
        <DropdownInput
          v-model="instance.agency_id"
          :label="$t('label.instance_name')"
          :options="['satu', 'dua']"
          :placeholder="'Pilih Instansi'"
          class="mr-3"
        />
        <v-btn
          large
          depressed
          class="detail-btn mr-5"
          @click="instance.isExtended = !instance.isExtended"
        >
          {{ instance.isExtended ? $t('label.close') : $t('label.show_items') }}
        </v-btn>
        <v-icon
          v-if="form.instance_list.length-1 === parentIndex"
          color="green"
          class="mr-3"
          @click="createNewInstance()"
        >
          mdi-plus-circle
        </v-icon>
        <v-icon
          v-if="form.instance_list.length > 1"
          color="red"
          class="mr-3"
          @click="deleteArray(form.instance_list, parentIndex)"
        >
          mdi-delete-circle
        </v-icon>
      </div>
      <!-- Child (material) -->
      <div v-if="instance.isExtended">
        <div
          v-for="(material, childIndex) in instance.allocation_material_requests"
          :key="material.material_id"
          class="d-flex flex-row ml-10 align-center"
        >
          <DropdownInput
            v-for="field in fieldList"
            :key="field.label"
            v-model="material[field.model]"
            :label="field.label"
            :options="listOptions[field.options]"
            :placeholder="field.placeholder"
            class="mr-3"
          />
          <v-icon
            v-if="instance.allocation_material_requests.length-1 === childIndex"
            color="green"
            class="mr-3"
            @click="createNewMaterial(instance)"
          >
            mdi-plus-circle
          </v-icon>
          <v-icon
            v-if="instance.allocation_material_requests.length > 1"
            color="red"
            class="mr-3"
            @click="deleteArray(instance.allocation_material_requests, childIndex)"
          >
            mdi-delete-circle
          </v-icon>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import fieldList from './stepTwoField'
import DropdownInput from '../../../components/DropdownInput'
export default {
  components: {
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
      if (this.form.instance_list[this.form.instance_list.length - 1].agency_id) {
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

<style lang="scss" scoped>
.detail-btn {
  background-color: white !important;
  color: #27AE60;
  border: 1px solid #27AE60;
  border-radius: 8px;
  font-size: 14px;
  text-transform: none !important;
}
</style>
