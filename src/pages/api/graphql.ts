import { useSentry } from '@envelop/sentry'
import { schema } from 'api/graphql/schema'
import { YogaServerContext } from 'api/types/GraphQLContext'
import { ApiEnv } from 'api/utils/apiEnv'
import { requestContext } from 'api/utils/requestContext'
import { createYoga } from 'graphql-yoga'
import '@sentry/tracing'

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

export default createYoga<YogaServerContext>({
  schema,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  plugins: [useSentry({})],
  cors: {
    origin: ApiEnv.WEB_URL,
    allowedHeaders: ['*'],
    methods: ['*'],
    credentials: true,
  },
  graphiql: ApiEnv.NODE_ENV === 'development',
  context: requestContext,
})
