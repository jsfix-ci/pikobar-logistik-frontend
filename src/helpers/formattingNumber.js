class FormattingNumber {
  abbreviation(value) {
    const suffixes = ['', ' RB', ' JT', ' M', ' T']
    let suffixNum = 0
    while (value >= 1000) {
      value /= 1000
      suffixNum++
    }

    value = value.toPrecision(3)

    value += suffixes[suffixNum]
    return value
  }

  currency(value) {
    const currency = (value / 1).toFixed(0).replace('.', ',')
    return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  formatCurrency(value) {
    if (value) {
      const number_string = value.toString()
      const split = number_string.split(',')
      const modulo = split[0].length % 3
      let result = split[0].substr(0, modulo)
      const thousand = split[0].substr(modulo).match(/\d{3}/gi)
      if (thousand) {
        const separator = modulo ? '.' : ''
        result += separator + thousand.join('.')
      }
      result = split[1] !== undefined ? result + ',' + split[1] : result
      return result
    } else {
      return '0'
    }
  }
}

export { FormattingNumber as default }
