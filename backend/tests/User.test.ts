import { createTestContext } from "./__helpers";

const ctx = createTestContext();

import pino  from 'pino'
export const logger = pino({
  level: "debug",
  //prettyPrint: true
  transport: {
    target: 'pino-pretty'
  },
});

describe("User unit tests", () => {
    it("verify user data", async () => {
        const users = await ctx.client.request(`
            query {
                allUsers {
                    id
                    email
                }
            }  
            `);
        logger.debug(`users: ${users.allUsers.length}`)
        expect(users.allUsers).not.toBeNull
        expect(users.allUsers).toHaveLength(3)
      });
});
