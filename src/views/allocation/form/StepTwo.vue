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
      v-for="(instance, index) in form.instance_list"
      :key="instance.agency_id"
      class="d-flex flex-column"
    >
      <div class="d-flex flex-row">
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
        <v-icon
          v-if="form.instance_list.length-1 === index"
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
          @click="deleteArray(form.instance_list, index)"
        >
          mdi-delete-circle
        </v-icon>
      </div>
      <div
        v-for="material in instance.allocation_material_requests"
        :key="material.material_id"
        class="d-flex flex-row"
      >
        <DropdownInput
          v-for="field in fieldList"
          :key="field.label"
          v-model="form[field.model]"
          :label="field.label"
          :options="listOptions[field.options]"
          :placeholder="field.placeholder"
          class="mr-3"
        />
        <v-icon
          v-if="instance.allocation_material_requests.length-1 === index"
          color="green"
          class="mr-3"
          @click="createNewInstance()"
        >
          mdi-plus-circle
        </v-icon>
        <v-icon
          v-if="instance.allocation_material_requests.length > 1"
          color="red"
          class="mr-3"
          @click="deleteArray(instance.allocation_material_requests, index)"
        >
          mdi-delete-circle
        </v-icon>
      </div>
    </div>
    <!-- <div class="d-flex flex-row">
      <DropdownInput
        v-for="field in fieldList"
        :key="field.label"
        v-model="form[field.model]"
        :label="field.label"
        :options="listOptions[field.options]"
        :placeholder="field.placeholder"
        class="mr-3"
      />
    </div> -->
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
          allocation_material_requests: []
        }
        this.createNewMaterial(instance)
        this.form.instance_list.push(instance)
      }
    },
    createNewMaterial(instance) {
      // @todo: create function description
      instance.allocation_material_requests.push({
        material_id: '',
        qty: '',
        UoM: '',
        additional_information: ''
      })
    },
    deleteArray(array, index) {
      array.splice(index, 1)
    }
  }
}
</script>
