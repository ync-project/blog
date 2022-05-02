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
  import { Post } from './post'

  export const User = objectType({
    name: 'User',
    definition(t) {
      t.nonNull.int('id')
      t.string('name')
      t.nonNull.string('email')
      t.nonNull.list.nonNull.field('posts', {
        type: Post,
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .posts()
        },
      })
      // t.field('profile', {
      //   type: Profile,
      //   resolve: (parent, _, context) => {
      //     return context.prisma.user.findUnique({
      //       where: { id: parent.id }
      //     }).profile()
      //   }
      // })
    },
  })
  
  export const AuthPayload = objectType({
    name: 'AuthPayload',
    definition(t) {
      t.string('token')
      t.field('user', { type: 'User' })
    },
  })