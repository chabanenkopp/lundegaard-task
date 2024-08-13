import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  MAXIMUM_INSTALLMENTS_QUANTITY,
  MAXIMUM_LOAN_BALANCE,
  MINIMUM_INSTALLMENTS_QUANTITY,
  MINIMUM_LOAN_BALANCE,
} from './Home.const'

const LoanCalculatorFormSchema = z.object({
  isInsurance: z.boolean(),
  loanBalance: z
    .number()
    .min(MINIMUM_LOAN_BALANCE, `Must be at least ${MINIMUM_LOAN_BALANCE}`)
    .max(MAXIMUM_LOAN_BALANCE, `Must be at most ${MAXIMUM_LOAN_BALANCE}`),
  installmentsQuantity: z
    .number()
    .min(MINIMUM_INSTALLMENTS_QUANTITY, `Must be at least ${MINIMUM_INSTALLMENTS_QUANTITY}`)
    .max(MAXIMUM_INSTALLMENTS_QUANTITY, `Must be at most ${MAXIMUM_INSTALLMENTS_QUANTITY}`),
})

export type LoanCalculatorFormSchemaForm = z.infer<typeof LoanCalculatorFormSchema>

const LoanCalculatorFormSchemaDefaultValues = {
  isInsurance: true,
  loanBalance: MINIMUM_LOAN_BALANCE,
  installmentsQuantity: MINIMUM_INSTALLMENTS_QUANTITY,
}

export const useLoanCalculatorFormForm = () => {
  const form = useForm<LoanCalculatorFormSchemaForm>({
    resolver: zodResolver(LoanCalculatorFormSchema),
    defaultValues: LoanCalculatorFormSchemaDefaultValues,
  })

  return form
}
