import { graphQlAuthCheck } from "../../utils/grapqlAuthCheck";
import { getQuantityLogsById } from "../service/internalService";
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();
export const getProductStatistics = async (
  _: any,
  args: any,
  { token }: any
) => {
  try {
    // graphQlAuthCheck(token);
    const { id } = args;
    const data = await getQuantityLogsById(id);
    pubsub.publish("STATISTIC_CHANGED", {
        statisticChanged: {data}
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Subscription
export const statisticChanged = {
  subscribe: withFilter(
    () => pubsub.asyncIterator("STATISTIC_CHANGED"),
    (payload, variables) => {
      // Only push an update if the comment is on
      // the correct repository for this operation
      return payload.statisticChanged.productId === variables.productId;
    }
  ),
};
