import i18n from '@/lang'
export default [
  {
    label: i18n.t('label.goods_item'),
    placeholder: i18n.t('label.choose_item'),
    model: 'material_id',
    options: 'item'
  },
  {
    label: i18n.t('label.item_count'),
    placeholder: i18n.t('label.input_total'),
    model: 'qty',
    options: 'count'
  },
  {
    label: i18n.t('label.item_unit'),
    placeholder: i18n.t('label.choose_unit'),
    model: 'UoM',
    options: 'unit'
  }
]
