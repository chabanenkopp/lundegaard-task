import { mergeResolvers } from '@graphql-tools/merge'
import loans from './loans'

export default mergeResolvers([loans])
