import { Button, HStack, Spinner, StackProps, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

interface FormFooterProps extends StackProps {
  isLoading: boolean
  isDisabled: boolean
  monthlyAmount: string
}

export const FormFooter = ({ isLoading, isDisabled, monthlyAmount, ...props }: FormFooterProps) => {
  const { t } = useTranslation(['common'])

  return (
    <VStack w="full" gap={10} {...props}>
      {isLoading ? (
        <Spinner size="xl" thickness="4px" emptyColor="brand.winterDay" />
      ) : (
        <>
          <HStack>
            <Text fontSize="xl" fontWeight="bold">
              {t('home.monthlyPayment', { amount: monthlyAmount })}
            </Text>
          </HStack>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            isDisabled={isDisabled}
            w="full"
          >
            {t('home.submit')}
          </Button>
        </>
      )}
    </VStack>
  )
}
