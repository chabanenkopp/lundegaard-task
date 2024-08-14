import { QueryMonthlyAmountArgs } from 'api/generated/resolversTypes'

const MONTHS_IN_YEAR = 12

export const monthlyAmount = (_: unknown, { input }: QueryMonthlyAmountArgs) => {
  const { loanBalance, installmentsQuantity, interestRate, insuranceRate } = input

  const monthlyInterestRate = interestRate / MONTHS_IN_YEAR
  const insuranceAmount = loanBalance * insuranceRate
  const totalAmount = loanBalance + insuranceAmount

  return (
    (totalAmount * monthlyInterestRate) / (1 - (1 + monthlyInterestRate) ** -installmentsQuantity)
  )
}
