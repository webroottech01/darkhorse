export const venueCurrency = (
  value: number,
  currencyCode = 'USD',
  languageCode = 'en'
) => {
  const formatter = new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency: currencyCode,
  })

  return formatter.format(value)
}
