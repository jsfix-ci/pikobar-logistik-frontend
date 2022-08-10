import FormatingNumber from './formattingNumber'

export function getTableRowNumbering(index, page, limit) {
  return ((page - 1) * limit) + (index + 1)
}

export function filterQuery(oldQuery) {
  const newQuery = { ...oldQuery }
  Object.keys(newQuery).forEach(key => {
    const shouldBeDeleted = newQuery[key] === null ||
      newQuery[key] === undefined ||
      newQuery[key] === ''
    if (shouldBeDeleted) {
      delete newQuery[key]
    }
  })
  return newQuery
}

export function currency(value) {
  const number = new FormatingNumber()
  return number.formatCurrency(value)
}
