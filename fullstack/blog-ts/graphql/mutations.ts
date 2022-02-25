import {
    nonNull,
    objectType,
    stringArg,
  } from 'nexus'
  
  export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
      t.field('signupUser', {
        type: 'User',
        args: {
          name: stringArg(),
          email: nonNull(stringArg()),
        },
        resolve: (_, { name, email }, ctx) => {
          return ctx.prisma.user.create({
            data: {
              name,
              email,
            },
          })
        },
      })
  
      t.nullable.field('deletePost', {
        type: 'Post',
        args: {
          postId: stringArg(),
        },
        resolve: (_, { postId }, ctx) => {
          return ctx.prisma.post.delete({
            where: { id: Number(postId) },
          })
        },
      })
  
      t.field('createDraft', {
        type: 'Post',
        args: {
          title: nonNull(stringArg()),
          content: stringArg(),
          authorEmail: stringArg(),
        },
        resolve: (_, { title, content, authorEmail }, ctx) => {
          return ctx.prisma.post.create({
            data: {
              title,
              content,
              published: false,
              author: {
                connect: { email: authorEmail },
              },
            },
          })
        },
      })
  
      t.nullable.field('publish', {
        type: 'Post',
        args: {
          postId: stringArg(),
        },
        resolve: (_, { postId }, ctx) => {
          return ctx.prisma.post.update({
            where: { id: Number(postId) },
            data: { published: true },
          })
        },
      })

      t.field('addProfileForUser', {
        type: 'Profile',
            args: {
               email: stringArg(),
               bio: stringArg()
            }, 
        resolve: async (_, args, context) => {
            return context.prisma.profile.create({
                data: {
                    bio: args.bio,
                    user: {
                        connect: {
                            email: args.email || undefined,
                     }
                   }
                }
            })
        }
      })
    },
})
  