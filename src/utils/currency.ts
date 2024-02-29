import { removeTrailingZeros } from './number'

export const formatCurrency = (
  value: number,
  currencyCode?: string | null,
  languageCode?: string | null,
  minimumFractionDigits?: number
) => {
  currencyCode = currencyCode ?? 'USD'
  languageCode = languageCode ?? 'en'

  const formatter = new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: minimumFractionDigits ?? 2,
  })

  return removeTrailingZeros(formatter.format(value))
}