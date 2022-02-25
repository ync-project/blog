import { objectType } from 'nexus'
import { User } from './User'

export const Profile = objectType({
      name: 'Profile',
      definition(t) {
        t.nonNull.int('id')
        t.string('bio')
        t.field('user', {
          type: 'User',
          resolve: (parent, _, context) => {
            return context.prisma.profile
              .findUnique({
                where: { id: parent.id || undefined },
              })
              .user()
          },
        })
      },
})