import { PrismaClient } from '@prisma/client'
import prisma from './lib/prisma'
import { AuthenticationError } from 'apollo-server'
import isEmail from 'isemail';

export interface Context {
  prisma: PrismaClient
  req: any
}

const getUser = async (req: any) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
  
    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    return  await prisma.user.findUnique({ where: { email } });
}

export function createContext(req: any) {
    return {
    ...req,
    prisma,
    user: getUser(req)
  }
}