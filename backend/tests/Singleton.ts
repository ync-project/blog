//const getPort = require("getport");
import { getPort, checkPort, getRandomPort, waitForPort } from 'get-port-please'
import { ServerInfo, ApolloServer } from "apollo-server";
import { createAplloServer } from "../src/server";

import pino from 'pino'
const logger = pino({
  level: "debug", //process.env.LOGGER_LEVEL || 
  //prettyPrint: true
  transport: {
    target: 'pino-pretty'
  },
})

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
 export default class Singleton {
    private static instance: Singleton;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    private server: ApolloServer | null = null;
    private serverInstance: ServerInfo | null = null;
/**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public async start(): Promise<ServerInfo> {
      if (!this.server)
        this.server = await createAplloServer()
      
        //if (!this.serverInstance?.server.listening){  
          const port = await getPort({ports: [5000, 5001, 5002, 5003, 5004 ]})
          //const port = 5000
          this.serverInstance = await this.server.listen({ port });  
          logger.info(`Test server ready at: http://localhost:${port}`)             
        //}  
      return this.serverInstance    
    }
    public async stop() {
      //if (this.serverInstance?.server.listening){
        await this.server?.stop()
        logger.info("server stopped")                           
      //}
   }
}
