import { PrismaClient } from 'api/prismaClient'
import { NextApiRequest, NextApiResponse } from 'next'

export interface RequestContext {
  req: NextApiRequest
  res: NextApiResponse
}

export interface GraphqlContext extends RequestContext {
  prisma: typeof PrismaClient
}

export interface AuthGraphqlContext extends RequestContext {
  prisma: typeof PrismaClient
}

export const requestContext = (context: RequestContext) => {
  try {
    return {
      ...context,
      prisma: PrismaClient,
    }
  } catch {
    return context
  }
}
