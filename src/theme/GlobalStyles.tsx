import { Global } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    // define @font-face rules here and not in extendTheme because can not use object notation due to key duplicity
    styles={`
        @font-face {
          font-family: 'Ivy Mode';
          src: url('/fonts/IvyMode-SemiBold.woff2') format('woff2'), url('/fonts/IvyMode-SemiBold.woff') format('woff');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }
      `}
  />
)
