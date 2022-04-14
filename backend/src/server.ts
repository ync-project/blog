import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'

export async function createAplloServer () {
  return new ApolloServer({ 
    schema, 
    context: createContext,
    introspection: true,
    apollo: {
      key: process.env.APOLLO_KEY,
    },
  })
}