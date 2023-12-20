/* eslint-disable @typescript-eslint/no-explicit-any */
import { RedisPubSub } from "graphql-redis-subscriptions";
import { graphQlAuthCheck } from "../../utils/grapqlAuthCheck";
import { getQuantityLogsById } from "../service/internalService";
import { PubSub, withFilter } from "graphql-subscriptions";
import 'dotenv/config'

// export const pubsub = new PubSub();
export const pubsub = new RedisPubSub({
  connection: process.env.REDIS_CONNECTION_STRING
})
export const getProductStatistics = async (
  _: any,
  args: any,
  { token }: any
) => {
  try {
    console.log('in getProductStatistics');
    
    graphQlAuthCheck(token);
    const { id } = args;
    const data = await getQuantityLogsById(id);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Subscription
export const statisticChanged = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["STATISTIC_CHANGED"]),
    (payload, variables) => {
            
      return payload.statisticChanged[0].product_id.toString() === variables.productId;
    }
  ),
};
