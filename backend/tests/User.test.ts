import { createTestContext } from "./__helpers";
import { 
  allUsers, signupUser, user, addProfileForUser, updateProfileForUser
} from './graphql'

const ctx = createTestContext();

import pino  from 'pino'
export const logger = pino({
  level: "debug",
  //prettyPrint: true
  transport: {
    target: 'pino-pretty'
  },
});

describe("Users unit tests", () => {
    // it("list all users", async () => {
    //     const op = await ctx.client.request(`
    //         ${allUsers}
    //         `);
    //     expect(op.allUsers).toHaveLength(3)
    //     expect(op.allUsers[0].email).not.toEqual(null)
    //     expect(op.allUsers[2].email).not.toEqual(null)
    // });

    // it("Create a new user", async () => {
    //   const email = 'sarah@prismo.io'
    //   const name = 'Sarah'
    //   const password = 'ttt'

    //   let op = await ctx.client.request(`
    //       ${signupUser}
    //       `, { email, name, password });
    //   const id = op.signupUser.id    
    //   expect(id).not.toEqual(null)
    //   expect(op.signupUser.email).toEqual(email)

    //   op = await ctx.client.request(`
    //       ${user}
    //       `, { id });
    //       expect(op.user.email).toEqual(email)
    //       expect(op.user.name).toEqual(name)

    //   op = await ctx.client.request(`
    //       ${allUsers}
    //       `);
    //   expect(op.allUsers).toHaveLength(4)
    //   expect(op.allUsers[0].email).not.toEqual(null)
    //   expect(op.allUsers[3].email).not.toEqual(null)
    // });

    // it("Create a new user w/ profile", async () => {
    //   const email = 'sarah@prismo.io'
    //   const name = 'Sarah'
    //   const password = 'ttt'
    //   const bio = 'I like turtles'

    //   let op = await ctx.client.request(`
    //       ${signupUser}
    //       `, { email, name, password, bio });
    //   const id = op.signupUser.id    
    //   expect(id).not.toEqual(null)
    //   expect(op.signupUser.email).toEqual(email)

    //   op = await ctx.client.request(`
    //       ${user}
    //       `, { id });
    //       expect(op.user.email).toEqual(email)
    //       expect(op.user.name).toEqual(name)

    //   op = await ctx.client.request(`
    //       ${allUsers}
    //       `);
    //   expect(op.allUsers).toHaveLength(4)
    //   expect(op.allUsers[0].email).not.toEqual(null)
    //   expect(op.allUsers[3].email).not.toEqual(null)
    // });

    // it("Add profile to user", async () => {
    //   const email = 'mahmoud@prisma.io'
    //   const bio = 'I like turtles'

    //   let op = await ctx.client.request(`
    //       ${addProfileForUser}
    //       `, { email, bio });
    //   const id = op.addProfileForUser.id    
    //   expect(id).not.toEqual(null)
    //   expect(op.addProfileForUser.user.email).toEqual(email)
    //   expect(op.addProfileForUser.bio).toEqual(bio)
    // });

    it("Update profile to user", async () => {
      const email = 'mahmoud@prisma.io'
      let bio = 'I like turtles'

      let op = await ctx.client.request(`
          ${addProfileForUser}
          `, { email, bio });
      const id = op.addProfileForUser.id    
      expect(id).not.toEqual(null)
      expect(op.addProfileForUser.user.email).toEqual(email)
      expect(op.addProfileForUser.bio).toEqual(bio)
      
      // bio = 'I like turtles and cats'

      // op = await ctx.client.request(`
      //     ${ updateProfileForUser }
      //     `, { email, bio });
      // expect(op.updateProfileForUser.id).not.toEqual(null)
    });

});
