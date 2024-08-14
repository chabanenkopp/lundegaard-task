import { executeGQL } from 'api/testing/graphql'
import {
  MonthlyAmountDocument,
  MonthlyAmountQuery,
  MonthlyAmountQueryVariables,
} from 'apollo/generated/graphqlClient'
import { describe, expect, test } from 'vitest'

describe('Monthly amount resolver ', () => {
  test('should check monthly payment calculation', async () => {
    const result = await executeGQL<MonthlyAmountQuery, MonthlyAmountQueryVariables>({
      document: MonthlyAmountDocument,
      variables: {
        input: {
          insuranceRate: 0,
          interestRate: 0.05,
          loanBalance: 1000,
          installmentsQuantity: 5,
        },
      },
    })

    expect(result.data?.monthlyAmount).toBe(202.67)
  })
})
