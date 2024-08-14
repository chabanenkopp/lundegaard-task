import { ReactNode } from 'react'
import { Box, HStack, StackProps } from '@chakra-ui/react'

interface LoanFormProps extends StackProps {
  leftComp: ReactNode
  rightComp: ReactNode
}

export const LoanForm = ({ leftComp, rightComp, ...props }: LoanFormProps) => (
  <HStack
    as="form"
    w="full"
    maxW={{ base: '600px', md: '900px' }}
    flexDirection={{
      base: 'column',
      md: 'row',
    }}
    borderWidth={1}
    borderRadius="lg"
    boxShadow="lg"
    spacing={8}
    p={10}
    {...props}
  >
    <Box w="full">{leftComp}</Box>

    {rightComp}
  </HStack>
)
