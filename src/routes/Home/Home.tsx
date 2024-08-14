import { HStack, Text } from '@chakra-ui/react'
import { useMonthlyAmountQuery } from 'apollo/generated/graphqlClient'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useDebounce } from 'use-debounce'
import { FormSlider } from 'components/ui/FormSlider'
import { FormSwitch } from 'components/ui/FormSwitch'
import { LoanForm } from 'components/ui/LoanForm'
import { toast } from 'components/ui/toast/ToastContainer'
import { FormFooter } from './FormFooter'
import {
  DEFAULT_MONTHLY_AMOUNT,
  DELAY,
  MAXIMUM_INSTALLMENTS_QUANTITY,
  MAXIMUM_LOAN_BALANCE,
  MINIMUM_INSTALLMENTS_QUANTITY,
  MINIMUM_LOAN_BALANCE,
} from './Home.const'
import {
  formatCurrency,
  handleOnInputChange,
  handleOnInstallmentsQuantityInputBlur,
  handleOnLoanBalanceInputBlur,
} from './Home.utils'
import { LoanCalculatorFormSchemaForm, useLoanCalculatorFormForm } from './useLoanCalculatorForm'

export const Home: NextPage = () => {
  const { t } = useTranslation(['common'])
  const form = useLoanCalculatorFormForm()

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = form

  const [isInsuranceDebounced] = useDebounce(watch('isInsurance'), DELAY)

  const monthlyAmountQuery = useMonthlyAmountQuery({
    skip: !isValid,
    variables: {
      input: {
        /**
         * `interestRate` and `insuranceRate` are arbitrary values. You can pass
         * whatever you deem necessary.
         */
        interestRate: 0.05,
        insuranceRate: isInsuranceDebounced ? 0.2 : 0,
        loanBalance: watch('loanBalance'),
        installmentsQuantity: watch('installmentsQuantity'),
      },
    },
  })

  const isLoading = monthlyAmountQuery.loading
  const monthlyAmount = monthlyAmountQuery.data?.monthlyAmount ?? DEFAULT_MONTHLY_AMOUNT

  /**
   * API call (mutation) to create a loan can be implemented here.
   */
  const onSubmit = ({ loanBalance, installmentsQuantity }: LoanCalculatorFormSchemaForm) => {
    toast({
      status: 'success',
      title: 'Your loan was submitted!',
      description: `Loan balance: ${loanBalance}, number of payments: ${installmentsQuantity}, monthly amount: ${formatCurrency(
        { value: monthlyAmount },
      )}`,
    })
  }

  return (
    <>
      <Head>
        <title>{t('appName')}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text
        fontSize="36px"
        fontWeight="bold"
        textAlign="center"
        color="brand.crabNebulaLight"
        my="30px"
      >
        {t('home.title')}
      </Text>

      <HStack justifyContent="center" mx={4}>
        <LoanForm
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event)
          }}
          leftComp={
            <>
              <FormSlider
                control={control}
                name="loanBalance"
                min={MINIMUM_LOAN_BALANCE}
                max={MAXIMUM_LOAN_BALANCE}
                step={MINIMUM_LOAN_BALANCE}
                onInputChange={handleOnInputChange}
                onInputBlur={handleOnLoanBalanceInputBlur}
                formatMinMax={(value) => formatCurrency({ value, precision: 0 })}
                renderLabel={(value) =>
                  t('home.loanBalance', { amount: formatCurrency({ value, precision: 0 }) })
                }
              />

              <FormSlider
                control={control}
                name="installmentsQuantity"
                min={MINIMUM_INSTALLMENTS_QUANTITY}
                max={MAXIMUM_INSTALLMENTS_QUANTITY}
                step={MINIMUM_INSTALLMENTS_QUANTITY}
                onInputChange={handleOnInputChange}
                onInputBlur={handleOnInstallmentsQuantityInputBlur}
                renderLabel={(value) => t('home.installmentsQuantity', { count: value })}
              />

              <FormSwitch register={register('isInsurance')}>
                {t('home.includeInsurance')}
              </FormSwitch>
            </>
          }
          rightComp={
            <FormFooter
              isLoading={isLoading}
              isDisabled={!isValid}
              monthlyAmount={formatCurrency({ value: monthlyAmount })}
            />
          }
        />
      </HStack>
    </>
  )
}
