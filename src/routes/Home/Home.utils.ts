import { OnInputBlurProps } from 'components/ui/FormSlider'
const getClampedValue = ({ value, min, max }: OnInputBlurProps) =>
  Math.max(min, Math.min(value, max))

export const handleOnLoanBalanceInputBlur = (props: OnInputBlurProps) => {
  const clampedValue = getClampedValue(props)
  const remainder = clampedValue % 1000

  if (remainder >= 500) {
    return clampedValue - remainder + 1000
  } else {
    return clampedValue - remainder
  }
}

export const handleOnInstallmentsQuantityInputBlur = (props: OnInputBlurProps) => {
  return getClampedValue(props)
}
