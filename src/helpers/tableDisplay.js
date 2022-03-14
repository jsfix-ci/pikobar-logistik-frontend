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
