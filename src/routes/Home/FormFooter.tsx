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
    <VStack gap={4} {...props}>
      <HStack justifyContent="center">
        <Text fontSize="lg" fontWeight="bold">
          {t('home.monthlyPayment', { amount: isLoading ? '' : monthlyAmount })}
        </Text>

        {isLoading && <Spinner size="md" />}
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
    </VStack>
  )
}
