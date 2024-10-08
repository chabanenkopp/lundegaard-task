import currency from 'currency.js'
import validator from 'validator'
import { OnInputBlurProps, OnInputChangeProps } from 'components/ui/FormSlider'

type FormatCurrencyProps = {
  symbol?: string
  pattern?: string
  precision?: number
  value: number
}

const getClampedValue = ({ value, min, max }: OnInputBlurProps) =>
  Math.max(min, Math.min(value, max))

export const handleOnLoanBalanceInputBlur = (props: OnInputBlurProps) => {
  const clampedValue = getClampedValue(props)
  const remainder = clampedValue % 1000

  if (remainder >= 500) {
    return clampedValue - remainder + 1000
  }

  return clampedValue - remainder
}

export const handleOnInstallmentsQuantityInputBlur = (props: OnInputBlurProps) =>
  getClampedValue(props)

export const handleOnInputChange = ({ value, onChange }: OnInputChangeProps) => {
  /**
   * We need to allow an empty string to make it easier for the user to edit
   * the input value.
   */
  if (!value) {
    onChange('')
    return
  }

  const isValid = validator.isInt(value, {
    allow_leading_zeroes: false,
  })

  if (isValid) {
    onChange(value)
  }
}

export const formatCurrency = ({
  value,
  symbol = '€',
  pattern = `! #`,
  precision = 2,
}: FormatCurrencyProps) =>
  currency(value, {
    pattern,
    separator: ' ',
    decimal: ',',
    symbol,
    precision,
  }).format()
