/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import type common from '../public/locales/en/common.json'
import type error from '../public/locales/en/error.json'
import 'i18next'

interface I18nNamespaces {
  common: typeof common
  error: typeof error
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: I18nNamespaces
  }
}
