import i18n from '@/lang'
export default [
  {
    label: i18n.t('label.goods_item'),
    placeholder: i18n.t('label.choose_item'),
    model: 'material_id',
    options: 'material',
    itemText: 'material_name',
    itemValue: 'material_id',
    isReturnObject: true
  }
]
