import {
    intArg,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
  } from 'nexus'
  import { Context } from '../context'
  import { User } from './types/user'
  import { Post } from './types/post'
  import { Profile } from './types/profile'
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
          authorEmail: nonNull(stringArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.post.create({
            data: {
              title: args.data.title,
              content: args.data.content,
              author: {
                connect: { email: args.authorEmail },
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
      t.nonNull.field('signupUser', {
        type: User,
        args: {
          data: nonNull(
            arg({
              type: UserCreateInput,
            }),
          ),
          bio: (stringArg())
        },
        resolve: (_, args, context: Context) => {
          const postData = args.data.posts?.map((post: any) => {
            return { title: post.title, content: post.content || undefined }
          })
          return context.prisma.user.create({
            data: {
              name: args.data.name,
              email: args.data.email,
              password: args.data.password,
              posts: {
                create: postData,
              },
              profile: {
                create: {
                   bio: args.bio
                }
              },
            },
          })
        },
      })
  
      t.field('addProfileForUser', {
        type: Profile,
        args: {
          userUniqueInput: nonNull(
            arg({
              type: 'UserUniqueInput',
            }),
          ),
          bio: stringArg()
        }, 
        resolve: async (_, args, context) => {
          return context.prisma.profile.create({
            data: {
              bio: args.bio,
              user: {
                connect: {
                  id: args.userUniqueInput.id || undefined,
                  email: args.userUniqueInput.email || undefined,
                }
              }
            }
          })
        }
      })

      t.field('updateProfileForUser', {
        type: User,
        args: {
          email: nonNull(stringArg()),
          bio: stringArg()
        }, 
        resolve: async (_, args, context) => {
          return context.prisma.user.update({
            where: { email: args.email},
            data: {
              profile: {
                update: {
                  bio: args.bio
                }
              }
            }
          })
        }
      })

    },
  })
  