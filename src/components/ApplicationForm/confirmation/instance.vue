<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined>
        <v-row>
          <v-col class="margin-20">
            <v-row class="margin-top-min-15">
              <v-col>
                <span class="main-color-data-confirmation">{{ $t('label.instance_type') }}</span>
                <br>
                <v-label>{{ formApplicant.instanceTypeName }}</v-label>
              </v-col>
              <v-col>
                <span class="main-color-data-confirmation">{{ $t('label.city_district') }}</span>
                <br>
                <v-label>{{ formApplicant.cityNameId.name }}</v-label>
              </v-col>
              <v-col>
                <span class="main-color-data-confirmation">{{ $t('label.full_address') }}</span>
                <br>
                <v-label>{{ formApplicant.fullAddress }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span class="main-color-data-confirmation">{{ $t('label.instance_name') }}</span>
                <br>
                <v-label v-if="formApplicant.instanceEtc">{{ formApplicant.instanceEtc }}</v-label>
                <v-label v-else>{{ formApplicant.instanceName }}</v-label>
              </v-col>
              <v-col>
                <span class="main-color-data-confirmation">{{ $t('label.select_sub_district_full_name') }}</span>
                <br>
                <v-label>{{ formApplicant.districtNameId.name }}</v-label>
              </v-col>
              <v-col />
            </v-row>
            <v-row>
              <v-col>
                <span class="main-color-data-confirmation">{{ $t('label.number_phone') }}</span>
                <br>
                <v-label>{{ formApplicant.instancePhoneNumber }}</v-label>
              </v-col>
              <v-col>
                <span class="main-color-data-confirmation">{{ $t('label.village') }}</span>
                <br>
                <v-label>{{ formApplicant.villageNameId.name }}</v-label>
              </v-col>
              <v-col />
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'InstanceIdentity',
  props: {
    formApplicant: {
      type: Object,
      default: null
    }
  }
}
</script>
