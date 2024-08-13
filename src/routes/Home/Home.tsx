import { Stack, Text, HStack } from '@chakra-ui/react'
import { useMonthlyAmountQuery } from 'apollo/generated/graphqlClient'
import Head from 'next/head'
import type { NextPage } from 'next'
import { useDebounce } from 'use-debounce'
import { useTranslation } from 'next-i18next'
import { FormSlider } from 'components/ui/FormSlider'
import { FormSwitch } from 'components/ui/FormSwitch'
import { toast } from 'components/ui/toast/ToastContainer'
import {
  DELAY,
  MAXIMUM_INSTALLMENTS_QUANTITY,
  MINIMUM_INSTALLMENTS_QUANTITY,
  MAXIMUM_LOAN_BALANCE,
  MINIMUM_LOAN_BALANCE,
  DEFAULT_MONTHLY_AMOUNT,
} from './Home.const'
import { FormFooter } from './FormFooter'
import { handleOnInstallmentsQuantityInputBlur, handleOnLoanBalanceInputBlur } from './Home.utils'
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

  const [debouncedIsInsurance] = useDebounce(watch('isInsurance'), DELAY)
  const [debouncedLoanBalance] = useDebounce(watch('loanBalance'), DELAY)
  const [debouncedInstallmentsQuantity] = useDebounce(watch('installmentsQuantity'), DELAY)

  const monthlyAmountQuery = useMonthlyAmountQuery({
    skip: !isValid,
    variables: {
      input: {
        /**
         * `interestRate` and `insuranceRate` are arbitrary values. You can pass
         * whatever you deem necessary.
         */
        interestRate: 0.05,
        insuranceRate: debouncedIsInsurance ? 0.2 : 0,
        loanBalance: debouncedLoanBalance ?? MINIMUM_LOAN_BALANCE,
        installmentsQuantity: debouncedInstallmentsQuantity ?? MINIMUM_INSTALLMENTS_QUANTITY,
      },
    },
  })

  const monthlyAmount = monthlyAmountQuery.data?.monthlyAmount.toFixed(2) ?? DEFAULT_MONTHLY_AMOUNT

  const onSubmit = ({ loanBalance, installmentsQuantity }: LoanCalculatorFormSchemaForm) => {
    /**
     * API call (mutation) to create a loan can be implemented here.
     */
    toast({
      status: 'success',
      title: 'Your loan was submitted!',
      description: `Loan balance: ${loanBalance}, number of payments: ${installmentsQuantity}, monthly amount: ${monthlyAmount}`,
    })
  }

  const isLoading = monthlyAmountQuery.loading

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
        <Stack
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          w="100%"
          maxW="600px"
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          spacing={4}
          p={10}
        >
          <FormSlider
            control={control}
            name="loanBalance"
            min={MINIMUM_LOAN_BALANCE}
            max={MAXIMUM_LOAN_BALANCE}
            step={MINIMUM_LOAN_BALANCE}
            onInputBlur={handleOnLoanBalanceInputBlur}
            renderLabel={(value) => t('home.loanBalance', { amount: value })}
          />

          <FormSlider
            control={control}
            name="installmentsQuantity"
            min={MINIMUM_INSTALLMENTS_QUANTITY}
            max={MAXIMUM_INSTALLMENTS_QUANTITY}
            step={MINIMUM_INSTALLMENTS_QUANTITY}
            onInputBlur={handleOnInstallmentsQuantityInputBlur}
            renderLabel={(value) => t('home.installmentsQuantity', { count: Number(value) })}
          />

          <FormSwitch register={register('isInsurance')}>{t('home.includeInsurance')}</FormSwitch>

          <FormFooter
            isLoading={isLoading}
            isDisabled={!isValid || isLoading}
            monthlyAmount={monthlyAmount}
          />
        </Stack>
      </HStack>
    </>
  )
}
