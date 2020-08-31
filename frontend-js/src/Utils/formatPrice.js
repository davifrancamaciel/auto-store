export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export function formatValueWhithOutDecimalCase (valor) {
  if (!valor) return ''
  valor = valor.toString()
  let newVal = valor.replace(/\D/g, '')
  if (newVal.length > 12) {
    newVal = newVal.substring(0, newVal.length - 1)
  }
  newVal = newVal.replace(/(\d{1})(\d{12})$/, '$1.$2')
  newVal = newVal.replace(/(\d{1})(\d{9})$/, '$1.$2')
  newVal = newVal.replace(/(\d{1})(\d{6})$/, '$1.$2')
  newVal = newVal.replace(/(\d{1})(\d{3})$/, '$1.$2')
  return newVal
}

export function formatValueWhithDecimalCase (n, c, d, t) {
  var c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d == undefined ? ',' : d,
    t = t == undefined ? '.' : t,
    s = n < 0 ? '-' : '',
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    j = (j = i.length) > 3 ? j % 3 : 0

  return (
    s +
    (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c
      ? d +
        Math.abs(n - parseInt(i))
          .toFixed(c)
          .slice(2)
      : '')
  )
}

export function formatValueWhithDecimalCaseOnChange (valor) {
  if (!valor) return ''
  let newVal = valor.replace(/\D/g, '')

  if (newVal.length >= 11) {
    newVal = newVal.substring(0, 11)
  }
  newVal = newVal.replace(/\D/g, '') // permite digitar apenas numero

  newVal = newVal.replace(/(\d{1})(\d{11})$/, '$1.$2')
  newVal = newVal.replace(/(\d{1})(\d{8})$/, '$1.$2')
  newVal = newVal.replace(/(\d{1})(\d{5})$/, '$1.$2')
  newVal = newVal.replace(/(\d{1})(\d{1,2})$/, '$1,$2')

  return newVal
}

export function priceToNumber (v) {
  if (!v) {
    return 0
  }
  v = v.split('.').join('')
  v = v.split(',').join('.')
  return Number(v.replace(/[^0-9.]/g, ''))
}
