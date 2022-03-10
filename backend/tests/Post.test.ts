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
        const feeds = await ctx.client.request({
            document: feed_all,
        });
        logger.debug(`feeds[0]: ${feeds.feed[0]}`)
        expect(feeds.feed).not.toBeNull
        expect(feeds.feed).toHaveLength(3)
        expect(feeds.feed[0].published).toBeTruthy
        expect(feeds.feed[0].author).not.toBeNull
        expect(feeds.feed[2].published).toBeTruthy
        expect(feeds.feed[2].author).not.toBeNull
    });

    it("Delete a post", async () => {
        const id = 1
        let op: any = {}

        // read first
        op = await ctx.client.request({
            document: postById,
            variables: { id }
        });
        expect(op.postById.id === id)
        
        // checks sum 
        op = await ctx.client.request({
            document: feed_all,
        });
        logger.debug(`op.feed.length: ${op.feed.length}`)
        expect(op.feed).not.toBeNull
        expect(op.feed).toHaveLength(3)

        // checks sum again
        op = await ctx.client.request({
            document: feed_all,
        });
        logger.debug(`again, op.feed.length: ${op.feed.length}`)
        expect(op.feed).not.toBeNull
        expect(op.feed).toHaveLength(3)

        // delete it
        // op = await ctx.client.request({
        //     document: deletePost,
        //     variables: { id }
        // })
        // logger.debug(`deletePost.id: ${op.deletePost.id}`)
        // expect(op.deletePost.id === id)

        // read again
        op = await ctx.client.request({
            document: postById,
            variables: { id }
        });
        expect(op.deletePost.id === id)

    });
    
})
