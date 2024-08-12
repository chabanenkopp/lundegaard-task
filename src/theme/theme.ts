import { theme as proTheme } from '@chakra-ui/pro-theme'
import { extendTheme, GlobalStyle, Theme } from '@chakra-ui/react'
import { Styles } from '@chakra-ui/theme-tools'
import * as components from './components'
import { BASE_FONT_SIZE_PX, Colors, DeviceBreakpoints } from './constants'

export const FontFamily = {
  main: `'Outfit', sans-serif`,
  inter: `'Inter', sans-serif`,
  manrope: `'Manrope', sans-serif`,
  outfit: `'Outfit', sans-serif`,
  dmsans: `'DM Sans', sans-serif`,
  ivyMode: 'Ivy Mode, sans-serif',
}

export const GlobalStyles: Styles = {
  global: {
    '#__next': {
      height: '100%',
    },
    html: {
      fontSize: BASE_FONT_SIZE_PX,
      scrollBehavior: 'smooth',
    },
    body: {
      height: '100vh',
      minHeight: '100vh',
      minWidth: '320px',
      color: 'brand.black',
      fontFamily: FontFamily.main,
      fontSize: '14px',
      /**
       * Prevent modal input focus from triggering `pull to refresh`.
       */
      '-webkit-overflow-scrolling': 'none',
      'overscroll-behavior': 'none',
    },
    'body *': {
      fontFamily: FontFamily.main,
    },
    '*::placeholder': {
      fontSize: 14,
      opacity: 1,
    },
    'a, button': {
      touchAction: 'manipulation',
    },
    input: {
      fontFamily: FontFamily.main,
    },
    'input[type="text"]': {
      fontSize: 16,
    },
    pre: {
      tabSize: 2,
    },
  },
}

const CustomTheme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    ...Colors,
  },
  fonts: FontFamily,
  styles: { ...GlobalStyle, ...GlobalStyles },
  breakpoints: DeviceBreakpoints,
  /**
   * HACK: for some reason passing components without spreading them inside the
   * object breaks the `chakra-react-select`
   */
  components: { ...components },
}

export default extendTheme(proTheme, CustomTheme) as Theme
