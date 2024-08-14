import { QueryMonthlyAmountArgs } from 'api/generated/resolversTypes'
import currency from 'currency.js'

const MONTHS_IN_YEAR = 12

export const monthlyAmount = (_: unknown, { input }: QueryMonthlyAmountArgs) => {
  const { loanBalance, installmentsQuantity, interestRate, insuranceRate } = input

  const loanBalanceCurrency = currency(loanBalance)
  const monthlyInterestRate = interestRate / MONTHS_IN_YEAR
  const insuranceAmount = loanBalanceCurrency.multiply(insuranceRate)
  const totalAmount = loanBalanceCurrency.add(insuranceAmount)

  const monthlyInstallment = totalAmount
    .multiply(monthlyInterestRate)
    .divide(1 - (1 + monthlyInterestRate) ** -installmentsQuantity)

  return monthlyInstallment.value
}
