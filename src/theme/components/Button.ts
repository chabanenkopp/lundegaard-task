import { ComponentSingleStyleConfig } from '@chakra-ui/react'
import { Radius } from 'theme/constants'

export const Button: ComponentSingleStyleConfig = {
  baseStyle: {
    _focus: {
      boxShadow: 'none',
    },
    fontFamily: 'Proxima Nova',
  },
  variants: {
    primary: {
      h: 50,
      bgColor: 'brand.black',
      color: 'brand.white',
      fontSize: '18px',
      fontWeight: 400,
      fontFamily: 'dmsans',
      borderRadius: 0,
      px: '29px',
    },

    pillNebula: {
      h: '44px',
      color: 'brand.white',
      bgColor: 'brand.crabNebulaLight',
      borderRadius: `${Radius.Pill}px`,
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: 'outfit',
      px: '16px',
      py: '12px',
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}
