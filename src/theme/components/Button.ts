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
      h: '44px',
      color: 'brand.white',
      bgColor: 'brand.crabNebulaLight',
      borderRadius: `${Radius.Pill}px`,
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: 'outfit',
      px: '16px',
      py: '12px',
      _disabled: {
        background: 'brand.crabNebulaLight',
      },
      _hover: {
        background: 'brand.juniper',
        _disabled: {
          background: 'brand.crabNebulaLight',
        },
      },
      _active: {
        background: 'brand.crabNebulaDark',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}
