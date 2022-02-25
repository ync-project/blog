import {
    makeSchema
  } from 'nexus'
  import path from 'path'
  import * as types from './types'
  import { GraphQLSchema } from 'graphql'
  import { Query } from './queries';
  import { Mutation } from './mutations';
//  import { DateTimeResolver } from 'graphql-scalars'

  //export const GQLDate = asNexusMethod(DateTimeResolver, 'date')

  export const schema = makeSchema({
    //types: [...Object.values(types)],
    //types: [types, GQLDate],
    //types,
    types: [types, Query, Mutation],
    outputs: {
        typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
        schema: path.join(process.cwd(), 'generated/schema.graphql'),
    },
    contextType: {
        export: 'Context',
        module: path.join(process.cwd(), 'graphql', 'context.tsx'),
    },
}) as unknown as GraphQLSchema
