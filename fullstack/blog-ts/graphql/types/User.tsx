import { objectType } from 'nexus'

export const User = objectType({
    name: 'User',
    definition(t) {
      t.int('id')
      t.string('name')
      t.string('email')
      t.list.field('posts', {
        type: 'Post',
        resolve: (parent, _, ctx) =>
          ctx.prisma.user
            .findUnique({
              where: { id: Number(parent.id) },
            })
            .posts(),
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
  