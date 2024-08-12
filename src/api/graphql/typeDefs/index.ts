import { mergeTypeDefs } from '@graphql-tools/merge'
import loans from './loans.graphql'

export default mergeTypeDefs([loans])
