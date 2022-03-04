import {
    intArg,
    makeSchema,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    asNexusMethod,
    enumType,
  } from 'nexus'
  import { Context } from '../../context'

  const User = objectType({
    name: 'User',
    definition(t) {
      t.nonNull.int('id')
      t.string('name')
      t.nonNull.string('email')
      t.nonNull.list.nonNull.field('posts', {
        type: 'Post',
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .posts()
        },
      }),
      t.field('profile', {
        type: 'Profile',
        resolve: (parent, _, context) => {
          return context.prisma.user.findUnique({
            where: { id: parent.id }
          }).profile()
        }
      })
    },
  })
  