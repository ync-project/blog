import 'reflect-metadata'
import { createAplloServer } from './server'

import pino  from 'pino'
const logger = pino({
  level: "debug",
  //prettyPrint: true
  transport: {
    target: 'pino-pretty'
  },
});

async function bootstrap(){
  const server = await createAplloServer()
  const { url } = await server.listen({port: 4000})               
  logger.info(`\
  🚀 Server ready at: ${url}
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
    `)
  
}

bootstrap();
