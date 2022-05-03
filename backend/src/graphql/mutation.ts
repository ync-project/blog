import {
    intArg,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
  } from 'nexus'
  import { Context } from '../context'
  import { Post } from './types/post'
  import { PostCreateInput } from './query'
  
  export const UserUniqueInput = inputObjectType({
    name: 'UserUniqueInput',
    definition(t) {
      t.int('id')
      t.string('email')
    },
  })

  export const UserCreateInput = inputObjectType({
    name: 'UserCreateInput',
    definition(t) {
      t.nonNull.string('email')
      t.string('name')
      t.nonNull.string('password')
      t.list.nonNull.field('posts', { type: PostCreateInput })
    },
  })
  
  export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {

      t.field('createDraft', {
        type: Post,
        args: {
          data: nonNull(
            arg({
              type: 'PostCreateInput',
            }),
          ),
          // authorEmail: nonNull(stringArg()),
          // authorName: nonNull(stringArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.post.create({
            data: {
              title: args.data.title,
              content: args.data.content,
              published: false,
              author: {
                connect: { email: args.data.authorEmail },
                connectOrCreate: {
                  create: {
                    name: args.data.authorName,
                    email: args.data.authorEmail,
                  },
                  where:{
                    email: args.data.authorEmail,
                  }
                }
              },
            },
          })
        },
      })

      t.field('togglePublishPost', {
        type: Post,
        args: {
          id: nonNull(intArg()),
        },
        resolve: async (_, args, context: Context) => {
          try {
            const post = await context.prisma.post.findUnique({
              where: { id: args.id || undefined },
              select: {
                published: true,
              },
            })
            return context.prisma.post.update({
              where: { id: args.id || undefined },
              data: { published: !post?.published },
            })
          } catch (e) {
            throw new Error(
              `Post with ID ${args.id} does not exist in the database.`,
            )
          }
        },
      })
  
      t.field('incrementPostViewCount', {
        type: Post,
        args: {
          id: nonNull(intArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.post.update({
            where: { id: args.id || undefined },
            data: {
              viewCount: {
                increment: 1,
              },
            },
          })
        },
      })

      t.field("votePost", {
        type: Post,
        args: {
          id: nonNull(intArg()),//({ required: true }),
        },
        async resolve(_root, args, context: Context) {
          const currentPost = await context.prisma.post.findUnique({
            where: { id: args.id },
           })
          
           //console.log('args.id', args.id)
          const updatePost = await context.prisma.post.update({
            where: { id: args.id },
            data: { votes: Number(currentPost?.votes) + 1 },
          })

          return updatePost
        },
      })  
  
      t.field('deletePost', {
        type: Post,
        args: {
          id: nonNull(intArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.post.delete({
            where: { id: args.id },
          })
        },
      })
    }   
  })
  