<template>
  <div class="d-flex flex-column">
    <!-- @todo: replace this p tag content -->
    <p class="text-center mx-16">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Magna pulvinar lacus tortor, erat.
      Enim ut etiam phasellus aliquet amet, eget placerat sapien tempus.
      Rhoncus ut eu id integer risus lobortis
    </p>
    <div class="d-flex flex-row">
      <DropdownInput
        v-for="field in fieldList"
        :key="field.label"
        :label="field.label"
        :options="listOptions[field.options]"
        :placeholder="field.placeholder"
        class="mr-3"
      />
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
  }
}
</script>
