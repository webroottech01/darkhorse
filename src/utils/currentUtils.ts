export const formatCurrency = (
  value: number,
  currencyCode?: string | null,
  languageCode?: string | null
) => {
  currencyCode = currencyCode ?? 'USD'
  languageCode = languageCode ?? 'en'

  const formatter = new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency: currencyCode,
  })

  return formatter.format(value)
}
