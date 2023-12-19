/* eslint-disable @typescript-eslint/no-explicit-any */
import connectionToMongoDb from "./dbAccess/mongoDBConnection";
import { connectionToPostgres } from "./dbAccess/postgresConnection";
import initialData from "./utils/initialData";
import server, { context } from "./graphql/apolloServer";
import chalk from "chalk";
import express from "express";
import morganLogger from "./logger/morgan";
import corsHandler from "./cors/cors";
import { handleServerError } from "./utils/handleErrors";
import connectToRedis from "./dbAccess/redisConnection";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import BodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { requireAuth } from "./middleware/authExpress";

const PORT = 4000;

if (!PORT) throw new Error("invalid port");

const app = express();

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const serverCleanup = useServer({ schema }, wsServer,);


const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

apolloServer.start().then(() => {
  app.use(morganLogger);
  app.use(corsHandler);
  app.use(handleServerError);
  // app.use(requireAuth);
  app.use(
    "/graphql",
    cors(),
    BodyParser.json(),
    expressMiddleware(apolloServer)
  );
  connectionToMongoDb()
    .then((message) => console.log(chalk.blue(message)))
    .catch((error) => console.log(chalk.redBright(error.message)));
  connectionToPostgres().then((message) => {
    console.log(chalk.magenta(message));
    initialData()
      .then((message) => console.log(chalk.cyan(message)))
      .catch((message) => console.log(chalk.redBright(message)));
  });
  connectToRedis()
    .then((message) => console.log(chalk.blue(message)))
    .catch((error) => console.log(chalk.redBright(error.message)));
  httpServer.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
});

// server
//   .start()
//   .then(() => {
//     server.applyMiddleware({ app } as any);
//     connectionToMongoDb()
//       .then((message) => console.log(chalk.blue(message)))
//       .catch((error) => console.log(chalk.redBright(error.message)));
//     connectionToPostgres().then((message) => {
//       console.log(chalk.magenta(message));
//       initialData()
//         .then((message) => console.log(chalk.cyan(message)))
//         .catch((message) => console.log(chalk.redBright(message)));
//       connectToRedis()
//         .then((message) => console.log(chalk.blue(message)))
//         .catch((error) => console.log(chalk.redBright(error.message)));
//     });
//     app.listen({ port: 4000 }, () =>
//       console.log(
//         chalk.blueBright(
//           `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
//         )
//       )
//     );
//   })
//   .catch((error) => console.log(chalk.redBright(error.message)));
