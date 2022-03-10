import { PrismaClient } from "@prisma/client";
import { GraphQLClient } from "graphql-request";
import { join } from "path";
import { execSync } from "child_process";
import singleton from './Singleton'

import pino from 'pino'
export const logger = pino({
  level: "debug", //process.env.LOGGER_LEVEL || 
  transport: {
    target: 'pino-pretty'
  },
  //prettyPrint: true
})

type TestContext = {
  client: GraphQLClient
  db: PrismaClient | null
};

const serverInstance = singleton.getInstance()

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();
  const prismaCtx = prismaTestContext();

  // afterAll( async () => {
  //   console.log('1 - afterAll')
  //   await graphqlCtx.after();
  //   await prismaCtx.after()
  //   console.log('2 - afterAll')
  // });

  beforeAll(async () => {
      const client = await graphqlCtx.before();
      Object.assign(ctx, {
        client,
      });
  })        
  
  afterAll( async () => {
    await graphqlCtx.after();
  })

  beforeEach(async () => {                                        
    ctx.db = await prismaCtx.before(); 
  });

  afterEach( async () => {                                         
    await prismaCtx.after();
  });

  return ctx;                                                     
}

function graphqlTestContext() {
  //let server: ApolloServer | null = null;
  //let serverInstance: ServerInfo | null = null;

  return {
    async before() {

      const { port } = await serverInstance.start()
      return new GraphQLClient(`http://localhost:${port}`);         
    },
     async after() {
      serverInstance.stop()
    },
   };
}

function prismaTestContext() {
    const prismaBinary = join(__dirname, "..", "node_modules", ".bin", "prisma");
    let prismaClient: null | PrismaClient = null;
  
    return {
       async before() {
  
         // Run the migrations to ensure our schema has the required structure
         //execSync(`${prismaBinary} db push --preview-feature`,);
         execSync(`${prismaBinary} db push --force-reset --accept-data-loss`,);
         execSync(`${prismaBinary} db seed `,);
         logger.info("db started")
  
         // Construct a new Prisma Client connected to the generated schema
         prismaClient = new PrismaClient();
  
         return prismaClient;
       },
        async after() {
         // Release the Prisma Client connection
         await prismaClient?.$disconnect();
         // Drop the schema after the tests have completed
         execSync(`${prismaBinary} migrate reset --force --skip-generate`,);
        logger.info("db disconnected")    
       },
     };
}
