import { executeGQL } from 'api/testing/graphql'
import {
  WikiSearchDocument,
  WikiSearchQuery,
  WikiSearchQueryVariables,
} from 'apollo/generated/graphqlClient'
import { describe, expect, test } from 'vitest'

describe('SearchResolver', () => {
  test('should check wikipedia search response', async () => {
    const result = await executeGQL<WikiSearchQuery, WikiSearchQueryVariables>({
      document: WikiSearchDocument,
      variables: { query: 'Batman' },
    })

    expect(result.data?.search).toHaveLength(20)
    expect(result.data?.search[0]).toHaveProperty('pageid')
    expect(result.data?.search[0]).toHaveProperty('title')
    expect(result.data?.search[0]).toHaveProperty('snippet')
  })
})
