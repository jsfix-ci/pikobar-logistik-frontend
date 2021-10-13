export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isContainHtmlTags(str) {
  const reg = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/

  return reg.test(str)
}

export function isPhoneNumber(str) {
  const reg = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{2,4}$/

  return reg.test(str)
}

export function isUrl(str) {
  const reg = /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9?#-=&]+)?$/

  return reg.test(str)
}
