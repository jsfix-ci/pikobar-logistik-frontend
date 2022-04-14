<template>
  <div class="d-flex flex-column">
    <hr>
    <div class="d-flex px-7 py-3 detail__header">
      <span class="detail__header__item">
        {{ $t('label.instance_type') }}
      </span>
      <span class="detail__header__item">
        {{ $t('label.instance_name') }}
      </span>
      <span class="detail__header__item">
        {{ $t('label.planned_delivery_date') }}
      </span>
      <span class="detail__header__item">
        {{ $t('label.total_order') }}
      </span>
    </div>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(instance, i) in listInstance"
        :key="i"
      >
        <v-expansion-panel-header class="detail__label">
          <span class="detail__label__item">
            {{ instance.agency_type_name }}
          </span>
          <span class="detail__label__item">
            {{ instance.agency_name }}
          </span>
          <span class="detail__label__item">
            {{ $moment(instance.distribution_plan_date).format('DD MMMM YYYY') }}
          </span>
          <span class="detail__label__item">
            {{ instance.allocation_material_requests.length }} {{ $t('label.goods') }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="detail__label">
          <div class="d-flex flex-column">
            <div
              v-for="(material, j) in instance.allocation_material_requests"
              :key="j"
              class="d-flex flex-row justify-space-between mb-2 detail__material"
            >
              <span>
                {{ material.material_name }}
              </span>
              <span>
                {{ material.qty }} {{ $t('label.tracking_data_prefix') }}
              </span>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    listInstance: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  &__header {
    font-size: 16px;
    font-weight: 500;

    &__item {
      width: 23%;
    }
  }

  &__label {
    font-size: 16px;

    &__item {
      max-width: 23%;
    }
  }

  &__material {
    border-bottom: 1px solid gray;
  }

}
</style>
