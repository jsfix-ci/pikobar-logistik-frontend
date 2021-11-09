import i18n from '@/lang'
export const tableHeader = [
  {
    label: i18n.t('label.number'),
    class: 'text-left text-uppercase'
  },
  {
    label: i18n.t('label.letter_number'),
    class: 'text-left text-uppercase'
  },
  {
    label: i18n.t('label.total_recipient'),
    class: 'text-left text-uppercase'
  },
  {
    label: i18n.t('label.total_allocation'),
    class: 'text-left text-uppercase'
  },
  {
    label: i18n.t('label.request_date'),
    class: 'text-left text-uppercase'
  },
  {
    label: i18n.t('label.status'),
    class: 'text-left text-uppercase'
  },
  {
    label: i18n.t('label.action'),
    class: 'text-center text-uppercase'
  }
]

export function createDynamicHeader(mainHeader, dynamicHeader) {
  const dynamicItem = []

  for (let i = 0; i < dynamicHeader.length; i++) {
    const header = dynamicHeader[i]
    dynamicItem.push({
      materialId: header.material_id,
      label: header.material_name,
      total: this.formattingNumber(header.total_qty),
      isDynamic: true
    })
  }

  mainHeader.splice.apply(mainHeader, [2, 0].concat(dynamicItem))
}

export function displayDynamicHeader(obj, array) {
  // Find obj in array using material_id
  const result = array.find(item => {
    return item.material_id === obj.material_id
  })
  return result ? result.qty : '-'
}
