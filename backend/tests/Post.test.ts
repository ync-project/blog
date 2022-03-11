import { createTestContext } from "./__helpers";
import { feed_all, postById, deletePost } from './graphql'

const ctx = createTestContext();

import pino  from 'pino'
export const logger = pino({
  level: "debug",
  //prettyPrint: true
  transport: {
    target: 'pino-pretty'
  },
});

describe("Post unit tests", () => {
    it("Retrieve all published posts and their authors ", async () => {
        const feeds = await ctx.client.request(`
            ${feed_all},
        `);
        //logger.debug(`feeds[0]: ${feeds.feed[0]}`)
        expect(feeds.feed).not.toBe(null)
        expect(feeds.feed.length === 3)
        expect(feeds.feed[0].published).toBe(true)
        expect(feeds.feed[0].author).not.toBe(null)
        expect(feeds.feed[2].published).toBe(true)
        expect(feeds.feed[2].author).not.toBe(null)
    });

    // it("Read a post", async () => {
    //     // read ok
    //     const ids = [1, 2, 3, 4]
    //     let op: any = {}
    //     ids.map( async id => {
    //         op = await ctx.client.request({
    //             document: postById,
    //             variables: { id }
    //         });
    //         expect(op.postById.id).toBe(id)
    //         expect(op.postById.title).not.toBe(null)
    //     })
        
    //     // read bad
    //     const id = 5
    //     op = await ctx.client.request(`
    //             ${postById}
    //         `,
    //         { id }
    //     );
    //     expect(op.postById).toBe(null)
    // });

    // it("Delete a post", async () => {
    //     const id = 4
    //     let op: any = {}

    //     // delete it
    //     op = await ctx.client.request(`
    //         ${deletePost}
    //         `,
    //         { id }
    //     )
    //     expect(op.deletePost.id).toBe(id)

    //     // read again
    //     op = await ctx.client.request(`
    //             ${postById}
    //         `,
    //         { id }
    //     );
    //     expect(op.postById).toBe(null)

    //     // checks sum again
    //     op = await ctx.client.request(`
    //         ${feed_all}
    //     `);
    //     expect(op.feed.length === 2)
    // });
    
})
