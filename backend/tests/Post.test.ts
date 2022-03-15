import { createTestContext } from "./__helpers";
import * as graphql from './graphql'

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

    it("Search posts paginate the result with sortable order.", async () => {
        let op = await ctx.client.request(`
            ${graphql.FEED_LIST},
        `);
        //logger.debug(`feeds[0]: ${feeds.feed[0]}`)
        expect(op.feed).not.toBe(null)
        //expect(op.feed.length === 3)
        expect(op.feed).toHaveLength(3)
        expect(op.feed[0].published).toBe(true)
        expect(op.feed[0].author).not.toBe(null)
        expect(op.feed[2].published).toBe(true)
        expect(op.feed[2].author).not.toBe(null)

    
        // search text 
        op = await ctx.client.request(`
            ${graphql.FEED_LIST},
        `, { searchString: 'www'});
        expect(op.feed).not.toBe(null)
        expect(op.feed).toHaveLength(2)
        expect(op.feed[0].published).toBe(true)

        // udpate data
        const id = 2
        op = await ctx.client.request(`
            ${graphql.INCREMENT_POST_VIEW_COUNT},
        `, { id });
        expect(op.incrementPostViewCount.viewCount).toBeGreaterThan(0)

        // skip
        op = await ctx.client.request(`
            ${graphql.FEED_LIST},
        `, { 
              searchString: 'prisma',
              skip: 1,
           });

        expect(op.feed).toHaveLength(2)
        expect(op.feed[0].id).toBe(id)

        // take
        op = await ctx.client.request(`
            ${graphql.FEED_LIST},
        `, { 
              searchString: 'prisma',
              take: 1,
           });

        expect(op.feed).toHaveLength(1)
        expect(op.feed[0].id).toBe(1)

        // all in one
        op = await ctx.client.request(`
            ${graphql.FEED_LIST},
        `, { 
              searchString: 'prisma',
              skip: 0,
              take: 2,
              orderBy: {"updatedAt": "desc"}
           });

        expect(op.feed).toHaveLength(2)
        expect(op.feed[0].id).toBe(id)
      });

    it("Read a post", async () => {
        // read ok
        const ids = [1, 2, 3, 4]
        let op: any = {}
        ids.map( async id => {
            op = await ctx.client.request({
                document: graphql.POST_BY_ID,
                variables: { id }
            });
            expect(op.postById.id).toBe(id)
            expect(op.postById.title).not.toBe(null)
        })
        
        // read bad
        const id = 5
        op = await ctx.client.request(`
                ${graphql.POST_BY_ID}
            `,
            { id }
        );
        expect(op.postById).toBe(null)
    });

    it("Delete a post", async () => {
        const id = 3
        let op: any = {}

        // delete it
        op = await ctx.client.request(`
            ${graphql.DELETE_POST}
            `,
            { id }
        )
        expect(op.deletePost.id).toBe(id)

        // read again
        op = await ctx.client.request(`
                ${graphql.POST_BY_ID}
            `,
            { id }
        );
        expect(op.postById).toBe(null)

        // checks sum again
        op = await ctx.client.request(`
            ${graphql.FEED_LIST}
        `);
        expect(op.feed).toHaveLength(2)
    });

    it("Publish/unpublish an existing post ", async () => {
        const id = 4
        let op = await ctx.client.request(`
            ${graphql.TOGGLE_PUBLISH_POST}
            `,
            { id }
        )
        expect(op.togglePublishPost.id).toBe(id)
        expect(op.togglePublishPost.published).toBe(true)
    });

    it("Create post ", async () => {
      const email = 'mahmoud@prisma.io'
      
      // read existing draft
      let op = await ctx.client.request(`
          ${graphql.DRAFTS_BY_USER}
          `,
          { email }
      )
      expect(op.draftsByUser).toHaveLength(1)

      // create a draft
      const title = "Join the Prisma Slack"
      const content = "https://slack.prisma.io"
      op = await ctx.client.request(`
          ${graphql.CREATE_DRAFT}
          `,
          { authorEmail: email, title, content }
      )
      expect(op.createDraft.author.email).toEqual(email)
      expect(op.createDraft.title).toEqual(title)
      expect(op.createDraft.content).toEqual(content)
      expect(op.createDraft.published).toEqual(false)

      // read existing draft
      op = await ctx.client.request(`
          ${graphql.DRAFTS_BY_USER}
          `,
          { email }
      )
      expect(op.draftsByUser).toHaveLength(2)
    });
  
})
