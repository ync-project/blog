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
  
      t.nonNull.list.nonNull.field('feed', {
        type: Post,
        args: {
          searchString: stringArg(),
          skip: intArg(),
          take: intArg(),
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
  
          return context.prisma.post.findMany({
            where: {
              published: true,
              ...or,
            },
            take: args.take || undefined,
            skip: args.skip || undefined,
            orderBy: args.orderBy || undefined,
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

      t.nonNull.list.nonNull.field('allUsers', {
        type: User,
        resolve: (_parent, _args, context: Context) => {
          return context.prisma.user.findMany()
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

      t.field('allFeeds', {
        type: TopInfo,
        args: {
          searchString: stringArg(),
          take: intArg(),
        },
        resolve: async (_parent, args, context: Context) => {
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

          const defaultPerPage = 10
          let perPage = args.take ?? defaultPerPage
          perPage <= 0 ? defaultPerPage : perPage

          const topPosts = await context.prisma.post.findMany({
            where,
            take: perPage,
          })
          const totalCount = await context.prisma.post.count({
            where
          })
          const pageCount = Math.ceil(totalCount / perPage)

          return {
              totalCount,
              pageCount,
              perPage,
              topPosts
          }
        },
      })

      t.field('feeds', {
        type: Response,
        args: {
          searchString: stringArg(),
          page: nonNull(intArg()),
          take: intArg(),
          orderBy: arg({
            type: 'PostOrderByUpdatedAtInput',
          }),
        },
        resolve: async (_parent, args, context: Context) => {
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

          let page = args.page 
          page = (page <= 0) ? 1 : page          
          const defaultPerPage = 10
          let perPage = args.take ?? defaultPerPage
          perPage <= 0 ? defaultPerPage : perPage
          const start = (page - 1) * perPage
          console.log('page', page)
          //console.log('start', start)

          const results = await context.prisma.post.findMany({
            where,
            take: perPage,
            skip: start,
            orderBy: args.orderBy || undefined,
          })

          console.log('results', results.map(p => p.id))
          const totalCount = await context.prisma.post.count({
            where
          })
          const pageCount = Math.ceil(totalCount / perPage)

          return {
            pageInfo: {
              totalCount,
              pageCount,
              currentPage: page,
              perPage,
              hasNextPage: pageCount > page
            },
            posts: results,
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
