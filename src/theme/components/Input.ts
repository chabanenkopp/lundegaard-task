import { ComponentSingleStyleConfig } from '@chakra-ui/react'

export const Input: ComponentSingleStyleConfig = {
  variants: {
    primary: {
      field: {
        fontSize: 'md',
        fontFamily: 'inter',
        color: 'brand.bauhaus',
        h: '48px',
        borderRadius: '20px',
        border: '1px solid',
        borderColor: 'brand.juniper',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}
