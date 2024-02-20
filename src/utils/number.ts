const clamp = ({
  value,
  min,
  max,
}: {
  value: number
  min: number
  max: number
}) => Math.min(Math.max(value, min), max)

export const decimalToPercent = (num: number, maximumFractionDigits?: number) =>
  clamp({
    min: 0,
    value: parseFloat(
      Intl.NumberFormat('en-US', {
        style: 'percent',
        maximumFractionDigits: maximumFractionDigits ?? 2,
      }).format(num)
    ),
    max: 100,
  })

export const percentToDecimal = (num: number, maximumFractionDigits?: number) =>
  clamp({
    min: 0,
    value: parseFloat(
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: maximumFractionDigits ?? 4,
      }).format(num / 100)
    ),
    max: 1,
  })

export const toFixed = (num: number, precision = 2, base = 10) => {
  const pow = Math.pow(base, precision)
  return Math.round(num * pow) / pow
}

export const formatNumber = (value: string | number) => {
  return Number(value).toLocaleString()
}

export const removeTrailingZeros = (str: string) => {
  str = str.replace(/0+$/g, '')

  if (str.endsWith('.')) return `${str}00`
  if (str.match(/\.\d$/)) return `${str}0`

  return str
}

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
