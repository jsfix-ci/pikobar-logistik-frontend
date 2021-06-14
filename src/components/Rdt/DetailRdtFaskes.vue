<template>
  <div>
    <h1><strong>{{ idData }}</strong></h1>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-green">{{ $t('label.kit_received') }}</v-list-item-title>
              <v-list-item-title class="mb-1">{{ kitReceived }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="text-green">{{ $t('label.kit_available') }}</v-list-item-title>
              <v-list-item-title class="mb-1">{{ kitAvailable }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="text-green">{{ $t('label.used_kit') }}</v-list-item-title>
              <v-list-item-title class="mb-1">{{ kitUsed }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-green"> {{ $t('label.positive') }} </v-list-item-title>
              <v-list-item-title class="mb-1">0% ({{ positive }} {{ $t('label.label_human') }})</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="text-green"> {{ $t('label.negative') }} </v-list-item-title>
              <v-list-item-title class="mb-1">0% ({{ negative }} {{ $t('label.label_human') }})</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="text-green"> {{ $t('label.invalid') }} </v-list-item-title>
              <v-list-item-title class="mb-1">0% ({{ invalid }} {{ $t('label.label_human') }})</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-card
      outlined
    >
      <v-row>
        <v-col cols="12" sm="6">
          <v-card-text>
            <div class="text-size">
              {{ $t('label.list_rdt_kit') }}
            </div>
          </v-card-text>
        </v-col>
      </v-row>
      <hr>
      <v-row>
        <v-col auto>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">{{ $t('label.rdt_code').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.nik').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.full_name').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.category').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.check_date').toUpperCase() }}</th>
                  <th class="text-left">{{ $t('label.test_result').toUpperCase() }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataUser" :key="item.index">
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ item.rdtCode }}</td>
                  <td>{{ item.nik }}</td>
                  <td>{{ item.fullName }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.checkDate }}</td>
                  <td>{{ item.testResult }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
    <dialog-delete
      :dialog="dialog"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialog"
      :delete-date.sync="dataDelete"
      :store-path-delete="`reports/deleteReportCase`"
      :store-path-get-list="`reports/listReportCase`"
    />
  </div>
</template>

<script>
export default {
  name: 'DetailRdtFaskes',
  props: {
    idData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      kitReceived: 0,
      kitAvailable: 0,
      kitUsed: 0,
      positive: 0,
      negative: 0,
      invalid: 0,
      // data dummy TODO: integrasi dengan API
      dataUser: [
        {
          rdtCode: '123',
          nik: '115',
          fullName: 'orang 1',
          category: 'kategori 1',
          checkDate: '1-1-2020',
          testResult: 'positif'
        },
        {
          rdtCode: '123123',
          nik: '115123',
          fullName: 'orang 2',
          category: 'kategori 2',
          checkDate: '1-1-2020',
          testResult: 'negatif'
        }
      ],
      dialog: false,
      dataDelete: null
    }
  },
  async mounted() {
    // TODO: integrasi dengan API
  },
  methods: {
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>

<style scoped>
.row-detail {
  padding-left: 2rem;
  padding-right: 2rem;
}
.row-detail-label {
  margin: auto;
}
.text-green {
  color: #219653;
}
.text-size {
    font-size: 1.5rem;
}
</style>
