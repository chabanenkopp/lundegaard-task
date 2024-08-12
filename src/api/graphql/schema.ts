import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from 'api/graphql/typeDefs'
import resolvers from 'api/resolvers'

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
