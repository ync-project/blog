// after update this file, run 
// $ npx prisma migrate dev 
import {
    intArg,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    enumType,
  } from 'nexus'
import { Context } from '../context'
import { User } from './types/user'
import { Post } from './types/post'
import { Prisma } from '@prisma/client'

export const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc'],
  })
  
export const PostOrderByUpdatedAtInput = inputObjectType({
    name: 'PostOrderByUpdatedAtInput',
    definition(t) {
      t.nonNull.field('updatedAt', { type: SortOrder })
    },
  })
  
export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.nonNull.string('title')
    t.string('content')
  },
})
  
export const Query = objectType({
    name: 'Query',
    definition(t) {

      t.nullable.field('postById', {
        type: Post,
        args: {
          id: intArg(),
        },
        resolve: (_parent, args, context: Context) => {
          return context.prisma.post.findUnique({
            where: { id: args.id || undefined },
          })
        },
      })
  
      t.list.field('draftsByUser', {
        type: Post,
        args: {
          userUniqueInput: nonNull(
            arg({
              type: 'UserUniqueInput',
            }),
          ),
        },
        resolve: (_parent, args, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: {
                id: args.userUniqueInput.id || undefined,
                email: args.userUniqueInput.email || undefined,
              },
            })
            .posts({
              where: {
                published: false,
              },
            })
        },
      })

      t.nonNull.list.nonNull.field('posts', {
        type: PostConnection,
        args:{
          take: intArg(),
          after: intArg(),
        },
        resolve: async (_parent, args, context: Context) => {
          console.log('after', args.after)
           const posts = await context.prisma.post.findMany({
            cursor: { 
              id: args.after || undefined
            }, 
            take: args.take || undefined,
          })

          const totalCount = await context.prisma.post.count() || 0
          console.log('totalCount', totalCount)
          console.log('posts.length', posts.length)

          return {
            cursor: posts[posts.length - 1].id || null,
            hasMore: posts.length < totalCount,
            posts: posts,
          };
        },
      })

      t.nonNull.list.nonNull.field('allUsers', {
        type: User,
        args:{
          skip: intArg(),
          take: intArg(),
        },
        resolve: async (_parent, args, context: Context) => {
           const results = await context.prisma.user.findMany({
            take: args.take || undefined,
            skip: args.skip || undefined,
          })
          console.log('results', results.map(p => p.id))
          return results
        },
      })

      t.field("_allUsersMeta", {
        type: "_QueryMeta",
        async resolve(_root, _args, context: Context) {
          return {
            count: await context.prisma.user.count(),
          }
        },
      })
    
      t.nullable.field('user', {
        type: User,
        args: {
          id: intArg(),
        },
        resolve: (_parent, args, context: Context) => {
          return context.prisma.user.findUnique({
            where: { id: args.id || undefined },
          })
        },
      })  

      t.nonNull.list.nonNull.field('allPosts', {
        type: Post,
        args:{
          skip: intArg(),
          take: intArg(),
          searchString: stringArg(),
          orderBy: arg({
            type: 'PostOrderByUpdatedAtInput',
          }),
        },
        resolve: (_parent, args, context: Context) => {
          const or = args.searchString
            ? {
                OR: [
                  { title: { contains: args.searchString } },
                  { content: { contains: args.searchString } },
                ],
              }
            : {}
  
          const where = {
              published: true,
              ...or,
          }
          console.log('searchString:', args.searchString, ', take', args.take, ', skip', args.skip)
          return context.prisma.post.findMany({
            where, 
            take: args.take || undefined,
            skip: args.skip || undefined,
            orderBy: args.orderBy || undefined,
          })
        },
      })

      t.field("_allPostsMeta", {
        type: "_QueryMeta",
        args:{
          searchString: stringArg(),
        },
        async resolve(_root, args, context: Context) {
          const or = args.searchString
            ? {
                OR: [
                  { title: { contains: args.searchString } },
                  { content: { contains: args.searchString } },
                ],
              }
            : {}
  
          const where = {
              published: true,
              ...or,
          }
          return {
            count: await context.prisma.post.count({
              where
            }),
          }
        },
      })

    },
  })

  // export const Edge = objectType({
  //   name: 'Edge',
  //   definition(t) {
  //     t.string('cursor')
  //     t.field('node', {
  //       type: Post,
  //     })
  //   },
  // })

  export const PageInfo = objectType({
    name: 'PageInfo',
    definition(t) {
      //t.string('endCursor')
      //t.boolean('hasNextPage')
      t.nonNull.int('totalCount')
      t.nonNull.int('pageCount')
      t.nonNull.int('currentPage')
      t.nonNull.int('perPage')
      t.nonNull.boolean('hasNextPage')
    },
  })
  
  export const Response = objectType({
    name: 'Response',
    definition(t) {
      t.nonNull.field('pageInfo', { type: PageInfo })
      t.nonNull.list.nonNull.field('posts', {
        type: Post,
      })
    },
  })  
  export const TopInfo = objectType({
    name: 'TopInfo',
    definition(t) {
      t.nonNull.int('totalCount')
      t.nonNull.int('pageCount')
      t.nonNull.int('perPage')
      t.nonNull.list.nonNull.field('topPosts', {
         type: Post })
    },
  }) 
  
  export const QueryMeta = objectType({
    name: '_QueryMeta',
    definition(t) {
      t.int('count')
    }
  })

  export const PostConnection = objectType({
    name: 'PostConnection',
    definition(t) {
      t.nonNull.string('cursor')
      t.nonNull.boolean('hasMore')
      t.nonNull.list.nonNull.field('posts', { 
        type: Post})
    }
  })
  
  