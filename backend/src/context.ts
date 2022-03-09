import { PrismaClient } from '@prisma/client'
import prisma from './lib/prisma'
import { AuthenticationError } from 'apollo-server'

export interface Context {
  prisma: PrismaClient
  req: any
}

const getUser = (token: string): any => {
  return ''
}

// export const context: Context = {
//   prisma: prisma,
// }

export function createContext(req: any) {
  return {
    ...req,
    prisma,
  }
}